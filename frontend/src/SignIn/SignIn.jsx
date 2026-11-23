import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from '../SignUp/SignUp.module.css';
import { ROUTES } from '../routes';

// Reuses the SignUp layout/styles so both auth screens look identical.
const SignIn = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(ROUTES.dashboard);
  };

  return (
    <div className={styles.container}>
      <div className={styles.promoPanel}>
        <div className={styles.logoContainer}>
          <span className={styles.logoIcon}>✦</span>
          <span className={styles.logoText}>US University Match</span>
        </div>
        <div className={styles.promoContent}>
          <h1 className={styles.headline}>З поверненням!</h1>
          <p className={styles.subheadline}>
            Увійди, щоб побачити свій персональний список Reach, Target і Likely
          </p>
        </div>
      </div>

      <div className={styles.formPanel}>
        <div className={styles.formContainer}>
          <h2 className={styles.formTitle}>Вхід</h2>
          <p className={styles.formSubtitle}>Введи email і пароль від свого акаунта</p>

          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.fieldGroup}>
              <label htmlFor="signin-email" className={styles.label}>Email</label>
              <input
                id="signin-email"
                type="email"
                className={styles.input}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className={styles.fieldGroup}>
              <label htmlFor="signin-password" className={styles.label}>Пароль</label>
              <input
                id="signin-password"
                type="password"
                className={styles.input}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button type="submit" className={styles.submitButton}>Увійти</button>
          </form>

          <div className={styles.footerLink}>
            <Link to={ROUTES.signUp}>Ще немає акаунта? Створити</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
