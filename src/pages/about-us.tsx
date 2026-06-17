import React from 'react';
import { Shield, Award, Users, Droplet, Star } from 'lucide-react';
import { TEAM } from '../data/db';

export default function AboutUs() {
  const values = [
    { title: "Pure Quality", desc: "No compromises on filters, media resins, or electrical components.", icon: Droplet },
    { title: "Prompt Service", desc: "Customer care engineers respond within 24 hours in the Pune metropolitan area.", icon: Shield },
    { title: "Innovation", desc: "Always upgrading systems to support smart Alkaline and Copper filtration.", icon: Award }
  ];

  return (
    <div className="py-12 sm:py-16 space-y-20">
      {/* Intro section */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
            About <span className="gradient-text">Seajal</span>
          </h1>
          <p className="text-slate-600 leading-relaxed text-lg">
            Seajal has spent over a decade leading the water purification market in India. Originally founded in PCMC, Pune, our dedication is to bring high-quality, pure water solutions directly to families and industries.
          </p>
          <p className="text-slate-600 leading-relaxed">
            Our systems utilize advanced reverse osmosis, ultra-filtration, and ion-exchange softening resin to balance TDS, hardness, and minerals. From individual kitchens to housing complex communities and MIDC industries, we construct, supply, and support custom systems.
          </p>
        </div>
        <div className="relative rounded-3xl overflow-hidden shadow-xl aspect-video bg-slate-100 flex items-center justify-center">
          <img
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800"
            alt="Seajal HQ Office"
            className="w-full h-full object-cover"
          />
        </div>
      </section>

      {/* Core Values */}
      <section className="bg-slate-50 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <h2 className="text-3xl font-bold text-slate-900">Our Core Principles</h2>
            <p className="text-slate-600">The guidelines that define our engineering standards and customer support.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((v) => {
              const Icon = v.icon;
              return (
                <div key={v.title} className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 space-y-4">
                  <div className="h-12 w-12 rounded-2xl bg-blue-50 flex items-center justify-center text-primary">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900">{v.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{v.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Founders and Team */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <h2 className="text-3xl font-bold text-slate-900">Leadership Team</h2>
          <p className="text-slate-600">Meet the professionals powering Seajal's engineering expertise.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {TEAM.map((member) => (
            <div key={member.id} className="text-center space-y-3 bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
              <div className="mx-auto w-28 h-28 rounded-full overflow-hidden border-2 border-primary/20 shadow-md">
                <img src={member.image} alt={member.name} className="h-full w-full object-cover" onError={(e) => { e.currentTarget.src = 'https://placehold.co/150x150?text=' + member.name.charAt(0) }} />
              </div>
              <div>
                <h4 className="text-base font-bold text-slate-900">{member.name}</h4>
                <p className="text-xs text-slate-500">{member.role}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <h2 className="text-3xl font-bold text-slate-900">What Our Clients Say</h2>
          <p className="text-slate-600">Feedback from residential societies and companies who trusted our installations.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm space-y-4 relative">
            <div className="flex gap-1 text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-current" />
              ))}
            </div>
            <p className="text-slate-600 italic text-sm leading-relaxed">
              "We installed the Seajal Community Softener in our housing society in thergaon. The hardness levels dropped from 600 ppm to 40 ppm, resolving scale issues completely. Their technicians are highly professional!"
            </p>
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center font-bold text-primary text-sm">
                H
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-800">Hrishikesh mankar</h4>
                <p className="text-[10px] text-slate-400">Secretary, ganga asiayana Society</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm space-y-4 relative">
            <div className="flex gap-1 text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-current" />
              ))}
            </div>
            <p className="text-slate-600 italic text-sm leading-relaxed">
              "We have been using Seajal Commercial 25 LPH Purifiers in our software development office in Hinjawadi for 2 years. Excellent taste, absolute reliability, and prompt routine filter replacement service."
            </p>
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center font-bold text-primary text-sm">
                P
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-800">Pratik Patil</h4>
                <p className="text-[10px] text-slate-400">Admin Lead, TechSphere Solutions</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
