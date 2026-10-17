import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import App from '../App.jsx'

describe('App', () => {
  it('renders the main heading', () => {
    render(<App />)
    const heading = screen.getByRole('heading', { level: 1 })
    expect(heading).toBeInTheDocument()
    expect(heading.textContent).toContain('ItStepProject')
  })

  it('renders the success message', () => {
    render(<App />)
    const message = screen.getByText(/проєкт успішно запущено/i)
    expect(message).toBeInTheDocument()
  })

  it('renders the app container', () => {
    render(<App />)
    const container = screen.getByRole('heading', { level: 1 }).closest('.App')
    expect(container).toBeInTheDocument()
  })
})
