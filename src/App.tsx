import React, { Suspense, lazy } from 'react';
import { useUser } from "@clerk/clerk-react";
import ErrorBoundary from './components/ErrorBoundary';
import './App.css';

// Lazy Load Components
const AuthenticatedApp = lazy(() => import('./components/AuthenticatedApp'));
const LandingPage = lazy(() => import('./components/LandingPage'));

const LoadingFallback: React.FC = () => (
  <div className="flex items-center justify-center min-h-screen bg-[#0f172a] text-white">
    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-purple-500"></div>
  </div>
);

const App: React.FC = () => {
  const { isLoaded, isSignedIn } = useUser();

  if (!isLoaded) {
    return <LoadingFallback />;
  }

  return (
    <ErrorBoundary>
      <Suspense fallback={<LoadingFallback />}>
        {isSignedIn ? (
          <AuthenticatedApp />
        ) : (
          <LandingPage />
        )}
      </Suspense>
    </ErrorBoundary>
  );
};

export default App;
