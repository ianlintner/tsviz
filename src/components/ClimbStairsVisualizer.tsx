import { ClimbStairsState } from '../algorithms/climbStairs';
import { VisualizerProps } from '../core/types';

export function ClimbStairsVisualizer({ steps, currentStep }: VisualizerProps<ClimbStairsState>) {
  const state = steps[currentStep]?.state;

  if (!state) return null;

  const { n, dp, currentStair } = state;

  return (
    <div className="p-4">
      <h3 className="text-lg font-semibold text-white mb-4">
        Staircase (n = {n})
      </h3>

      <div className="mb-8">
        <div className="flex flex-col-reverse items-start gap-1">
          {Array.from({ length: n + 1 }, (_, i) => (
            <div key={i} className="flex items-center gap-2">
              <div
                className={`w-32 h-12 flex items-center justify-center rounded ${
                  currentStair === i ? 'bg-green-600' : 'bg-gray-700'
                } text-white font-bold border-2 border-gray-600`}
                style={{ marginLeft: `${i * 20}px` }}
              >
                Stair {i}
              </div>
              {dp[i] > 0 && (
                <div className="text-yellow-400 font-bold">
                  {dp[i]} {dp[i] === 1 ? 'way' : 'ways'}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6">
        <h3 className="text-lg font-semibold text-white mb-2">DP Array</h3>
        <div className="flex gap-2 flex-wrap">
          {dp.map((val, i) => (
            <div
              key={i}
              className={`p-3 rounded ${
                currentStair === i ? 'bg-green-600' : 'bg-gray-800'
              } text-white border border-gray-600 text-center`}
            >
              <div className="text-xs text-gray-400">dp[{i}]</div>
              <div className="text-lg font-bold">{val}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
