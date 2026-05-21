'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Plus, Pencil, Image, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Modal, ConfirmModal } from '@/components/dashboard/modal';

type Voiture = { id: string; marque: string; modele: string; annee: number; prixJour: number; disponibilite: string; statut: string };

const initialData: Voiture[] = [
  { id: '1', marque: 'Toyota', modele: 'Land Cruiser', annee: 2022, prixJour: 120000, disponibilite: 'disponible', statut: 'actif' },
  { id: '2', marque: 'Hyundai', modele: 'Tucson', annee: 2021, prixJour: 85000, disponibilite: 'louée', statut: 'actif' },
  { id: '3', marque: 'Renault', modele: 'Duster', annee: 2023, prixJour: 75000, disponibilite: 'disponible', statut: 'actif' },
  { id: '4', marque: 'Mitsubishi', modele: 'Outlander', annee: 2020, prixJour: 90000, disponibilite: 'maintenance', statut: 'inactif' },
  { id: '5', marque: 'Nissan', modele: 'X-Trail', annee: 2022, prixJour: 95000, disponibilite: 'disponible', statut: 'actif' },
];

function dispoBadge(d: string) {
  if (d === 'disponible') return <Badge className="bg-green-100 text-green-700 hover:bg-green-100">Disponible</Badge>;
  if (d === 'louée') return <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100">Louée</Badge>;
  return <Badge className="bg-yellow-100 text-yellow-700 hover:bg-yellow-100">Maintenance</Badge>;
}

export default function VoituresPage() {
  const [items, setItems] = useState<Voiture[]>(initialData);
  const [editItem, setEditItem] = useState<Voiture | null>(null);
  const [deleteItem, setDeleteItem] = useState<Voiture | null>(null);
  const [addOpen, setAddOpen] = useState(false);
  const [form, setForm] = useState<Partial<Voiture>>({});
  const [newForm, setNewForm] = useState<Partial<Voiture>>({});

  const openEdit = (v: Voiture) => { setEditItem(v); setForm(v); };
  const saveEdit = () => {
    setItems(prev => prev.map(v => v.id === editItem!.id ? { ...v, ...form } : v));
    setEditItem(null);
  };
  const saveNew = () => {
    if (!newForm.marque || !newForm.modele) return;
    setItems(prev => [...prev, {
      id: String(Date.now()),
      marque: newForm.marque!,
      modele: newForm.modele!,
      annee: newForm.annee || new Date().getFullYear(),
      prixJour: newForm.prixJour || 0,
      disponibilite: newForm.disponibilite || 'disponible',
      statut: newForm.statut || 'actif',
    }]);
    setAddOpen(false);
    setNewForm({});
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500">Dashboard / Voitures</p>
          <h1 className="text-2xl font-bold text-gray-900">Voitures</h1>
        </div>
        <Button onClick={() => { setNewForm({}); setAddOpen(true); }}
          className="bg-orange-500 hover:bg-orange-600 text-white gap-2 transition-all duration-150 hover:scale-105 active:scale-95">
          <Plus className="h-4 w-4" /> Ajouter une voiture
        </Button>
      </div>

      <div className="rounded-xl bg-white border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">Marque / Modèle</th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">Année</th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">Prix/jour</th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">Disponibilité</th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">Statut</th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {items.map((v, i) => (
                <motion.tr key={v.id} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.04 }}
                  className={`hover:bg-orange-50/40 transition-colors ${i % 2 !== 0 ? 'bg-gray-50/30' : ''}`}>
                  <td className="px-6 py-4 font-medium text-gray-900">{v.marque} {v.modele}</td>
                  <td className="px-6 py-4 text-gray-600">{v.annee}</td>
                  <td className="px-6 py-4 font-medium text-gray-900">{v.prixJour.toLocaleString()} Ar</td>
                  <td className="px-6 py-4">{dispoBadge(v.disponibilite)}</td>
                  <td className="px-6 py-4">
                    {v.statut === 'actif'
                      ? <Badge className="bg-green-100 text-green-700 hover:bg-green-100">Actif</Badge>
                      : <Badge className="bg-red-100 text-red-700 hover:bg-red-100">Inactif</Badge>}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Button size="sm" variant="outline" onClick={() => openEdit(v)}
                        className="gap-1 text-xs transition-all duration-150 hover:scale-105 active:scale-95 hover:border-orange-300 hover:text-orange-600">
                        <Pencil className="h-3 w-3" /> Modifier
                      </Button>
                      <Link href={`/dashboard/voitures/${v.id}/photos`}>
                        <Button size="sm" variant="outline"
                          className="gap-1 text-xs text-purple-600 border-purple-200 hover:bg-purple-50 transition-all duration-150 hover:scale-105 active:scale-95">
                          <Image className="h-3 w-3" /> Photos
                        </Button>
                      </Link>
                      <Button size="sm" variant="outline" onClick={() => setDeleteItem(v)}
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

      <Modal open={!!editItem} onClose={() => setEditItem(null)} title="Modifier la voiture" size="md">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Marque</label>
              <input className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                value={form.marque || ''} onChange={e => setForm(f => ({ ...f, marque: e.target.value }))} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Modèle</label>
              <input className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                value={form.modele || ''} onChange={e => setForm(f => ({ ...f, modele: e.target.value }))} />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Année</label>
              <input type="number" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                value={form.annee || ''} onChange={e => setForm(f => ({ ...f, annee: Number(e.target.value) }))} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Prix/jour (Ar)</label>
              <input type="number" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                value={form.prixJour || ''} onChange={e => setForm(f => ({ ...f, prixJour: Number(e.target.value) }))} />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Disponibilité</label>
              <select className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                value={form.disponibilite || 'disponible'} onChange={e => setForm(f => ({ ...f, disponibilite: e.target.value }))}>
                <option value="disponible">Disponible</option>
                <option value="louée">Louée</option>
                <option value="maintenance">Maintenance</option>
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
          <div className="flex gap-3 justify-end pt-2">
            <button onClick={() => setEditItem(null)} className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">Annuler</button>
            <button onClick={saveEdit} className="px-4 py-2 text-sm font-medium text-white bg-orange-500 rounded-lg hover:bg-orange-600 transition-colors">Enregistrer</button>
          </div>
        </div>
      </Modal>

      <Modal open={addOpen} onClose={() => setAddOpen(false)} title="Ajouter une voiture" size="md">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Marque</label>
              <input className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                value={newForm.marque || ''} onChange={e => setNewForm(f => ({ ...f, marque: e.target.value }))} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Modèle</label>
              <input className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                value={newForm.modele || ''} onChange={e => setNewForm(f => ({ ...f, modele: e.target.value }))} />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Année</label>
              <input type="number" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                value={newForm.annee || ''} onChange={e => setNewForm(f => ({ ...f, annee: Number(e.target.value) }))} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Prix/jour (Ar)</label>
              <input type="number" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                value={newForm.prixJour || ''} onChange={e => setNewForm(f => ({ ...f, prixJour: Number(e.target.value) }))} />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Disponibilité</label>
              <select className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                value={newForm.disponibilite || 'disponible'} onChange={e => setNewForm(f => ({ ...f, disponibilite: e.target.value }))}>
                <option value="disponible">Disponible</option>
                <option value="louée">Louée</option>
                <option value="maintenance">Maintenance</option>
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
          <div className="flex gap-3 justify-end pt-2">
            <button onClick={() => setAddOpen(false)} className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">Annuler</button>
            <button onClick={saveNew} className="px-4 py-2 text-sm font-medium text-white bg-orange-500 rounded-lg hover:bg-orange-600 transition-colors">Ajouter</button>
          </div>
        </div>
      </Modal>

      <ConfirmModal open={!!deleteItem} onClose={() => setDeleteItem(null)} onConfirm={() => { setItems(p => p.filter(v => v.id !== deleteItem!.id)); }}
        title="Supprimer la voiture" message={`Supprimer "${deleteItem?.marque} ${deleteItem?.modele}" ? Cette action est irréversible.`} />
    </div>
  );
}
