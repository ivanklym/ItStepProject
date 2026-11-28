import React, { useId } from 'react';
import UniversityCard from '../UniversityCard/UniversityCard';
import styles from './RecommendedSection.module.css';

const FILTERS = ['All', 'Reach', 'Target', 'Likely'];

/**
 * Recommendation section with category filters and university grid.
 * Props: universities, filter, onFilterChange, savedIds, onToggleSaved,
 * showAll, onToggleShowAll, title, className.
 */
const RecommendedSection = ({
  universities = [],
  filter = 'All',
  onFilterChange,
  savedIds = new Set(),
  onToggleSaved,
  showAll = false,
  onToggleShowAll,
  title = 'Recommended for you',
  className = '',
}) => {
  const titleId = useId();

  return (
    <section
      className={`${styles.recommended} ${className}`.trim()}
      aria-labelledby={titleId}
    >
      <div className={styles.sectionHead}>
        <h2 id={titleId} className={styles.sectionTitle}>
          {title}
        </h2>
        <button type="button" className={styles.seeAll} onClick={onToggleShowAll}>
          {showAll ? 'Show less' : 'See all'}
        </button>
      </div>

      <div className={styles.filters} role="group" aria-label="Filter universities">
        {FILTERS.map((item) => (
          <button
            key={item}
            type="button"
            className={`${styles.filterButton} ${
              filter === item ? styles.filterButtonActive : ''
            }`.trim()}
            aria-pressed={filter === item}
            onClick={() => onFilterChange?.(item)}
          >
            {item}
          </button>
        ))}
      </div>

      <div className={styles.universityGrid}>
        {universities.map((university) => (
          <UniversityCard
            key={university.id}
            university={university}
            saved={savedIds.has(university.id)}
            onToggleSaved={onToggleSaved}
          />
        ))}
      </div>
    </section>
  );
};

export default RecommendedSection;
