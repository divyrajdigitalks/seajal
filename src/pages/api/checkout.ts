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
    const { name, email, country, pinCode, paymentMethod, cartItems, total } = req.body;

    if (!name || !email || !pinCode || !cartItems || cartItems.length === 0) {
      return res.status(400).json({ success: false, message: 'Missing billing details or cart items' });
    }

    console.log(`[Order Placed] Name: ${name}, Email: ${email}, PIN: ${pinCode}, Method: ${paymentMethod}, Total: INR ${total}`);
    console.log('[Items]:', JSON.stringify(cartItems, null, 2));

    return res.status(200).json({ success: true, message: 'Booking request sent successfully!' });
  } else {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ success: false, message: `Method ${req.method} Not Allowed` });
  }
}
