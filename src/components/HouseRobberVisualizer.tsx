import { HouseRobberState } from '../algorithms/houseRobber';
import { VisualizerProps } from '../core/types';

export function HouseRobberVisualizer({ steps, currentStep }: VisualizerProps<HouseRobberState>) {
  const state = steps[currentStep]?.state;

  if (!state) return null;

  const { houses, dp, currentIndex } = state;

  return (
    <div className="p-4">
      <h3 className="text-lg font-semibold text-white mb-4">Houses</h3>
      <div className="flex gap-4 mb-8">
        {houses.map((value, i) => (
          <div key={i} className="text-center">
            <div
              className={`w-20 h-24 flex items-center justify-center rounded ${
                currentIndex === i
                  ? 'bg-green-600'
                  : dp[i] > (dp[i - 1] || 0)
                  ? 'bg-blue-600'
                  : 'bg-gray-700'
              } text-white font-bold text-xl border-4 border-gray-600`}
            >
              ${value}
            </div>
            <div className="mt-2 text-white text-sm">House {i}</div>
            {dp[i] > 0 && (
              <div className="mt-1 text-green-400 text-xs">Max: ${dp[i]}</div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-6">
        <h3 className="text-lg font-semibold text-white mb-2">DP Array</h3>
        <div className="flex gap-2">
          {dp.map((val, i) => (
            <div
              key={i}
              className={`p-3 rounded ${
                currentIndex === i ? 'bg-green-600' : 'bg-gray-800'
              } text-white border border-gray-600 text-center`}
            >
              <div className="text-xs text-gray-400">dp[{i}]</div>
              <div className="text-lg font-bold">${val}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
