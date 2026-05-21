'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter, useParams } from 'next/navigation';
import { ArrowLeft, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function NouvelleChambrePage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const [form, setForm] = useState({
    numero: '',
    type: 'Simple',
    capacite: '',
    prixNuit: '',
    description: '',
    statut: 'disponible',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Chambre créée avec succès (mock)');
    router.push(`/dashboard/hebergements/${id}/chambres`);
  };

  return (
    <div className="p-6 space-y-6 max-w-2xl">
      <div className="flex items-center gap-3">
        <Link href={`/dashboard/hebergements/${id}/chambres`}>
          <Button variant="outline" size="sm" className="gap-1">
            <ArrowLeft className="h-4 w-4" /> Retour
          </Button>
        </Link>
        <div>
          <p className="text-sm text-gray-500">Dashboard / Hébergements / Hôtel #{id} / Chambres / Nouvelle</p>
          <h1 className="text-2xl font-bold text-gray-900">Ajouter une chambre</h1>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="rounded-xl bg-white border border-gray-200 shadow-sm p-6 space-y-5">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="numero">Numéro de chambre</Label>
            <Input
              id="numero"
              name="numero"
              value={form.numero}
              onChange={handleChange}
              placeholder="Ex: 101"
              className="border-gray-300 focus:ring-orange-500 focus:border-orange-500"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="type">Type</Label>
            <select
              id="type"
              name="type"
              value={form.type}
              onChange={handleChange}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-white"
            >
              <option value="Simple">Simple</option>
              <option value="Double">Double</option>
              <option value="Suite">Suite</option>
              <option value="Familiale">Familiale</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="capacite">Capacité (personnes)</Label>
            <Input
              id="capacite"
              name="capacite"
              type="number"
              min="1"
              value={form.capacite}
              onChange={handleChange}
              placeholder="Ex: 2"
              className="border-gray-300 focus:ring-orange-500 focus:border-orange-500"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="prixNuit">Prix/nuit (Ar)</Label>
            <Input
              id="prixNuit"
              name="prixNuit"
              type="number"
              value={form.prixNuit}
              onChange={handleChange}
              placeholder="Ex: 120000"
              className="border-gray-300 focus:ring-orange-500 focus:border-orange-500"
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <textarea
            id="description"
            name="description"
            value={form.description}
            onChange={handleChange}
            rows={3}
            placeholder="Description de la chambre..."
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="statut">Statut</Label>
          <select
            id="statut"
            name="statut"
            value={form.statut}
            onChange={handleChange}
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-white"
          >
            <option value="disponible">Disponible</option>
            <option value="occupée">Occupée</option>
            <option value="maintenance">Maintenance</option>
          </select>
        </div>

        <div className="flex items-center gap-3 pt-2">
          <Button type="submit" className="bg-orange-500 hover:bg-orange-600 text-white gap-2">
            <Save className="h-4 w-4" /> Enregistrer
          </Button>
          <Link href={`/dashboard/hebergements/${id}/chambres`}>
            <Button type="button" variant="outline">Annuler</Button>
          </Link>
        </div>
      </form>
    </div>
  );
}
