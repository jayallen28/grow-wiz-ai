// pages/api/journal.ts
import dbConnect from '@/lib/dbConnect';
import JournalEntry from '@/models/JournalEntry';

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === 'GET') {
    try {
      const entries = await JournalEntry.find().sort({ createdAt: -1 });
      return res.status(200).json(entries);
    } catch (error) {
      return res.status(500).json({ error: 'Failed to fetch entries' });
    }
  }

  if (req.method === 'POST') {
    const { title, description, tags } = req.body;

    if (!title || !description) {
      return res.status(400).json({ error: 'Missing fields' });
    }

    try {
      const entry = await JournalEntry.create({ title, description, tags });
      return res.status(201).json(entry);
    } catch (error) {
      return res.status(500).json({ error: 'Failed to save entry' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
