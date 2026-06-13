import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Trash2, ShoppingBag, Plus, Minus, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function CartPage() {
  const router = useRouter();
  const { cart, updateQuantity, removeFromCart, cartTotal, cartCount } = useCart();

  if (cart.length === 0) {
    return (
      <div className="mx-auto max-w-xl px-4 py-20 text-center space-y-6">
        <div className="mx-auto h-20 w-20 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
          <ShoppingBag className="h-10 w-10" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Your Cart is Empty</h1>
          <p className="text-slate-500 mt-2">Add domestic retail water purifiers to your cart to order them online.</p>
        </div>
        <Link
          href="/all-products/1"
          className="inline-block gradient-bg text-white font-semibold px-8 py-3 rounded-xl shadow-lg hover:opacity-95 transition-all"
        >
          Browse Products
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-8">
      <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Cart items list */}
        <div className="lg:col-span-2 space-y-4">
          {cart.map((item) => (
            <div
              key={item.product.id}
              className="bg-white p-4 rounded-3xl border border-slate-100 shadow-sm flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
            >
              <div className="flex items-center gap-4">
                <div className="h-16 w-16 bg-slate-50 rounded-xl overflow-hidden flex-shrink-0 flex items-center justify-center border border-slate-100">
                  <img src={item.product.image} alt={item.product.name} className="h-full w-full object-cover" onError={(e) => { e.currentTarget.src = 'https://placehold.co/100x100?text=AquaJ1' }} />
                </div>
                <div className="min-w-0">
                  <h3 className="text-sm font-bold text-slate-900 truncate max-w-[200px] sm:max-w-xs">{item.product.name}</h3>
                  <p className="text-xs text-slate-400 mt-0.5">{item.product.categoryName}</p>
                  <p className="text-sm font-extrabold text-slate-800 mt-1">₹{item.product.price}</p>
                </div>
              </div>

              {/* Quantity controls and remove */}
              <div className="flex items-center justify-between sm:justify-end gap-6 border-t border-slate-50 pt-3 sm:pt-0 sm:border-0">
                <div className="flex items-center gap-2 border border-slate-200 rounded-xl p-1 bg-slate-50">
                  <button
                    onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                    className="p-1 text-slate-500 hover:text-slate-900 transition-colors"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="text-sm font-bold text-slate-800 px-2 min-w-[20px] text-center">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                    className="p-1 text-slate-500 hover:text-slate-900 transition-colors"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>

                <button
                  onClick={() => removeFromCart(item.product.id)}
                  className="text-slate-400 hover:text-rose-500 p-2 transition-colors"
                  aria-label="Remove item"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary card */}
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-md space-y-6">
          <h2 className="text-lg font-bold text-slate-900">Order Summary</h2>

          <div className="space-y-3 text-sm text-slate-600 border-b border-slate-100 pb-4">
            <div className="flex justify-between">
              <span>Items Total ({cartCount})</span>
              <span className="font-semibold text-slate-900">₹{cartTotal}</span>
            </div>
            <div className="flex justify-between">
              <span>Delivery Charges</span>
              <span className="text-emerald-500 font-semibold">Free Delivery</span>
            </div>
          </div>

          <div className="flex justify-between items-baseline text-slate-900">
            <span className="text-base font-bold">Total Amount</span>
            <span className="text-2xl font-extrabold">₹{cartTotal}</span>
          </div>

          <Link
            href="/Checkout"
            className="w-full gradient-bg hover:opacity-95 text-white font-semibold py-3 px-4 rounded-xl flex items-center justify-center gap-2 shadow-lg transition-all"
          >
            <span>Proceed to Checkout</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
