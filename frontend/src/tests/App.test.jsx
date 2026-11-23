import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, it, expect } from 'vitest'
import App from '../App.jsx'

const renderAt = (path) =>
  render(
    <MemoryRouter initialEntries={[path]}>
      <App />
    </MemoryRouter>,
  )

const next = () => fireEvent.click(screen.getByRole('button', { name: /Далі/ }))

describe('App routing', () => {
  it('redirects / to the sign-up page', () => {
    renderAt('/')
    expect(screen.getByRole('heading', { name: 'Створи акаунт' })).toBeInTheDocument()
  })

  it('renders every route', () => {
    renderAt('/signin')
    expect(screen.getByRole('heading', { name: 'Вхід' })).toBeInTheDocument()
  })

  it('renders onboarding at /onboarding', () => {
    renderAt('/onboarding')
    expect(screen.getByRole('heading', { name: 'Твоя академічна база' })).toBeInTheDocument()
  })

  it('renders the dashboard at /dashboard', () => {
    renderAt('/dashboard')
    expect(screen.getByRole('heading', { name: 'Твій профіль готовий' })).toBeInTheDocument()
  })

  it('redirects unknown routes to sign-up', () => {
    renderAt('/nope')
    expect(screen.getByRole('heading', { name: 'Створи акаунт' })).toBeInTheDocument()
  })

  it('links between sign-up and sign-in', () => {
    renderAt('/signup')
    fireEvent.click(screen.getByRole('link', { name: /Увійти/ }))
    expect(screen.getByRole('heading', { name: 'Вхід' })).toBeInTheDocument()
    fireEvent.click(screen.getByRole('link', { name: /Створити/ }))
    expect(screen.getByRole('heading', { name: 'Створи акаунт' })).toBeInTheDocument()
  })

  it('sign-in goes to the dashboard', () => {
    renderAt('/signin')
    fireEvent.click(screen.getByRole('button', { name: 'Увійти' }))
    expect(screen.getByRole('heading', { name: 'Твій профіль готовий' })).toBeInTheDocument()
  })

  it('walks the full flow: sign-up → steps 1-3 → dashboard', () => {
    renderAt('/')
    fireEvent.click(screen.getByRole('button', { name: 'Створи акаунт' }))
    expect(screen.getByRole('heading', { name: 'Твоя академічна база' })).toBeInTheDocument()
    next()
    expect(screen.getByRole('heading', { name: 'Твої activities' })).toBeInTheDocument()
    next()
    expect(screen.getByText('Побажання', { selector: 'h1' })).toBeInTheDocument()
    next()
    expect(screen.getByRole('heading', { name: 'Твій профіль готовий' })).toBeInTheDocument()
  })
})
