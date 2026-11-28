import React from 'react';
import styles from './ProgressRing.module.css';

/**
 * Circular progress indicator.
 * Props: value (0-100), size (px), stroke (px), tone ('profile' | 'match'),
 * label, className.
 */
const ProgressRing = ({
  value,
  size = 84,
  stroke = 5,
  tone = 'profile',
  label,
  className = '',
  ...rest
}) => {
  const prefix = tone === 'profile' ? 'profile' : tone === 'match' ? 'match' : 'custom';
  const [from, to] =
    tone === 'profile'
      ? ['#A0EBDF', '#43C7AE']
      : tone === 'match'
        ? ['#7DA7FF', '#2F63F0']
        : ['#A0EBDF', '#43C7AE'];

  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const filled = (circumference * value) / 100;
  const toneClass = tone === 'match' ? styles.match : '';

  return (
    <div
      className={`${styles.ring} ${toneClass} ${className}`.trim()}
      style={{ width: size, height: size }}
      role="img"
      aria-label={label}
      {...rest}
    >
      <svg viewBox={`0 0 ${size} ${size}`} width={size} height={size} aria-hidden="true">
        <defs>
          <linearGradient id={`ring-${prefix}-grad`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={from} />
            <stop offset="100%" stopColor={to} />
          </linearGradient>
        </defs>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={tone === 'profile' ? 'rgba(255, 255, 255, 0.18)' : '#E3EAF9'}
          strokeWidth={stroke}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={`url(#ring-${prefix}-grad)`}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={`${filled} ${circumference}`}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
      </svg>
      <span className={styles.value} aria-hidden="true">
        {value}%
      </span>
    </div>
  );
};

export default ProgressRing;
