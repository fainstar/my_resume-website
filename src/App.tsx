import React, { useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, useRoutes } from 'react-router-dom';

import ErrorBoundary from './components/common/ErrorBoundary';
import { routes } from './routes/LazyRoutes';
import { initPerformanceMonitoring } from './utils/performance';

const AppRoutes: React.FC = () => {
  const routeElement = useRoutes(routes);
  return <ErrorBoundary>{routeElement}</ErrorBoundary>;
};

function App() {
  useEffect(() => {
    initPerformanceMonitoring();

    if (!('IntersectionObserver' in window)) {
      import('intersection-observer');
    }
  }, []);

  return (
    <ErrorBoundary>
      <Router>
        <AppRoutes />
      </Router>
    </ErrorBoundary>
  );
}

export default App;
