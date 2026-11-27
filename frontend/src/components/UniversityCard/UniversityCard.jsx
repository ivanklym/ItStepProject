import React from 'react';
import { HeartIcon, PinIcon } from '../Icons/Icons';
import ProgressRing from '../ProgressRing/ProgressRing';
import styles from './UniversityCard.module.css';

/**
 * Reusable recommendation card.
 * Props: university (id, name, location, initial, category, tone, match,
 * acceptance, tuition, aid), saved, onToggleSaved.
 */
const UniversityCard = ({ university, saved = false, onToggleSaved }) => (
  <article className={styles.universityCard}>
    <div className={styles.uniTop}>
      <div
        className={`${styles.uniLogo} ${styles[university.tone] || ''}`.trim()}
        aria-hidden="true"
      >
        {university.initial}
      </div>

      <div className={styles.uniIdentity}>
        <h3 className={styles.uniName}>{university.name}</h3>
        <p className={styles.uniLocation}>
          <PinIcon size={12} />
          {university.location}
        </p>
      </div>

      <button
        type="button"
        className={styles.heartButton}
        aria-pressed={saved}
        aria-label={`${saved ? 'Remove' : 'Save'} ${university.name}`}
        onClick={() => onToggleSaved?.(university.id)}
      >
        <HeartIcon size={20} />
      </button>
    </div>

    <div className={styles.uniMeta}>
      <span className={`${styles.categoryBadge} ${styles[`badge${university.category}`] || ''}`.trim()}>
        {university.category}
      </span>

      <div className={styles.match}>
        <span className={styles.matchLabel} aria-hidden="true">
          Match
        </span>
        <ProgressRing
          value={university.match}
          size={38}
          stroke={4}
          tone="match"
          label={`${university.name} match`}
        />
      </div>
    </div>

    <div className={styles.uniDivider} aria-hidden="true" />

    <dl className={styles.uniStats}>
      <div>
        <dt>Acceptance</dt>
        <dd>{university.acceptance}</dd>
      </div>
      <div>
        <dt>Tuition</dt>
        <dd>{university.tuition}</dd>
      </div>
      <div>
        <dt>Aid</dt>
        <dd>{university.aid}</dd>
      </div>
    </dl>
  </article>
);

export default UniversityCard;
