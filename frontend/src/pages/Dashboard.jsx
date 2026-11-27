import React, { useEffect, useState } from 'react';
import { ROUTES } from '../routes';
import { BellIcon } from '../components/Icons/Icons';
import Brand from '../components/Brand/Brand';
import Sidebar from '../components/Sidebar/Sidebar';
import DashboardNav from '../components/DashboardNav/DashboardNav';
import ProfileCard from '../components/ProfileCard/ProfileCard';
import DeadlineCard from '../components/DeadlineCard/DeadlineCard';
import AITipCard from '../components/AITipCard/AITipCard';
import RecommendedSection from '../components/RecommendedSection/RecommendedSection';
import styles from './Dashboard.module.css';

const PROFILE_STATS = [
  { label: 'GPA', value: '3.8' },
  { label: 'SAT', value: '1450' },
  { label: 'DET', value: '130' },
  { label: 'Activities', value: '12' },
  { label: 'Leadership', value: 'Strong' },
  { label: 'Volunteering', value: 'Strong' },
];

const UNIVERSITIES = [
  {
    id: 'lakeview',
    name: 'Lakeview University',
    location: 'Chicago, IL',
    initial: 'L',
    category: 'Target',
    tone: 'logoBlue',
    match: 91,
    acceptance: '38%',
    tuition: '$52k',
    aid: 'Strong',
    saved: true,
  },
  {
    id: 'harborside',
    name: 'Harborside College',
    location: 'Boston, MA',
    initial: 'H',
    category: 'Reach',
    tone: 'logoPurple',
    match: 84,
    acceptance: '14%',
    tuition: '$61k',
    aid: 'Limited',
    saved: false,
  },
  {
    id: 'summit',
    name: 'Summit State University',
    location: 'Denver, CO',
    initial: 'S',
    category: 'Likely',
    tone: 'logoTeal',
    match: 88,
    acceptance: '76%',
    tuition: '$38k',
    aid: 'Strong',
    saved: false,
  },
  {
    id: 'riverton',
    name: 'Riverton University',
    location: 'Washington, DC',
    initial: 'R',
    category: 'Target',
    tone: 'logoOrange',
    match: 84,
    acceptance: '52%',
    tuition: '$47k',
    aid: 'Moderate',
    saved: false,
  },
  {
    id: 'northwood',
    name: 'Northwood Institute',
    location: 'Portland, OR',
    initial: 'N',
    category: 'Reach',
    tone: 'logoPurple',
    match: 79,
    acceptance: '21%',
    tuition: '$58k',
    aid: 'Limited',
    saved: false,
  },
  {
    id: 'pinecrest',
    name: 'Pinecrest College',
    location: 'Austin, TX',
    initial: 'P',
    category: 'Likely',
    tone: 'logoTeal',
    match: 90,
    acceptance: '64%',
    tuition: '$34k',
    aid: 'Strong',
    saved: false,
  },
];

const Dashboard = () => {
  const [filter, setFilter] = useState('All');
  const [showAll, setShowAll] = useState(false);
  const [savedIds, setSavedIds] = useState(
    () => new Set(UNIVERSITIES.filter((university) => university.saved).map((university) => university.id)),
  );
  const [notice, setNotice] = useState('');

  useEffect(() => {
    if (!notice) return undefined;
    const timer = window.setTimeout(() => setNotice(''), 2600);
    return () => window.clearTimeout(timer);
  }, [notice]);

  const announce = (message) => setNotice(message);

  const handleNavSelect = (id, label) => {
    if (id !== 'home') announce(`${label} is coming soon`);
  };

  const toggleSaved = (id) => {
    setSavedIds((current) => {
      const next = new Set(current);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const filteredUniversities = UNIVERSITIES.filter(
    (university) => filter === 'All' || university.category === filter,
  );
  const visibleUniversities = showAll ? filteredUniversities : filteredUniversities.slice(0, 4);

  return (
    <div className={styles.page}>
      <div className={styles.shell}>
        <Sidebar
          onSelect={handleNavSelect}
          onUpgrade={() => announce('Premium is coming soon')}
        />

        <div className={styles.contentColumn}>
          <header className={styles.tabletBar}>
            <Brand compact className={styles.tabletBrand} />

            <nav className={styles.tabletNav} aria-label="Tablet dashboard navigation">
              <ul className={styles.tabletNavList}>
                <DashboardNav variant="tablet" iconSize={18} onSelect={handleNavSelect} />
              </ul>
            </nav>

            <button
              type="button"
              className={styles.upgradePill}
              onClick={() => announce('Premium is coming soon')}
            >
              Upgrade
            </button>
          </header>

          <main className={styles.main}>
            <header className={styles.topbar}>
              <div>
                <h1 className={styles.greeting}>Hi, Leo</h1>
                <p className={styles.subtitle}>Welcome back — маємо 6 нових матчів</p>
              </div>

              <div className={styles.topActions}>
                <button
                  type="button"
                  className={styles.iconButton}
                  aria-label="Notifications"
                  onClick={() => announce('Notifications are coming soon')}
                >
                  <BellIcon size={19} />
                  <span className={styles.notificationDot} aria-hidden="true" />
                </button>
                <button
                  type="button"
                  className={styles.avatar}
                  aria-label="Open profile menu"
                  onClick={() => announce('Profile menu is coming soon')}
                >
                  L
                </button>
              </div>
            </header>

            <div className={styles.dashboard}>
              <ProfileCard
                className={styles.profileSlot}
                stats={PROFILE_STATS}
                strength={82}
                strengthTitle="Profile strength: Strong"
                hint="Додай ще 2 awards, щоб піднятися до Excellent"
                editTo={ROUTES.onboarding}
              />

              <div className={styles.sideColumn}>
                <DeadlineCard
                  title="Next deadline"
                  date="Nov 1"
                  subtitle="Lakeview · Early Action"
                  daysRemaining="14 days"
                />

                <AITipCard
                  title="AI tip"
                  text="Твоє лідерство дуже сильне для Lakeview. Онови результати, щоб покращити шанси."
                />
              </div>

              <RecommendedSection
                className={styles.recommended}
                universities={visibleUniversities}
                filter={filter}
                onFilterChange={setFilter}
                onToggleSaved={toggleSaved}
                savedIds={savedIds}
                showAll={showAll}
                onToggleShowAll={() => setShowAll((current) => !current)}
              />
            </div>
          </main>
        </div>
      </div>

      {notice && (
        <div className={styles.toast} role="status">
          {notice}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
