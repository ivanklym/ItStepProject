import { render, screen, within, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import Compare from '../pages/Compare.jsx'

const columnHeaders = () => screen.getAllByRole('columnheader')

describe('Compare', () => {
  it('renders header and 3 universities plus an add slot by default', () => {
    render(<Compare />)
    expect(screen.getByRole('heading', { level: 1, name: 'Compare' })).toBeInTheDocument()
    expect(screen.getByText('Порівняй 2-4 університети поруч')).toBeInTheDocument()
    expect(columnHeaders()).toHaveLength(4)
    expect(screen.getByLabelText('Add university')).toBeInTheDocument()
  })

  it('shows every comparison row', () => {
    render(<Compare />)
    for (const label of ['Match', 'Acceptance rate', 'SAT', 'GPA', 'Tuition', 'Financial aid', 'Size', 'Location']) {
      expect(screen.getByRole('rowheader', { name: label })).toBeInTheDocument()
    }
  })

  it('highlights the best value in a row', () => {
    render(<Compare />)
    const tuition = screen.getByRole('rowheader', { name: 'Tuition' }).closest('tr')
    const best = within(tuition).getAllByRole('cell').filter((cell) => cell.hasAttribute('data-best'))
    expect(best).toHaveLength(1)
    expect(best[0]).toHaveTextContent('$47k')
  })

  it('adds a 4th university and hides the empty slot', () => {
    render(<Compare />)
    fireEvent.change(screen.getByLabelText('Add university'), { target: { value: 'northbridge' } })
    expect(columnHeaders()).toHaveLength(4)
    expect(screen.queryByLabelText('Add university')).not.toBeInTheDocument()
    expect(screen.getByTitle('Northbridge Institute of Technology and Design')).toBeInTheDocument()
  })

  it('does not allow fewer than 2 universities', () => {
    render(<Compare />)
    fireEvent.click(screen.getByRole('button', { name: 'Remove Harborside College' }))
    expect(screen.queryByRole('button', { name: /^Remove / })).not.toBeInTheDocument()
    expect(columnHeaders()).toHaveLength(3)
  })
})
