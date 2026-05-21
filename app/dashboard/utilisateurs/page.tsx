'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Eye, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ConfirmModal } from '@/components/dashboard/modal';

type Utilisateur = { id: string; nom: string; email: string; role: string; dateInscription: string; statut: string };

const initialData: Utilisateur[] = [
  { id: '1', nom: 'Admin Principal', email: 'admin@southbooking.com', role: 'admin', dateInscription: '2023-06-01', statut: 'actif' },
  { id: '2', nom: 'Jean Dupont', email: 'jean.dupont@email.com', role: 'user', dateInscription: '2023-09-15', statut: 'actif' },
  { id: '3', nom: 'Marie Claire', email: 'marie.claire@email.com', role: 'user', dateInscription: '2023-10-22', statut: 'actif' },
  { id: '4', nom: 'Paul Martin', email: 'paul.martin@email.com', role: 'user', dateInscription: '2023-11-05', statut: 'inactif' },
  { id: '5', nom: 'Sophie Blanc', email: 'sophie.blanc@email.com', role: 'user', dateInscription: '2024-01-10', statut: 'actif' },
  { id: '6', nom: 'Marc Leroy', email: 'marc.leroy@email.com', role: 'user', dateInscription: '2024-01-12', statut: 'actif' },
];

export default function UtilisateursPage() {
  const [items, setItems] = useState<Utilisateur[]>(initialData);
  const [deleteItem, setDeleteItem] = useState<Utilisateur | null>(null);

  return (
    <div className="p-6 space-y-6">
      <div>
        <p className="text-sm text-gray-500">Dashboard / Utilisateurs</p>
        <h1 className="text-2xl font-bold text-gray-900">Utilisateurs</h1>
      </div>

      <div className="rounded-xl bg-white border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">Nom</th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">Email</th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">Rôle</th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">Date d&apos;inscription</th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">Statut</th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {items.map((u, i) => (
                <motion.tr key={u.id} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.04 }}
                  className={`hover:bg-orange-50/40 transition-colors ${i % 2 !== 0 ? 'bg-gray-50/30' : ''}`}>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-full bg-orange-100 text-orange-700 flex items-center justify-center font-semibold text-xs flex-shrink-0">
                        {u.nom.charAt(0)}
                      </div>
                      <span className="font-medium text-gray-900">{u.nom}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-600">{u.email}</td>
                  <td className="px-6 py-4">
                    {u.role === 'admin'
                      ? <Badge className="bg-orange-100 text-orange-700 hover:bg-orange-100">Admin</Badge>
                      : <Badge className="bg-gray-100 text-gray-700 hover:bg-gray-100">Utilisateur</Badge>}
                  </td>
                  <td className="px-6 py-4 text-gray-600">{u.dateInscription}</td>
                  <td className="px-6 py-4">
                    {u.statut === 'actif'
                      ? <Badge className="bg-green-100 text-green-700 hover:bg-green-100">Actif</Badge>
                      : <Badge className="bg-red-100 text-red-700 hover:bg-red-100">Inactif</Badge>}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Link href={`/dashboard/utilisateurs/${u.id}`}>
                        <Button size="sm" variant="outline"
                          className="gap-1 text-xs transition-all duration-150 hover:scale-105 active:scale-95 hover:border-orange-300 hover:text-orange-600">
                          <Eye className="h-3 w-3" /> Voir
                        </Button>
                      </Link>
                      <Button size="sm" variant="outline" onClick={() => setDeleteItem(u)}
                        className="gap-1 text-xs text-red-600 border-red-200 hover:bg-red-50 transition-all duration-150 hover:scale-105 active:scale-95">
                        <Trash2 className="h-3 w-3" /> Supprimer
                      </Button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <ConfirmModal open={!!deleteItem} onClose={() => setDeleteItem(null)}
        onConfirm={() => setItems(p => p.filter(u => u.id !== deleteItem!.id))}
        title="Supprimer l'utilisateur"
        message={`Supprimer "${deleteItem?.nom}" (${deleteItem?.email}) ? Cette action est irréversible.`} />
    </div>
  );
}
