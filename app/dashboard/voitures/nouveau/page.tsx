'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function NouvelleVoiturePage() {
  const router = useRouter();
  const [form, setForm] = useState({
    marque: '',
    modele: '',
    annee: '',
    prixJour: '',
    kilometrage: '',
    type: 'SUV',
    description: '',
    statut: 'actif',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Voiture créée avec succès (mock)');
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
          <p className="text-sm text-gray-500">Dashboard / Voitures / Nouveau</p>
          <h1 className="text-2xl font-bold text-gray-900">Ajouter une voiture</h1>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="rounded-xl bg-white border border-gray-200 shadow-sm p-6 space-y-5">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="marque">Marque</Label>
            <Input id="marque" name="marque" value={form.marque} onChange={handleChange} placeholder="Ex: Toyota" className="border-gray-300 focus:ring-orange-500 focus:border-orange-500" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="modele">Modèle</Label>
            <Input id="modele" name="modele" value={form.modele} onChange={handleChange} placeholder="Ex: Land Cruiser" className="border-gray-300 focus:ring-orange-500 focus:border-orange-500" required />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="annee">Année</Label>
            <Input id="annee" name="annee" type="number" value={form.annee} onChange={handleChange} placeholder="Ex: 2023" className="border-gray-300 focus:ring-orange-500 focus:border-orange-500" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="prixJour">Prix/jour (Ar)</Label>
            <Input id="prixJour" name="prixJour" type="number" value={form.prixJour} onChange={handleChange} placeholder="Ex: 85000" className="border-gray-300 focus:ring-orange-500 focus:border-orange-500" required />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="kilometrage">Kilométrage</Label>
            <Input id="kilometrage" name="kilometrage" type="number" value={form.kilometrage} onChange={handleChange} placeholder="Ex: 15000" className="border-gray-300 focus:ring-orange-500 focus:border-orange-500" />
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
          <textarea id="description" name="description" value={form.description} onChange={handleChange} rows={3} placeholder="Description du véhicule..." className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500" />
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
