import React, { useState } from 'react';
import { useHotel } from '../context/HotelContext';
import { Hotel, User, Mail, Phone, ArrowRight, ShieldCheck, Sparkles, CheckCircle2 } from 'lucide-react';

export const GuestLoginPage: React.FC = () => {
  const { loginAsGuest, setAuthPortal, t, languageNames, language, setLanguage } = useHotel();
  const [name, setName] = useState('Rahul Sharma');
  const [email, setEmail] = useState('rahul.sharma@example.com');
  const [phone, setPhone] = useState('+91 98765 43210');
  const [isSignUp, setIsSignUp] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;
    loginAsGuest(name, email, phone);
  };

  const handleDemoGuest = () => {
    loginAsGuest('Rahul Sharma', 'rahul.sharma@example.com', '+91 98765 43210');
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center py-8 px-4">
      <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        
        {/* Left Side: Brand Experience */}
        <div className="p-8 bg-gray-50 border-b md:border-b-0 md:border-r border-gray-200 flex flex-col justify-between">
          <div>
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-bold shadow-xs">
                <Hotel className="w-5 h-5" />
              </div>
              <div>
                <span className="text-base font-extrabold text-gray-900 tracking-tight block">
                  Grand Horizon
                </span>
                <span className="text-[10px] text-indigo-600 font-bold uppercase tracking-wider block">
                  Guest Portal
                </span>
              </div>
            </div>

            <div className="inline-flex items-center space-x-2 px-2.5 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-semibold mb-4">
              <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
              <span>Seamless Guest Portal</span>
            </div>

            <h2 className="text-xl font-bold text-gray-900 leading-snug">
              Welcome to Grand Horizon Hotel & Resort
            </h2>
            <p className="text-xs text-gray-500 mt-2 leading-relaxed">
              Book luxury rooms with occupancy-based dynamic pricing, lock facility time-slots, and chat with our AI Concierge.
            </p>

            <div className="mt-6 space-y-3 text-xs text-gray-600">
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Instant room reservation with printable receipts</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Infinity pool, spa & sports court slot locking</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Multilingual support in 6 regional languages</span>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-4 border-t border-gray-200 flex items-center justify-between text-xs">
            <span className="text-gray-500">Are you a hotel staff or admin?</span>
            <button
              type="button"
              onClick={() => setAuthPortal('admin')}
              className="text-indigo-600 font-bold hover:underline flex items-center space-x-1"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Admin Login</span>
            </button>
          </div>
        </div>

        {/* Right Side: Guest Login Form */}
        <div className="p-8 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-bold text-gray-900">
                  {isSignUp ? 'Guest Registration' : 'Guest Sign In'}
                </h3>
                <p className="text-xs text-gray-500">
                  {isSignUp ? 'Create your guest account' : 'Access your room & facility bookings'}
                </p>
              </div>

              {/* Language Picker */}
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value as any)}
                className="text-xs border border-gray-200 rounded-md px-2 py-1 bg-gray-50 text-gray-700 outline-none"
              >
                {Object.keys(languageNames).map((lang) => (
                  <option key={lang} value={lang}>
                    {languageNames[lang as keyof typeof languageNames].native}
                  </option>
                ))}
              </select>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-gray-700 block mb-1">
                  Full Name
                </label>
                <div className="relative">
                  <User className="w-4 h-4 absolute left-3 top-2.5 text-gray-400" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Rahul Sharma"
                    className="w-full pl-9 pr-3 py-2 border border-gray-200 rounded-md text-xs font-medium focus:ring-2 focus:ring-indigo-500 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-gray-700 block mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 absolute left-3 top-2.5 text-gray-400" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="guest@example.com"
                    className="w-full pl-9 pr-3 py-2 border border-gray-200 rounded-md text-xs font-medium focus:ring-2 focus:ring-indigo-500 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-gray-700 block mb-1">
                  Phone Number
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 absolute left-3 top-2.5 text-gray-400" />
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 98765 43210"
                    className="w-full pl-9 pr-3 py-2 border border-gray-200 rounded-md text-xs font-medium focus:ring-2 focus:ring-indigo-500 outline-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-md text-xs flex items-center justify-center space-x-2 shadow-xs transition-all cursor-pointer"
              >
                <span>{isSignUp ? 'Create Guest Account' : 'Sign In as Guest'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200" />
              </div>
              <div className="relative flex justify-center text-[10px] uppercase font-bold text-gray-400">
                <span className="bg-white px-2">Or Quick Access</span>
              </div>
            </div>

            <button
              type="button"
              onClick={handleDemoGuest}
              className="w-full py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold rounded-md text-xs border border-gray-200 transition-all cursor-pointer"
            >
              🚀 Instant Demo Guest Access
            </button>
          </div>

          <div className="mt-6 text-center text-xs text-gray-500">
            {isSignUp ? 'Already have a guest account?' : "Don't have an account yet?"}{' '}
            <button
              type="button"
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-indigo-600 font-bold hover:underline"
            >
              {isSignUp ? 'Sign In' : 'Register Now'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
