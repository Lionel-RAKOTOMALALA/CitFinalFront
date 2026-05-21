'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { ArrowLeft, Plus, Trash2, VideoIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';

const mockVideos = [
  { id: '1', titre: 'Visite virtuelle chambre', duree: '2:34', taille: '45 MB', dateAjout: '2024-01-10' },
  { id: '2', titre: 'Vue depuis le balcon', duree: '0:58', taille: '12 MB', dateAjout: '2024-01-12' },
  { id: '3', titre: 'Présentation salle de bain', duree: '1:15', taille: '22 MB', dateAjout: '2024-01-15' },
];

export default function ChambreVideosPage() {
  const params = useParams();
  const id = params.id as string;
  const chambreId = params.chambreId as string;
  const [videos, setVideos] = useState(mockVideos);

  const handleAdd = () => {
    alert('Fonctionnalité d\'upload à connecter');
  };

  const handleDelete = (videoId: string) => {
    setVideos((prev) => prev.filter((v) => v.id !== videoId));
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
            <p className="text-sm text-gray-500">Dashboard / Hébergements / Hôtel #{id} / Chambre #{chambreId} / Vidéos</p>
            <h1 className="text-2xl font-bold text-gray-900">Gestion des vidéos</h1>
          </div>
        </div>
        <Button onClick={handleAdd} className="bg-orange-500 hover:bg-orange-600 text-white gap-2">
          <Plus className="h-4 w-4" /> Ajouter une vidéo
        </Button>
      </div>

      {videos.length === 0 ? (
        <div className="rounded-xl bg-white border border-dashed border-gray-300 p-12 text-center">
          <VideoIcon className="h-12 w-12 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500 font-medium">Aucune vidéo pour le moment</p>
          <p className="text-sm text-gray-400 mt-1">Cliquez sur &quot;Ajouter une vidéo&quot; pour commencer</p>
        </div>
      ) : (
        <div className="rounded-xl bg-white border border-gray-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">Titre</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">Durée</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">Taille</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">Date d&apos;ajout</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {videos.map((video, i) => (
                  <tr key={video.id} className={`hover:bg-gray-50 transition-colors ${i % 2 !== 0 ? 'bg-gray-50/30' : ''}`}>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-16 rounded bg-indigo-100 flex items-center justify-center flex-shrink-0">
                          <VideoIcon className="h-5 w-5 text-indigo-400" />
                        </div>
                        <span className="font-medium text-gray-900">{video.titre}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-600">{video.duree}</td>
                    <td className="px-6 py-4 text-gray-600">{video.taille}</td>
                    <td className="px-6 py-4 text-gray-600">{video.dateAjout}</td>
                    <td className="px-6 py-4">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleDelete(video.id)}
                        className="gap-1 text-xs text-red-600 border-red-200 hover:bg-red-50"
                      >
                        <Trash2 className="h-3 w-3" /> Supprimer
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
