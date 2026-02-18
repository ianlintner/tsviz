import { StockProfitState } from '../algorithms/stockProfit';
import { VisualizerProps } from '../core/types';

export function StockProfitVisualizer({ steps, currentStep }: VisualizerProps<StockProfitState>) {
  const state = steps[currentStep]?.state;

  if (!state) return null;

  const { prices, buyDay, sellDay, maxProfit, currentDay } = state;
  const maxPrice = Math.max(...prices);

  return (
    <div className="p-4">
      <h3 className="text-lg font-semibold text-white mb-4">
        Stock Prices - Max Profit: ${maxProfit}
      </h3>

      <div className="relative h-64 bg-gray-800 rounded p-4">
        <div className="flex items-end justify-around h-full">
          {prices.map((price, i) => {
            const height = (price / maxPrice) * 100;
            const isBuyDay = buyDay === i;
            const isSellDay = sellDay === i;
            const isCurrent = currentDay === i;

            return (
              <div key={i} className="flex flex-col items-center flex-1">
                <div className="relative w-full flex justify-center">
                  <div
                    className={`w-8 ${
                      isBuyDay
                        ? 'bg-green-600'
                        : isSellDay
                        ? 'bg-blue-600'
                        : isCurrent
                        ? 'bg-yellow-600'
                        : 'bg-gray-600'
                    } rounded-t transition-all`}
                    style={{ height: `${height}%` }}
                  >
                    <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-white text-xs">
                      ${price}
                    </div>
                  </div>
                </div>
                <div className="text-white text-xs mt-1">Day {i}</div>
                {isBuyDay && (
                  <div className="text-green-400 text-xs">Buy</div>
                )}
                {isSellDay && (
                  <div className="text-blue-400 text-xs">Sell</div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-4">
        <div className="bg-green-700 p-3 rounded text-white">
          <div className="text-xs">Buy Day</div>
          <div className="text-lg font-bold">
            {buyDay !== undefined ? `Day ${buyDay}` : '-'}
          </div>
        </div>
        <div className="bg-blue-700 p-3 rounded text-white">
          <div className="text-xs">Sell Day</div>
          <div className="text-lg font-bold">
            {sellDay !== undefined ? `Day ${sellDay}` : '-'}
          </div>
        </div>
        <div className="bg-purple-700 p-3 rounded text-white">
          <div className="text-xs">Max Profit</div>
          <div className="text-lg font-bold">${maxProfit}</div>
        </div>
      </div>
    </div>
  );
}
