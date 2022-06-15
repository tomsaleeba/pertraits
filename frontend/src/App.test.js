import { render, screen } from '@testing-library/react'
import App from './App'

test('renders learn react link', () => {
  render(<App />)
  const someElement = screen.getByText(/Pertraits/i)
  expect(someElement).toBeInTheDocument()
})
