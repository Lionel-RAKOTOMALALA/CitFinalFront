'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { ArrowLeft, Upload, Trash2, ImageIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';

const mockPhotos = [
  { id: '1', label: 'Vue principale', color: 'bg-blue-200' },
  { id: '2', label: 'Salle de bain', color: 'bg-green-200' },
  { id: '3', label: 'Vue balcon', color: 'bg-yellow-200' },
  { id: '4', label: 'Bureau', color: 'bg-pink-200' },
  { id: '5', label: 'Coin salon', color: 'bg-purple-200' },
  { id: '6', label: 'Lit king size', color: 'bg-orange-200' },
];

export default function ChambrePhotosPage() {
  const params = useParams();
  const id = params.id as string;
  const chambreId = params.chambreId as string;
  const [photos, setPhotos] = useState(mockPhotos);

  const handleUpload = () => {
    alert('Fonctionnalité d\'upload à connecter');
  };

  const handleDelete = (photoId: string) => {
    setPhotos((prev) => prev.filter((p) => p.id !== photoId));
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href={`/dashboard/hebergements/${id}/chambres/${chambreId}`}>
            <Button variant="outline" size="sm" className="gap-1">
              <ArrowLeft className="h-4 w-4" /> Retour
            </Button>
          </Link>
          <div>
            <p className="text-sm text-gray-500">Dashboard / Hébergements / Hôtel #{id} / Chambre #{chambreId} / Photos</p>
            <h1 className="text-2xl font-bold text-gray-900">Gestion des photos</h1>
          </div>
        </div>
        <Button onClick={handleUpload} className="bg-orange-500 hover:bg-orange-600 text-white gap-2">
          <Upload className="h-4 w-4" /> Ajouter des photos
        </Button>
      </div>

      {photos.length === 0 ? (
        <div className="rounded-xl bg-white border border-dashed border-gray-300 p-12 text-center">
          <ImageIcon className="h-12 w-12 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500 font-medium">Aucune photo pour le moment</p>
          <p className="text-sm text-gray-400 mt-1">Cliquez sur &quot;Ajouter des photos&quot; pour commencer</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {photos.map((photo) => (
            <div key={photo.id} className="rounded-xl bg-white border border-gray-200 shadow-sm overflow-hidden group">
              <div className={`h-40 ${photo.color} flex items-center justify-center`}>
                <ImageIcon className="h-10 w-10 text-white/60" />
              </div>
              <div className="p-3 flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700 truncate">{photo.label}</span>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleDelete(photo.id)}
                  className="ml-2 text-red-500 border-red-200 hover:bg-red-50 flex-shrink-0"
                >
                  <Trash2 className="h-3 w-3" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
