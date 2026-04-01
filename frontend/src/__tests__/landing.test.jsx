import { render, screen } from '@testing-library/react';
import LandingPage from '@/pages/index';

jest.mock('next/link', () => {
  return ({ children, href, ...props }) => (
    <a href={href} {...props}>
      {children}
    </a>
  );
});

describe('Landing page', () => {
  test('renders hero and CTA content', () => {
    render(<LandingPage />);

    expect(screen.getByText(/Build smarter outreach strategies/i)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Start for Free/i })).toBeInTheDocument();
    expect(screen.getByText(/Ready to launch better outreach/i)).toBeInTheDocument();
  });
});
