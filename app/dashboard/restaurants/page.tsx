'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Plus, Pencil, Image, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Modal, ConfirmModal } from '@/components/dashboard/modal';

type Restaurant = { id: string; nom: string; cuisine: string; localisation: string; capacite: number; statut: string };

const initialData: Restaurant[] = [
  { id: '1', nom: 'Le Sakamanga', cuisine: 'Malgache / Internationale', localisation: 'Antananarivo', capacite: 80, statut: 'actif' },
  { id: '2', nom: 'Chez Mariette', cuisine: 'Fruits de mer', localisation: 'Nosy Be', capacite: 45, statut: 'actif' },
  { id: '3', nom: 'La Terrasse', cuisine: 'Française', localisation: 'Antananarivo', capacite: 60, statut: 'actif' },
  { id: '4', nom: 'Plage Grill', cuisine: 'Grill / BBQ', localisation: 'Toamasina', capacite: 35, statut: 'inactif' },
  { id: '5', nom: 'Le Jardin', cuisine: 'Végétarienne', localisation: 'Fianarantsoa', capacite: 30, statut: 'actif' },
];

export default function RestaurantsPage() {
  const [items, setItems] = useState<Restaurant[]>(initialData);
  const [editItem, setEditItem] = useState<Restaurant | null>(null);
  const [deleteItem, setDeleteItem] = useState<Restaurant | null>(null);
  const [addOpen, setAddOpen] = useState(false);
  const [form, setForm] = useState<Partial<Restaurant>>({});
  const [newForm, setNewForm] = useState<Partial<Restaurant>>({});

  const openEdit = (r: Restaurant) => { setEditItem(r); setForm(r); };
  const saveEdit = () => {
    setItems(prev => prev.map(r => r.id === editItem!.id ? { ...r, ...form } : r));
    setEditItem(null);
  };
  const saveNew = () => {
    if (!newForm.nom) return;
    setItems(prev => [...prev, {
      id: String(Date.now()),
      nom: newForm.nom!,
      cuisine: newForm.cuisine || '',
      localisation: newForm.localisation || '',
      capacite: newForm.capacite || 0,
      statut: newForm.statut || 'actif',
    }]);
    setAddOpen(false);
    setNewForm({});
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500">Dashboard / Restaurants</p>
          <h1 className="text-2xl font-bold text-gray-900">Restaurants</h1>
        </div>
        <Button onClick={() => { setNewForm({}); setAddOpen(true); }}
          className="bg-orange-500 hover:bg-orange-600 text-white gap-2 transition-all duration-150 hover:scale-105 active:scale-95">
          <Plus className="h-4 w-4" /> Ajouter un restaurant
        </Button>
      </div>

      <div className="rounded-xl bg-white border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">Nom</th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">Type cuisine</th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">Localisation</th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">Capacité</th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">Statut</th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {items.map((r, i) => (
                <motion.tr key={r.id} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.04 }}
                  className={`hover:bg-orange-50/40 transition-colors ${i % 2 !== 0 ? 'bg-gray-50/30' : ''}`}>
                  <td className="px-6 py-4 font-medium text-gray-900">{r.nom}</td>
                  <td className="px-6 py-4 text-gray-600">{r.cuisine}</td>
                  <td className="px-6 py-4 text-gray-600">{r.localisation}</td>
                  <td className="px-6 py-4 text-gray-600">{r.capacite} couverts</td>
                  <td className="px-6 py-4">
                    {r.statut === 'actif'
                      ? <Badge className="bg-green-100 text-green-700 hover:bg-green-100">Actif</Badge>
                      : <Badge className="bg-red-100 text-red-700 hover:bg-red-100">Inactif</Badge>}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Button size="sm" variant="outline" onClick={() => openEdit(r)}
                        className="gap-1 text-xs transition-all duration-150 hover:scale-105 active:scale-95 hover:border-orange-300 hover:text-orange-600">
                        <Pencil className="h-3 w-3" /> Modifier
                      </Button>
                      <Link href={`/dashboard/restaurants/${r.id}/photos`}>
                        <Button size="sm" variant="outline"
                          className="gap-1 text-xs text-purple-600 border-purple-200 hover:bg-purple-50 transition-all duration-150 hover:scale-105 active:scale-95">
                          <Image className="h-3 w-3" /> Photos
                        </Button>
                      </Link>
                      <Button size="sm" variant="outline" onClick={() => setDeleteItem(r)}
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

      <Modal open={!!editItem} onClose={() => setEditItem(null)} title="Modifier le restaurant" size="md">
        <div className="space-y-4">
          {(['nom', 'cuisine', 'localisation'] as const).map(field => (
            <div key={field}>
              <label className="block text-sm font-medium text-gray-700 mb-1 capitalize">{field}</label>
              <input className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                value={(form[field] as string) || ''} onChange={e => setForm(f => ({ ...f, [field]: e.target.value }))} />
            </div>
          ))}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Capacité</label>
              <input type="number" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                value={form.capacite || ''} onChange={e => setForm(f => ({ ...f, capacite: Number(e.target.value) }))} />
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

      <Modal open={addOpen} onClose={() => setAddOpen(false)} title="Ajouter un restaurant" size="md">
        <div className="space-y-4">
          {(['nom', 'cuisine', 'localisation'] as const).map(field => (
            <div key={field}>
              <label className="block text-sm font-medium text-gray-700 mb-1 capitalize">{field}</label>
              <input className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                value={(newForm[field] as string) || ''} onChange={e => setNewForm(f => ({ ...f, [field]: e.target.value }))} />
            </div>
          ))}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Capacité</label>
              <input type="number" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                value={newForm.capacite || ''} onChange={e => setNewForm(f => ({ ...f, capacite: Number(e.target.value) }))} />
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

      <ConfirmModal open={!!deleteItem} onClose={() => setDeleteItem(null)} onConfirm={() => { setItems(p => p.filter(r => r.id !== deleteItem!.id)); }}
        title="Supprimer le restaurant" message={`Supprimer "${deleteItem?.nom}" ? Cette action est irréversible.`} />
    </div>
  );
}
