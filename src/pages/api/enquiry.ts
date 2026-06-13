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
    const { productName, requirement, countryCode, phone, email } = req.body;

    // Simulate backend validation and db save
    if (!requirement || !phone) {
      return res.status(400).json({ success: false, message: 'Missing fields' });
    }

    console.log(`[Enquiry Received] Product: ${productName}, Req: ${requirement}, Phone: ${countryCode}${phone}, Email: ${email}`);

    // Return success
    return res.status(200).json({ success: true, message: 'Enquiry submitted successfully' });
  } else {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ success: false, message: `Method ${req.method} Not Allowed` });
  }
}
