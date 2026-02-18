import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { registry } from '../core/registry';
import { usePlaybackStore } from '../store/playback';
import { PlaybackControls } from '../components/PlaybackControls';
import { StepDescription } from '../components/StepDescription';
import { KnapsackVisualizer } from '../components/KnapsackVisualizer';
import { CoinChangeVisualizer } from '../components/CoinChangeVisualizer';
import { HouseRobberVisualizer } from '../components/HouseRobberVisualizer';
import { ClimbStairsVisualizer } from '../components/ClimbStairsVisualizer';
import { StockProfitVisualizer } from '../components/StockProfitVisualizer';

const visualizerMap: Record<string, React.ComponentType<{ steps: unknown[]; currentStep: number }>> = {
  'knapsack': KnapsackVisualizer,
  'coin-change': CoinChangeVisualizer,
  'house-robber': HouseRobberVisualizer,
  'climb-stairs': ClimbStairsVisualizer,
  'stock-profit': StockProfitVisualizer,
};

export function ProblemPage() {
  const { id } = useParams<{ id: string }>();
  const { setSteps, steps, currentStep } = usePlaybackStore();

  const problem = id ? registry.get(id) : undefined;

  useEffect(() => {
    if (problem) {
      const input = problem.getInitialInput();
      const algorithmSteps = problem.solve(input);
      setSteps(algorithmSteps);
    }
  }, [problem, setSteps]);

  if (!problem) {
    return (
      <div className="min-h-screen bg-gray-900 p-8 text-white">
        <h1 className="text-2xl font-bold">Problem not found</h1>
        <Link to="/" className="text-blue-400 hover:underline mt-4 inline-block">
          ← Back to home
        </Link>
      </div>
    );
  }

  const Visualizer = visualizerMap[problem.id];

  return (
    <div className="min-h-screen bg-gray-900 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <Link to="/" className="text-blue-400 hover:underline">
            ← Back to home
          </Link>
        </div>

        <h1 className="text-3xl font-bold text-white mb-2">{problem.name}</h1>
        <p className="text-gray-400 mb-6">{problem.description}</p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="bg-gray-800 rounded-lg p-6 mb-6">
              {Visualizer ? (
                <Visualizer steps={steps} currentStep={currentStep} />
              ) : (
                <div className="text-white">Visualizer not implemented</div>
              )}
            </div>
          </div>

          <div className="space-y-6">
            <PlaybackControls />
            <StepDescription />
          </div>
        </div>
      </div>
    </div>
  );
}
