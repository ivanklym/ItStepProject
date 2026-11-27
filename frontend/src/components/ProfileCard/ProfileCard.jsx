import React, { useId } from 'react';
import { Link } from 'react-router-dom';
import ProgressRing from '../ProgressRing/ProgressRing';
import styles from './ProfileCard.module.css';

const ProfileCard = ({
  title = 'My Profile',
  strength = 82,
  strengthTitle = 'Profile strength: Strong',
  hint,
  stats = [],
  editTo,
  editLabel = 'Edit',
  className = '',
}) => {
  const titleId = useId();

  return (
    <section
      className={`${styles.profileCard} ${className}`.trim()}
      aria-labelledby={titleId}
    >
      <div className={styles.profileTop}>
        <h2 id={titleId} className={styles.profileKicker}>
          {title}
        </h2>
        {editTo && (
          <Link to={editTo} className={styles.editButton}>
            {editLabel}
          </Link>
        )}
      </div>

      <div className={styles.profileMain}>
        <ProgressRing value={strength} label={strengthTitle} />
        <div className={styles.strengthCopy}>
          <p className={styles.strengthTitle}>{strengthTitle}</p>
          {hint && <p className={styles.strengthHint}>{hint}</p>}
        </div>
      </div>

      <dl className={styles.metrics}>
        {stats.map(({ label, value }) => (
          <div key={label} className={styles.metric}>
            <dt>{label}</dt>
            <dd>{value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
};

export default ProfileCard;
