import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { token } from '../config/token.ts';
import type { TokenConfig } from '../types/token.ts';
import { EvolutionHero } from './EvolutionHero.tsx';

const captions = token.evolution.map((stage) => stage.caption);
const files = token.evolution.map((stage) => stage.image.split('/').pop());

function oneStageToken(): TokenConfig {
  return {
    ...token,
    evolution: [token.evolution[0]!],
    memeStats: [{ label: 'Evolution Stages', source: 'stageCount', value: '1' }],
  };
}

function caption(text: string) {
  return screen.getByText(text, { selector: '.caption' });
}

describe('EvolutionHero', () => {
  it('advances one stage per accepted tap and resets to CAT', async () => {
    const user = userEvent.setup();
    const preload = vi.fn(async () => true);
    render(<EvolutionHero token={token} preload={preload} transitionMs={0} reducedMotion={false} />);

    expect(caption(captions[0]!)).toBeInTheDocument();
    expect(screen.getByRole('img').getAttribute('src')).toContain(files[0]);
    expect(document.querySelectorAll('.marks li')).toHaveLength(7);

    for (let step = 1; step < captions.length; step += 1) {
      await user.click(screen.getByRole('button', { name: /Evolve to the next stage/ }));
      expect(await screen.findByText(captions[step]!, { selector: '.caption' })).toBeInTheDocument();
      expect(screen.getByRole('img').getAttribute('src')).toContain(files[step]);
      expect(document.querySelectorAll('.marks li.is-on')).toHaveLength(step + 1);
    }

    expect(screen.getByText(token.finalLabel)).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /Evolve to the next stage/ })).not.toBeInTheDocument();
    await user.click(screen.getByRole('img'));
    expect(caption(captions[6]!)).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: token.strings.reset }));
    expect(await screen.findByText(captions[0]!, { selector: '.caption' })).toBeInTheDocument();
    expect(screen.getByText(token.interactionLabel)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Evolve to the next stage/ })).toHaveFocus();
  });

  it('ignores repeated taps until the current advance finishes', async () => {
    const user = userEvent.setup();
    let resolveLoad: ((ok: boolean) => void) | undefined;
    const preload = vi.fn(
      () =>
        new Promise<boolean>((resolve) => {
          resolveLoad = resolve;
        }),
    );
    render(<EvolutionHero token={token} preload={preload} transitionMs={0} reducedMotion={false} />);

    const button = screen.getByRole('button', { name: /Evolve to the next stage/ });
    await user.click(button);
    await user.click(button);
    expect(preload).toHaveBeenCalledTimes(1);
    expect(caption(captions[0]!)).toBeInTheDocument();
    expect(screen.getByText(token.strings.imageLoading)).toBeInTheDocument();
    expect(button).toHaveAttribute('aria-busy', 'true');

    resolveLoad?.(true);
    expect(await screen.findByText(captions[1]!, { selector: '.caption' })).toBeInTheDocument();
    expect(screen.queryByText(captions[2]!)).not.toBeInTheDocument();
  });

  it('does not freeze when the next image fails', async () => {
    const user = userEvent.setup();
    let failNext = true;
    const preload = vi.fn(async (url: string) => {
      if (failNext && url.includes('hsichonk-evolution-02-chonk.png')) return false;
      return true;
    });
    render(<EvolutionHero token={token} preload={preload} transitionMs={0} reducedMotion={false} />);

    await user.click(screen.getByRole('button', { name: /Evolve to the next stage/ }));
    expect(await screen.findByText('Artwork unavailable (hsichonk-evolution-02-chonk.png)')).toBeInTheDocument();
    expect(caption(captions[0]!)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Evolve to the next stage/ })).toHaveAttribute('aria-busy', 'false');

    failNext = false;
    await user.click(screen.getByRole('button', { name: /Evolve to the next stage/ }));
    expect(await screen.findByText(captions[1]!, { selector: '.caption' })).toBeInTheDocument();
  });

  it('shows a fallback when the current image fails and keeps the frame', () => {
    render(<EvolutionHero token={token} preload={async () => true} transitionMs={0} reducedMotion={false} />);
    fireEvent.error(screen.getByRole('img'));
    expect(screen.getByText('Artwork unavailable')).toBeInTheDocument();
    expect(screen.getByText('hsichonk-evolution-01-cat.png')).toBeInTheDocument();
    expect(document.querySelector('.hero-stage')).toBeTruthy();
  });

  it('does not evolve when the instruction text is clicked', async () => {
    const user = userEvent.setup();
    const preload = vi.fn(async () => true);
    render(<EvolutionHero token={token} preload={preload} transitionMs={0} reducedMotion={false} />);
    await user.click(screen.getByText(token.interactionLabel));
    expect(preload).not.toHaveBeenCalled();
    expect(caption(captions[0]!)).toBeInTheDocument();
  });

  it('advances with Enter and Space', async () => {
    const user = userEvent.setup();
    render(<EvolutionHero token={token} preload={async () => true} transitionMs={0} reducedMotion={false} />);
    const button = screen.getByRole('button', { name: /Evolve to the next stage/ });
    button.focus();
    await user.keyboard('{Enter}');
    expect(await screen.findByText(captions[1]!, { selector: '.caption' })).toBeInTheDocument();
    await user.keyboard(' ');
    expect(await screen.findByText(captions[2]!, { selector: '.caption' })).toBeInTheDocument();
  });

  it('changes stage immediately when reduced motion is requested', async () => {
    const user = userEvent.setup();
    const { container } = render(
      <EvolutionHero token={token} preload={async () => true} reducedMotion />,
    );
    await user.click(screen.getByRole('button', { name: /Evolve to the next stage/ }));
    expect(await screen.findByText(captions[1]!, { selector: '.caption' })).toBeInTheDocument();
    expect(container.querySelector('.fx-flicker')).toBeNull();
    expect(container.querySelector('.is-reduced')).toBeTruthy();
  });

  it('treats a one-stage token as already final', async () => {
    const user = userEvent.setup();
    const preload = vi.fn(async () => true);
    render(
      <EvolutionHero token={oneStageToken()} preload={preload} transitionMs={0} reducedMotion={false} />,
    );
    expect(screen.getByText(token.finalLabel)).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /Evolve to the next stage/ })).not.toBeInTheDocument();
    expect(document.querySelectorAll('.marks li')).toHaveLength(1);
    await user.click(screen.getByRole('button', { name: token.strings.reset }));
    expect(caption(captions[0]!)).toBeInTheDocument();
    expect(preload).not.toHaveBeenCalled();
  });
});
