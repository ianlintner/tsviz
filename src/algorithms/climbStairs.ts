import { AlgorithmProblem, AlgorithmStep } from '../core/types';

interface ClimbStairsInput {
  n: number;
}

export interface ClimbStairsState {
  n: number;
  dp: number[];
  currentStair?: number;
  totalWays?: number;
}

export class ClimbStairsProblem implements AlgorithmProblem<ClimbStairsInput, ClimbStairsState> {
  id = 'climb-stairs';
  name = 'Climbing Stairs';
  description = 'Count ways to climb n stairs taking 1 or 2 steps at a time';
  category = 'Dynamic Programming';

  getInitialInput(): ClimbStairsInput {
    return { n: 5 };
  }

  solve(input: ClimbStairsInput): AlgorithmStep<ClimbStairsState>[] {
    const { n } = input;
    const dp = Array(n + 1).fill(0);
    const steps: AlgorithmStep<ClimbStairsState>[] = [];

    dp[0] = 1;
    dp[1] = 1;

    steps.push({
      id: 0,
      state: { n, dp: [...dp], currentStair: 0 },
      description: 'Base case: 1 way to stay at ground (do nothing)',
    });

    steps.push({
      id: 1,
      state: { n, dp: [...dp], currentStair: 1 },
      description: 'Base case: 1 way to reach stair 1 (take 1 step)',
    });

    for (let i = 2; i <= n; i++) {
      dp[i] = dp[i - 1] + dp[i - 2];
      
      steps.push({
        id: i,
        state: { n, dp: [...dp], currentStair: i },
        description: `Stair ${i}: ways = ways[${i - 1}] + ways[${i - 2}] = ${dp[i - 1]} + ${dp[i - 2]} = ${dp[i]}`,
      });
    }

    steps.push({
      id: n + 1,
      state: { n, dp: [...dp], totalWays: dp[n] },
      description: `Total ways to climb ${n} stairs: ${dp[n]}`,
    });

    return steps;
  }
}
