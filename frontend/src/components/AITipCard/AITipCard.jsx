import React, { useId } from 'react';
import { SparkleIcon } from '../Icons/Icons';
import styles from './AITipCard.module.css';

/**
 * Card with an AI-powered tip.
 * Props: title, text, className.
 */
const AITipCard = ({ title, text, className = '' }) => {
  const titleId = useId();

  return (
    <section className={`${styles.aiCard} ${className}`.trim()} aria-labelledby={titleId}>
      <span className={styles.aiIcon} aria-hidden="true">
        <SparkleIcon size={17} />
      </span>
      <h3 id={titleId} className={styles.aiTitle}>
        {title}
      </h3>
      <p className={styles.aiText}>{text}</p>
    </section>
  );
};

export default AITipCard;
