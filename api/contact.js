export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { token, ...formData } = req.body;

  if (!token) {
    return res.status(400).json({ error: 'Turnstile token is required' });
  }

  try {
    // Verify Turnstile token with Cloudflare
    const verifyRes = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        secret: '0x4AAAAAADTH2mkz370BPbsLza7LVAoOhGE',
        response: token,
      }),
    });

    const verifyData = await verifyRes.json();

    if (!verifyData.success) {
      return res.status(403).json({ error: 'Turnstile verification failed' });
    }

    // If Turnstile is successful, forward the data to Formspree
    const formspreeRes = await fetch('https://formspree.io/f/mkoegokq', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (formspreeRes.ok) {
      return res.status(200).json({ success: true });
    } else {
      return res.status(500).json({ error: 'Formspree submission failed' });
    }
  } catch (error) {
    console.error('Error during form submission:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
