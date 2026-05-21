'use client';

import { Hotel, UtensilsCrossed, Car, Compass, Calendar, Users, TrendingUp } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const stats = [
  {
    title: 'Hébergements',
    value: 48,
    trend: '+12% ce mois',
    icon: <Hotel className="h-6 w-6 text-orange-500" />,
    bg: 'bg-orange-50',
  },
  {
    title: 'Restaurants',
    value: 32,
    trend: '+5% ce mois',
    icon: <UtensilsCrossed className="h-6 w-6 text-amber-500" />,
    bg: 'bg-amber-50',
  },
  {
    title: 'Voitures',
    value: 24,
    trend: '+8% ce mois',
    icon: <Car className="h-6 w-6 text-blue-500" />,
    bg: 'bg-blue-50',
  },
  {
    title: 'Attractions',
    value: 18,
    trend: '+3% ce mois',
    icon: <Compass className="h-6 w-6 text-green-500" />,
    bg: 'bg-green-50',
  },
  {
    title: 'Réservations',
    value: 156,
    trend: '+24% ce mois',
    icon: <Calendar className="h-6 w-6 text-purple-500" />,
    bg: 'bg-purple-50',
  },
  {
    title: 'Utilisateurs',
    value: 89,
    trend: '+18% ce mois',
    icon: <Users className="h-6 w-6 text-pink-500" />,
    bg: 'bg-pink-50',
  },
];

const recentReservations = [
  { id: 'RES-001', client: 'Jean Dupont', type: 'Hébergement', date: '2024-01-15', montant: '320 000 Ar', statut: 'confirmée' },
  { id: 'RES-002', client: 'Marie Claire', type: 'Restaurant', date: '2024-01-16', montant: '85 000 Ar', statut: 'en attente' },
  { id: 'RES-003', client: 'Paul Martin', type: 'Voiture', date: '2024-01-16', montant: '150 000 Ar', statut: 'confirmée' },
  { id: 'RES-004', client: 'Sophie Blanc', type: 'Attraction', date: '2024-01-17', montant: '45 000 Ar', statut: 'annulée' },
  { id: 'RES-005', client: 'Marc Leroy', type: 'Hébergement', date: '2024-01-17', montant: '480 000 Ar', statut: 'en attente' },
];

function statusBadge(statut: string) {
  if (statut === 'confirmée') return <Badge className="bg-green-100 text-green-700 hover:bg-green-100">Confirmée</Badge>;
  if (statut === 'en attente') return <Badge className="bg-yellow-100 text-yellow-700 hover:bg-yellow-100">En attente</Badge>;
  return <Badge className="bg-red-100 text-red-700 hover:bg-red-100">Annulée</Badge>;
}

export default function DashboardPage() {
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <p className="text-sm text-gray-500">Administration</p>
        <h1 className="text-2xl font-bold text-gray-900">Tableau de bord</h1>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map((stat) => (
          <div key={stat.title} className="rounded-xl bg-white border border-gray-200 p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">{stat.title}</p>
                <p className="mt-1 text-3xl font-bold text-gray-900">{stat.value}</p>
              </div>
              <div className={`rounded-xl p-3 ${stat.bg}`}>
                {stat.icon}
              </div>
            </div>
            <div className="mt-3 flex items-center gap-1 text-sm text-green-600">
              <TrendingUp className="h-4 w-4" />
              <span>{stat.trend}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Recent reservations */}
      <div className="rounded-xl bg-white border border-gray-200 shadow-sm">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <h2 className="text-base font-semibold text-gray-900">Réservations récentes</h2>
          <a href="/dashboard/reservations" className="text-sm text-orange-500 hover:text-orange-600 font-medium">
            Voir tout →
          </a>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 text-left">
                <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500">ID</th>
                <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500">Client</th>
                <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500">Type</th>
                <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500">Date</th>
                <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500">Montant</th>
                <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500">Statut</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {recentReservations.map((r, i) => (
                <tr key={r.id} className={`hover:bg-gray-50 transition-colors ${i % 2 === 0 ? '' : 'bg-gray-50/30'}`}>
                  <td className="px-6 py-4 font-mono text-xs text-gray-500">{r.id}</td>
                  <td className="px-6 py-4 font-medium text-gray-900">{r.client}</td>
                  <td className="px-6 py-4 text-gray-600">{r.type}</td>
                  <td className="px-6 py-4 text-gray-600">{r.date}</td>
                  <td className="px-6 py-4 font-medium text-gray-900">{r.montant}</td>
                  <td className="px-6 py-4">{statusBadge(r.statut)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
