'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter, useParams } from 'next/navigation';
import { ArrowLeft, Save, Image, Video } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const mockChambres: Record<string, { numero: string; type: string; capacite: string; prixNuit: string; description: string; statut: string }> = {
  '1': { numero: '101', type: 'Simple', capacite: '1', prixNuit: '80000', description: 'Chambre simple avec vue sur jardin.', statut: 'disponible' },
  '2': { numero: '102', type: 'Double', capacite: '2', prixNuit: '150000', description: 'Chambre double avec balcon.', statut: 'disponible' },
  '3': { numero: '201', type: 'Suite', capacite: '4', prixNuit: '350000', description: 'Suite de luxe avec salon séparé.', statut: 'occupée' },
  '4': { numero: '202', type: 'Double', capacite: '2', prixNuit: '150000', description: 'Chambre double en cours de rénovation.', statut: 'maintenance' },
  '5': { numero: '301', type: 'Suite', capacite: '4', prixNuit: '420000', description: 'Suite présidentielle avec terrasse privée.', statut: 'disponible' },
};

export default function EditChambrePage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const chambreId = params.chambreId as string;
  const mock = mockChambres[chambreId] || { numero: '', type: 'Simple', capacite: '', prixNuit: '', description: '', statut: 'disponible' };

  const [form, setForm] = useState(mock);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Chambre mise à jour avec succès (mock)');
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
          <p className="text-sm text-gray-500">Dashboard / Hébergements / Hôtel #{id} / Chambres / Modifier</p>
          <h1 className="text-2xl font-bold text-gray-900">Modifier la chambre #{mock.numero}</h1>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <Link href={`/dashboard/hebergements/${id}/chambres/${chambreId}/photos`}>
          <Button variant="outline" className="gap-2 border-purple-200 text-purple-600 hover:bg-purple-50">
            <Image className="h-4 w-4" /> Gérer les photos
          </Button>
        </Link>
        <Link href={`/dashboard/hebergements/${id}/chambres/${chambreId}/videos`}>
          <Button variant="outline" className="gap-2 border-indigo-200 text-indigo-600 hover:bg-indigo-50">
            <Video className="h-4 w-4" /> Gérer les vidéos
          </Button>
        </Link>
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
