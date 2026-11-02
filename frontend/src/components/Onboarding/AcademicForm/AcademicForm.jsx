import React from 'react';
import styles from './AcademicForm.module.css';
import FormField from '../FormField/FormField';
import MajorSelect from '../MajorSelect/MajorSelect';
import NavButtons from '../NavButtons/NavButtons';

export const ENGLISH_TEST_LABELS = {
  duolingo: 'Duolingo English Test',
  ielts: 'IELTS Overall Band',
  toefl: 'TOEFL iBT Total',
};

export const DEFAULT_VALUES = {
  major: 'International Relations',
  gpa: '3.8',
  sat: '1450',
  act: '',
  englishTestType: 'duolingo',
  englishScore: '130',
};

const ENGLISH_SCORE_HINTS = {
  duolingo: 'Зазвичай 10–160 балів',
  ielts: 'Зазвичай 4.0–9.0 балів',
  toefl: 'Зазвичай 0–120 балів',
};

const ENGLISH_SCORE_PLACEHOLDERS = {
  duolingo: '130',
  ielts: '7.0',
  toefl: '100',
};

/**
 * Onboarding step 1 — academic base (GPA, tests, desired major).
 *
 * @param {Object}   props
 * @param {Object}   props.values
 * @param {Function} props.onChange    onChange(name, value).
 * @param {Function} props.onBack
 * @param {Function} props.onNext
 * @param {boolean}  [props.backDisabled]
 */
const AcademicForm = ({ values, onChange, onBack, onNext }) => {
  const englishLabel = ENGLISH_TEST_LABELS[values.englishTestType] ?? ENGLISH_TEST_LABELS.duolingo;
  const englishHint = ENGLISH_SCORE_HINTS[values.englishTestType] ?? ENGLISH_SCORE_HINTS.duolingo;
  const englishPlaceholder =
    ENGLISH_SCORE_PLACEHOLDERS[values.englishTestType] ?? ENGLISH_SCORE_PLACEHOLDERS.duolingo;

  const englishSuffix = (
    <select
      aria-label="Тип тесту з англійської"
      className={styles.testType}
      value={values.englishTestType}
      onChange={(event) => onChange('englishTestType', event.target.value)}
    >
      <option value="duolingo">Duolingo</option>
      <option value="ielts">IELTS</option>
      <option value="toefl">TOEFL</option>
    </select>
  );

  return (
    <section className={styles.formSection} aria-labelledby="academic-form-title">
      <p className={styles.stepIndicator}>Крок 1 з 3</p>

      <h1 id="academic-form-title" className={styles.title}>
        Твоя академічна база
      </h1>
      <p className={styles.subtitle}>GPA, тести та рівень англійської</p>

      <form
        className={styles.grid}
        onSubmit={(event) => {
          event.preventDefault();
          onNext?.();
        }}
      >
        {/* Desired major — full width */}
        <div className={styles.fullWidth}>
          <MajorSelect
            id="major"
            value={values.major}
            onChange={(value) => onChange('major', value)}
          />
        </div>

        <FormField
          id="gpa"
          label="GPA"
          value={values.gpa}
          onChange={(value) => onChange('gpa', value)}
          placeholder="4.0"
          inputMode="decimal"
          hint="Шкала 0–4 (або 10–12)"
        />

        <FormField
          id="sat"
          label="SAT"
          value={values.sat}
          onChange={(value) => onChange('sat', value)}
          placeholder="1600"
          inputMode="numeric"
          hint="Оцінка 400–1600"
        />

        <FormField
          id="act"
          label="ACT"
          value={values.act}
          onChange={(value) => onChange('act', value)}
          placeholder="—"
          inputMode="numeric"
          hint="Оцінка 1–36"
        />

        <FormField
          id="englishScore"
          label={englishLabel}
          labelSuffix={englishSuffix}
          value={values.englishScore}
          onChange={(value) => onChange('englishScore', value)}
          placeholder={englishPlaceholder}
          inputMode="decimal"
          hint={englishHint}
        />

        <div className={styles.navRow}>
          <NavButtons onBack={onBack} onNext={onNext} />
        </div>
      </form>
    </section>
  );
};

export default AcademicForm;