import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import App from '../src/App.jsx'

describe('App', () => {
  it('renders the main heading', () => {
    render(<App />)
    expect(
      screen.getByRole('heading', { level: 1, name: /ItStepProject/ })
    ).toBeInTheDocument()
  })

  it('renders the "project started" message', () => {
    render(<App />)
    expect(screen.getByText('Проєкт успішно запущено!')).toBeInTheDocument()
  })

  it('has exactly one top-level heading (accessibility)', () => {
    render(<App />)
    expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1)
  })
})
