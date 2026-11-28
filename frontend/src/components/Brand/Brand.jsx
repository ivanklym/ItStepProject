import React from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../routes';
import { SparkleIcon } from '../Icons/Icons';
import styles from './Brand.module.css';

const Brand = ({ to = ROUTES.dashboard, compact = false, className = '' }) => (
  <Link
    to={to}
    className={`${styles.brand} ${compact ? styles.compact : ''} ${className}`.trim()}
    aria-label="US Match dashboard"
  >
    <span className={styles.mark}>
      <SparkleIcon size={22} />
    </span>
    <span className={styles.name}>US Match</span>
  </Link>
);

export default Brand;
