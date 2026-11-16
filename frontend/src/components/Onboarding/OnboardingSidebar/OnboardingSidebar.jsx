import React from 'react';
import styles from './OnboardingSidebar.module.css';
import Stepper from '../Stepper/Stepper';

const OnboardingSidebar = ({ labels, current }) => {
  return (
    <aside className={styles.sidebar}>
      <div className={styles.inner}>
        <div className={styles.logoSection}>
          <div className={styles.logoStarWrapper}>
            <svg
              className={styles.logoStar}
              viewBox="0 0 18 18"
              aria-hidden="true"
              focusable="false"
            >
              <path
                d="M9 2.25L10.35 6.15L14.25 7.5L10.35 8.85L9 12.75L7.65 8.85L3.75 7.5L7.65 6.15L9 2.25ZM14.25 12L14.85 13.65L16.5 14.25L14.85 14.85L14.25 16.5L13.65 14.85L12 14.25L13.65 13.65L14.25 12Z"
                strokeWidth="1.35"
                strokeLinecap="round"
                strokeLinejoin="round"
                stroke="white"
              />
            </svg>
          </div>
          <span className={styles.logoText}>US University Match</span>
        </div>

        <nav className={styles.stepperWrapper} aria-label="Кроки онбордингу">
          <Stepper labels={labels} current={current} />
        </nav>

        <nav className={styles.stepperMobileWrapper} aria-label="Кроки онбордингу">
          <Stepper labels={labels} current={current} orientation="horizontal" />
        </nav>

        <p className={styles.hint}>
          Чим точніший профіль, тим кращі рекомендації та відсоток match.
        </p>
      </div>
    </aside>
  );
};

export default OnboardingSidebar;