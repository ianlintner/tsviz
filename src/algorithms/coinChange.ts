import { AlgorithmProblem, AlgorithmStep } from '../core/types';

interface CoinChangeInput {
  coins: number[];
  amount: number;
}

export interface CoinChangeState {
  dp: number[];
  coins: number[];
  amount: number;
  currentAmount?: number;
  currentCoin?: number;
}

export class CoinChangeProblem implements AlgorithmProblem<CoinChangeInput, CoinChangeState> {
  id = 'coin-change';
  name = 'Coin Change';
  description = 'Find minimum coins needed to make change for a given amount';
  category = 'Dynamic Programming';

  getInitialInput(): CoinChangeInput {
    return {
      coins: [1, 2, 5],
      amount: 11,
    };
  }

  solve(input: CoinChangeInput): AlgorithmStep<CoinChangeState>[] {
    const { coins, amount } = input;
    const dp = Array(amount + 1).fill(Infinity);
    dp[0] = 0;

    const steps: AlgorithmStep<CoinChangeState>[] = [];

    steps.push({
      id: 0,
      state: { dp: [...dp], coins, amount },
      description: 'Initialize: 0 coins needed for amount 0, infinity for others',
    });

    let stepId = 1;

    for (let i = 1; i <= amount; i++) {
      for (const coin of coins) {
        if (coin <= i) {
          const newVal = dp[i - coin] + 1;
          if (newVal < dp[i]) {
            dp[i] = newVal;
          }

          steps.push({
            id: stepId++,
            state: {
              dp: [...dp],
              coins,
              amount,
              currentAmount: i,
              currentCoin: coin,
            },
            description: `Amount ${i}, coin ${coin}: min coins = ${dp[i] === Infinity ? '∞' : dp[i]}`,
          });
        }
      }
    }

    steps.push({
      id: stepId++,
      state: { dp: [...dp], coins, amount },
      description: `Minimum coins needed: ${dp[amount] === Infinity ? 'impossible' : dp[amount]}`,
    });

    return steps;
  }
}
