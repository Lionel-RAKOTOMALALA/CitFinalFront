import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { cn } from '@/lib/utils';
import { ThemeProvider } from '@/components/theme-provider';
import { TRPCProvider } from '@/components/providers/trpc-provider';
import { AuthProvider } from '@/lib/auth-context';
import { ConditionalLayout } from '@/components/layout/conditional-layout';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'SouthBooking - Votre Plateforme de Réservation Premium',
  description: 'Réservez des hôtels, restaurants, voitures de location et attractions touristiques dans la région Sud.',
};

// Force dynamic rendering
export const dynamic = 'force-dynamic';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body className={cn(
        inter.className,
        "min-h-screen antialiased"
      )}>
        <AuthProvider>
          <TRPCProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="light"
              enableSystem
              disableTransitionOnChange
            >
              <ConditionalLayout>{children}</ConditionalLayout>
            </ThemeProvider>
          </TRPCProvider>
        </AuthProvider>
      </body>
    </html>
  );
}