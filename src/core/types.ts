export interface AlgorithmStep<TState = unknown> {
  id: number;
  state: TState;
  description: string;
  highlight?: string[];
}

export interface AlgorithmProblem<TInput = unknown, TState = unknown> {
  id: string;
  name: string;
  description: string;
  category: string;
  
  getInitialInput(): TInput;
  solve(input: TInput): AlgorithmStep<TState>[];
}

export interface VisualizerProps<TState = unknown> {
  steps: AlgorithmStep<TState>[];
  currentStep: number;
}
