'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function NouveauRestaurantPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    nom: '',
    cuisine: '',
    description: '',
    localisation: '',
    capacite: '',
    horaires: '',
    statut: 'actif',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Restaurant créé avec succès (mock)');
    router.push('/dashboard/restaurants');
  };

  return (
    <div className="p-6 space-y-6 max-w-2xl">
      <div className="flex items-center gap-3">
        <Link href="/dashboard/restaurants">
          <Button variant="outline" size="sm" className="gap-1">
            <ArrowLeft className="h-4 w-4" /> Retour
          </Button>
        </Link>
        <div>
          <p className="text-sm text-gray-500">Dashboard / Restaurants / Nouveau</p>
          <h1 className="text-2xl font-bold text-gray-900">Ajouter un restaurant</h1>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="rounded-xl bg-white border border-gray-200 shadow-sm p-6 space-y-5">
        <div className="space-y-2">
          <Label htmlFor="nom">Nom du restaurant</Label>
          <Input
            id="nom"
            name="nom"
            value={form.nom}
            onChange={handleChange}
            placeholder="Ex: Le Sakamanga"
            className="border-gray-300 focus:ring-orange-500 focus:border-orange-500"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="cuisine">Type de cuisine</Label>
          <Input
            id="cuisine"
            name="cuisine"
            value={form.cuisine}
            onChange={handleChange}
            placeholder="Ex: Malgache / Française"
            className="border-gray-300 focus:ring-orange-500 focus:border-orange-500"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <textarea
            id="description"
            name="description"
            value={form.description}
            onChange={handleChange}
            rows={4}
            placeholder="Description du restaurant..."
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="localisation">Localisation</Label>
            <Input
              id="localisation"
              name="localisation"
              value={form.localisation}
              onChange={handleChange}
              placeholder="Ex: Antananarivo"
              className="border-gray-300 focus:ring-orange-500 focus:border-orange-500"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="capacite">Capacité (couverts)</Label>
            <Input
              id="capacite"
              name="capacite"
              type="number"
              value={form.capacite}
              onChange={handleChange}
              placeholder="Ex: 50"
              className="border-gray-300 focus:ring-orange-500 focus:border-orange-500"
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="horaires">Horaires</Label>
          <Input
            id="horaires"
            name="horaires"
            value={form.horaires}
            onChange={handleChange}
            placeholder="Ex: Lun–Sam 12h–22h"
            className="border-gray-300 focus:ring-orange-500 focus:border-orange-500"
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
            <option value="actif">Actif</option>
            <option value="inactif">Inactif</option>
          </select>
        </div>

        <div className="flex items-center gap-3 pt-2">
          <Button type="submit" className="bg-orange-500 hover:bg-orange-600 text-white gap-2">
            <Save className="h-4 w-4" /> Enregistrer
          </Button>
          <Link href="/dashboard/restaurants">
            <Button type="button" variant="outline">Annuler</Button>
          </Link>
        </div>
      </form>
    </div>
  );
}
