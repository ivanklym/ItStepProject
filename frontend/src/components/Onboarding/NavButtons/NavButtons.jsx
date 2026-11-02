import React from 'react';
import styles from './NavButtons.module.css';

/**
 * Bottom action row of a form step.
 *
 * "Назад" — outline button on the left (auto width).
 * "Далі"  — primary button stretched to fill the remaining width, with an arrow →.
 *
 * @param {Object}   props
 * @param {Function} props.onBack
 * @param {Function} props.onNext
 * @param {boolean}  [props.backDisabled]  Disabled on the first step.
 * @param {boolean}  [props.nextDisabled]  Disabled until required fields are valid.
 */
const NavButtons = ({ onBack, onNext, backDisabled = false, nextDisabled = false }) => {
  return (
    <div className={styles.row}>
      <button
        type="button"
        className={`${styles.button} ${styles.outline}`}
        onClick={onBack}
        disabled={backDisabled}
      >
        Назад
      </button>

      <button
        type="button"
        className={`${styles.button} ${styles.primary}`}
        onClick={onNext}
        disabled={nextDisabled}
      >
        Далі
        <svg
          className={styles.arrow}
          viewBox="0 0 20 20"
          aria-hidden="true"
          focusable="false"
        >
          <path
            d="M3 10h13m0 0-5-5m5 5-5 5"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </div>
  );
};

export default NavButtons;