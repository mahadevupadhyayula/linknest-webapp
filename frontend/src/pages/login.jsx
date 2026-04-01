import { useMutation, useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getMe, login, setToken } from '@/lib/auth';

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: '', password: '' });

  const meQuery = useQuery({
    queryKey: ['me'],
    queryFn: getMe,
    retry: false,
  });

  useEffect(() => {
    if (meQuery.data?.user) {
      router.replace('/dashboard');
    }
  }, [meQuery.data, router]);

  const loginMutation = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      setToken(data.token);
      router.push('/dashboard');
    },
  });

  const onSubmit = (event) => {
    event.preventDefault();
    loginMutation.mutate(form);
  };

  return (
    <main className="mx-auto mt-24 max-w-md rounded border p-6 shadow">
      <h1 className="mb-4 text-2xl font-semibold">Log in</h1>
      <form className="space-y-4" onSubmit={onSubmit}>
        <input
          className="w-full rounded border p-2"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm((prev) => ({ ...prev, email: e.target.value }))}
          required
        />
        <input
          className="w-full rounded border p-2"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm((prev) => ({ ...prev, password: e.target.value }))}
          required
        />
        <button
          className="w-full rounded bg-slate-900 p-2 text-white"
          type="submit"
          disabled={loginMutation.isPending}
        >
          {loginMutation.isPending ? 'Signing in...' : 'Sign in'}
        </button>
      </form>
      {loginMutation.isError && (
        <p className="mt-3 text-sm text-red-600">{loginMutation.error.message}</p>
      )}
    </main>
  );
}
