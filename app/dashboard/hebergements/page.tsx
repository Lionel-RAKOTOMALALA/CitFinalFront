'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Plus, Pencil, BedDouble, Trash2, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Modal, ConfirmModal } from '@/components/dashboard/modal';

type Hotel = { id: string; nom: string; localisation: string; etoiles: number; chambres: number; statut: string; description?: string; prixNuit?: number };

const initialHotels: Hotel[] = [
  { id: '1', nom: 'Hôtel Jardin du Roy', localisation: 'Toamasina', etoiles: 4, chambres: 24, statut: 'actif', prixNuit: 180000 },
  { id: '2', nom: 'Le Paradis Tropical', localisation: 'Nosy Be', etoiles: 5, chambres: 32, statut: 'actif', prixNuit: 320000 },
  { id: '3', nom: 'Résidence Les Bougainvillées', localisation: 'Antananarivo', etoiles: 3, chambres: 18, statut: 'actif', prixNuit: 120000 },
  { id: '4', nom: 'Hôtel du Lac', localisation: 'Antsirabe', etoiles: 3, chambres: 12, statut: 'inactif', prixNuit: 95000 },
  { id: '5', nom: 'Villa Ambodivona', localisation: 'Antananarivo', etoiles: 4, chambres: 10, statut: 'actif', prixNuit: 210000 },
];

export default function HebergementsPage() {
  const [hotels, setHotels] = useState<Hotel[]>(initialHotels);
  const [editItem, setEditItem] = useState<Hotel | null>(null);
  const [deleteItem, setDeleteItem] = useState<Hotel | null>(null);
  const [addOpen, setAddOpen] = useState(false);
  const [form, setForm] = useState<Partial<Hotel>>({});
  const [newForm, setNewForm] = useState<Partial<Hotel>>({});

  const openEdit = (h: Hotel) => { setEditItem(h); setForm(h); };
  const saveEdit = () => {
    setHotels(prev => prev.map(h => h.id === editItem!.id ? { ...h, ...form } : h));
    setEditItem(null);
  };
  const saveNew = () => {
    if (!newForm.nom) return;
    setHotels(prev => [...prev, {
      id: String(Date.now()),
      nom: newForm.nom!,
      localisation: newForm.localisation || '',
      etoiles: newForm.etoiles || 3,
      chambres: newForm.chambres || 0,
      statut: newForm.statut || 'actif',
      prixNuit: newForm.prixNuit || 0,
    }]);
    setAddOpen(false);
    setNewForm({});
  };
  const confirmDelete = () => {
    setHotels(prev => prev.filter(h => h.id !== deleteItem!.id));
    setDeleteItem(null);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500">Dashboard / Hébergements</p>
          <h1 className="text-2xl font-bold text-gray-900">Hébergements</h1>
        </div>
        <Button onClick={() => { setNewForm({}); setAddOpen(true); }}
          className="bg-orange-500 hover:bg-orange-600 text-white gap-2 transition-all duration-150 hover:scale-105 active:scale-95">
          <Plus className="h-4 w-4" /> Ajouter un hôtel
        </Button>
      </div>

      <div className="rounded-xl bg-white border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">Nom</th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">Localisation</th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">Étoiles</th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">Chambres</th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">Statut</th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {hotels.map((hotel, i) => (
                <motion.tr
                  key={hotel.id}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04 }}
                  className={`hover:bg-orange-50/40 transition-colors ${i % 2 !== 0 ? 'bg-gray-50/30' : ''}`}
                >
                  <td className="px-6 py-4 font-medium text-gray-900">{hotel.nom}</td>
                  <td className="px-6 py-4 text-gray-600">{hotel.localisation}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-0.5">
                      {Array.from({ length: hotel.etoiles }).map((_, j) => (
                        <Star key={j} className="h-4 w-4 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-600">{hotel.chambres}</td>
                  <td className="px-6 py-4">
                    {hotel.statut === 'actif'
                      ? <Badge className="bg-green-100 text-green-700 hover:bg-green-100">Actif</Badge>
                      : <Badge className="bg-red-100 text-red-700 hover:bg-red-100">Inactif</Badge>}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Button size="sm" variant="outline" onClick={() => openEdit(hotel)}
                        className="gap-1 text-xs transition-all duration-150 hover:scale-105 active:scale-95 hover:border-orange-300 hover:text-orange-600">
                        <Pencil className="h-3 w-3" /> Modifier
                      </Button>
                      <Link href={`/dashboard/hebergements/${hotel.id}/chambres`}>
                        <Button size="sm" variant="outline"
                          className="gap-1 text-xs text-blue-600 border-blue-200 hover:bg-blue-50 transition-all duration-150 hover:scale-105 active:scale-95">
                          <BedDouble className="h-3 w-3" /> Chambres
                        </Button>
                      </Link>
                      <Button size="sm" variant="outline" onClick={() => setDeleteItem(hotel)}
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

      {/* Modal modifier */}
      <Modal open={!!editItem} onClose={() => setEditItem(null)} title="Modifier l'hôtel" size="md">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nom</label>
            <input className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
              value={form.nom || ''} onChange={e => setForm(f => ({ ...f, nom: e.target.value }))} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Localisation</label>
            <input className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
              value={form.localisation || ''} onChange={e => setForm(f => ({ ...f, localisation: e.target.value }))} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Étoiles</label>
              <select className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                value={form.etoiles || 3} onChange={e => setForm(f => ({ ...f, etoiles: Number(e.target.value) }))}>
                {[1,2,3,4,5].map(n => <option key={n} value={n}>{n} étoile{n > 1 ? 's' : ''}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Statut</label>
              <select className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                value={form.statut || 'actif'} onChange={e => setForm(f => ({ ...f, statut: e.target.value }))}>
                <option value="actif">Actif</option>
                <option value="inactif">Inactif</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Prix par nuit (Ar)</label>
            <input type="number" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
              value={form.prixNuit || ''} onChange={e => setForm(f => ({ ...f, prixNuit: Number(e.target.value) }))} />
          </div>
          <div className="flex gap-3 justify-end pt-2">
            <button onClick={() => setEditItem(null)}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
              Annuler
            </button>
            <button onClick={saveEdit}
              className="px-4 py-2 text-sm font-medium text-white bg-orange-500 rounded-lg hover:bg-orange-600 transition-colors">
              Enregistrer
            </button>
          </div>
        </div>
      </Modal>

      {/* Modal ajout */}
      <Modal open={addOpen} onClose={() => setAddOpen(false)} title="Ajouter un hôtel" size="md">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nom</label>
            <input className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
              value={newForm.nom || ''} onChange={e => setNewForm(f => ({ ...f, nom: e.target.value }))} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Localisation</label>
            <input className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
              value={newForm.localisation || ''} onChange={e => setNewForm(f => ({ ...f, localisation: e.target.value }))} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Étoiles</label>
              <select className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                value={newForm.etoiles || 3} onChange={e => setNewForm(f => ({ ...f, etoiles: Number(e.target.value) }))}>
                {[1,2,3,4,5].map(n => <option key={n} value={n}>{n} étoile{n > 1 ? 's' : ''}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Statut</label>
              <select className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                value={newForm.statut || 'actif'} onChange={e => setNewForm(f => ({ ...f, statut: e.target.value }))}>
                <option value="actif">Actif</option>
                <option value="inactif">Inactif</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Prix par nuit (Ar)</label>
            <input type="number" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
              value={newForm.prixNuit || ''} onChange={e => setNewForm(f => ({ ...f, prixNuit: Number(e.target.value) }))} />
          </div>
          <div className="flex gap-3 justify-end pt-2">
            <button onClick={() => setAddOpen(false)}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
              Annuler
            </button>
            <button onClick={saveNew}
              className="px-4 py-2 text-sm font-medium text-white bg-orange-500 rounded-lg hover:bg-orange-600 transition-colors">
              Ajouter
            </button>
          </div>
        </div>
      </Modal>

      {/* Modal suppression */}
      <ConfirmModal
        open={!!deleteItem} onClose={() => setDeleteItem(null)} onConfirm={confirmDelete}
        title="Supprimer l'hôtel"
        message={`Êtes-vous sûr de vouloir supprimer "${deleteItem?.nom}" ? Cette action est irréversible.`}
      />
    </div>
  );
}
