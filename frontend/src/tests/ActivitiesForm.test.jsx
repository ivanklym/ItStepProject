import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import ActivitiesForm, { DEFAULT_ACTIVITIES } from '../components/Onboarding/ActivitiesForm/ActivitiesForm.jsx'
import Onboarding from '../pages/Onboarding.jsx'

describe('ActivitiesForm', () => {
  it('shows selected tags pressed and available tags with a plus', () => {
    render(<ActivitiesForm values={DEFAULT_ACTIVITIES} onChange={() => {}} />)
    expect(screen.getByRole('button', { name: 'Leadership' })).toHaveAttribute('aria-pressed', 'true')
    expect(screen.getByRole('button', { name: '+ Awards' })).toHaveAttribute('aria-pressed', 'false')
  })

  it('toggles tags through onChange', () => {
    const onChange = vi.fn()
    render(<ActivitiesForm values={DEFAULT_ACTIVITIES} onChange={onChange} />)
    fireEvent.click(screen.getByRole('button', { name: '+ Research' }))
    expect(onChange).toHaveBeenCalledWith('tags', [...DEFAULT_ACTIVITIES.tags, 'Research'])
    fireEvent.click(screen.getByRole('button', { name: 'Leadership' }))
    expect(onChange).toHaveBeenCalledWith('tags', ['Community Service', 'Initiative'])
  })

  it('is reached from step 1 via "Далі" and returns via "Назад"', () => {
    render(<Onboarding />)
    fireEvent.click(screen.getByRole('button', { name: /Далі/ }))
    expect(screen.getByRole('heading', { name: 'Твої activities' })).toBeInTheDocument()
    expect(screen.getByLabelText('Опиши activity')).toHaveValue(DEFAULT_ACTIVITIES.description)
    fireEvent.click(screen.getByRole('button', { name: 'Назад' }))
    expect(screen.getByRole('heading', { name: 'Твоя академічна база' })).toBeInTheDocument()
  })
})
