import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import React from 'react'
import App from '@/App.jsx'

describe('App', () => {
  it('renders without crashing', () => {
    const { container } = render(<App />)
    expect(container).toBeTruthy()
  })
})
