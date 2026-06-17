import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Phone, Mail, MapPin, Send, CheckCircle, ChevronRight } from 'lucide-react';

export default function ContactMapView() {
  const router = useRouter();
  const { lat, lng } = router.query;

  // Form states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [countryCode, setCountryCode] = useState('+91');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Default coordinate fallbacks if query parameters are missing
  const defaultLat = "18.622266";
  const defaultLng = "73.830317";

  const mapLat = lat ? String(lat).replace('-', '.') : defaultLat;
  const mapLng = lng ? String(lng).replace('-', '.') : defaultLng;

  // Google maps embed URL
  const mapUrl = `https://maps.google.com/maps?q=${mapLat},${mapLng}&z=15&output=embed`;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !message) return alert('Name, phone, and message are required');
    setLoading(true);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          countryCode,
          phone,
          subject,
          message,
        }),
      });

      if (res.ok) {
        setSubmitted(true);
        setTimeout(() => {
          setSubmitted(false);
          setName('');
          setEmail('');
          setPhone('');
          setSubject('');
          setMessage('');
        }, 3000);
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
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-12">
      {/* Breadcrumbs */}
      <nav className="text-sm text-slate-500 flex items-center gap-1">
        <Link href="/" className="hover:text-primary transition-colors">Home</Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-slate-900 font-semibold">Contact Us</span>
      </nav>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Contact Info & Map */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Get In Touch</h1>
            <p className="text-sm text-slate-500 mt-1">Visit our Pimple Saudagar showroom or drop us a query online.</p>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-md space-y-4">
            <div className="flex items-start gap-3.5">
              <MapPin className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-bold text-slate-800">Office Location</h4>
                <p className="text-sm text-slate-600 mt-0.5">
                  Shop No. 4, Shravani Heritage, Near PCMC School, Pimple Saudagar, Pune - 411027
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3.5">
              <Phone className="h-5 w-5 text-primary flex-shrink-0" />
              <div>
                <h4 className="font-bold text-slate-800">Customer Support</h4>
                <a href="tel:+917770018181" className="text-sm text-primary hover:underline">
                  +91 77700 18181
                </a>
              </div>
            </div>

            <div className="flex items-center gap-3.5">
              <Mail className="h-5 w-5 text-primary flex-shrink-0" />
              <div>
                <h4 className="font-bold text-slate-800">E-mail Queries</h4>
                <a href="mailto:info@aquaj1.in" className="text-sm text-primary hover:underline">
                  info@aquaj1.in
                </a>
              </div>
            </div>
          </div>

          {/* Embedded Google Map */}
          <div className="rounded-3xl overflow-hidden shadow-md border border-slate-100 aspect-video w-full bg-slate-100">
            <iframe
              src={mapUrl}
              className="w-full h-full border-0"
              allowFullScreen
              loading="lazy"
              title="Seajal Showroom Location"
            />
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-md">
          <h2 className="text-xl font-bold text-slate-900 mb-6">Send Us a Direct Message</h2>

          {submitted ? (
            <div className="flex flex-col items-center justify-center py-12 text-center space-y-3">
              <CheckCircle className="h-16 w-16 text-emerald-500 animate-bounce" />
              <h3 className="text-lg font-bold text-slate-800">Message Sent Successfully!</h3>
              <p className="text-sm text-slate-500">
                We have received your message. Our representative will contact you shortly.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter name"
                  className="w-full rounded-xl border border-slate-200 p-3 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full rounded-xl border border-slate-200 p-3 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
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
                    className="w-full rounded-xl border border-slate-200 p-3 text-sm text-center focus:border-primary"
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
                    placeholder="Enter phone"
                    className="w-full rounded-xl border border-slate-200 p-3 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">
                  Subject (Optional)
                </label>
                <input
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="e.g. Service Query, Commercial Project"
                  className="w-full rounded-xl border border-slate-200 p-3 text-sm focus:border-primary focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">
                  Your Message
                </label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type message details here..."
                  className="w-full rounded-xl border border-slate-200 p-3 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary min-h-[100px]"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full gradient-bg hover:opacity-95 text-white font-semibold py-3 px-4 rounded-xl flex items-center justify-center gap-2 shadow-lg transition-all"
              >
                <span>Send Message</span>
                <Send className="h-4 w-4" />
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
