'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const allReservations = [
  { id: 'RES-001', client: 'Jean Dupont', type: 'Hébergement', date: '2024-01-15', montant: '320 000 Ar', statut: 'confirmée' },
  { id: 'RES-002', client: 'Marie Claire', type: 'Restaurant', date: '2024-01-16', montant: '85 000 Ar', statut: 'en attente' },
  { id: 'RES-003', client: 'Paul Martin', type: 'Voiture', date: '2024-01-16', montant: '150 000 Ar', statut: 'confirmée' },
  { id: 'RES-004', client: 'Sophie Blanc', type: 'Attraction', date: '2024-01-17', montant: '45 000 Ar', statut: 'annulée' },
  { id: 'RES-005', client: 'Marc Leroy', type: 'Hébergement', date: '2024-01-17', montant: '480 000 Ar', statut: 'en attente' },
  { id: 'RES-006', client: 'Alice Moreau', type: 'Voiture', date: '2024-01-18', montant: '75 000 Ar', statut: 'confirmée' },
  { id: 'RES-007', client: 'Bruno Silva', type: 'Restaurant', date: '2024-01-18', montant: '60 000 Ar', statut: 'annulée' },
  { id: 'RES-008', client: 'Céline Durand', type: 'Attraction', date: '2024-01-19', montant: '30 000 Ar', statut: 'confirmée' },
];

type Filtre = 'tous' | 'confirmée' | 'en attente' | 'annulée';

function statutBadge(statut: string) {
  if (statut === 'confirmée') return <Badge className="bg-green-100 text-green-700 hover:bg-green-100">Confirmée</Badge>;
  if (statut === 'en attente') return <Badge className="bg-yellow-100 text-yellow-700 hover:bg-yellow-100">En attente</Badge>;
  return <Badge className="bg-red-100 text-red-700 hover:bg-red-100">Annulée</Badge>;
}

const filtres: { label: string; value: Filtre }[] = [
  { label: 'Toutes', value: 'tous' },
  { label: 'Confirmées', value: 'confirmée' },
  { label: 'En attente', value: 'en attente' },
  { label: 'Annulées', value: 'annulée' },
];

export default function ReservationsPage() {
  const [filtre, setFiltre] = useState<Filtre>('tous');

  const filtered = filtre === 'tous' ? allReservations : allReservations.filter(r => r.statut === filtre);

  return (
    <div className="p-6 space-y-6">
      <div>
        <p className="text-sm text-gray-500">Dashboard / Réservations</p>
        <h1 className="text-2xl font-bold text-gray-900">Réservations</h1>
      </div>

      <div className="flex items-center gap-2 flex-wrap">
        {filtres.map(f => (
          <button key={f.value} onClick={() => setFiltre(f.value)}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition-all duration-150 hover:scale-105 active:scale-95 ${
              filtre === f.value ? 'bg-orange-500 text-white shadow-sm' : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
            }`}>
            {f.label}
          </button>
        ))}
      </div>

      <div className="rounded-xl bg-white border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">ID</th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">Client</th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">Type</th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">Date</th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">Montant</th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">Statut</th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              <AnimatePresence mode="popLayout">
                {filtered.map((r, i) => (
                  <motion.tr key={r.id}
                    initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 8 }}
                    transition={{ delay: i * 0.03 }}
                    className={`hover:bg-orange-50/40 transition-colors ${i % 2 !== 0 ? 'bg-gray-50/30' : ''}`}>
                    <td className="px-6 py-4 font-mono text-xs text-gray-500">{r.id}</td>
                    <td className="px-6 py-4 font-medium text-gray-900">{r.client}</td>
                    <td className="px-6 py-4 text-gray-600">{r.type}</td>
                    <td className="px-6 py-4 text-gray-600">{r.date}</td>
                    <td className="px-6 py-4 font-medium text-gray-900">{r.montant}</td>
                    <td className="px-6 py-4">{statutBadge(r.statut)}</td>
                    <td className="px-6 py-4">
                      <Link href={`/dashboard/reservations/${r.id}`}>
                        <Button size="sm" variant="outline"
                          className="gap-1 text-xs transition-all duration-150 hover:scale-105 active:scale-95 hover:border-orange-300 hover:text-orange-600">
                          <Eye className="h-3 w-3" /> Voir
                        </Button>
                      </Link>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-12 text-center text-gray-500">
            Aucune réservation pour ce filtre.
          </motion.div>
        )}
      </div>
    </div>
  );
}
