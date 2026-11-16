import React from 'react';
import styles from './FormField.module.css';

/**
 * Labeled text input (GPA, SAT, ACT, English test score…).
 *
 * @param {Object}   props
 * @param {string}   props.id           Input id (also used for the <label htmlFor>).
 * @param {string}   props.label        Field label.
 * @param {?React.ReactNode} [props.labelSuffix] Optional node rendered on the right
 *   of the label row (e.g. an English-test-type selector).
 * @param {string}   [props.value]      Controlled input value.
 * @param {Function} [props.onChange]   onChange(value).
 * @param {string}   [props.placeholder] Value shown when the field is empty (e.g. '—').
 * @param {string}   [props.type]       Input type (default: text).
 * @param {string}   [props.inputMode]  Hint for on-screen keyboards (numeric, decimal…).
 * @param {string}   [props.hint]       Small helper text under the input.
 * @param {boolean}  [props.disabled]
 */
const FormField = ({
  id,
  label,
  labelSuffix,
  value = '',
  onChange,
  placeholder = '',
  type = 'text',
  inputMode,
  hint,
  disabled = false,
}) => {
  return (
    <div className={styles.field}>
      <div className={styles.labelRow}>
        <label htmlFor={id} className={styles.label}>
          {label}
        </label>
        {labelSuffix}
      </div>

      <input
        id={id}
        name={id}
        className={styles.input}
        type={type}
        inputMode={inputMode}
        value={value}
        onChange={onChange ? (event) => onChange(event.target.value) : undefined}
        placeholder={placeholder}
        disabled={disabled}
      />

      {hint && <span className={styles.hint}>{hint}</span>}
    </div>
  );
};

export default FormField;