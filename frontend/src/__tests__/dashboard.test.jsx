import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import DashboardIndexPage from '@/pages/dashboard';
import TargetDetailPage from '@/pages/dashboard/target/[id]';

jest.mock('next/link', () => {
  return ({ children, href, ...props }) => (
    <a href={href} {...props}>
      {children}
    </a>
  );
});

jest.mock('next/router', () => ({
  useRouter: () => ({ query: { id: 'acme-health' } }),
}));

jest.mock('@/lib/dashboard', () => ({
  fetchDashboardData: jest.fn().mockResolvedValue({
    priorityActions: [{ id: 'a1', action: 'Follow up', due: 'Today', targetId: 'acme-health' }],
    pipeline: { hot: [{ id: 'acme-health', name: 'Acme' }], warm: [], cold: [] },
    newTargetSuggestions: [{ id: 's1', name: 'Beacon', reason: 'fit', stage: 'Warm' }],
    suggestedDrafts: [{ id: 'd1', title: 'Draft 1', targetId: 'acme-health' }],
    targets: [{ id: 'acme-health', name: 'Acme' }],
  }),
  fetchTargetById: jest.fn().mockResolvedValue({
    name: 'Acme Health',
    title: 'Director',
    company: 'Acme',
    fit: 'Strong fit',
    timeline: [{ id: 't1', date: '2026-03-30', event: 'Replied to email' }],
    aiSuggestion: 'Send a follow-up',
  }),
}));

function renderWithClient(ui) {
  const client = new QueryClient({ defaultOptions: { queries: { retry: false } } });
  return render(<QueryClientProvider client={client}>{ui}</QueryClientProvider>);
}

describe('Dashboard pages', () => {
  test('renders dashboard cards', async () => {
    renderWithClient(<DashboardIndexPage />);

    expect(await screen.findByText('Priority Actions')).toBeInTheDocument();
    expect(screen.getByText('Target Pipeline (Hot/Warm/Cold)')).toBeInTheDocument();
    expect(screen.getByText('New Target Suggestions')).toBeInTheDocument();
  });

  test('renders target detail interactions', async () => {
    renderWithClient(<TargetDetailPage />);

    expect(await screen.findByText('AI Suggestion Panel')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: /Save log entry/i }));
    await waitFor(() => expect(screen.getByPlaceholderText('Activity title')).toBeInTheDocument());
  });
});
