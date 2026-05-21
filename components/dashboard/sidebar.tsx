'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,
  Hotel,
  UtensilsCrossed,
  Car,
  Compass,
  Calendar,
  Users,
  LogOut,
  ChevronDown,
} from 'lucide-react';
import { useAuth } from '@/lib/auth-context';
import { cn } from '@/lib/utils';

interface NavChild {
  label: string;
  href: string;
}

interface NavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
  children?: NavChild[];
}

const navItems: NavItem[] = [
  {
    label: 'Tableau de bord',
    href: '/dashboard',
    icon: <LayoutDashboard className="h-5 w-5" />,
  },
  {
    label: 'Hébergements',
    href: '/dashboard/hebergements',
    icon: <Hotel className="h-5 w-5" />,
    children: [
      { label: 'Liste des hôtels', href: '/dashboard/hebergements' },
    ],
  },
  {
    label: 'Restaurants',
    href: '/dashboard/restaurants',
    icon: <UtensilsCrossed className="h-5 w-5" />,
  },
  {
    label: 'Voitures',
    href: '/dashboard/voitures',
    icon: <Car className="h-5 w-5" />,
  },
  {
    label: 'Attractions',
    href: '/dashboard/attractions',
    icon: <Compass className="h-5 w-5" />,
  },
  {
    label: 'Réservations',
    href: '/dashboard/reservations',
    icon: <Calendar className="h-5 w-5" />,
  },
  {
    label: 'Utilisateurs',
    href: '/dashboard/utilisateurs',
    icon: <Users className="h-5 w-5" />,
  },
];

export function DashboardSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuth();
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    '/dashboard/hebergements': true,
  });

  const handleLogout = () => {
    logout();
    router.push('/sign-in');
  };

  const toggleSection = (href: string) => {
    setOpenSections((prev) => ({ ...prev, [href]: !prev[href] }));
  };

  const isActive = (href: string) => {
    if (!pathname) return false;
    if (href === '/dashboard') return pathname === '/dashboard';
    return pathname.startsWith(href);
  };

  return (
    <aside className="flex h-full w-64 flex-col bg-white border-r border-gray-200 shadow-sm flex-shrink-0">
      {/* Logo */}
      <div className="flex items-center gap-2 px-6 py-5 border-b border-gray-200">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-orange-500">
          <Hotel className="h-5 w-5 text-white" />
        </div>
        <div>
          <span className="font-bold text-gray-900 text-sm leading-tight block">
            South<span className="text-orange-500">Booking</span>
          </span>
          <span className="text-xs text-gray-500">Administration</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
        {navItems.map((item) => (
          <div key={item.href}>
            {item.children ? (
              <div>
                <button
                  onClick={() => toggleSection(item.href)}
                  className={cn(
                    'flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200',
                    isActive(item.href)
                      ? 'bg-orange-50 text-orange-600'
                      : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                  )}
                >
                  <div className="flex items-center gap-3">
                    <span className={cn(
                      'transition-colors duration-200',
                      isActive(item.href) ? 'text-orange-500' : 'text-gray-500'
                    )}>
                      {item.icon}
                    </span>
                    {item.label}
                  </div>
                  <ChevronDown
                    className={cn(
                      'h-4 w-4 text-gray-400 transition-transform duration-200',
                      openSections[item.href] ? 'rotate-0' : '-rotate-90'
                    )}
                  />
                </button>

                <AnimatePresence initial={false}>
                  {openSections[item.href] && (
                    <motion.div
                      key="accordion"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <div className="ml-4 mt-1 space-y-1 border-l-2 border-gray-100 pl-4 pb-1">
                        {item.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className={cn(
                              'block rounded-md px-3 py-2 text-sm transition-all duration-200',
                              pathname === child.href
                                ? 'bg-orange-50 text-orange-600 font-medium'
                                : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                            )}
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link
                href={item.href}
                className={cn(
                  'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200',
                  isActive(item.href)
                    ? 'bg-orange-50 text-orange-600'
                    : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                )}
              >
                <span className={cn(
                  'transition-colors duration-200',
                  isActive(item.href) ? 'text-orange-500' : 'text-gray-500'
                )}>
                  {item.icon}
                </span>
                {item.label}
              </Link>
            )}
          </div>
        ))}
      </nav>

      {/* User info + logout */}
      <div className="border-t border-gray-200 p-4 space-y-3">
        {user && (
          <div className="flex items-center gap-3 px-1">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-orange-100 text-orange-700 font-semibold text-sm flex-shrink-0">
              {user.name?.charAt(0).toUpperCase()}
            </div>
            <div className="overflow-hidden">
              <p className="text-sm font-medium text-gray-900 truncate">{user.name}</p>
              <p className="text-xs text-gray-500 truncate">{user.email}</p>
            </div>
          </div>
        )}
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-gray-700 hover:bg-red-50 hover:text-red-600 transition-all duration-200"
        >
          <LogOut className="h-5 w-5" />
          Se déconnecter
        </button>
      </div>
    </aside>
  );
}
