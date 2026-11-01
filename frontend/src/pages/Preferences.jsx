import React, { useState } from 'react';
import styles from './Preferences.module.css';

const Preferences = () => {
  const [budget, setBudget] = useState('до $30,000');
  const [financialAid, setFinancialAid] = useState('Так, потрібна');
  const [location, setLocation] = useState('Illinois, Chicago');
  const [uniSize, setUniSize] = useState('Medium - 5–15k');

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <main className={styles.onboardingCard}>
      {/* Left Sidebar */}
      <aside className={styles.sidebar} aria-label="Кроки заповнення профілю">
        <div className={styles.brand}>
          <div className={styles.brandIcon} aria-hidden="true">
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
          <span className={styles.brandName}>US University Match</span>
        </div>

        <ol className={styles.stepper}>
          <li className={styles.stepItem}>
            <span className={`${styles.stepBadge} ${styles.stepBadgeDone}`} aria-hidden="true">
              ✓
            </span>
            <span>Академічна база</span>
          </li>
          <li className={styles.stepItem}>
            <span className={`${styles.stepBadge} ${styles.stepBadgeDone}`} aria-hidden="true">
              ✓
            </span>
            <span>Activities</span>
          </li>
          <li className={`${styles.stepItem} ${styles.stepItemActive}`} aria-current="step">
            <span className={`${styles.stepBadge} ${styles.stepBadgeActive}`}>3</span>
            <span>Побажання</span>
          </li>
        </ol>

        <p className={styles.sidebarHelper}>
          Чим точніший профіль, тим кращі рекомендації та відсоток match.
        </p>
      </aside>

      {/* Right Form Section */}
      <section className={styles.preferencesArea}>
        <div className={styles.preferencesContainer}>
          <span className={styles.stepPill}>Крок 3 з 3</span>
          <h1 className={styles.prefTitle}>Що для тебе важливо</h1>
          <p className={styles.prefSubtitle}>Бюджет, допомога та локація</p>

          <form className={styles.prefForm} onSubmit={handleSubmit}>
            <div className={styles.fieldGroup}>
              <label className={styles.fieldLabel} htmlFor="pref-budget">
                Бюджет на рік
              </label>
              <input
                id="pref-budget"
                type="text"
                className={styles.fieldInput}
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                required
              />
            </div>

            <div className={styles.fieldGroup}>
              <label className={styles.fieldLabel} htmlFor="pref-financial-aid">
                Потрібна financial aid
              </label>
              <input
                id="pref-financial-aid"
                type="text"
                className={styles.fieldInput}
                value={financialAid}
                onChange={(e) => setFinancialAid(e.target.value)}
                required
              />
            </div>

            <div className={styles.fieldRowTwo}>
              <div className={styles.fieldGroup}>
                <label className={styles.fieldLabel} htmlFor="pref-location">
                  Штат або місто
                </label>
                <input
                  id="pref-location"
                  type="text"
                  className={styles.fieldInput}
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  required
                />
              </div>

              <div className={styles.fieldGroup}>
                <label className={styles.fieldLabel} htmlFor="pref-uni-size">
                  Розмір університету
                </label>
                <input
                  id="pref-uni-size"
                  type="text"
                  className={styles.fieldInput}
                  value={uniSize}
                  onChange={(e) => setUniSize(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className={styles.actionsRow}>
              <button type="button" className={styles.btnBack}>
                Назад
              </button>
              <button type="submit" className={styles.btnNext}>
                Далі &rarr;
              </button>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
};

export default Preferences;