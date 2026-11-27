import React from 'react';
import { HomeIcon, SearchIcon, SparkleIcon, ApplicationsIcon, UserIcon } from '../Icons/Icons';
import styles from './DashboardNav.module.css';

const NAV_ITEMS = [
  { id: 'home', label: 'Home', icon: HomeIcon },
  { id: 'universities', label: 'Universities', icon: SearchIcon },
  { id: 'ai-counselor', label: 'AI Counselor', icon: SparkleIcon },
  { id: 'applications', label: 'Applications', icon: ApplicationsIcon },
  { id: 'profile', label: 'Profile', icon: UserIcon },
];

const DashboardNav = ({ iconSize = 20, onSelect, activeId = 'home', variant = 'sidebar' }) => (
  <>
    {NAV_ITEMS.map(({ id, label, icon: Icon }) => {
      const active = id === activeId;

      return (
        <li key={id}>
          <button
            type="button"
            className={`${styles.item} ${active ? styles.itemActive : ''} ${
              variant === 'tablet' ? styles.tabletItem : ''
            }`.trim()}
            aria-current={active ? 'page' : undefined}
            onClick={() => onSelect?.(id, label)}
          >
            <Icon size={iconSize} />
            <span className={styles.label}>{label}</span>
          </button>
        </li>
      );
    })}
  </>
);

export default DashboardNav;
export { NAV_ITEMS };
