import { guardarUnDato, ultimoRegistro } from '../../../db.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { url } = req.body;
  if (!url) return res.status(400).json({ error: 'Missing URL' });

  const nuevoId = ultimoRegistro().short_url + 1;
  
  guardarUnDato({ 
    original_url: url, 
    short_url: nuevoId 
    });

  res.json({ original_url: url, short_url: nuevoId });
}
