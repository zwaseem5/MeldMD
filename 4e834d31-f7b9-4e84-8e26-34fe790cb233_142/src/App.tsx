import { BrowserRouter } from 'react-router-dom';
import { useRoutes } from 'react-router-dom';
import { useState, useEffect } from 'react';
import routes from './router/config';
import SiteHeader from './components/feature/SiteHeader';
import Footer from './components/feature/Footer';
import BackToTop from './components/feature/BackToTop';
import AuthProvider from './components/feature/AuthProvider';
import PageTransition from './components/feature/PageTransition';
import LoadingAnimation from './components/feature/LoadingAnimation';

function AppRoutes() {
  const element = useRoutes(routes);
  return <PageTransition>{element}</PageTransition>;
}

function App() {
  const [showLoading, setShowLoading] = useState(true);
  const [hasShownInitialLoading, setHasShownInitialLoading] = useState(false);

  useEffect(() => {
    const hasVisited = sessionStorage.getItem('hasVisitedSite');
    if (!hasVisited) {
      sessionStorage.setItem('hasVisitedSite', 'true');
      setHasShownInitialLoading(true);
    } else {
      setShowLoading(false);
    }
  }, []);

  const handleLoadingComplete = () => setShowLoading(false);

  if (showLoading && hasShownInitialLoading) {
    return <LoadingAnimation onComplete={handleLoadingComplete} />;
  }

  return (
    <BrowserRouter basename={import.meta.env.BASE_URL ?? '/'}>
      <AuthProvider>
        <div className="min-h-screen bg-white">
          <SiteHeader />
          <main>
            <AppRoutes />
          </main>
          <Footer />
          <BackToTop />
        </div>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
