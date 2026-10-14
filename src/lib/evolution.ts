export type EvolutionStatus = 'idle' | 'loading' | 'fading';

export type EvolutionState = {
  index: number;
  status: EvolutionStatus;
};

export type EvolutionAction =
  | { type: 'tap' }
  | { type: 'load-success' }
  | { type: 'load-failure' }
  | { type: 'transition-end' }
  | { type: 'cancel' }
  | { type: 'reset' };

export function createEvolutionState(): EvolutionState {
  return { index: 0, status: 'idle' };
}

export function isFinalStage(index: number, stageCount: number): boolean {
  return stageCount > 0 && index >= stageCount - 1;
}

export function reduceEvolution(
  state: EvolutionState,
  action: EvolutionAction,
  stageCount: number,
): EvolutionState {
  const last = Math.max(0, stageCount - 1);

  switch (action.type) {
    case 'tap':
      if (state.status !== 'idle' || state.index >= last) return state;
      return { ...state, status: 'loading' };
    case 'load-success':
      if (state.status !== 'loading') return state;
      return { ...state, status: 'fading' };
    case 'load-failure':
      if (state.status !== 'loading') return state;
      return { ...state, status: 'idle' };
    case 'transition-end':
      if (state.status !== 'fading' && state.status !== 'loading') return state;
      return { index: Math.min(last, state.index + 1), status: 'idle' };
    case 'cancel':
      if (state.status === 'idle') return state;
      return { ...state, status: 'idle' };
    case 'reset':
      return createEvolutionState();
    default:
      return state;
  }
}
