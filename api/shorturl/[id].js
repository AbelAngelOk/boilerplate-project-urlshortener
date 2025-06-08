import { cargarDatos } from '../../../db.js';

export default function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { id } = req.query;
  const shortId = parseInt(id, 10);
  if (isNaN(shortId)) return res.status(400).json({ error: 'Invalid ID format' });

  const data = cargarDatos();
  const found = data.find(item => item.short_url === shortId);

  if (!found) return res.status(404).json({ error: 'Not found' });

  res.writeHead(302, { Location: found.original_url });
  res.end();
}
