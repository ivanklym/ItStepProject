import React from 'react';
import Preferences from './pages/Preferences';

function App() {
  const path = window.location.pathname;

  if (path === '/preferences') {
    return <Preferences />;
  }

  return (
    <div style={{ padding: '40px', fontFamily: 'sans-serif' }}>
      <h1>ItStepProject 🚀</h1>
      <p>Проєкт успішно запущено!</p>
      <p>
        Перейдіть на <a href="/preferences">/preferences</a>, щоб переглянути сторінку Preferences.
      </p>
    </div>
  );
}

export default App;