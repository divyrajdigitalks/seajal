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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-md p-4">
      <div className="relative w-full max-w-lg overflow-hidden rounded-[2rem] bg-white p-8 shadow-2xl shadow-teal-900/20 border border-white/50">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 h-10 w-10 bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-700 rounded-full flex items-center justify-center transition-colors"
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
            <h3 className="text-2xl font-extrabold text-slate-900 pr-10 leading-tight">
              Enquiry for <span className="gradient-text">{productName || 'Water Solution'}</span>
            </h3>
            <p className="mt-2 text-slate-500 font-medium">
              Please share your details. Our technical experts will contact you shortly.
            </p>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">
                  Project Requirement
                </label>
                <textarea
                  value={requirement}
                  onChange={(e) => setRequirement(e.target.value)}
                  placeholder="e.g., Commercial RO Plant for 200 staff office..."
                  className="w-full rounded-2xl bg-slate-50 border border-slate-200 p-4 text-sm text-slate-800 focus:bg-white focus:border-teal-400 focus:outline-none focus:ring-4 focus:ring-teal-400/10 min-h-[100px] transition-all resize-none shadow-inner"
                  required
                />
              </div>

              <div className="grid grid-cols-4 gap-2">
                <div className="col-span-1">
                  <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">
                    Code
                  </label>
                  <input
                    type="text"
                    value={countryCode}
                    onChange={(e) => setCountryCode(e.target.value)}
                    className="w-full rounded-2xl bg-slate-50 border border-slate-200 p-4 text-sm text-center font-bold text-slate-700 focus:bg-white focus:border-teal-400 focus:outline-none focus:ring-4 focus:ring-teal-400/10 transition-all shadow-inner"
                    required
                  />
                </div>
                <div className="col-span-3">
                  <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Enter phone number"
                    className="w-full rounded-2xl bg-slate-50 border border-slate-200 p-4 text-sm text-slate-800 focus:bg-white focus:border-teal-400 focus:outline-none focus:ring-4 focus:ring-teal-400/10 transition-all shadow-inner font-medium tracking-wide"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">
                  Email Address <span className="text-slate-400 font-normal normal-case">(Optional)</span>
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.com"
                  className="w-full rounded-2xl bg-slate-50 border border-slate-200 p-4 text-sm text-slate-800 focus:bg-white focus:border-teal-400 focus:outline-none focus:ring-4 focus:ring-teal-400/10 transition-all shadow-inner"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full gradient-bg hover:opacity-90 text-white font-extrabold py-4 px-6 rounded-2xl flex items-center justify-center gap-2 shadow-lg shadow-teal-500/25 transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed mt-2"
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
