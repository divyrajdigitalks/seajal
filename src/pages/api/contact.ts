import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  success: boolean;
  message: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === 'POST') {
    const { name, email, countryCode, phone, subject, message } = req.body;

    if (!name || !phone || !message) {
      return res.status(400).json({ success: false, message: 'Missing required fields' });
    }

    console.log(`[Contact Form] Name: ${name}, Phone: ${countryCode}${phone}, Subject: ${subject}, Message: ${message}`);

    return res.status(200).json({ success: true, message: 'Message submitted successfully' });
  } else {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ success: false, message: `Method ${req.method} Not Allowed` });
  }
}
