// Vercel Serverless Function: Save her reply to memory/JSON response
// When deployed on Vercel or local server, this handles POST /api/save_reply
export default async function handler(req, res) {
  // Set CORS headers
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
    const now = new Date();
    const entry = {
      timestamp: now.toLocaleString(),
      date: now.toISOString().split('T')[0],
      stage: body.stage || 'General',
      question: body.question || '',
      her_reply: body.her_reply || '',
      details: body.details || {}
    };

    return res.status(200).json({
      status: 'success',
      saved_entry: entry
    });
  } catch (err) {
    return res.status(500).json({ status: 'error', message: err.message });
  }
}
