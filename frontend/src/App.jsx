import Onboarding from './pages/Onboarding';
import Universities from './pages/Universities';

function App() {
  if (window.location.pathname.replace(/\/$/, '') === '/universities') {
    return <Universities />;
  }

  return <Onboarding />;
}

export default App;
