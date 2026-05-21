'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter, useParams } from 'next/navigation';
import { ArrowLeft, Save, Image } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const mockVoitures: Record<string, { marque: string; modele: string; annee: string; prixJour: string; kilometrage: string; type: string; description: string; statut: string }> = {
  '1': { marque: 'Toyota', modele: 'Land Cruiser', annee: '2022', prixJour: '120000', kilometrage: '25000', type: 'SUV', description: 'SUV de luxe idéal pour les aventures.', statut: 'actif' },
  '2': { marque: 'Hyundai', modele: 'Tucson', annee: '2021', prixJour: '85000', kilometrage: '42000', type: 'SUV', description: 'SUV compact et confortable.', statut: 'actif' },
  '3': { marque: 'Renault', modele: 'Duster', annee: '2023', prixJour: '75000', kilometrage: '8000', type: '4x4', description: 'Parfait pour les routes de campagne.', statut: 'actif' },
  '4': { marque: 'Mitsubishi', modele: 'Outlander', annee: '2020', prixJour: '90000', kilometrage: '60000', type: 'SUV', description: 'En maintenance pour révision.', statut: 'inactif' },
  '5': { marque: 'Nissan', modele: 'X-Trail', annee: '2022', prixJour: '95000', kilometrage: '18000', type: 'SUV', description: 'Véhicule familial spacieux.', statut: 'actif' },
};

export default function EditVoiturePage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const mock = mockVoitures[id] || { marque: '', modele: '', annee: '', prixJour: '', kilometrage: '', type: 'SUV', description: '', statut: 'actif' };

  const [form, setForm] = useState(mock);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Voiture mise à jour avec succès (mock)');
    router.push('/dashboard/voitures');
  };

  return (
    <div className="p-6 space-y-6 max-w-2xl">
      <div className="flex items-center gap-3">
        <Link href="/dashboard/voitures">
          <Button variant="outline" size="sm" className="gap-1">
            <ArrowLeft className="h-4 w-4" /> Retour
          </Button>
        </Link>
        <div>
          <p className="text-sm text-gray-500">Dashboard / Voitures / Modifier</p>
          <h1 className="text-2xl font-bold text-gray-900">Modifier la voiture</h1>
        </div>
      </div>

      <div className="flex justify-end">
        <Link href={`/dashboard/voitures/${id}/photos`}>
          <Button variant="outline" className="gap-2 border-purple-200 text-purple-600 hover:bg-purple-50">
            <Image className="h-4 w-4" /> Gérer les photos
          </Button>
        </Link>
      </div>

      <form onSubmit={handleSubmit} className="rounded-xl bg-white border border-gray-200 shadow-sm p-6 space-y-5">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="marque">Marque</Label>
            <Input id="marque" name="marque" value={form.marque} onChange={handleChange} className="border-gray-300 focus:ring-orange-500 focus:border-orange-500" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="modele">Modèle</Label>
            <Input id="modele" name="modele" value={form.modele} onChange={handleChange} className="border-gray-300 focus:ring-orange-500 focus:border-orange-500" required />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="annee">Année</Label>
            <Input id="annee" name="annee" type="number" value={form.annee} onChange={handleChange} className="border-gray-300 focus:ring-orange-500 focus:border-orange-500" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="prixJour">Prix/jour (Ar)</Label>
            <Input id="prixJour" name="prixJour" type="number" value={form.prixJour} onChange={handleChange} className="border-gray-300 focus:ring-orange-500 focus:border-orange-500" required />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="kilometrage">Kilométrage</Label>
            <Input id="kilometrage" name="kilometrage" type="number" value={form.kilometrage} onChange={handleChange} className="border-gray-300 focus:ring-orange-500 focus:border-orange-500" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="type">Type</Label>
            <select id="type" name="type" value={form.type} onChange={handleChange} className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-white">
              <option value="SUV">SUV</option>
              <option value="Berline">Berline</option>
              <option value="Citadine">Citadine</option>
              <option value="4x4">4x4</option>
              <option value="Minibus">Minibus</option>
              <option value="Cabriolet">Cabriolet</option>
            </select>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <textarea id="description" name="description" value={form.description} onChange={handleChange} rows={3} className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="statut">Statut</Label>
          <select id="statut" name="statut" value={form.statut} onChange={handleChange} className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-white">
            <option value="actif">Actif</option>
            <option value="inactif">Inactif</option>
          </select>
        </div>

        <div className="flex items-center gap-3 pt-2">
          <Button type="submit" className="bg-orange-500 hover:bg-orange-600 text-white gap-2">
            <Save className="h-4 w-4" /> Enregistrer
          </Button>
          <Link href="/dashboard/voitures">
            <Button type="button" variant="outline">Annuler</Button>
          </Link>
        </div>
      </form>
    </div>
  );
}
