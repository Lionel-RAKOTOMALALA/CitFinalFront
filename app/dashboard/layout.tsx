'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import { DashboardSidebar } from '@/components/dashboard/sidebar';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { user, isSignedIn } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [checking, setChecking] = useState(true);

  const isLoginPage = pathname === '/dashboard/login';

  useEffect(() => {
    if (isLoginPage) {
      setChecking(false);
      return;
    }
    const timer = setTimeout(() => {
      if (!isSignedIn) {
        router.replace('/dashboard/login');
      } else if (user && user.role !== 'admin') {
        router.replace('/');
      } else {
        setChecking(false);
      }
    }, 150);
    return () => clearTimeout(timer);
  }, [isSignedIn, user, router, isLoginPage]);

  if (isLoginPage) return <>{children}</>;

  if (checking) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center gap-3">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-orange-500 border-t-transparent" />
          <p className="text-sm text-gray-500">Vérification des accès...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      <DashboardSidebar />
      <main className="flex-1 overflow-auto bg-gray-50">
        {children}
      </main>
    </div>
  );
}
