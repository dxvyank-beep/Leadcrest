export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { token, name, email, message, phone, business, _gotcha } = req.body ?? {};

  // Honeypot: silently discard bot submissions
  if (_gotcha) {
    return res.status(200).json({ success: true });
  }

  // Validate required fields
  if (!token || typeof token !== 'string') {
    return res.status(400).json({ error: 'Turnstile token is required' });
  }
  if (!name || !email || typeof email !== 'string' || !email.includes('@')) {
    return res.status(400).json({ error: 'Valid name and email are required' });
  }

  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) {
    return res.status(500).json({ error: 'Server configuration error' });
  }

  try {
    // Verify Turnstile token with Cloudflare
    const verifyRes = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ secret, response: token }),
    });

    const verifyData = await verifyRes.json();

    if (!verifyData.success) {
      return res.status(403).json({ error: 'Turnstile verification failed' });
    }

    // Forward clean data to Formspree (never forward raw body)
    const formspreeRes = await fetch('https://formspree.io/f/mkoegokq', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({ name, email, phone, business, message }),
    });

    if (formspreeRes.ok) {
      return res.status(200).json({ success: true });
    } else {
      return res.status(502).json({ error: 'Form submission failed' });
    }
  } catch {
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
