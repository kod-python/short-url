import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { longUrl } = req.body;

    if (!longUrl || typeof longUrl !== 'string') {
      return res.status(400).json({ error: 'Invalid URL' });
    }


    const shortUrl = Math.random().toString(36).substring(2, 8);

    try {
      const newUrl = await prisma.url.create({
        data: { longUrl, shortUrl },
      });

      return res.status(200).json({ shortUrl: newUrl.shortUrl });
    } catch (error) {
      return res.status(500).json({ error: 'Failed to shorten URL' });
    }
  } else {
    return res.status(405).json({ error: 'Method not allowed' });
  }
}
