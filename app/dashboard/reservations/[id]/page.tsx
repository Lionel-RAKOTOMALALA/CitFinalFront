'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { ArrowLeft, CheckCircle, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const mockReservations: Record<string, {
  id: string; client: string; email: string; telephone: string;
  type: string; detail: string; date: string; montant: string; statut: string;
}> = {
  'RES-001': { id: 'RES-001', client: 'Jean Dupont', email: 'jean.dupont@email.com', telephone: '+261 34 000 0001', type: 'Hébergement', detail: 'Hôtel Jardin du Roy – Chambre Double (3 nuits)', date: '2024-01-15', montant: '320 000 Ar', statut: 'confirmée' },
  'RES-002': { id: 'RES-002', client: 'Marie Claire', email: 'marie.claire@email.com', telephone: '+261 34 000 0002', type: 'Restaurant', detail: 'Le Sakamanga – Table pour 4 (dîner)', date: '2024-01-16', montant: '85 000 Ar', statut: 'en attente' },
  'RES-003': { id: 'RES-003', client: 'Paul Martin', email: 'paul.martin@email.com', telephone: '+261 34 000 0003', type: 'Voiture', detail: 'Toyota Land Cruiser (5 jours)', date: '2024-01-16', montant: '150 000 Ar', statut: 'confirmée' },
  'RES-004': { id: 'RES-004', client: 'Sophie Blanc', email: 'sophie.blanc@email.com', telephone: '+261 34 000 0004', type: 'Attraction', detail: 'Parc National Isalo (2 personnes)', date: '2024-01-17', montant: '45 000 Ar', statut: 'annulée' },
  'RES-005': { id: 'RES-005', client: 'Marc Leroy', email: 'marc.leroy@email.com', telephone: '+261 34 000 0005', type: 'Hébergement', detail: 'Le Paradis Tropical – Suite (5 nuits)', date: '2024-01-17', montant: '480 000 Ar', statut: 'en attente' },
};

function statutBadge(statut: string) {
  if (statut === 'confirmée') return <Badge className="bg-green-100 text-green-700 hover:bg-green-100 text-sm px-3 py-1">Confirmée</Badge>;
  if (statut === 'en attente') return <Badge className="bg-yellow-100 text-yellow-700 hover:bg-yellow-100 text-sm px-3 py-1">En attente</Badge>;
  return <Badge className="bg-red-100 text-red-700 hover:bg-red-100 text-sm px-3 py-1">Annulée</Badge>;
}

export default function ReservationDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const reservation = mockReservations[id] || mockReservations['RES-001'];
  const [statut, setStatut] = useState(reservation.statut);

  const handleConfirm = () => {
    setStatut('confirmée');
    alert('Réservation confirmée (mock)');
  };

  const handleCancel = () => {
    setStatut('annulée');
    alert('Réservation annulée (mock)');
  };

  return (
    <div className="p-6 space-y-6 max-w-2xl">
      <div className="flex items-center gap-3">
        <Link href="/dashboard/reservations">
          <Button variant="outline" size="sm" className="gap-1">
            <ArrowLeft className="h-4 w-4" /> Retour
          </Button>
        </Link>
        <div>
          <p className="text-sm text-gray-500">Dashboard / Réservations / Détail</p>
          <h1 className="text-2xl font-bold text-gray-900">Réservation {id}</h1>
        </div>
      </div>

      {/* Status */}
      <div className="rounded-xl bg-white border border-gray-200 shadow-sm p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-semibold text-gray-900">Statut de la réservation</h2>
          {statutBadge(statut)}
        </div>
        <div className="flex items-center gap-3">
          {statut !== 'confirmée' && (
            <Button onClick={handleConfirm} className="bg-green-500 hover:bg-green-600 text-white gap-2">
              <CheckCircle className="h-4 w-4" /> Confirmer
            </Button>
          )}
          {statut !== 'annulée' && (
            <Button onClick={handleCancel} variant="outline" className="gap-2 border-red-200 text-red-600 hover:bg-red-50">
              <XCircle className="h-4 w-4" /> Annuler
            </Button>
          )}
        </div>
      </div>

      {/* Client info */}
      <div className="rounded-xl bg-white border border-gray-200 shadow-sm p-6 space-y-4">
        <h2 className="text-base font-semibold text-gray-900 border-b border-gray-100 pb-3">Informations client</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-xs text-gray-500 uppercase font-semibold mb-1">Nom</p>
            <p className="text-sm font-medium text-gray-900">{reservation.client}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 uppercase font-semibold mb-1">Email</p>
            <p className="text-sm font-medium text-gray-900">{reservation.email}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 uppercase font-semibold mb-1">Téléphone</p>
            <p className="text-sm font-medium text-gray-900">{reservation.telephone}</p>
          </div>
        </div>
      </div>

      {/* Booking details */}
      <div className="rounded-xl bg-white border border-gray-200 shadow-sm p-6 space-y-4">
        <h2 className="text-base font-semibold text-gray-900 border-b border-gray-100 pb-3">Détails de la réservation</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-xs text-gray-500 uppercase font-semibold mb-1">Type</p>
            <p className="text-sm font-medium text-gray-900">{reservation.type}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 uppercase font-semibold mb-1">Date</p>
            <p className="text-sm font-medium text-gray-900">{reservation.date}</p>
          </div>
          <div className="col-span-2">
            <p className="text-xs text-gray-500 uppercase font-semibold mb-1">Détail</p>
            <p className="text-sm font-medium text-gray-900">{reservation.detail}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 uppercase font-semibold mb-1">Montant total</p>
            <p className="text-lg font-bold text-orange-600">{reservation.montant}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
