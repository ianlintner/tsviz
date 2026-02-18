import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { ProblemPage } from './pages/ProblemPage';
import { registry } from './core/registry';
import { KnapsackProblem } from './algorithms/knapsack';
import { CoinChangeProblem } from './algorithms/coinChange';
import { HouseRobberProblem } from './algorithms/houseRobber';
import { ClimbStairsProblem } from './algorithms/climbStairs';
import { StockProfitProblem } from './algorithms/stockProfit';
import './index.css';

// Register all problems
registry.register(new KnapsackProblem());
registry.register(new CoinChangeProblem());
registry.register(new HouseRobberProblem());
registry.register(new ClimbStairsProblem());
registry.register(new StockProfitProblem());

function App() {
  return (
    <BrowserRouter basename="/tsviz">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/problem/:id" element={<ProblemPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
