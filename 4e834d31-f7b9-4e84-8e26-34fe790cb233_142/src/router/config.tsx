
import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';

// Lazy load components
const Home = lazy(() => import('../pages/home/page'));
const About = lazy(() => import('../pages/about/page'));
const Contact = lazy(() => import('../pages/contact/page'));
const Schedule = lazy(() => import('../pages/schedule/page'));
const Solutions = lazy(() => import('../pages/solutions/page'));
const Telehealth = lazy(() => import('../pages/telehealth/page'));
const Medications = lazy(() => import('../pages/medications/page'));
const Wellness = lazy(() => import('../pages/wellness/page'));
const Providers = lazy(() => import('../pages/providers/page'));
const MeldHealth = lazy(() => import('../pages/meld-health/page'));
const MeldCreative = lazy(() => import('../pages/meld-creative/page'));
const MedGame = lazy(() => import('../pages/medgame/page'));
const Profile = lazy(() => import('../pages/profile/page'));
const PrivacyPolicy = lazy(() => import('../pages/legal/privacy/page'));
const TermsOfService = lazy(() => import('../pages/legal/terms/page'));
const NotFound = lazy(() => import('../pages/NotFound'));

const routes: RouteObject[] = [
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/about',
    element: <About />
  },
  {
    path: '/contact',
    element: <Contact />
  },
  {
    path: '/schedule',
    element: <Schedule />
  },
  {
    path: '/solutions',
    element: <Solutions />
  },
  {
    path: '/telehealth',
    element: <Telehealth />
  },
  {
    path: '/medications',
    element: <Medications />
  },
  {
    path: '/wellness',
    element: <Wellness />
  },
  {
    path: '/providers',
    element: <Providers />
  },
  {
    path: '/meld-health',
    element: <MeldHealth />
  },
  {
    path: '/meld-creative',
    element: <MeldCreative />
  },
  {
    path: '/medgame',
    element: <MedGame />
  },
  {
    path: '/profile',
    element: <Profile />
  },
  {
    path: '/privacy',
    element: <PrivacyPolicy />
  },
  {
    path: '/terms',
    element: <TermsOfService />
  },
  {
    path: '*',
    element: <NotFound />
  }
];

export default routes;