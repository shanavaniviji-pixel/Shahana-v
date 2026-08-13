import React, { useState } from 'react';
import { useHotel } from '../context/HotelContext';
import { languageNames } from '../data/translations';
import { Language } from '../types';
import { User, Mail, Phone, Globe, Lock, Shield, Check } from 'lucide-react';

export const ProfilePage: React.FC = () => {
  const { currentUser, language, setLanguage, t } = useHotel();

  const [name, setName] = useState(currentUser.name);
  const [email, setEmail] = useState(currentUser.email);
  const [phone, setPhone] = useState(currentUser.phone);
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6 pb-12">
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center space-x-4">
        <div className="w-16 h-16 rounded-full bg-amber-500 text-slate-950 font-black text-2xl flex items-center justify-center shadow-md">
          {currentUser.name.charAt(0)}
        </div>
        <div>
          <h1 className="text-xl font-bold text-slate-900">{currentUser.name}</h1>
          <p className="text-xs text-slate-500">{currentUser.email}</p>
          <span className="inline-block mt-1 text-[10px] font-bold uppercase tracking-wider bg-amber-100 text-amber-900 px-2 py-0.5 rounded-md">
            {currentUser.role === 'admin' ? 'Hotel Administrator' : 'Valued Guest Member'}
          </span>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSave} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-5">
        <h2 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3">
          Account Settings
        </h2>

        <div>
          <label className="text-xs font-semibold text-slate-700 block mb-1">Full Name</label>
          <div className="relative">
            <User className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full pl-9 pr-3 py-2 border border-slate-200 rounded-xl text-xs font-medium outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-9 pr-3 py-2 border border-slate-200 rounded-xl text-xs font-medium outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1">Phone Number</label>
            <div className="relative">
              <Phone className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full pl-9 pr-3 py-2 border border-slate-200 rounded-xl text-xs font-medium outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>
          </div>
        </div>

        {/* Preferred Language Picker (PDF Section 7 requirement) */}
        <div>
          <label className="text-xs font-semibold text-slate-700 block mb-1">
            Preferred System Language
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {(Object.keys(languageNames) as Language[]).map((langKey) => (
              <button
                key={langKey}
                type="button"
                onClick={() => setLanguage(langKey)}
                className={`p-2.5 rounded-xl border text-left text-xs transition-all ${
                  language === langKey
                    ? 'border-amber-500 bg-amber-50 text-amber-900 font-bold ring-2 ring-amber-400/30'
                    : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
              >
                <div className="font-bold">{languageNames[langKey].native}</div>
                <div className="text-[10px] text-slate-500">{languageNames[langKey].english}</div>
              </button>
            ))}
          </div>
        </div>

        <div className="pt-2 flex items-center justify-between">
          <button
            type="submit"
            className="px-6 py-2.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold rounded-xl text-xs shadow-md transition-all cursor-pointer"
          >
            Save Profile
          </button>
          {saved && (
            <span className="text-xs text-emerald-600 font-bold flex items-center space-x-1">
              <Check className="w-4 h-4" />
              <span>Saved successfully</span>
            </span>
          )}
        </div>
      </form>
    </div>
  );
};
