import { Link } from 'react-router-dom';
import { registry } from '../core/registry';

export function HomePage() {
  const problems = registry.getAll();
  const categories = Array.from(new Set(problems.map(p => p.category)));

  return (
    <div className="min-h-screen bg-gray-900 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-2">TSViz</h1>
        <p className="text-gray-400 mb-8">
          Interactive Algorithm Visualizations
        </p>

        {categories.map(category => {
          const categoryProblems = registry.getByCategory(category);
          return (
            <div key={category} className="mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4">
                {category}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {categoryProblems.map(problem => (
                  <Link
                    key={problem.id}
                    to={`/problem/${problem.id}`}
                    className="bg-gray-800 p-6 rounded-lg hover:bg-gray-700 transition-colors"
                  >
                    <h3 className="text-xl font-semibold text-white mb-2">
                      {problem.name}
                    </h3>
                    <p className="text-gray-400 text-sm">
                      {problem.description}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          );
        })}

        {problems.length === 0 && (
          <div className="text-center text-gray-400 py-12">
            <p>No problems registered yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}
