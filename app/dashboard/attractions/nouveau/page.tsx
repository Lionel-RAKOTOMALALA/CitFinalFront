'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function NouvelleAttractionPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    nom: '',
    categorie: 'Nature',
    description: '',
    localisation: '',
    prix: '',
    horaires: '',
    statut: 'actif',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Attraction créée avec succès (mock)');
    router.push('/dashboard/attractions');
  };

  return (
    <div className="p-6 space-y-6 max-w-2xl">
      <div className="flex items-center gap-3">
        <Link href="/dashboard/attractions">
          <Button variant="outline" size="sm" className="gap-1">
            <ArrowLeft className="h-4 w-4" /> Retour
          </Button>
        </Link>
        <div>
          <p className="text-sm text-gray-500">Dashboard / Attractions / Nouvelle</p>
          <h1 className="text-2xl font-bold text-gray-900">Ajouter une attraction</h1>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="rounded-xl bg-white border border-gray-200 shadow-sm p-6 space-y-5">
        <div className="space-y-2">
          <Label htmlFor="nom">Nom de l&apos;attraction</Label>
          <Input id="nom" name="nom" value={form.nom} onChange={handleChange} placeholder="Ex: Parc National Isalo" className="border-gray-300 focus:ring-orange-500 focus:border-orange-500" required />
        </div>

        <div className="space-y-2">
          <Label htmlFor="categorie">Catégorie</Label>
          <select id="categorie" name="categorie" value={form.categorie} onChange={handleChange} className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-white">
            <option value="Nature">Nature</option>
            <option value="Culture">Culture</option>
            <option value="Patrimoine">Patrimoine</option>
            <option value="Plage">Plage</option>
            <option value="Sport">Sport</option>
            <option value="Aventure">Aventure</option>
          </select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <textarea id="description" name="description" value={form.description} onChange={handleChange} rows={4} placeholder="Description de l'attraction..." className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="localisation">Localisation</Label>
            <Input id="localisation" name="localisation" value={form.localisation} onChange={handleChange} placeholder="Ex: Ihosy" className="border-gray-300 focus:ring-orange-500 focus:border-orange-500" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="prix">Prix d&apos;entrée (Ar)</Label>
            <Input id="prix" name="prix" type="number" value={form.prix} onChange={handleChange} placeholder="Ex: 25000" className="border-gray-300 focus:ring-orange-500 focus:border-orange-500" required />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="horaires">Horaires</Label>
          <Input id="horaires" name="horaires" value={form.horaires} onChange={handleChange} placeholder="Ex: Tous les jours 8h–17h" className="border-gray-300 focus:ring-orange-500 focus:border-orange-500" />
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
          <Link href="/dashboard/attractions">
            <Button type="button" variant="outline">Annuler</Button>
          </Link>
        </div>
      </form>
    </div>
  );
}
