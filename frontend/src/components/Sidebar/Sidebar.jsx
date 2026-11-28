import React from 'react';
import Brand from '../Brand/Brand';
import DashboardNav from '../DashboardNav/DashboardNav';
import styles from './Sidebar.module.css';

const Sidebar = ({ onSelect, onUpgrade }) => (
  <aside className={styles.sidebar}>
    <Brand className={styles.brandSpacing} />

    <nav className={styles.nav} aria-label="Dashboard navigation">
      <ul className={styles.navList}>
        <DashboardNav onSelect={onSelect} />
      </ul>
    </nav>

    <div className={styles.premiumCard}>
      <span className={styles.premiumGlow} aria-hidden="true" />
      <p className={styles.premiumTitle}>Go Premium</p>
      <p className={styles.premiumText}>AI Counselor. Compare і детальний аналіз</p>
      <button type="button" className={styles.upgradeButton} onClick={onUpgrade}>
        Upgrade
      </button>
    </div>
  </aside>
);

export default Sidebar;
