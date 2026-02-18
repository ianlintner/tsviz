import { usePlaybackStore } from '../store/playback';

export function StepDescription() {
  const { steps, currentStep } = usePlaybackStore();
  const step = steps[currentStep];

  if (!step) {
    return (
      <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
        <h3 className="text-lg font-semibold text-white mb-2">Description</h3>
        <p className="text-gray-400">No step selected</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
      <h3 className="text-lg font-semibold text-white mb-2">
        Step {currentStep + 1}
      </h3>
      <p className="text-gray-300">{step.description}</p>
    </div>
  );
}
