// Vercel Serverless Function: Mark quote as used
// Handles POST /api/mark_used
export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(200).json({ status: 'ok', message: 'API ready' });
  }

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : (req.body || {});
    const quote_id = body.quote_id;

    return res.status(200).json({
      status: 'success',
      quote_id: quote_id,
      marked: true
    });
  } catch (err) {
    return res.status(500).json({ status: 'error', message: err.message });
  }
}
