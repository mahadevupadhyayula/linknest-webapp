import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import LoginPage from '@/pages/login';
import SignupPage from '@/pages/signup';

const push = jest.fn();
const replace = jest.fn();

jest.mock('next/router', () => ({
  useRouter: () => ({ push, replace }),
}));

jest.mock('@/lib/auth', () => ({
  getMe: jest.fn().mockRejectedValue(new Error('not authed')),
  login: jest.fn().mockResolvedValue({ token: 'login-token' }),
  signup: jest.fn().mockResolvedValue({ token: 'signup-token' }),
  setToken: jest.fn(),
}));

const authLib = require('@/lib/auth');

function renderWithClient(ui) {
  const client = new QueryClient({ defaultOptions: { queries: { retry: false } } });
  return render(<QueryClientProvider client={client}>{ui}</QueryClientProvider>);
}

describe('Auth pages', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('submits login form', async () => {
    renderWithClient(<LoginPage />);

    fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'u@example.com' } });
    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'pw' } });
    fireEvent.click(screen.getByRole('button', { name: /Sign in/i }));

    await waitFor(() => expect(authLib.login).toHaveBeenCalled());
    expect(push).toHaveBeenCalledWith('/dashboard');
  });

  test('submits signup form', async () => {
    renderWithClient(<SignupPage />);

    fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'u@example.com' } });
    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'pw' } });
    fireEvent.click(screen.getByRole('button', { name: /Create account/i }));

    await waitFor(() => expect(authLib.signup).toHaveBeenCalled());
    expect(push).toHaveBeenCalledWith('/dashboard');
  });
});
