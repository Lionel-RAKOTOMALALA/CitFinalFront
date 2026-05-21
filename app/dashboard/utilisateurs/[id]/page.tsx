'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { ArrowLeft, ShieldCheck, UserCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const mockUtilisateurs: Record<string, { nom: string; email: string; role: string; dateInscription: string; statut: string; telephone: string; adresse: string }> = {
  '1': { nom: 'Admin Principal', email: 'admin@southbooking.com', role: 'admin', dateInscription: '2023-06-01', statut: 'actif', telephone: '+261 34 000 0000', adresse: 'Antananarivo, Madagascar' },
  '2': { nom: 'Jean Dupont', email: 'jean.dupont@email.com', role: 'user', dateInscription: '2023-09-15', statut: 'actif', telephone: '+261 34 000 0001', adresse: 'Paris, France' },
  '3': { nom: 'Marie Claire', email: 'marie.claire@email.com', role: 'user', dateInscription: '2023-10-22', statut: 'actif', telephone: '+261 34 000 0002', adresse: 'Lyon, France' },
  '4': { nom: 'Paul Martin', email: 'paul.martin@email.com', role: 'user', dateInscription: '2023-11-05', statut: 'inactif', telephone: '+261 34 000 0003', adresse: 'Marseille, France' },
  '5': { nom: 'Sophie Blanc', email: 'sophie.blanc@email.com', role: 'user', dateInscription: '2024-01-10', statut: 'actif', telephone: '+261 34 000 0004', adresse: 'Bordeaux, France' },
  '6': { nom: 'Marc Leroy', email: 'marc.leroy@email.com', role: 'user', dateInscription: '2024-01-12', statut: 'actif', telephone: '+261 34 000 0005', adresse: 'Nantes, France' },
};

export default function UtilisateurDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const user = mockUtilisateurs[id] || mockUtilisateurs['2'];
  const [role, setRole] = useState(user.role);

  const toggleRole = () => {
    const newRole = role === 'admin' ? 'user' : 'admin';
    setRole(newRole);
    alert(`Rôle changé en "${newRole}" (mock)`);
  };

  return (
    <div className="p-6 space-y-6 max-w-2xl">
      <div className="flex items-center gap-3">
        <Link href="/dashboard/utilisateurs">
          <Button variant="outline" size="sm" className="gap-1">
            <ArrowLeft className="h-4 w-4" /> Retour
          </Button>
        </Link>
        <div>
          <p className="text-sm text-gray-500">Dashboard / Utilisateurs / Détail</p>
          <h1 className="text-2xl font-bold text-gray-900">Profil utilisateur</h1>
        </div>
      </div>

      {/* Avatar + role */}
      <div className="rounded-xl bg-white border border-gray-200 shadow-sm p-6">
        <div className="flex items-center gap-4">
          <div className="h-16 w-16 rounded-full bg-orange-100 text-orange-700 flex items-center justify-center font-bold text-2xl flex-shrink-0">
            {user.nom.charAt(0)}
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">{user.nom}</h2>
            <p className="text-sm text-gray-500">{user.email}</p>
            <div className="mt-2">
              {role === 'admin' ? (
                <Badge className="bg-orange-100 text-orange-700 hover:bg-orange-100">Administrateur</Badge>
              ) : (
                <Badge className="bg-gray-100 text-gray-700 hover:bg-gray-100">Utilisateur</Badge>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Info fields (read-only) */}
      <div className="rounded-xl bg-white border border-gray-200 shadow-sm p-6 space-y-4">
        <h3 className="text-base font-semibold text-gray-900 border-b border-gray-100 pb-3">Informations</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-xs text-gray-500 uppercase font-semibold mb-1">Nom complet</p>
            <p className="text-sm font-medium text-gray-900 bg-gray-50 rounded-md px-3 py-2">{user.nom}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 uppercase font-semibold mb-1">Email</p>
            <p className="text-sm font-medium text-gray-900 bg-gray-50 rounded-md px-3 py-2">{user.email}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 uppercase font-semibold mb-1">Téléphone</p>
            <p className="text-sm font-medium text-gray-900 bg-gray-50 rounded-md px-3 py-2">{user.telephone}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 uppercase font-semibold mb-1">Rôle</p>
            <p className="text-sm font-medium text-gray-900 bg-gray-50 rounded-md px-3 py-2 capitalize">{role}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 uppercase font-semibold mb-1">Date d&apos;inscription</p>
            <p className="text-sm font-medium text-gray-900 bg-gray-50 rounded-md px-3 py-2">{user.dateInscription}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 uppercase font-semibold mb-1">Statut</p>
            <p className="text-sm font-medium text-gray-900 bg-gray-50 rounded-md px-3 py-2 capitalize">{user.statut}</p>
          </div>
          <div className="col-span-2">
            <p className="text-xs text-gray-500 uppercase font-semibold mb-1">Adresse</p>
            <p className="text-sm font-medium text-gray-900 bg-gray-50 rounded-md px-3 py-2">{user.adresse}</p>
          </div>
        </div>
      </div>

      {/* Role change */}
      <div className="rounded-xl bg-white border border-gray-200 shadow-sm p-6">
        <h3 className="text-base font-semibold text-gray-900 mb-3">Gestion du rôle</h3>
        <p className="text-sm text-gray-500 mb-4">
          Rôle actuel : <span className="font-semibold text-gray-800 capitalize">{role}</span>
        </p>
        <Button
          onClick={toggleRole}
          variant="outline"
          className={`gap-2 ${role === 'admin' ? 'border-gray-200 text-gray-700 hover:bg-gray-50' : 'border-orange-200 text-orange-600 hover:bg-orange-50'}`}
        >
          {role === 'admin' ? (
            <><UserCheck className="h-4 w-4" /> Rétrograder en utilisateur</>
          ) : (
            <><ShieldCheck className="h-4 w-4" /> Promouvoir en administrateur</>
          )}
        </Button>
      </div>
    </div>
  );
}
