import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { clearToken, getMe } from '@/lib/auth';

export default function DashboardPage() {
  const router = useRouter();
  const meQuery = useQuery({ queryKey: ['me'], queryFn: getMe, retry: false });

  useEffect(() => {
    if (meQuery.isError) {
      clearToken();
      router.replace('/login');
    }
  }, [meQuery.isError, router]);

  return (
    <main className="mx-auto mt-24 max-w-2xl p-6">
      <h1 className="text-3xl font-semibold">Dashboard</h1>
      <p className="mt-4 text-slate-700">Welcome {meQuery.data?.user?.email}</p>
    </main>
  );
}
