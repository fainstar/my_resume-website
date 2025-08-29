import React, { useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, useRoutes } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n/i18n';

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
      <I18nextProvider i18n={i18n}>
        <Router>
          <AppRoutes />
        </Router>
      </I18nextProvider>
    </ErrorBoundary>
  );
}

export default App;
