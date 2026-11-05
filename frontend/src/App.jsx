import React from 'react';
import Header from './Header/Header';
import SignUp from './SignUp/SignUp';

function App() {
  const path = window.location.pathname;

  return (
    <div>
      {path === '/signup' ? (
        <SignUp />
      ) : (
        <>
          <Header />
          <div style={{ padding: '40px' }}>
            <h1>ItStepProject 🚀</h1>
            <p>Проєкт успішно запущено!</p>
            <p>Перейдіть на <a href="/signup">/signup</a>, щоб переглянути сторінку реєстрації.</p>
          </div>
        </>
      )}
    </div>
  );
}

export default App;