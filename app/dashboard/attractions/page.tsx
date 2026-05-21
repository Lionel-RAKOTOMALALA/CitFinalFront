'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Plus, Pencil, Image, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Modal, ConfirmModal } from '@/components/dashboard/modal';

type Attraction = { id: string; nom: string; categorie: string; localisation: string; prix: number; statut: string };

const initialData: Attraction[] = [
  { id: '1', nom: 'Parc National Isalo', categorie: 'Nature', localisation: 'Ihosy', prix: 45000, statut: 'actif' },
  { id: '2', nom: 'Avenue des Baobabs', categorie: 'Patrimoine', localisation: 'Morondava', prix: 20000, statut: 'actif' },
  { id: '3', nom: 'Réserve Ankarana', categorie: 'Nature', localisation: 'Antsiranana', prix: 55000, statut: 'actif' },
  { id: '4', nom: 'Plage Nosy Iranja', categorie: 'Plage', localisation: 'Nosy Be', prix: 35000, statut: 'inactif' },
  { id: '5', nom: 'Musée de la Reine', categorie: 'Culture', localisation: 'Antananarivo', prix: 15000, statut: 'actif' },
];

const categories = ['Nature', 'Patrimoine', 'Plage', 'Culture', 'Sport', 'Gastronomie'];

export default function AttractionsPage() {
  const [items, setItems] = useState<Attraction[]>(initialData);
  const [editItem, setEditItem] = useState<Attraction | null>(null);
  const [deleteItem, setDeleteItem] = useState<Attraction | null>(null);
  const [addOpen, setAddOpen] = useState(false);
  const [form, setForm] = useState<Partial<Attraction>>({});
  const [newForm, setNewForm] = useState<Partial<Attraction>>({});

  const openEdit = (a: Attraction) => { setEditItem(a); setForm(a); };
  const saveEdit = () => {
    setItems(prev => prev.map(a => a.id === editItem!.id ? { ...a, ...form } : a));
    setEditItem(null);
  };
  const saveNew = () => {
    if (!newForm.nom) return;
    setItems(prev => [...prev, {
      id: String(Date.now()),
      nom: newForm.nom!,
      categorie: newForm.categorie || 'Nature',
      localisation: newForm.localisation || '',
      prix: newForm.prix || 0,
      statut: newForm.statut || 'actif',
    }]);
    setAddOpen(false);
    setNewForm({});
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500">Dashboard / Attractions</p>
          <h1 className="text-2xl font-bold text-gray-900">Attractions</h1>
        </div>
        <Button onClick={() => { setNewForm({}); setAddOpen(true); }}
          className="bg-orange-500 hover:bg-orange-600 text-white gap-2 transition-all duration-150 hover:scale-105 active:scale-95">
          <Plus className="h-4 w-4" /> Ajouter une attraction
        </Button>
      </div>

      <div className="rounded-xl bg-white border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">Nom</th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">Catégorie</th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">Localisation</th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">Prix</th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">Statut</th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {items.map((a, i) => (
                <motion.tr key={a.id} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.04 }}
                  className={`hover:bg-orange-50/40 transition-colors ${i % 2 !== 0 ? 'bg-gray-50/30' : ''}`}>
                  <td className="px-6 py-4 font-medium text-gray-900">{a.nom}</td>
                  <td className="px-6 py-4"><Badge variant="outline" className="text-gray-600">{a.categorie}</Badge></td>
                  <td className="px-6 py-4 text-gray-600">{a.localisation}</td>
                  <td className="px-6 py-4 font-medium text-gray-900">{a.prix.toLocaleString()} Ar</td>
                  <td className="px-6 py-4">
                    {a.statut === 'actif'
                      ? <Badge className="bg-green-100 text-green-700 hover:bg-green-100">Actif</Badge>
                      : <Badge className="bg-red-100 text-red-700 hover:bg-red-100">Inactif</Badge>}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Button size="sm" variant="outline" onClick={() => openEdit(a)}
                        className="gap-1 text-xs transition-all duration-150 hover:scale-105 active:scale-95 hover:border-orange-300 hover:text-orange-600">
                        <Pencil className="h-3 w-3" /> Modifier
                      </Button>
                      <Link href={`/dashboard/attractions/${a.id}/photos`}>
                        <Button size="sm" variant="outline"
                          className="gap-1 text-xs text-purple-600 border-purple-200 hover:bg-purple-50 transition-all duration-150 hover:scale-105 active:scale-95">
                          <Image className="h-3 w-3" /> Photos
                        </Button>
                      </Link>
                      <Button size="sm" variant="outline" onClick={() => setDeleteItem(a)}
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

      <Modal open={!!editItem} onClose={() => setEditItem(null)} title="Modifier l'attraction" size="md">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nom</label>
            <input className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
              value={form.nom || ''} onChange={e => setForm(f => ({ ...f, nom: e.target.value }))} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Catégorie</label>
              <select className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                value={form.categorie || ''} onChange={e => setForm(f => ({ ...f, categorie: e.target.value }))}>
                {categories.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Localisation</label>
              <input className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                value={form.localisation || ''} onChange={e => setForm(f => ({ ...f, localisation: e.target.value }))} />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Prix (Ar)</label>
              <input type="number" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                value={form.prix || ''} onChange={e => setForm(f => ({ ...f, prix: Number(e.target.value) }))} />
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

      <Modal open={addOpen} onClose={() => setAddOpen(false)} title="Ajouter une attraction" size="md">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nom</label>
            <input className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
              value={newForm.nom || ''} onChange={e => setNewForm(f => ({ ...f, nom: e.target.value }))} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Catégorie</label>
              <select className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                value={newForm.categorie || 'Nature'} onChange={e => setNewForm(f => ({ ...f, categorie: e.target.value }))}>
                {categories.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Localisation</label>
              <input className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                value={newForm.localisation || ''} onChange={e => setNewForm(f => ({ ...f, localisation: e.target.value }))} />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Prix (Ar)</label>
              <input type="number" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                value={newForm.prix || ''} onChange={e => setNewForm(f => ({ ...f, prix: Number(e.target.value) }))} />
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

      <ConfirmModal open={!!deleteItem} onClose={() => setDeleteItem(null)} onConfirm={() => { setItems(p => p.filter(a => a.id !== deleteItem!.id)); }}
        title="Supprimer l'attraction" message={`Supprimer "${deleteItem?.nom}" ? Cette action est irréversible.`} />
    </div>
  );
}
