import { useEffect } from 'react';
import { usePlaybackStore } from '../store/playback';

export function PlaybackControls() {
  const {
    currentStep,
    steps,
    isPlaying,
    speed,
    play,
    pause,
    nextStep,
    previousStep,
    reset,
    setSpeed,
  } = usePlaybackStore();

  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      nextStep();
    }, 1000 / speed);

    return () => clearInterval(interval);
  }, [isPlaying, speed, nextStep]);

  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
      <div className="flex items-center gap-4 mb-4">
        <button
          onClick={reset}
          className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded text-white"
        >
          ⏮ Reset
        </button>
        <button
          onClick={previousStep}
          disabled={currentStep === 0}
          className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded text-white disabled:opacity-50"
        >
          ⏪ Previous
        </button>
        <button
          onClick={isPlaying ? pause : play}
          disabled={steps.length === 0}
          className="px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded text-white disabled:opacity-50"
        >
          {isPlaying ? '⏸ Pause' : '▶ Play'}
        </button>
        <button
          onClick={nextStep}
          disabled={currentStep >= steps.length - 1}
          className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded text-white disabled:opacity-50"
        >
          Next ⏩
        </button>
      </div>

      <div className="flex items-center gap-4">
        <label className="text-white">
          Speed: {speed.toFixed(1)}x
        </label>
        <input
          type="range"
          min="0.25"
          max="4"
          step="0.25"
          value={speed}
          onChange={(e) => setSpeed(parseFloat(e.target.value))}
          className="flex-1"
        />
        <div className="text-white">
          Step: {currentStep + 1} / {steps.length}
        </div>
      </div>
    </div>
  );
}
