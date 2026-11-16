import React from 'react';
import styles from './Stepper.module.css';

/**
 * Stepper / progress indicator.
 *
 * @param {Object} props
 * @param {string[]} props.labels       Step titles, e.g. ['Академічна база', 'Activities', 'Побажання'].
 * @param {number}   props.current      Zero-based index of the active step.
 * @param {'vertical'|'horizontal'} [props.orientation] Layout direction
 *   (vertical for the desktop sidebar, horizontal for the tablet header banner).
 */
const Stepper = ({ labels, current = 0, orientation = 'vertical' }) => {
  return (
    <ol
      className={`${styles.stepper} ${
        orientation === 'horizontal' ? styles.horizontal : styles.vertical
      }`}
      aria-label="Прогрес онбордингу"
    >
      {labels.map((label, index) => {
        const state =
          index < current ? styles.done : index === current ? styles.active : styles.inactive;

        return (
          <li
            key={label}
            className={`${styles.step} ${state}`}
            aria-current={index === current ? 'step' : undefined}
          >
            <span className={styles.stepCircle} aria-hidden="true">
              {index < current ? '✓' : index + 1}
            </span>
            <span className={styles.stepLabel}>{label}</span>
          </li>
        );
      })}
    </ol>
  );
};

export default Stepper;