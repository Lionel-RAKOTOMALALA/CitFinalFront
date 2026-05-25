'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import { DashboardSidebar } from '@/components/dashboard/sidebar';
import { PageLoader } from '@/components/layout/page-loader';

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
      <PageLoader
        variant="fullscreen"
        label="Vérification des accès..."
        className="bg-background"
      />
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
