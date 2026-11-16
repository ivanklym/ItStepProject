import React from 'react';
import styles from './ActivitiesForm.module.css';
import NavButtons from '../NavButtons/NavButtons';

export const ACTIVITY_TAGS = [
  'Leadership',
  'Community Service',
  'Initiative',
  'Awards',
  'Research',
];

export const DEFAULT_ACTIVITIES = {
  description: 'I was president of my school parliament and organized charity events.',
  tags: ['Leadership', 'Community Service', 'Initiative'],
};

/**
 * Onboarding step 2 — extracurricular activities (free text + tags).
 *
 * @param {Object}   props
 * @param {{description: string, tags: string[]}} props.values
 * @param {Function} props.onChange    onChange(name, value).
 * @param {Function} props.onBack
 * @param {Function} props.onNext
 */
const ActivitiesForm = ({ values, onChange, onBack, onNext }) => {
  const toggleTag = (tag) => {
    const tags = values.tags.includes(tag)
      ? values.tags.filter((t) => t !== tag)
      : [...values.tags, tag];
    onChange('tags', tags);
  };

  return (
    <section className={styles.formSection} aria-labelledby="activities-form-title">
      <p className={styles.stepIndicator}>Крок 2 з 3</p>

      <h1 id="activities-form-title" className={styles.title}>
        Твої activities
      </h1>
      <p className={styles.subtitle}>Лідерство, волонтерство, нагороди</p>

      <form
        className={styles.form}
        onSubmit={(event) => {
          event.preventDefault();
          onNext?.();
        }}
      >
        <div className={styles.field}>
          <label htmlFor="activityDescription" className={styles.label}>
            Опиши activity
          </label>
          <textarea
            id="activityDescription"
            name="activityDescription"
            className={styles.textarea}
            rows={5}
            value={values.description}
            onChange={(event) => onChange('description', event.target.value)}
          />
        </div>

        <div className={styles.tags} role="group" aria-label="Теги activities">
          {ACTIVITY_TAGS.map((tag) => {
            const selected = values.tags.includes(tag);
            return (
              <button
                key={tag}
                type="button"
                className={`${styles.tag} ${selected ? styles.selected : styles.available}`}
                aria-pressed={selected}
                onClick={() => toggleTag(tag)}
              >
                {selected ? tag : `+ ${tag}`}
              </button>
            );
          })}
        </div>

        <NavButtons onBack={onBack} onNext={onNext} />
      </form>
    </section>
  );
};

export default ActivitiesForm;
