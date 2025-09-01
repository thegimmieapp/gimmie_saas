import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import Dashboard from '@/pages/Dashboard'
import Settings from '@/pages/Settings'

describe('Route smoke tests', () => {
  it('renders Dashboard page', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Dashboard />
      </MemoryRouter>
    )
    expect(screen.getByText(/Dashboard/i)).toBeInTheDocument()
  })

  it('renders Settings page', () => {
    render(
      <MemoryRouter initialEntries={['/settings']}>
        <Settings />
      </MemoryRouter>
    )
    expect(screen.getByText(/Settings/i)).toBeInTheDocument()
  })
})
