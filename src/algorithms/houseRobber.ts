import { AlgorithmProblem, AlgorithmStep } from '../core/types';

interface HouseRobberInput {
  houses: number[];
}

export interface HouseRobberState {
  houses: number[];
  dp: number[];
  currentIndex?: number;
  maxMoney?: number;
}

export class HouseRobberProblem implements AlgorithmProblem<HouseRobberInput, HouseRobberState> {
  id = 'house-robber';
  name = 'House Robber';
  description = 'Find maximum money you can rob without robbing adjacent houses';
  category = 'Dynamic Programming';

  getInitialInput(): HouseRobberInput {
    return {
      houses: [2, 7, 9, 3, 1],
    };
  }

  solve(input: HouseRobberInput): AlgorithmStep<HouseRobberState>[] {
    const { houses } = input;
    const n = houses.length;
    if (n === 0) return [];

    const dp = Array(n).fill(0);
    const steps: AlgorithmStep<HouseRobberState>[] = [];

    dp[0] = houses[0];
    steps.push({
      id: 0,
      state: { houses, dp: [...dp], currentIndex: 0 },
      description: `Start: rob house 0 with $${houses[0]}`,
    });

    if (n > 1) {
      dp[1] = Math.max(houses[0], houses[1]);
      steps.push({
        id: 1,
        state: { houses, dp: [...dp], currentIndex: 1 },
        description: `House 1: max($${houses[0]}, $${houses[1]}) = $${dp[1]}`,
      });
    }

    for (let i = 2; i < n; i++) {
      dp[i] = Math.max(dp[i - 1], dp[i - 2] + houses[i]);
      
      steps.push({
        id: i,
        state: { houses, dp: [...dp], currentIndex: i },
        description: `House ${i}: max(skip=$${dp[i - 1]}, rob=$${dp[i - 2] + houses[i]}) = $${dp[i]}`,
      });
    }

    steps.push({
      id: n,
      state: { houses, dp: [...dp], maxMoney: dp[n - 1] },
      description: `Maximum money robbed: $${dp[n - 1]}`,
    });

    return steps;
  }
}
