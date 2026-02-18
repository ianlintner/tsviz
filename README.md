# TSViz - Algorithm Visualizer

Interactive visualizations for popular algorithms and data structures.

## Features

- **Core Engine**: Generic algorithm framework with step-by-step recording
- **Playback Controls**: Play, pause, step forward/backward, speed control
- **Multiple Algorithms**: 
  - 0/1 Knapsack
  - Coin Change
  - House Robber
  - Climbing Stairs
  - Stock Profit
  - And more...

## Development

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Run tests
npm test

# Lint code
npm run lint

# Type check
npm run typecheck
```

## Architecture

- **Vite + React + TypeScript**: Fast development and type safety
- **Tailwind CSS**: Modern, dark-themed UI
- **React Router**: Client-side routing
- **Zustand**: Lightweight state management
- **Vitest**: Unit testing

## Adding New Algorithms

1. Create algorithm file in `src/algorithms/`
2. Implement `AlgorithmProblem<TInput, TState>` interface
3. Create visualizer component in `src/components/`
4. Register in `src/App.tsx`

## CI/CD

- **CI**: Runs on all pushes and PRs
  - Linting
  - Type checking
  - Tests
  - Build validation
  
- **GitHub Pages**: Auto-deploys on main branch
  - Accessible at https://ianlintner.github.io/tsviz/

## License

MIT
