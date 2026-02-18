# Contributing to TSViz

## Adding a New Algorithm

Follow these steps to add a new algorithm visualization:

### 1. Create the Algorithm Implementation

Create a new file in `src/algorithms/` (e.g., `myAlgorithm.ts`):

```typescript
import { AlgorithmProblem, AlgorithmStep } from '../core/types';

interface MyAlgorithmInput {
  // Define input parameters
  data: number[];
}

export interface MyAlgorithmState {
  // Define state for visualization
  currentIndex?: number;
  result?: number;
}

export class MyAlgorithmProblem implements AlgorithmProblem<MyAlgorithmInput, MyAlgorithmState> {
  id = 'my-algorithm';
  name = 'My Algorithm';
  description = 'Brief description of what this algorithm does';
  category = 'Category Name'; // e.g., 'Dynamic Programming', 'Sorting', etc.

  getInitialInput(): MyAlgorithmInput {
    return {
      data: [/* sample data */],
    };
  }

  solve(input: MyAlgorithmInput): AlgorithmStep<MyAlgorithmState>[] {
    const steps: AlgorithmStep<MyAlgorithmState>[] = [];
    let stepId = 0;

    // Initialize
    steps.push({
      id: stepId++,
      state: { /* initial state */ },
      description: 'Initialize the algorithm',
    });

    // Algorithm implementation
    // Add steps as you go through the algorithm
    steps.push({
      id: stepId++,
      state: { /* updated state */ },
      description: 'Describe what this step does',
    });

    return steps;
  }
}
```

### 2. Create the Visualizer Component

Create a new file in `src/components/` (e.g., `MyAlgorithmVisualizer.tsx`):

```typescript
import { MyAlgorithmState } from '../algorithms/myAlgorithm';
import { VisualizerProps } from '../core/types';

export function MyAlgorithmVisualizer({ steps, currentStep }: VisualizerProps<MyAlgorithmState>) {
  const state = steps[currentStep]?.state;

  // Always check for null/undefined state
  if (!state) return null;

  const { currentIndex, result } = state;

  return (
    <div className="p-4">
      <h3 className="text-lg font-semibold text-white mb-4">
        Visualization Title
      </h3>
      
      {/* Add your visualization here using Tailwind classes */}
      <div className="bg-gray-800 rounded p-4">
        {/* Visualize the algorithm state */}
      </div>
    </div>
  );
}
```

### 3. Register the Algorithm

In `src/App.tsx`, import and register your algorithm:

```typescript
import { MyAlgorithmProblem } from './algorithms/myAlgorithm';

// In the component, before the return statement:
registry.register(new MyAlgorithmProblem());
```

### 4. Add the Visualizer Mapping

In `src/pages/ProblemPage.tsx`, add your visualizer to the map:

```typescript
import { MyAlgorithmVisualizer } from '../components/MyAlgorithmVisualizer';

const visualizerMap: Record<string, React.ComponentType<VisualizerProps>> = {
  // ... existing visualizers
  'my-algorithm': MyAlgorithmVisualizer as React.ComponentType<VisualizerProps>,
};
```

### 5. Add Tests

Create or update test files in `src/__tests__/`:

```typescript
describe('My Algorithm', () => {
  it('should generate steps correctly', () => {
    const problem = new MyAlgorithmProblem();
    const input = problem.getInitialInput();
    const steps = problem.solve(input);
    
    expect(steps.length).toBeGreaterThan(0);
    expect(steps[0].description).toContain('Initialize');
  });
});
```

### 6. Verify

Run the following commands to ensure everything works:

```bash
npm run lint
npm run typecheck
npm run test
npm run build
npm run dev  # Test manually in browser
```

## Styling Guidelines

- Use Tailwind CSS classes for all styling
- Follow the dark theme: `bg-gray-900`, `bg-gray-800`, `text-white`
- Use semantic colors: `bg-blue-600` for primary actions, `bg-green-600` for success, `bg-red-600` for errors
- Ensure responsive design with grid layouts

## Best Practices

1. **State Safety**: Always check for null/undefined states in visualizers
2. **Step Descriptions**: Make them clear and educational
3. **Deep Cloning**: Use `JSON.parse(JSON.stringify())` for complex state objects to avoid mutation
4. **Type Safety**: Define clear TypeScript interfaces for Input and State
5. **Testing**: Add unit tests for algorithm logic

## Pull Request Process

1. Ensure all CI checks pass (lint, typecheck, test, build)
2. Add screenshots showing the new visualization
3. Update README.md if adding new categories
4. Get code review approval
