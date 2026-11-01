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
    <main className={styles.container}>
      {/* Left Column: Promo/Info Panel */}
      <section className={styles.promoPanel} aria-label="Інформаційна панель">
        <div className={styles.logoContainer}>
          <div className={styles.logoIcon} aria-hidden="true">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path
                d="M12 3L14.2 8.8L20 11L14.2 13.2L12 19L9.8 13.2L4 11L9.8 8.8L12 3Z"
                stroke="#60A5FA"
                strokeWidth="1.8"
                strokeLinejoin="round"
              />
              <circle cx="18.5" cy="5.5" r="1.5" fill="#93C5FD" />
            </svg>
          </div>
          <span className={styles.logoText}>US University Match</span>
        </div>

        <div className={styles.promoContent}>
          <h1 className={styles.headline}>
            Знайди університети США, які справді підходять тобі
          </h1>
          <p className={styles.subheadline}>
            Введи профіль один раз — отримай персональний список Reach, Target і Likely з поясненням.
          </p>

          <div className={styles.cardContainer}>
            {/* Card 1: Lakeview University 91% */}
            <article className={`${styles.card} ${styles.cardFirst}`}>
              <div className={styles.ringWrap}>
                <svg className={styles.ringSvg} viewBox="0 0 48 48">
                  <circle className={styles.ringBg} cx="24" cy="24" r="19" />
                  <circle
                    className={styles.ringProgress}
                    cx="24"
                    cy="24"
                    r="19"
                    strokeDasharray="119.38"
                    strokeDashoffset="10.74"
                  />
                </svg>
                <span className={styles.ringLabel}>91%</span>
              </div>
              <div className={styles.cardInfo}>
                <h3>Lakeview University</h3>
                <p>Chicago, IL · Target</p>
              </div>
            </article>

            {/* Card 2: Summit State 88% */}
            <article className={`${styles.card} ${styles.cardSecond}`}>
              <div className={styles.ringWrap}>
                <svg className={styles.ringSvg} viewBox="0 0 48 48">
                  <circle className={styles.ringBg} cx="24" cy="24" r="19" />
                  <circle
                    className={styles.ringProgress}
                    cx="24"
                    cy="24"
                    r="19"
                    strokeDasharray="119.38"
                    strokeDashoffset="14.32"
                  />
                </svg>
                <span className={styles.ringLabel}>88%</span>
              </div>
              <div className={styles.cardInfo}>
                <h3>Summit State</h3>
                <p>Denver, CO · Likely</p>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* Right Column: Registration Form */}
      <section className={styles.formSection}>
        <div className={styles.formWrapper}>
          <h2 className={styles.formTitle}>Створи акаунт</h2>
          <p className={styles.formSubtitle}>
            Профіль на 3 кроки — і ти отримаєш перші матчі
          </p>

          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.fieldGroup}>
              <label className={styles.label} htmlFor="signup-name">
                Ім'я
              </label>
              <input
                id="signup-name"
                type="text"
                className={styles.input}
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className={styles.fieldGroup}>
              <label className={styles.label} htmlFor="signup-email">
                Email
              </label>
              <input
                id="signup-email"
                type="email"
                className={styles.input}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className={styles.fieldGroup}>
              <label className={styles.label} htmlFor="signup-password">
                Пароль
              </label>
              <input
                id="signup-password"
                type="password"
                className={styles.input}
                placeholder="Мінімум 8 символів"
                minLength={8}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button type="submit" className={styles.submitButton}>
              Створити акаунт
            </button>
          </form>

          <p className={styles.footerLink}>
            Вже є акаунт? <a href="#signin">Увійти</a>
          </p>
        </div>
      </section>
    </main>
  );
};

export default SignUp;