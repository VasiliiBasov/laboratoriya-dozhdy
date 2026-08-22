import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the site header', () => {
  render(<App />);
  // Логотип/хедер должны быть в DOM сразу — это базовый маркер, что приложение поднялось.
  expect(screen.getByRole('banner')).toBeInTheDocument();
});
