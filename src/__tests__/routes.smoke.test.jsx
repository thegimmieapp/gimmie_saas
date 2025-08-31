import { describe, it, expect } from 'vitest'
import React from 'react'
import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Pages from '@/pages/index.jsx'

describe('Routes smoke', () => {
  it('renders Pages in a router context', () => {
    const { container } = render(
      <MemoryRouter initialEntries={["/"]}>
        <Pages />
      </MemoryRouter>
    )
    expect(container).toBeTruthy()
  })
})
