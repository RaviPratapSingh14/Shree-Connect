import { render, screen } from '@testing-library/react';
import App from './App';

jest.mock('axios', () => ({
  create: () => ({
    get: jest.fn(),
    post: jest.fn(),
  }),
}));

test('renders the landing page', () => {
  render(<App />);
  const linkElement = screen.getByRole('link', { name: /get started/i });
  expect(linkElement).toBeInTheDocument();
});
