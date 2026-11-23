import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Dashboard.module.css';
import { ROUTES } from '../routes';

const GROUPS = [
  { key: 'Reach', hint: 'Амбітні університети' },
  { key: 'Target', hint: 'Найбільш реалістичні' },
  { key: 'Likely', hint: 'Високі шанси вступу' },
];

/**
 * Placeholder landing screen shown after onboarding.
 * Replace the body with the real dashboard once it is merged.
 */
const Dashboard = () => (
  <div className={styles.page}>
    <header className={styles.topbar}>
      <span className={styles.logo}>
        <span className={styles.logoIcon}>✦</span> US University Match
      </span>
      <Link to={ROUTES.signIn} className={styles.logout}>Вийти</Link>
    </header>

    <main className={styles.main}>
      <h1 className={styles.title}>Твій профіль готовий</h1>
      <p className={styles.subtitle}>
        Тут з’явиться персональний список університетів. Цей екран у розробці.
      </p>

      <div className={styles.grid}>
        {GROUPS.map(({ key, hint }) => (
          <section key={key} className={styles.card}>
            <h2 className={styles.cardTitle}>{key}</h2>
            <p className={styles.cardHint}>{hint}</p>
            <span className={styles.badge}>Скоро</span>
          </section>
        ))}
      </div>
    </main>
  </div>
);

export default Dashboard;
