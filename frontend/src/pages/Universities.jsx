import { useRef, useState } from 'react'
import './Universities.css'

const criteria = ['Major fit', 'GPA and SAT', 'Financial aid', 'Extracurriculars', 'Size and location']
const filters = ['All', 'Intl. Relations', 'Financial aid', 'Medium size', 'Near big city']
const universities = [
  {
    id: 'lakeview', name: 'Lakeview University', city: 'Chicago, IL',
    category: 'Target', match: 91, acceptance: '38%', tuition: '$52k', aid: 'Strong',
    scores: [96, 88, 92, 84, 90], tags: filters.slice(1),
  },
  {
    id: 'riverton', name: 'Riverton University', city: 'Washington, DC',
    category: 'Target', match: 86, acceptance: '41%', tuition: '$47k', aid: 'Good',
    scores: [92, 85, 87, 78, 88], tags: ['Intl. Relations', 'Financial aid', 'Near big city'],
  },
  {
    id: 'harborside', name: 'Harborside College', city: 'Boston, MA',
    category: 'Reach', match: 84, acceptance: '25%', tuition: '$55k', aid: 'Moderate',
    scores: [83, 77, 80, 90, 90], tags: ['Medium size', 'Near big city'],
  },
]

const navigation = [
  ['⌂', 'Home', '/'],
  ['⚲', 'Universities', '/universities'],
  ['✧', 'AI Counselor'],
  ['☑', 'Applications'],
  ['♙', 'Profile'],
]

function MatchRing({ score }) {
  return (
    <span className="universities__ring" style={{ '--match': `${score}%` }}>
      <span>{score}%</span>
    </span>
  )
}

function UniversityFacts({ university }) {
  return (
    <dl className="universities__facts">
      <div><dt>Acceptance</dt><dd>{university.acceptance}</dd></div>
      <div><dt>Tuition</dt><dd>{university.tuition}</dd></div>
      <div><dt>Aid</dt><dd>{university.aid}</dd></div>
    </dl>
  )
}

export default function Universities() {
  const [filter, setFilter] = useState('All')
  const [query, setQuery] = useState('')
  const [matching, setMatching] = useState(false)
  const [selectedId, setSelectedId] = useState(universities[0].id)
  const [favorites, setFavorites] = useState([])
  const dialog = useRef(null)

  const terms = query.toLowerCase().match(/[\p{L}\p{N}]+/gu) ?? []
  const visible = universities.filter((university) => {
    if (filter !== 'All' && !university.tags.includes(filter)) return false

    const tags = university.tags.join(' ').replace('Intl.', 'International')
    const searchable = `${university.name} ${university.city} ${tags}`.toLowerCase()
    const words = searchable.match(/[\p{L}\p{N}]+/gu)
    return terms.length === 0 || (matching
      ? terms.some((term) => words.includes(term))
      : terms.every((term) => searchable.includes(term)))
  })
  const selected = visible.find(({ id }) => id === selectedId) ?? visible[0]

  function handleMatch(event) {
    event.preventDefault()
    setMatching(true)
    setSelectedId(universities[0].id)
  }

  function toggleFavorite(id) {
    setFavorites((previous) => previous.includes(id)
      ? previous.filter((favorite) => favorite !== id)
      : [...previous, id])
  }

  return (
    <div className="universities">
      <aside className="universities__sidebar">
        <a className="universities__brand" href="/">
          <span aria-hidden="true">✧</span> US Match
        </a>
        <nav aria-label="Main navigation">
          {navigation.map(([icon, label, href]) => {
            const content = <><span aria-hidden="true">{icon}</span>{label}</>
            const current = href === '/universities'
            return href ? (
              <a key={label} href={href} aria-current={current ? 'page' : undefined}>{content}</a>
            ) : (
              <span key={label} aria-disabled="true">{content}</span>
            )
          })}
        </nav>
        <div className="universities__premium">
          <strong>Go Premium</strong>
          <p>AI Counselor, Compare і детальний аналіз</p>
          <button type="button" disabled>Upgrade</button>
        </div>
      </aside>

      <main className="universities__main">
        <header className="universities__header">
          <div>
            <h1>Universities</h1>
            <p>Пошук, фільтри та AI matching</p>
          </div>
          <div className="universities__account">
            <span className="universities__notification" role="img" aria-label="Notifications">♧</span>
            <span className="universities__avatar" aria-label="Profile initial L">L</span>
          </div>
        </header>

        <form className="universities__search" role="search" onSubmit={handleMatch}>
          <span aria-hidden="true">✧</span>
          <input
            aria-label="Search universities"
            type="search"
            placeholder="Medium-sized university near a big city with strong International Relations..."
            value={query}
            onChange={(event) => {
              setQuery(event.target.value)
              setMatching(false)
            }}
          />
          <button className="universities__primary" type="submit">Match me</button>
        </form>

        <div className="universities__filters" role="group" aria-label="University filters">
          {filters.map((label) => (
            <button key={label} type="button" aria-pressed={filter === label} onClick={() => setFilter(label)}>
              {label}
            </button>
          ))}
        </div>

        <div className="universities__results">
          <section className="universities__list" aria-label="University results">
            {visible.length === 0 && <p role="status">No universities found. Try a different search or filter.</p>}
            {visible.map((university) => {
              const active = university.id === selected?.id
              const favorite = favorites.includes(university.id)

              return (
                <article className="universities__card" key={university.id} data-selected={active}>
                  <button
                    className="universities__select"
                    type="button"
                    aria-pressed={active}
                    aria-label={`Show match for ${university.name}`}
                    onClick={() => setSelectedId(university.id)}
                  />
                  <div className="universities__identity">
                    <span className={`universities__monogram universities__monogram--${university.id}`} aria-hidden="true">
                      {university.name[0]}
                    </span>
                    <div>
                      <h2>{university.name}</h2>
                      <p><span aria-hidden="true">♧ </span>{university.city}</p>
                    </div>
                    <button
                      className="universities__favorite"
                      type="button"
                      aria-pressed={favorite}
                      aria-label={`Favorite ${university.name}`}
                      onClick={() => toggleFavorite(university.id)}
                    >
                      <span aria-hidden="true">{favorite ? '♥' : '♡'}</span>
                    </button>
                  </div>
                  <div className="universities__card-match">
                    <span className="universities__category" data-category={university.category}>{university.category}</span>
                    <span>Match</span>
                    <MatchRing score={university.match} />
                  </div>
                  <UniversityFacts university={university} />
                </article>
              )
            })}
          </section>

          {selected && (
            <section className="universities__details" aria-labelledby="university-match-heading">
              <div className="universities__details-heading" aria-live="polite">
                <MatchRing score={selected.match} />
                <div>
                  <h2 id="university-match-heading">Why {selected.match}% match</h2>
                  <p>{selected.name}</p>
                </div>
              </div>
              <ul className="universities__criteria">
                {criteria.map((criterion, index) => (
                  <li key={criterion}>
                    <span>{criterion}</span>
                    <progress max="100" value={selected.scores[index]} aria-label={criterion} />
                    <strong>{selected.scores[index]}</strong>
                  </li>
                ))}
              </ul>
              <button className="universities__primary" type="button" onClick={() => dialog.current.showModal()}>
                Open university
              </button>
              <dialog ref={dialog} className="universities__dialog" aria-labelledby="university-dialog-heading">
                <h2 id="university-dialog-heading">{selected.name}</h2>
                <p>{selected.city}</p>
                <UniversityFacts university={selected} />
                <form method="dialog">
                  <button className="universities__primary">Close</button>
                </form>
              </dialog>
            </section>
          )}
        </div>
      </main>
    </div>
  )
}
