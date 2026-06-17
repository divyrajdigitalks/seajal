import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { CheckCircle, Truck, ShoppingBag, ArrowLeft } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, cartTotal, clearCart } = useCart();

  // Form inputs
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [country, setCountry] = useState('India');
  const [pinCode, setPinCode] = useState('');
  const [phone, setPhone] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('COD');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  if (cart.length === 0 && !success) {
    return (
      <div className="mx-auto max-w-xl px-4 py-20 text-center space-y-4">
        <div className="mx-auto h-16 w-16 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
          <ShoppingBag className="h-8 w-8" />
        </div>
        <h2 className="text-xl font-bold text-slate-900">Your Cart is Empty</h2>
        <p className="text-slate-500">Add products to your cart before proceeding to checkout.</p>
        <Link href="/all-products/1" className="inline-block text-primary font-bold hover:underline">
          Return to products
        </Link>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !pinCode || !phone) {
      return alert('Please fill in all details');
    }
    setLoading(true);

    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          country,
          pinCode,
          phone,
          paymentMethod,
          cartItems: cart.map(item => ({
            id: item.product.id,
            name: item.product.name,
            quantity: item.quantity,
            price: item.product.price
          })),
          total: cartTotal
        })
      });

      if (res.ok) {
        setSuccess(true);
        clearCart();
      } else {
        alert('Booking request failed. Please check form data and try again.');
      }
    } catch (err) {
      console.error(err);
      alert('Error connecting to the checkout service.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="mx-auto max-w-xl px-4 py-20 text-center space-y-6">
        <div className="mx-auto h-20 w-20 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-500 animate-bounce">
          <CheckCircle className="h-12 w-12" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Booking Request Sent!</h1>
          <p className="text-slate-500 mt-2">
            Thank you for ordering. Seajal will contact you shortly to confirm the COD details and delivery schedule.
          </p>
        </div>
        <Link
          href="/"
          className="inline-block bg-slate-900 hover:bg-slate-800 text-white font-semibold px-8 py-3 rounded-xl transition-all shadow-md"
        >
          Return to Homepage
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-8">
      <div className="flex items-center gap-2">
        <Link href="/cart" className="text-slate-500 hover:text-slate-800 p-2 rounded-lg hover:bg-slate-100 transition-all">
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Checkout Billing</h1>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Billing fields Form */}
        <div className="lg:col-span-2 bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-md space-y-6">
          <h2 className="text-lg font-bold text-slate-900 border-b border-slate-50 pb-3">Billing Details</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">
                Country
              </label>
              <input
                type="text"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className="w-full rounded-xl border border-slate-200 p-3 text-sm focus:border-primary focus:outline-none"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">
                PIN Code / Zip
              </label>
              <input
                type="text"
                value={pinCode}
                onChange={(e) => setPinCode(e.target.value)}
                placeholder="e.g. 411027"
                className="w-full rounded-xl border border-slate-200 p-3 text-sm focus:border-primary focus:outline-none"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">
                Full Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter name"
                className="w-full rounded-xl border border-slate-200 p-3 text-sm focus:border-primary focus:outline-none"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="e.g. 9876543210"
                className="w-full rounded-xl border border-slate-200 p-3 text-sm focus:border-primary focus:outline-none"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="e.g. name@example.com"
              className="w-full rounded-xl border border-slate-200 p-3 text-sm focus:border-primary focus:outline-none"
              required
            />
          </div>

          {/* Payment options */}
          <div className="space-y-3 pt-2">
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500">
              Payment Method
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <label className="flex items-center gap-3 border border-primary bg-teal-50/30 p-4 rounded-xl cursor-pointer">
                <input
                  type="radio"
                  name="payment"
                  checked={paymentMethod === 'COD'}
                  onChange={() => setPaymentMethod('COD')}
                  className="text-primary focus:ring-primary h-4 w-4"
                />
                <div className="flex items-center gap-2">
                  <Truck className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm font-bold text-slate-900">Cash on Delivery</p>
                    <p className="text-[10px] text-slate-500">Pay inside Pune when delivered</p>
                  </div>
                </div>
              </label>

              <label className="flex items-center gap-3 border border-slate-200 opacity-60 p-4 rounded-xl cursor-not-allowed">
                <input
                  type="radio"
                  name="payment"
                  disabled
                  className="text-slate-300 h-4 w-4"
                />
                <div>
                  <p className="text-sm font-bold text-slate-400">Pay Now (Online)</p>
                  <p className="text-[10px] text-slate-400">Currently unavailable</p>
                </div>
              </label>
            </div>
          </div>
        </div>

        {/* Order review sidebar */}
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-md space-y-6">
          <h2 className="text-lg font-bold text-slate-900 border-b border-slate-50 pb-3">Review Order</h2>

          <div className="space-y-3 max-h-[200px] overflow-y-auto pr-1">
            {cart.map(item => (
              <div key={item.product.id} className="flex justify-between items-center text-sm gap-2">
                <span className="text-slate-600 truncate flex-grow">{item.product.name} (x{item.quantity})</span>
                <span className="font-semibold text-slate-800 flex-shrink-0">₹{(item.product.price || 0) * item.quantity}</span>
              </div>
            ))}
          </div>

          <div className="border-t border-slate-100 pt-4 flex justify-between items-baseline text-slate-900">
            <span className="text-sm font-semibold">Total Cost</span>
            <span className="text-xl font-extrabold">₹{cartTotal}</span>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full gradient-bg hover:opacity-95 text-white font-semibold py-3 px-4 rounded-xl flex items-center justify-center gap-2 shadow-lg transition-all"
          >
            {loading ? (
              <span className="h-5 w-5 animate-spin border-2 border-white border-t-transparent rounded-full" />
            ) : (
              <span>Send Booking Request</span>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
