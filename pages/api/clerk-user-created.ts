import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma'; // adapte ce chemin si besoin

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { id, email_addresses, first_name, last_name } = req.body.data;
    await prisma.utilisateur.create({
      data: {
        clerkId: id,
        email: email_addresses[0]?.email_address,
        nom: last_name,
        prenom: first_name,
        // Ajoute d'autres champs selon ton modèle
      },
    });
    return res.status(200).json({ ok: true });
  } catch (error) {
    return res.status(500).json({ error: 'Erreur lors de la création utilisateur', details: error });
  }
} 