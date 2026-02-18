import { AlgorithmProblem, AlgorithmStep } from '../core/types';

interface KnapsackInput {
  weights: number[];
  values: number[];
  capacity: number;
}

export interface KnapsackState {
  dp: number[][];
  items: { weight: number; value: number }[];
  capacity: number;
  currentRow?: number;
  currentCol?: number;
  maxValue?: number;
}

export class KnapsackProblem implements AlgorithmProblem<KnapsackInput, KnapsackState> {
  id = 'knapsack';
  name = '0/1 Knapsack';
  description = 'Dynamic programming solution to the 0/1 knapsack problem';
  category = 'Dynamic Programming';

  getInitialInput(): KnapsackInput {
    return {
      weights: [2, 3, 4, 5],
      values: [3, 4, 5, 6],
      capacity: 8,
    };
  }

  solve(input: KnapsackInput): AlgorithmStep<KnapsackState>[] {
    const { weights, values, capacity } = input;
    const n = weights.length;
    const dp: number[][] = Array(n + 1)
      .fill(0)
      .map(() => Array(capacity + 1).fill(0));

    const steps: AlgorithmStep<KnapsackState>[] = [];
    const items = weights.map((w, i) => ({ weight: w, value: values[i] }));

    steps.push({
      id: 0,
      state: { dp: JSON.parse(JSON.stringify(dp)), items, capacity },
      description: 'Initialize DP table with zeros',
    });

    let stepId = 1;

    for (let i = 1; i <= n; i++) {
      for (let w = 0; w <= capacity; w++) {
        if (weights[i - 1] <= w) {
          dp[i][w] = Math.max(
            values[i - 1] + dp[i - 1][w - weights[i - 1]],
            dp[i - 1][w]
          );
          
          steps.push({
            id: stepId++,
            state: {
              dp: JSON.parse(JSON.stringify(dp)),
              items,
              capacity,
              currentRow: i,
              currentCol: w,
            },
            description: `Item ${i}: weight=${weights[i - 1]}, value=${values[i - 1]}. Capacity ${w}: max(include, exclude) = ${dp[i][w]}`,
          });
        } else {
          dp[i][w] = dp[i - 1][w];
          
          steps.push({
            id: stepId++,
            state: {
              dp: JSON.parse(JSON.stringify(dp)),
              items,
              capacity,
              currentRow: i,
              currentCol: w,
            },
            description: `Item ${i}: weight=${weights[i - 1]} > capacity ${w}, skip item`,
          });
        }
      }
    }

    steps.push({
      id: stepId++,
      state: {
        dp: JSON.parse(JSON.stringify(dp)),
        items,
        capacity,
        maxValue: dp[n][capacity],
      },
      description: `Maximum value achievable: ${dp[n][capacity]}`,
    });

    return steps;
  }
}
