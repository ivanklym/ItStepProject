import React, { useState } from 'react';
import styles from './Onboarding.module.css';
import OnboardingSidebar from '../components/Onboarding/OnboardingSidebar/OnboardingSidebar';
import AcademicForm, { DEFAULT_VALUES } from '../components/Onboarding/AcademicForm/AcademicForm';
import NavButtons from '../components/Onboarding/NavButtons/NavButtons';

export const STEP_LABELS = ['Академічна база', 'Activities', 'Побажання'];

/**
 * Onboarding flow — step 1: Academic Base.
 * Steps 2 & 3 are placeholders for now.
 */
const Onboarding = () => {
  const [step, setStep] = useState(0); // zero-based index into STEP_LABELS
  const [fields, setFields] = useState(DEFAULT_VALUES);

  const handleFieldChange = (name, value) => {
    setFields((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className={styles.layout}>
      <OnboardingSidebar labels={STEP_LABELS} current={step} />

      <main className={styles.main}>
        {step === 0 && (
          <AcademicForm
            values={fields}
            onChange={handleFieldChange}
            onBack={() => setStep((current) => Math.max(0, current - 1))}
            onNext={() => setStep((current) => Math.min(STEP_LABELS.length - 1, current + 1))}
          />
        )}

        {step > 0 && (
          <section className={styles.placeholder}>
            <p className={styles.stepIndicator}>{`Крок ${step + 1} з 3`}</p>
            <h1 className={styles.placeholderTitle}>{STEP_LABELS[step]}</h1>
            <p className={styles.placeholderText}>Цей крок перебуває в розробці.</p>
            <NavButtons
              onBack={() => setStep((current) => Math.max(0, current - 1))}
              onNext={() => setStep((current) => Math.min(STEP_LABELS.length - 1, current + 1))}
            />
          </section>
        )}
      </main>
    </div>
  );
};

export default Onboarding;