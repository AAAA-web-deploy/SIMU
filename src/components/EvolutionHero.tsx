import { useEffect, useReducer, useRef, useState } from 'react';
import type { CSSProperties } from 'react';
import { assetFilename, assetUrl } from '../utils/assetUrl.ts';
import {
  createEvolutionState,
  isFinalStage,
  reduceEvolution,
  type EvolutionAction,
  type EvolutionState,
} from '../lib/evolution.ts';
import { fillTemplate } from '../lib/launch.ts';
import { preloadImage } from '../lib/preloadImage.ts';
import type { TokenConfig } from '../types/token.ts';

type Preload = (url: string) => Promise<boolean>;

type Props = {
  token: TokenConfig;
  preload?: Preload;
  transitionMs?: number;
  reducedMotion?: boolean;
};

function useSystemReducedMotion(): boolean {
  const [matches, setMatches] = useState(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  });

  useEffect(() => {
    if (!window.matchMedia) return undefined;
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const apply = () => setMatches(media.matches);
    apply();
    media.addEventListener('change', apply);
    return () => media.removeEventListener('change', apply);
  }, []);

  return matches;
}

export function EvolutionHero({
  token,
  preload = preloadImage,
  transitionMs = 360,
  reducedMotion,
}: Props) {
  const stages = token.evolution;
  const stageCount = stages.length;
  const [state, dispatch] = useReducer(
    (current: EvolutionState, action: EvolutionAction) => reduceEvolution(current, action, stageCount),
    undefined,
    createEvolutionState,
  );
  const systemReduced = useSystemReducedMotion();
  const reduced = reducedMotion ?? systemReduced;
  const [incomingIndex, setIncomingIndex] = useState<number | null>(null);
  const [fading, setFading] = useState(false);
  const [currentFailed, setCurrentFailed] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);
  const lockRef = useRef(false);
  const indexRef = useRef(0);
  const requestRef = useRef(0);
  const timerRef = useRef<number | null>(null);
  const primedRef = useRef(false);
  const reducedRef = useRef(reduced);
  const artButtonRef = useRef<HTMLButtonElement>(null);
  const [resetCount, setResetCount] = useState(0);

  useEffect(() => {
    indexRef.current = state.index;
    reducedRef.current = reduced;
  });

  useEffect(() => {
    if (resetCount === 0) return;
    artButtonRef.current?.focus();
  }, [resetCount]);

  useEffect(() => {
    return () => {
      requestRef.current += 1;
      if (timerRef.current !== null) window.clearTimeout(timerRef.current);
    };
  }, []);

  function clearTimer() {
    if (timerRef.current !== null) {
      window.clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }

  function unavailableMessage(path: string) {
    return `${token.strings.unavailable} (${assetFilename(path)})`;
  }

  function primeRemaining() {
    if (primedRef.current) return;
    primedRef.current = true;
    const run = () => {
      for (const stage of stages.slice(1)) {
        void preload(assetUrl(stage.image));
      }
    };
    window.setTimeout(run, 300);
  }

  function finishAdvance(nextIndex: number) {
    setIncomingIndex(null);
    setFading(false);
    setCurrentFailed(false);
    indexRef.current = nextIndex;
    dispatch({ type: 'transition-end' });
    lockRef.current = false;
  }

  function releaseWithoutAdvance(path: string) {
    clearTimer();
    setIncomingIndex(null);
    setFading(false);
    lockRef.current = false;
    dispatch({ type: 'cancel' });
    setNotice(unavailableMessage(path));
  }

  function advance() {
    if (lockRef.current) return;
    if (isFinalStage(indexRef.current, stageCount)) return;
    const nextIndex = indexRef.current + 1;
    const nextStage = stages[nextIndex];
    if (!nextStage) return;

    lockRef.current = true;
    const requestId = requestRef.current + 1;
    requestRef.current = requestId;
    setNotice(null);
    dispatch({ type: 'tap' });

    void preload(assetUrl(nextStage.image)).then(
      (ok) => {
        if (requestRef.current !== requestId) return;
        if (!ok) {
          lockRef.current = false;
          dispatch({ type: 'load-failure' });
          setNotice(unavailableMessage(nextStage.image));
          return;
        }

        dispatch({ type: 'load-success' });
        if (reducedRef.current || transitionMs === 0) {
          finishAdvance(nextIndex);
          return;
        }

        setIncomingIndex(nextIndex);
        window.requestAnimationFrame(() => {
          window.requestAnimationFrame(() => {
            if (requestRef.current !== requestId) return;
            setFading(true);
          });
        });
        clearTimer();
        timerRef.current = window.setTimeout(() => {
          if (requestRef.current !== requestId) return;
          finishAdvance(nextIndex);
        }, transitionMs);
      },
      () => {
        if (requestRef.current !== requestId) return;
        lockRef.current = false;
        dispatch({ type: 'load-failure' });
        setNotice(unavailableMessage(nextStage.image));
      },
    );
  }

  function reset() {
    requestRef.current += 1;
    clearTimer();
    lockRef.current = false;
    indexRef.current = 0;
    setIncomingIndex(null);
    setFading(false);
    setCurrentFailed(false);
    setNotice(null);
    dispatch({ type: 'reset' });
    setResetCount((count) => count + 1);
  }

  const stage = stages[state.index] ?? stages[0];
  if (!stage) return null;

  const final = isFinalStage(state.index, stageCount);
  const busy = state.status !== 'idle';
  const actionLabel = fillTemplate(final ? token.strings.finalAction : token.strings.evolveAction, {
    stage: stage.stage,
    caption: stage.caption,
  });
  const incoming = incomingIndex !== null ? stages[incomingIndex] : undefined;
  const transition = incoming?.transition;
  const statusText = state.status === 'loading' ? token.strings.imageLoading : (notice ?? '');
  const frameClass = ['hero-frame', fading && transition ? `fx-${transition}` : '', reduced ? 'is-reduced' : '']
    .filter(Boolean)
    .join(' ');
  const frameStyle = { '--fade': `${transitionMs}ms` } as CSSProperties;

  const artwork = currentFailed ? (
    <p className="art-fallback">
      {token.strings.unavailable}
      <span>{assetFilename(stage.image)}</span>
    </p>
  ) : (
    <img
      className="shot"
      src={assetUrl(stage.image)}
      alt={`${stage.stage}. ${stage.caption}`}
      width={1024}
      height={1024}
      decoding="async"
      fetchPriority="high"
      draggable={false}
      onLoad={primeRemaining}
      onError={() => {
        primeRemaining();
        setCurrentFailed(true);
      }}
    />
  );

  return (
    <section className="hero" data-stage={stage.stage} aria-labelledby="evolve-kicker">
      <p id="evolve-kicker" className="kicker">
        {final ? token.finalLabel : token.interactionLabel}
      </p>
      <div className={frameClass} style={frameStyle}>
        <div className="hero-stage">
          {final ? (
            artwork
          ) : (
            <button
              ref={artButtonRef}
              type="button"
              className="art-button"
              onClick={advance}
              aria-label={actionLabel}
              aria-busy={busy}
            >
              {artwork}
            </button>
          )}
          {incoming ? (
            <img
              className={fading ? 'shot incoming is-visible' : 'shot incoming'}
              src={assetUrl(incoming.image)}
              alt=""
              width={1024}
              height={1024}
              decoding="async"
              draggable={false}
              onError={() => releaseWithoutAdvance(incoming.image)}
            />
          ) : null}
          <span className="fx-layer" aria-hidden="true" />
        </div>
      </div>
      <p className="hero-status" role="status">
        {statusText}
      </p>
      <p className="level">
        {token.strings.evolutionLevel}: <span>{stage.stage}</span>
      </p>
      <p className="caption">{stage.caption}</p>
      <ol className="marks" aria-hidden="true">
        {stages.map((item, index) => (
          <li key={item.stage} className={index <= state.index ? 'is-on' : undefined} />
        ))}
      </ol>
      {final ? (
        <button type="button" className="reset" onClick={reset}>
          {token.strings.reset}
        </button>
      ) : null}
      <p className="fun-note">{token.strings.funNote}</p>
      <p className="sr-only" aria-live="polite" aria-atomic="true">
        {stage.stage}. {stage.caption}
      </p>
    </section>
  );
}
