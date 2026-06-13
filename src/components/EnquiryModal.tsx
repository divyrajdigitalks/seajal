import React, { useState } from 'react';
import { X, CheckCircle, Send } from 'lucide-react';

interface EnquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  productName?: string;
}

export const EnquiryModal: React.FC<EnquiryModalProps> = ({ isOpen, onClose, productName }) => {
  const [requirement, setRequirement] = useState('');
  const [countryCode, setCountryCode] = useState('+91');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone) return alert('Phone number is required');
    setLoading(true);

    try {
      const res = await fetch('/api/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productName,
          requirement,
          countryCode,
          phone,
          email,
        }),
      });
      if (res.ok) {
        setSubmitted(true);
        setTimeout(() => {
          setSubmitted(false);
          setRequirement('');
          setPhone('');
          setEmail('');
          onClose();
        }, 2500);
      } else {
        alert('Something went wrong. Please try again.');
      }
    } catch (err) {
      console.error(err);
      alert('Error connecting to server.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="relative w-full max-w-md overflow-hidden rounded-2xl bg-white p-6 shadow-2xl transition-all-custom border border-slate-100">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors"
        >
          <X className="h-6 w-6" />
        </button>

        {submitted ? (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <CheckCircle className="h-16 w-16 text-emerald-500 animate-bounce mb-4" />
            <h3 className="text-xl font-bold text-slate-800">Enquiry Submitted!</h3>
            <p className="mt-2 text-sm text-slate-500">
              Thank you for contacting Seajal. Our engineer will call you shortly.
            </p>
          </div>
        ) : (
          <div>
            <h3 className="text-xl font-bold text-slate-800">
              Enquiry for {productName || 'Water Solution'}
            </h3>
            <p className="mt-1 text-sm text-slate-500">
              Please fill your requirements, and our team will get in touch with you.
            </p>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">
                  Describe your requirement
                </label>
                <textarea
                  value={requirement}
                  onChange={(e) => setRequirement(e.target.value)}
                  placeholder="e.g. Commercial RO Plant for 200 staff office..."
                  className="w-full rounded-xl border border-slate-200 p-3 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary min-h-[80px]"
                  required
                />
              </div>

              <div className="grid grid-cols-4 gap-2">
                <div className="col-span-1">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">
                    Code
                  </label>
                  <input
                    type="text"
                    value={countryCode}
                    onChange={(e) => setCountryCode(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 p-3 text-sm text-center focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                    required
                  />
                </div>
                <div className="col-span-3">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Enter phone number"
                    className="w-full rounded-xl border border-slate-200 p-3 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">
                  Email Address (Optional)
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full rounded-xl border border-slate-200 p-3 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full gradient-bg hover:opacity-95 text-white font-semibold py-3 px-4 rounded-xl flex items-center justify-center gap-2 shadow-lg transition-all"
              >
                {loading ? (
                  <span className="h-5 w-5 animate-spin border-2 border-white border-t-transparent rounded-full" />
                ) : (
                  <>
                    <Send className="h-4 w-4" />
                    <span>Send Message</span>
                  </>
                )}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
