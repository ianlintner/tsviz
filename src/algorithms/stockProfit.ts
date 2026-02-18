import { AlgorithmProblem, AlgorithmStep } from '../core/types';

interface StockProfitInput {
  prices: number[];
}

export interface StockProfitState {
  prices: number[];
  buyDay?: number;
  sellDay?: number;
  maxProfit: number;
  currentDay?: number;
}

export class StockProfitProblem implements AlgorithmProblem<StockProfitInput, StockProfitState> {
  id = 'stock-profit';
  name = 'Best Time to Buy/Sell Stock';
  description = 'Find maximum profit from buying and selling stock once';
  category = 'Array';

  getInitialInput(): StockProfitInput {
    return {
      prices: [7, 1, 5, 3, 6, 4],
    };
  }

  solve(input: StockProfitInput): AlgorithmStep<StockProfitState>[] {
    const { prices } = input;
    const steps: AlgorithmStep<StockProfitState>[] = [];

    let minPrice = Infinity;
    let maxProfit = 0;
    let buyDay = 0;
    let sellDay = 0;

    steps.push({
      id: 0,
      state: { prices, maxProfit: 0 },
      description: 'Start: no transactions yet',
    });

    for (let i = 0; i < prices.length; i++) {
      if (prices[i] < minPrice) {
        minPrice = prices[i];
        buyDay = i;
        
        steps.push({
          id: i + 1,
          state: { prices, buyDay, sellDay, maxProfit, currentDay: i },
          description: `Day ${i}: New minimum price $${prices[i]} - potential buy day`,
        });
      } else if (prices[i] - minPrice > maxProfit) {
        maxProfit = prices[i] - minPrice;
        sellDay = i;
        
        steps.push({
          id: i + 1,
          state: { prices, buyDay, sellDay, maxProfit, currentDay: i },
          description: `Day ${i}: Sell at $${prices[i]} (bought at $${minPrice}) - profit $${maxProfit}`,
        });
      } else {
        steps.push({
          id: i + 1,
          state: { prices, buyDay, sellDay, maxProfit, currentDay: i },
          description: `Day ${i}: Price $${prices[i]} - no better profit`,
        });
      }
    }

    steps.push({
      id: prices.length + 1,
      state: { prices, buyDay, sellDay, maxProfit },
      description: `Maximum profit: $${maxProfit} (buy day ${buyDay}, sell day ${sellDay})`,
    });

    return steps;
  }
}
