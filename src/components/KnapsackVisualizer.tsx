import { KnapsackState } from '../algorithms/knapsack';
import { VisualizerProps } from '../core/types';

export function KnapsackVisualizer({ steps, currentStep }: VisualizerProps<KnapsackState>) {
  const state = steps[currentStep]?.state;

  if (!state) return null;

  const { dp, items, capacity, currentRow, currentCol } = state;

  return (
    <div className="p-4">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-white mb-2">Items</h3>
        <div className="flex gap-2">
          {items.map((item, i) => (
            <div
              key={i}
              className={`p-3 rounded ${
                currentRow === i + 1 ? 'bg-blue-600' : 'bg-gray-700'
              } text-white`}
            >
              <div>W: {item.weight}</div>
              <div>V: {item.value}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="overflow-x-auto">
        <h3 className="text-lg font-semibold text-white mb-2">DP Table</h3>
        <table className="border-collapse">
          <thead>
            <tr>
              <th className="border border-gray-600 px-3 py-2 bg-gray-800 text-white">
                Item
              </th>
              {Array.from({ length: capacity + 1 }, (_, i) => (
                <th
                  key={i}
                  className="border border-gray-600 px-3 py-2 bg-gray-800 text-white"
                >
                  {i}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {dp.map((row, i) => (
              <tr key={i}>
                <td className="border border-gray-600 px-3 py-2 bg-gray-700 text-white">
                  {i}
                </td>
                {row.map((val, j) => (
                  <td
                    key={j}
                    className={`border border-gray-600 px-3 py-2 ${
                      currentRow === i && currentCol === j
                        ? 'bg-green-600'
                        : 'bg-gray-800'
                    } text-white text-center`}
                  >
                    {val}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
