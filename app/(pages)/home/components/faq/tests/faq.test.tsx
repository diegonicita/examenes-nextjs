import { render, screen } from '@testing-library/react'
import Faq from '../faq'

describe('Page', () => {
  it('renders a heading', () => {
    render(<Faq />)

    const heading = screen.getByRole('heading', { level: 1 })

    expect(heading).toBeInTheDocument()
  })
})
