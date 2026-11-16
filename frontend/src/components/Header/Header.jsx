import React from 'react';
import styles from './Header.module.css';

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.logoSection}>
        <a href="/" className={styles.logo}>
          ItStepProject
        </a>
      </div>

      <nav className={styles.navSection} aria-label="Main Navigation">
        <ul className={styles.navList}>
          <li><a href="/" className={styles.navLink}>Home</a></li>
          <li><a href="/about" className={styles.navLink}>About</a></li>
          <li><a href="/contact" className={styles.navLink}>Contact</a></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;