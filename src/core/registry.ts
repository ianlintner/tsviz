import { AlgorithmProblem } from './types';

class ProblemRegistry {
  private problems: Map<string, AlgorithmProblem> = new Map();

  register(problem: AlgorithmProblem): void {
    this.problems.set(problem.id, problem);
  }

  get(id: string): AlgorithmProblem | undefined {
    return this.problems.get(id);
  }

  getAll(): AlgorithmProblem[] {
    return Array.from(this.problems.values());
  }

  getByCategory(category: string): AlgorithmProblem[] {
    return this.getAll().filter(p => p.category === category);
  }
}

export const registry = new ProblemRegistry();
