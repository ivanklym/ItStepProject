import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { ROUTES } from './routes';
import SignUp from './SignUp/SignUp';
import SignIn from './SignIn/SignIn';
import Onboarding from './pages/Onboarding';
import Dashboard from './pages/Dashboard';

// Router-aware wrapper: the Onboarding page itself stays router-free.
function OnboardingPage() {
  const navigate = useNavigate();
  return <Onboarding onComplete={() => navigate(ROUTES.dashboard)} />;
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to={ROUTES.signUp} replace />} />
      <Route path={ROUTES.signUp} element={<SignUp />} />
      <Route path={ROUTES.signIn} element={<SignIn />} />
      <Route path={ROUTES.onboarding} element={<OnboardingPage />} />
      <Route path={ROUTES.dashboard} element={<Dashboard />} />
      <Route path="*" element={<Navigate to={ROUTES.signUp} replace />} />
    </Routes>
  );
}

export default App;
