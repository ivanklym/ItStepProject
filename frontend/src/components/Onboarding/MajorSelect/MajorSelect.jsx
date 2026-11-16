import React from 'react';
import styles from './MajorSelect.module.css';

export const MAJORS = [
  'International Relations',
  'Computer Science',
  'Business Administration',
  'Economics',
  'Political Science',
  'Psychology',
  'Engineering',
  'Biology / Pre-Med',
  'Mathematics',
  'Fine Arts',
];

/**
 * Desired major selector, rendered as a full-width field with a chevron.
 *
 * @param {Object}   props
 * @param {string}   props.id
 * @param {string}   [props.label]    Defaults to 'Бажана спеціальність'.
 * @param {string}   props.value      Selected major.
 * @param {Function} props.onChange   onChange(value).
 */
const MajorSelect = ({
  id = 'major',
  label = 'Бажана спеціальність',
  value,
  onChange,
}) => {
  return (
    <div className={styles.field}>
      <label htmlFor={id} className={styles.label}>
        {label}
      </label>

      <div className={styles.selectWrapper}>
        <select
          id={id}
          name={id}
          className={styles.select}
          value={value}
          onChange={(event) => onChange(event.target.value)}
        >
          <option value="" disabled>
            Оберіть спеціальність
          </option>
          {MAJORS.map((major) => (
            <option key={major} value={major}>
              {major}
            </option>
          ))}
        </select>

        {/* Chevron indicator */}
        <svg
          className={styles.chevron}
          viewBox="0 0 20 20"
          aria-hidden="true"
          focusable="false"
        >
          <path
            d="M5.5 7.5 10 12l4.5-4.5"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  );
};

export default MajorSelect;