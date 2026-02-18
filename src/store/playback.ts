import { create } from 'zustand';
import { AlgorithmStep } from '../core/types';

interface PlaybackState {
  steps: AlgorithmStep[];
  currentStep: number;
  isPlaying: boolean;
  speed: number;
  
  setSteps: (steps: AlgorithmStep[]) => void;
  setCurrentStep: (step: number) => void;
  nextStep: () => void;
  previousStep: () => void;
  play: () => void;
  pause: () => void;
  reset: () => void;
  setSpeed: (speed: number) => void;
}

export const usePlaybackStore = create<PlaybackState>((set, get) => ({
  steps: [],
  currentStep: 0,
  isPlaying: false,
  speed: 1,
  
  setSteps: (steps) => set({ steps, currentStep: 0, isPlaying: false }),
  
  setCurrentStep: (step) => {
    const { steps } = get();
    if (step >= 0 && step < steps.length) {
      set({ currentStep: step });
    }
  },
  
  nextStep: () => {
    const { currentStep, steps } = get();
    if (currentStep < steps.length - 1) {
      set({ currentStep: currentStep + 1 });
    } else {
      set({ isPlaying: false });
    }
  },
  
  previousStep: () => {
    const { currentStep } = get();
    if (currentStep > 0) {
      set({ currentStep: currentStep - 1 });
    }
  },
  
  play: () => set({ isPlaying: true }),
  pause: () => set({ isPlaying: false }),
  reset: () => set({ currentStep: 0, isPlaying: false }),
  setSpeed: (speed) => set({ speed }),
}));
