import { describe, it, expect } from 'vitest';
import { registry } from '../core/registry';
import { KnapsackProblem } from '../algorithms/knapsack';
import { CoinChangeProblem } from '../algorithms/coinChange';

describe('Problem Registry', () => {
  it('should register and retrieve problems', () => {
    const testRegistry = registry;
    const knapsack = new KnapsackProblem();
    testRegistry.register(knapsack);
    
    const retrieved = testRegistry.get('knapsack');
    expect(retrieved).toBeDefined();
    expect(retrieved?.id).toBe('knapsack');
  });

  it('should filter problems by category', () => {
    const dpProblems = registry.getByCategory('Dynamic Programming');
    expect(dpProblems.length).toBeGreaterThan(0);
  });
});

describe('Knapsack Algorithm', () => {
  it('should generate steps for knapsack problem', () => {
    const problem = new KnapsackProblem();
    const input = problem.getInitialInput();
    const steps = problem.solve(input);
    
    expect(steps.length).toBeGreaterThan(0);
    expect(steps[0].description).toContain('Initialize');
  });
});

describe('Coin Change Algorithm', () => {
  it('should generate steps for coin change problem', () => {
    const problem = new CoinChangeProblem();
    const input = problem.getInitialInput();
    const steps = problem.solve(input);
    
    expect(steps.length).toBeGreaterThan(0);
    expect(steps[0].description).toContain('Initialize');
  });
});
