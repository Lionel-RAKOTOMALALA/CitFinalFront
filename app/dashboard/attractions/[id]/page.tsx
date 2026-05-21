'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter, useParams } from 'next/navigation';
import { ArrowLeft, Save, Image } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const mockAttractions: Record<string, { nom: string; categorie: string; description: string; localisation: string; prix: string; horaires: string; statut: string }> = {
  '1': { nom: 'Parc National Isalo', categorie: 'Nature', description: 'Vaste parc de grès avec canyons et piscines naturelles.', localisation: 'Ihosy', prix: '45000', horaires: 'Tous les jours 7h–17h', statut: 'actif' },
  '2': { nom: 'Avenue des Baobabs', categorie: 'Patrimoine', description: 'Allée de grands baobabs, site iconique de Madagascar.', localisation: 'Morondava', prix: '20000', horaires: 'Accès libre', statut: 'actif' },
  '3': { nom: 'Réserve Ankarana', categorie: 'Nature', description: 'Réserve de tsingy avec grottes et faune endémique.', localisation: 'Antsiranana', prix: '55000', horaires: 'Lun–Dim 8h–16h', statut: 'actif' },
  '4': { nom: 'Plage Nosy Iranja', categorie: 'Plage', description: 'Plage paradisiaque accessible en bateau.', localisation: 'Nosy Be', prix: '35000', horaires: 'Selon marées', statut: 'inactif' },
  '5': { nom: 'Musée de la Reine', categorie: 'Culture', description: 'Palais royal transformé en musée national.', localisation: 'Antananarivo', prix: '15000', horaires: 'Mar–Dim 9h–17h', statut: 'actif' },
};

export default function EditAttractionPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const mock = mockAttractions[id] || { nom: '', categorie: 'Nature', description: '', localisation: '', prix: '', horaires: '', statut: 'actif' };

  const [form, setForm] = useState(mock);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Attraction mise à jour avec succès (mock)');
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
          <p className="text-sm text-gray-500">Dashboard / Attractions / Modifier</p>
          <h1 className="text-2xl font-bold text-gray-900">Modifier l&apos;attraction</h1>
        </div>
      </div>

      <div className="flex justify-end">
        <Link href={`/dashboard/attractions/${id}/photos`}>
          <Button variant="outline" className="gap-2 border-purple-200 text-purple-600 hover:bg-purple-50">
            <Image className="h-4 w-4" /> Gérer les photos
          </Button>
        </Link>
      </div>

      <form onSubmit={handleSubmit} className="rounded-xl bg-white border border-gray-200 shadow-sm p-6 space-y-5">
        <div className="space-y-2">
          <Label htmlFor="nom">Nom de l&apos;attraction</Label>
          <Input id="nom" name="nom" value={form.nom} onChange={handleChange} className="border-gray-300 focus:ring-orange-500 focus:border-orange-500" required />
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
          <textarea id="description" name="description" value={form.description} onChange={handleChange} rows={4} className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="localisation">Localisation</Label>
            <Input id="localisation" name="localisation" value={form.localisation} onChange={handleChange} className="border-gray-300 focus:ring-orange-500 focus:border-orange-500" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="prix">Prix d&apos;entrée (Ar)</Label>
            <Input id="prix" name="prix" type="number" value={form.prix} onChange={handleChange} className="border-gray-300 focus:ring-orange-500 focus:border-orange-500" required />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="horaires">Horaires</Label>
          <Input id="horaires" name="horaires" value={form.horaires} onChange={handleChange} className="border-gray-300 focus:ring-orange-500 focus:border-orange-500" />
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
