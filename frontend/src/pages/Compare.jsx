import { useEffect, useRef, useState } from 'react'
import './Compare.css'

const catalog = [
  {
    id: 'lakeview', name: 'Lakeview University', tag: 'Target',
    match: 91, acceptance: 38, sat: '1380-1500', gpa: 3.8, tuition: 52, aid: 3, size: 'Medium', location: 'Chicago, IL',
  },
  {
    id: 'riverton', name: 'Riverton University', tag: 'Target',
    match: 86, acceptance: 41, sat: '1340-1470', gpa: 3.7, tuition: 47, aid: 2, size: 'Large', location: 'Washington, DC',
  },
  {
    id: 'harborside', name: 'Harborside College', tag: 'Reach',
    match: 84, acceptance: 25, sat: '1420-1540', gpa: 3.9, tuition: 55, aid: 1, size: 'Small', location: 'Boston, MA',
  },
  {
    id: 'northbridge', name: 'Northbridge Institute of Technology and Design', tag: 'Likely',
    match: 79, acceptance: 63, sat: '1250-1390', gpa: 3.5, tuition: 39, aid: 2, size: 'Medium', location: 'Pittsburgh, PA',
  },
]

const aidLabels = ['', 'Moderate', 'Good', 'Strong']

// best: 'max' | 'min' marks the best-value cell in that row
const rows = [
  { label: 'Match', key: 'match', best: 'max', format: (value) => `${value}%` },
  { label: 'Acceptance rate', key: 'acceptance', best: 'max', format: (value) => `${value}%` },
  { label: 'SAT', key: 'sat' },
  { label: 'GPA', key: 'gpa', format: (value) => value.toFixed(1) },
  { label: 'Tuition', key: 'tuition', best: 'min', format: (value) => `$${value}k / yr` },
  { label: 'Financial aid', key: 'aid', best: 'max', format: (value) => aidLabels[value] },
  { label: 'Size', key: 'size' },
  { label: 'Location', key: 'location' },
]

const navigation = [
  ['⌂', 'Home', '/'],
  ['⚲', 'Universities', '/universities'],
  ['⇄', 'Compare', '/compare'],
  ['✧', 'AI Counselor'],
  ['☑', 'Applications'],
  ['♙', 'Profile'],
]

const MIN = 2
const MAX = 4

function bestValue(row, universities) {
  if (!row.best) return undefined
  const values = universities.map((university) => university[row.key])
  return row.best === 'max' ? Math.max(...values) : Math.min(...values)
}

export default function Compare() {
  const [ids, setIds] = useState(catalog.slice(0, 3).map(({ id }) => id))
  const [edges, setEdges] = useState({ start: false, end: false })
  const selected = ids.map((id) => catalog.find((university) => university.id === id))
  const available = catalog.filter(({ id }) => !ids.includes(id))

  const scroller = useRef(null)

  function updateEdges(element) {
    setEdges({
      start: element.scrollLeft > 0,
      end: element.scrollLeft + element.clientWidth < element.scrollWidth - 1,
    })
  }

  // Scroll shadows depend on width, so recheck on resize and when columns change.
  useEffect(() => {
    const element = scroller.current
    updateEdges(element)
    if (typeof ResizeObserver === 'undefined') return undefined
    const observer = new ResizeObserver(() => updateEdges(element))
    observer.observe(element)
    return () => observer.disconnect()
  }, [selected.length])

  return (
    <div className="compare">
      <aside className="compare__sidebar">
        <a className="compare__brand" href="/" aria-label="US Match home">
          <span aria-hidden="true">✧</span><span className="compare__label">US Match</span>
        </a>
        <nav aria-label="Main navigation">
          {navigation.map(([icon, label, href]) => {
            const content = (
              <>
                <span className="compare__icon" aria-hidden="true">{icon}</span>
                <span className="compare__label">{label}</span>
              </>
            )
            return href ? (
              <a key={label} href={href} data-tooltip={label} aria-current={href === '/compare' ? 'page' : undefined}>
                {content}
              </a>
            ) : (
              <span key={label} data-tooltip={label} aria-disabled="true">{content}</span>
            )
          })}
        </nav>
        <div className="compare__premium">
          <strong>Go Premium</strong>
          <p>AI Counselor, Compare і детальний аналіз</p>
          <button type="button" disabled>Upgrade</button>
        </div>
        <button className="compare__premium-icon" type="button" disabled aria-label="Go Premium" data-tooltip="Go Premium">
          <span aria-hidden="true">♛</span>
        </button>
      </aside>

      <main className="compare__main">
        <header className="compare__header">
          <div>
            <h1>Compare</h1>
            <p>Порівняй 2-4 університети поруч</p>
          </div>
          <div className="compare__account">
            <span className="compare__notification" role="img" aria-label="Notifications">♧</span>
            <span className="compare__avatar" aria-label="Profile initial L">L</span>
          </div>
        </header>

        <div className="compare__card" data-shadow-start={edges.start} data-shadow-end={edges.end}>
          <div
            className="compare__scroller"
            tabIndex={0}
            role="region"
            aria-label="Comparison table"
            ref={scroller}
            onScroll={(event) => updateEdges(event.currentTarget)}
          >
            <table className="compare__table" style={{ '--unis': selected.length, '--slot': selected.length < MAX ? 1 : 0 }}>
              <thead>
                <tr>
                  <td className="compare__corner" />
                  {selected.map((university) => (
                    <th key={university.id} scope="col">
                      <div className="compare__university">
                        <span className={`compare__logo compare__logo--${university.id}`} aria-hidden="true">
                          {university.name[0]}
                        </span>
                        <span className="compare__name" title={university.name}>{university.name}</span>
                        <span className="compare__tag" data-tag={university.tag}>{university.tag}</span>
                        {selected.length > MIN && (
                          <button
                            className="compare__remove"
                            type="button"
                            aria-label={`Remove ${university.name}`}
                            onClick={() => setIds(ids.filter((id) => id !== university.id))}
                          >
                            <span aria-hidden="true">×</span>
                          </button>
                        )}
                      </div>
                    </th>
                  ))}
                  {selected.length < MAX && (
                    <th scope="col" className="compare__slot">
                      <label className="compare__add">
                        <span aria-hidden="true">+</span>
                        Add university
                        <select
                          value=""
                          aria-label="Add university"
                          onChange={(event) => event.target.value && setIds([...ids, event.target.value])}
                        >
                          <option value="">Choose…</option>
                          {available.map(({ id, name }) => <option key={id} value={id}>{name}</option>)}
                        </select>
                      </label>
                    </th>
                  )}
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => {
                  const best = bestValue(row, selected)
                  return (
                    <tr key={row.key}>
                      <th scope="row">{row.label}</th>
                      {selected.map((university) => {
                        const value = university[row.key]
                        const isBest = best !== undefined && value === best
                        return (
                          <td key={university.id} data-best={isBest || undefined}>
                            {row.format ? row.format(value) : value}
                            {isBest && <span className="compare__best">Best</span>}
                          </td>
                        )
                      })}
                      {selected.length < MAX && <td className="compare__slot" />}
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  )
}
