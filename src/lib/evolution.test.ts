import { describe, expect, it } from 'vitest';
import { createEvolutionState, isFinalStage, reduceEvolution, type EvolutionState } from './evolution.ts';

const captions = ['CAT', 'CHONK', 'TECH CHONK', 'AI CHONK', 'SI CHONK'];

function advance(state: EvolutionState, stageCount: number): EvolutionState {
  const loading = reduceEvolution(state, { type: 'tap' }, stageCount);
  const fading = reduceEvolution(loading, { type: 'load-success' }, stageCount);
  return reduceEvolution(fading, { type: 'transition-end' }, stageCount);
}

describe('evolution reducer', () => {
  it('reaches the last stage in one accepted step per tap', () => {
    let state = createEvolutionState();
    for (let step = 1; step < captions.length; step += 1) {
      state = advance(state, captions.length);
      expect(state).toEqual({ index: step, status: 'idle' });
      expect(isFinalStage(state.index, captions.length)).toBe(step === captions.length - 1);
    }
  });

  it('ignores taps while a transition is active and does not skip', () => {
    const count = captions.length;
    const loading = reduceEvolution(createEvolutionState(), { type: 'tap' }, count);
    expect(reduceEvolution(loading, { type: 'tap' }, count)).toEqual(loading);
    const fading = reduceEvolution(loading, { type: 'load-success' }, count);
    expect(reduceEvolution(fading, { type: 'tap' }, count)).toEqual(fading);
    expect(reduceEvolution(fading, { type: 'transition-end' }, count).index).toBe(1);
  });

  it('stays on the final stage until reset', () => {
    const count = captions.length;
    const final = { index: count - 1, status: 'idle' } as const;
    expect(reduceEvolution(final, { type: 'tap' }, count)).toEqual(final);
    expect(reduceEvolution(final, { type: 'reset' }, count)).toEqual({ index: 0, status: 'idle' });
  });

  it('returns to idle when the next asset fails', () => {
    const count = captions.length;
    const loading = reduceEvolution(createEvolutionState(), { type: 'tap' }, count);
    expect(reduceEvolution(loading, { type: 'load-failure' }, count)).toEqual({
      index: 0,
      status: 'idle',
    });
  });

  it('supports a single stage without wrapping', () => {
    const state = createEvolutionState();
    expect(isFinalStage(0, 1)).toBe(true);
    expect(reduceEvolution(state, { type: 'tap' }, 1)).toEqual(state);
    expect(reduceEvolution(state, { type: 'reset' }, 1)).toEqual(state);
  });
});
