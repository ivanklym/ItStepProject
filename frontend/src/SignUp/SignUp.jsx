import React, { useState } from 'react';
import styles from './SignUp.module.css';

const SignUp = () => {
  const [name, setName] = useState('Leo');
  const [email, setEmail] = useState('leo@example.com');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className={styles.container}>
      <div className={styles.promoPanel}>
        <div className={styles.logoContainer}>
          <span className={styles.logoIcon}>✦</span>
          <span className={styles.logoText}>US University Match</span>
        </div>
        <div className={styles.promoContent}>
          <h1 className={styles.headline}>
            Знайди університети США, які справді підходять тобі
          </h1>
          <p className={styles.subheadline}>
            Введи профіль один раз — отримай персональний список Reach, Target і Likely з поясненням
          </p>

          <div className={styles.cardContainer}>
            <div className={styles.card}>
              <div className={styles.cardInfo}>
                <h3 className={styles.cardTitle}>Lakeview University</h3>
                <p className={styles.cardSubtitle}>Chicago, IL • Target</p>
              </div>
              <div className={styles.cardScore}>91%</div>
            </div>

            <div className={styles.card}>
              <div className={styles.cardInfo}>
                <h3 className={styles.cardTitle}>Summit State</h3>
                <p className={styles.cardSubtitle}>Denver, CO • Likely</p>
              </div>
              <div className={styles.cardScore}>88%</div>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.formPanel}>
        <div className={styles.formContainer}>
          <h2 className={styles.formTitle}>Створи акаунт</h2>
          <p className={styles.formSubtitle}>
            Профіль на 3 кроки — і ти отримаєш перші матчі
          </p>

          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.fieldGroup}>
              <label htmlFor="name" className={styles.label}>Ім'я</label>
              <input
                id="name"
                type="text"
                className={styles.input}
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className={styles.fieldGroup}>
              <label htmlFor="email" className={styles.label}>Email</label>
              <input
                id="email"
                type="email"
                className={styles.input}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className={styles.fieldGroup}>
              <label htmlFor="password" className={styles.label}>Пароль</label>
              <input
                id="password"
                type="password"
                className={styles.input}
                placeholder="Мінімум 8 символів"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button type="submit" className={styles.submitButton}>
              Створи акаунт
            </button>
          </form>

          <div className={styles.footerLink}>
            <a href="/signin">Вже є акаунт? Увійти</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
