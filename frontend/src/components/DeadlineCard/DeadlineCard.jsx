import React, { useId } from 'react';
import { CalendarIcon } from '../Icons/Icons';
import styles from './DeadlineCard.module.css';

/**
 * Card showing the next application deadline.
 * Props: title, date, subtitle, daysRemaining, className.
 */
const DeadlineCard = ({ title, date, subtitle, daysRemaining, className = '' }) => {
  const titleId = useId();

  return (
    <section
      className={`${styles.deadlineCard} ${className}`.trim()}
      aria-labelledby={titleId}
    >
      <span className={styles.deadlineIcon} aria-hidden="true">
        <CalendarIcon size={21} />
      </span>
      <h3 id={titleId} className={styles.deadlineTitle}>
        {title}
      </h3>
      <p className={styles.deadlineMeta}>{subtitle}</p>
      <div className={styles.deadlineRow}>
        <strong className={styles.deadlineDate}>{date}</strong>
        <span className={styles.daysBadge}>{daysRemaining}</span>
      </div>
    </section>
  );
};

export default DeadlineCard;
