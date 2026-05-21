'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { Plus, Pencil, Image, Video, Trash2, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Modal, ConfirmModal } from '@/components/dashboard/modal';

type Chambre = { id: string; numero: string; type: string; prixNuit: number; capacite: number; statut: string };

const initialChambres: Chambre[] = [
  { id: '1', numero: '101', type: 'Simple', prixNuit: 80000, capacite: 1, statut: 'disponible' },
  { id: '2', numero: '102', type: 'Double', prixNuit: 150000, capacite: 2, statut: 'disponible' },
  { id: '3', numero: '201', type: 'Suite', prixNuit: 350000, capacite: 4, statut: 'occupée' },
  { id: '4', numero: '202', type: 'Double', prixNuit: 150000, capacite: 2, statut: 'maintenance' },
  { id: '5', numero: '301', type: 'Suite', prixNuit: 420000, capacite: 4, statut: 'disponible' },
];

function statutBadge(statut: string) {
  if (statut === 'disponible') return <Badge className="bg-green-100 text-green-700 hover:bg-green-100">Disponible</Badge>;
  if (statut === 'occupée') return <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100">Occupée</Badge>;
  return <Badge className="bg-yellow-100 text-yellow-700 hover:bg-yellow-100">Maintenance</Badge>;
}

const types = ['Simple', 'Double', 'Triple', 'Suite', 'Suite Junior', 'Familiale'];

export default function ChambresPage() {
  const params = useParams();
  const id = (params?.id as string) ?? '';

  const [chambres, setChambres] = useState<Chambre[]>(initialChambres);
  const [editItem, setEditItem] = useState<Chambre | null>(null);
  const [deleteItem, setDeleteItem] = useState<Chambre | null>(null);
  const [addOpen, setAddOpen] = useState(false);
  const [form, setForm] = useState<Partial<Chambre>>({});
  const [newForm, setNewForm] = useState<Partial<Chambre>>({});

  const openEdit = (c: Chambre) => { setEditItem(c); setForm(c); };
  const saveEdit = () => {
    setChambres(prev => prev.map(c => c.id === editItem!.id ? { ...c, ...form } : c));
    setEditItem(null);
  };
  const saveNew = () => {
    if (!newForm.numero) return;
    setChambres(prev => [...prev, {
      id: String(Date.now()),
      numero: newForm.numero!,
      type: newForm.type || 'Simple',
      prixNuit: newForm.prixNuit || 0,
      capacite: newForm.capacite || 1,
      statut: newForm.statut || 'disponible',
    }]);
    setAddOpen(false);
    setNewForm({});
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href={`/dashboard/hebergements/${id}`}>
            <Button variant="outline" size="sm" className="gap-1 transition-all duration-150 hover:scale-105 active:scale-95">
              <ArrowLeft className="h-4 w-4" /> Retour
            </Button>
          </Link>
          <div>
            <p className="text-sm text-gray-500">Dashboard / Hébergements / Hôtel #{id} / Chambres</p>
            <h1 className="text-2xl font-bold text-gray-900">Chambres</h1>
          </div>
        </div>
        <Button onClick={() => { setNewForm({}); setAddOpen(true); }}
          className="bg-orange-500 hover:bg-orange-600 text-white gap-2 transition-all duration-150 hover:scale-105 active:scale-95">
          <Plus className="h-4 w-4" /> Ajouter une chambre
        </Button>
      </div>

      <div className="rounded-xl bg-white border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">Numéro</th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">Type</th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">Prix/nuit</th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">Capacité</th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">Statut</th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {chambres.map((c, i) => (
                <motion.tr key={c.id} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.04 }}
                  className={`hover:bg-orange-50/40 transition-colors ${i % 2 !== 0 ? 'bg-gray-50/30' : ''}`}>
                  <td className="px-6 py-4 font-medium text-gray-900">#{c.numero}</td>
                  <td className="px-6 py-4 text-gray-600">{c.type}</td>
                  <td className="px-6 py-4 font-medium text-gray-900">{c.prixNuit.toLocaleString()} Ar</td>
                  <td className="px-6 py-4 text-gray-600">{c.capacite} pers.</td>
                  <td className="px-6 py-4">{statutBadge(c.statut)}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Button size="sm" variant="outline" onClick={() => openEdit(c)}
                        className="gap-1 text-xs transition-all duration-150 hover:scale-105 active:scale-95 hover:border-orange-300 hover:text-orange-600">
                        <Pencil className="h-3 w-3" /> Modifier
                      </Button>
                      <Link href={`/dashboard/hebergements/${id}/chambres/${c.id}/photos`}>
                        <Button size="sm" variant="outline"
                          className="gap-1 text-xs text-purple-600 border-purple-200 hover:bg-purple-50 transition-all duration-150 hover:scale-105 active:scale-95">
                          <Image className="h-3 w-3" /> Photos
                        </Button>
                      </Link>
                      <Link href={`/dashboard/hebergements/${id}/chambres/${c.id}/videos`}>
                        <Button size="sm" variant="outline"
                          className="gap-1 text-xs text-indigo-600 border-indigo-200 hover:bg-indigo-50 transition-all duration-150 hover:scale-105 active:scale-95">
                          <Video className="h-3 w-3" /> Vidéos
                        </Button>
                      </Link>
                      <Button size="sm" variant="outline" onClick={() => setDeleteItem(c)}
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

      <Modal open={!!editItem} onClose={() => setEditItem(null)} title="Modifier la chambre" size="md">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Numéro</label>
              <input className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                value={form.numero || ''} onChange={e => setForm(f => ({ ...f, numero: e.target.value }))} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
              <select className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                value={form.type || 'Simple'} onChange={e => setForm(f => ({ ...f, type: e.target.value }))}>
                {types.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Prix/nuit (Ar)</label>
              <input type="number" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                value={form.prixNuit || ''} onChange={e => setForm(f => ({ ...f, prixNuit: Number(e.target.value) }))} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Capacité (pers.)</label>
              <input type="number" min={1} max={10} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                value={form.capacite || ''} onChange={e => setForm(f => ({ ...f, capacite: Number(e.target.value) }))} />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Statut</label>
            <select className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
              value={form.statut || 'disponible'} onChange={e => setForm(f => ({ ...f, statut: e.target.value }))}>
              <option value="disponible">Disponible</option>
              <option value="occupée">Occupée</option>
              <option value="maintenance">Maintenance</option>
            </select>
          </div>
          <div className="flex gap-3 justify-end pt-2">
            <button onClick={() => setEditItem(null)} className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">Annuler</button>
            <button onClick={saveEdit} className="px-4 py-2 text-sm font-medium text-white bg-orange-500 rounded-lg hover:bg-orange-600 transition-colors">Enregistrer</button>
          </div>
        </div>
      </Modal>

      <Modal open={addOpen} onClose={() => setAddOpen(false)} title="Ajouter une chambre" size="md">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Numéro</label>
              <input className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                value={newForm.numero || ''} onChange={e => setNewForm(f => ({ ...f, numero: e.target.value }))} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
              <select className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                value={newForm.type || 'Simple'} onChange={e => setNewForm(f => ({ ...f, type: e.target.value }))}>
                {types.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Prix/nuit (Ar)</label>
              <input type="number" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                value={newForm.prixNuit || ''} onChange={e => setNewForm(f => ({ ...f, prixNuit: Number(e.target.value) }))} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Capacité (pers.)</label>
              <input type="number" min={1} max={10} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                value={newForm.capacite || ''} onChange={e => setNewForm(f => ({ ...f, capacite: Number(e.target.value) }))} />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Statut</label>
            <select className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
              value={newForm.statut || 'disponible'} onChange={e => setNewForm(f => ({ ...f, statut: e.target.value }))}>
              <option value="disponible">Disponible</option>
              <option value="occupée">Occupée</option>
              <option value="maintenance">Maintenance</option>
            </select>
          </div>
          <div className="flex gap-3 justify-end pt-2">
            <button onClick={() => setAddOpen(false)} className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">Annuler</button>
            <button onClick={saveNew} className="px-4 py-2 text-sm font-medium text-white bg-orange-500 rounded-lg hover:bg-orange-600 transition-colors">Ajouter</button>
          </div>
        </div>
      </Modal>

      <ConfirmModal open={!!deleteItem} onClose={() => setDeleteItem(null)}
        onConfirm={() => setChambres(p => p.filter(c => c.id !== deleteItem!.id))}
        title="Supprimer la chambre"
        message={`Supprimer la chambre #${deleteItem?.numero} (${deleteItem?.type}) ? Cette action est irréversible.`} />
    </div>
  );
}
