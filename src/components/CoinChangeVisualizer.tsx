import { CoinChangeState } from '../algorithms/coinChange';
import { VisualizerProps } from '../core/types';

export function CoinChangeVisualizer({ steps, currentStep }: VisualizerProps<CoinChangeState>) {
  const state = steps[currentStep]?.state;

  if (!state) return null;

  const { dp, coins, amount, currentAmount, currentCoin } = state;

  return (
    <div className="p-4">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-white mb-2">
          Coins: {coins.join(', ')} | Target: {amount}
        </h3>
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-semibold text-white mb-2">Coin Denominations</h3>
        <div className="flex gap-2">
          {coins.map((coin, i) => (
            <div
              key={i}
              className={`p-3 rounded ${
                currentCoin === coin ? 'bg-blue-600' : 'bg-gray-700'
              } text-white font-bold`}
            >
              {coin}
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-white mb-2">Minimum Coins for Each Amount</h3>
        <div className="flex flex-wrap gap-2">
          {dp.map((val, i) => (
            <div
              key={i}
              className={`p-3 rounded ${
                currentAmount === i ? 'bg-green-600' : 'bg-gray-800'
              } text-white border border-gray-600`}
            >
              <div className="text-xs text-gray-400">Amount {i}</div>
              <div className="text-lg font-bold">
                {val === Infinity ? '∞' : val}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
