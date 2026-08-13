import React, { useState } from 'react';
import { useHotel } from '../context/HotelContext';
import {
  Hotel,
  User,
  ShieldCheck,
  Mail,
  Lock,
  Phone,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  KeyRound,
  UserCheck,
  ArrowLeft,
  Globe,
  Crown,
  Building2,
  Trees,
  Compass,
  BedDouble,
  Palmtree,
  ShieldAlert,
  Award,
  Sparkle,
} from 'lucide-react';
import { languageNames } from '../data/translations';

export const AuthPage: React.FC = () => {
  const {
    loginAsGuest,
    loginAsAdmin,
    language,
    setLanguage,
  } = useHotel();

  // Mode: 'gateway' (portal choice) | 'user' (user login/signup) | 'admin' (admin login)
  const [portalMode, setPortalMode] = useState<'gateway' | 'user' | 'admin'>('gateway');

  // Property Inspector Tab on Gateway: 'all' | 'hotel' | 'resort'
  const [propertyView, setPropertyView] = useState<'all' | 'hotel' | 'resort'>('all');

  // User Auth Mode: 'signin' | 'signup'
  const [userTab, setUserTab] = useState<'signin' | 'signup'>('signin');

  // User Form State
  const [userName, setUserName] = useState('Rahul Sharma');
  const [userEmail, setUserEmail] = useState('rahul.sharma@example.com');
  const [userPhone, setUserPhone] = useState('+91 98765 43210');
  const [userPassword, setUserPassword] = useState('password123');
  const [userConfirmPassword, setUserConfirmPassword] = useState('password123');
  const [userError, setUserError] = useState('');

  // Admin Form State
  const [adminEmail, setAdminEmail] = useState('admin@rajpalace.com');
  const [adminPassword, setAdminPassword] = useState('admin123');
  const [securityPin, setSecurityPin] = useState('8888');
  const [adminError, setAdminError] = useState('');

  // Submit User Sign In / Sign Up
  const handleUserSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setUserError('');

    if (userTab === 'signup') {
      if (!userName.trim()) {
        setUserError('Please enter your full name');
        return;
      }
      if (!userEmail.trim()) {
        setUserError('Please enter a valid email address');
        return;
      }
      if (userPassword !== userConfirmPassword) {
        setUserError('Passwords do not match');
        return;
      }
      loginAsGuest(userName, userEmail, userPhone);
    } else {
      if (!userEmail.trim() || !userPassword) {
        setUserError('Please enter your email and password');
        return;
      }
      loginAsGuest(userName || 'Rahul Sharma', userEmail, userPhone);
    }
  };

  // Submit Admin Credentials Login
  const handleAdminSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setAdminError('');

    if (!adminEmail.trim()) {
      setAdminError('Admin email is required');
      return;
    }
    if (!adminPassword) {
      setAdminError('Admin password is required');
      return;
    }
    if (securityPin !== '8888') {
      setAdminError('Invalid Security PIN. Access denied.');
      return;
    }

    loginAsAdmin(adminEmail, adminPassword);
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center py-6 px-4">
      <div className="max-w-5xl w-full bg-white rounded-3xl border border-amber-300/60 shadow-2xl overflow-hidden">
        
        {/* Top Header Bar inside Auth Gateway */}
        <div className="bg-gradient-to-r from-slate-950 via-amber-950 to-indigo-950 text-white p-5 sm:p-6 flex items-center justify-between border-b border-amber-500/30">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-400/50 text-amber-400 flex items-center justify-center font-bold shadow-lg">
              <Crown className="w-6 h-6" />
            </div>
            <div>
              <span className="text-lg font-extrabold tracking-tight block text-white font-serif">
                RAJ PALACE
              </span>
              <span className="text-[10px] text-amber-400 font-bold uppercase tracking-widest block">
                Heritage Hotel & Luxury Eco-Resort
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            {portalMode !== 'gateway' && (
              <button
                type="button"
                onClick={() => setPortalMode('gateway')}
                className="text-xs text-amber-200 hover:text-white flex items-center space-x-1.5 bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-lg border border-amber-500/30 transition-all cursor-pointer font-semibold"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Change Portal</span>
              </button>
            )}

            {/* Language Picker */}
            <div className="relative flex items-center space-x-1.5 bg-slate-900/90 px-3 py-1.5 rounded-lg border border-amber-500/30 text-xs text-amber-200 font-semibold">
              <Globe className="w-3.5 h-3.5 text-amber-400" />
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value as any)}
                className="bg-transparent text-xs text-amber-200 outline-none cursor-pointer"
              >
                {Object.keys(languageNames).map((lang) => (
                  <option key={lang} value={lang} className="bg-slate-950 text-gray-200">
                    {languageNames[lang as keyof typeof languageNames].native}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* --- VIEW 1: GATEWAY (Portal Selection & Hotel vs Resort Classification) --- */}
        {portalMode === 'gateway' && (
          <div className="p-6 sm:p-10 space-y-8">
            
            {/* PROPERTY CLASSIFICATION BANNER */}
            <div className="bg-gradient-to-br from-amber-50 via-orange-50/50 to-amber-100/40 rounded-2xl p-6 border border-amber-300/80 shadow-xs relative overflow-hidden">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
                <div className="space-y-1">
                  <div className="inline-flex items-center space-x-1.5 px-3 py-0.5 rounded-full bg-amber-500/20 border border-amber-400 text-amber-900 text-[11px] font-bold uppercase tracking-wider">
                    <Sparkles className="w-3.5 h-3.5 text-amber-700" />
                    <span>Dual-Estate Luxury Property</span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-extrabold text-gray-900 font-serif">
                    Is RAJ PALACE a Hotel or a Resort?
                  </h2>
                  <p className="text-xs text-gray-700 max-w-2xl leading-relaxed">
                    <span className="font-bold text-amber-900">RAJ PALACE combines both!</span> It spans a 17th-Century Heritage Palace Hotel Wing (with royal museum suites and grand court dining) alongside a Sprawling 25-Acre Eco-Resort Wing (featuring private pool villas and Ayurvedic botanical gardens).
                  </p>
                </div>

                {/* Property View Filter Toggles */}
                <div className="flex items-center bg-white/80 p-1 rounded-xl border border-amber-200 shrink-0 text-xs font-bold">
                  <button
                    onClick={() => setPropertyView('all')}
                    className={`px-3 py-1.5 rounded-lg transition-all ${
                      propertyView === 'all'
                        ? 'bg-amber-600 text-white shadow-xs'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    Both Wings
                  </button>
                  <button
                    onClick={() => setPropertyView('hotel')}
                    className={`px-3 py-1.5 rounded-lg transition-all flex items-center space-x-1 ${
                      propertyView === 'hotel'
                        ? 'bg-slate-900 text-white shadow-xs'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    <Building2 className="w-3.5 h-3.5 text-amber-400" />
                    <span>Hotel Wing</span>
                  </button>
                  <button
                    onClick={() => setPropertyView('resort')}
                    className={`px-3 py-1.5 rounded-lg transition-all flex items-center space-x-1 ${
                      propertyView === 'resort'
                        ? 'bg-emerald-800 text-white shadow-xs'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    <Trees className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Resort Wing</span>
                  </button>
                </div>
              </div>

              {/* PROPERTY TYPE COMPARISON CARDS */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                {(propertyView === 'all' || propertyView === 'hotel') && (
                  <div className="bg-white rounded-xl p-4 border border-amber-300 shadow-sm space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className="p-2 rounded-lg bg-slate-900 text-amber-400 font-bold">
                          <Building2 className="w-4 h-4" />
                        </div>
                        <div>
                          <h3 className="text-sm font-bold text-gray-900 font-serif">Heritage Hotel Wing</h3>
                          <span className="text-[10px] text-amber-700 font-semibold block">Palatial Architecture & Museum Suites</span>
                        </div>
                      </div>
                      <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-800 text-[10px] font-bold">Royal Hotel</span>
                    </div>
                    <p className="text-[11px] text-gray-600 leading-snug">
                      Featuring Maharajah Suites (#601), 17th century armory museum collections, grand courtyard dining, and imperial ballroom events.
                    </p>
                    <div className="flex items-center space-x-3 text-[10px] font-bold text-amber-800 pt-1">
                      <span>• Royal Suites</span>
                      <span>• Artifact Vaults</span>
                      <span>• Executive Dining</span>
                    </div>
                  </div>
                )}

                {(propertyView === 'all' || propertyView === 'resort') && (
                  <div className="bg-white rounded-xl p-4 border border-emerald-300 shadow-sm space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className="p-2 rounded-lg bg-emerald-800 text-emerald-300 font-bold">
                          <Trees className="w-4 h-4" />
                        </div>
                        <div>
                          <h3 className="text-sm font-bold text-gray-900 font-serif">Luxury Eco-Resort Wing</h3>
                          <span className="text-[10px] text-emerald-700 font-semibold block">25-Acre Sprawling Wellness Sanctuary</span>
                        </div>
                      </div>
                      <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-bold">Eco-Resort</span>
                    </div>
                    <p className="text-[11px] text-gray-600 leading-snug">
                      Featuring Private Pool Villas, Ayurvedic herbal wellness spa, infinity lagoon pool, organic farm dining, and sunset leisure lawns.
                    </p>
                    <div className="flex items-center space-x-3 text-[10px] font-bold text-emerald-800 pt-1">
                      <span>• Pool Villas</span>
                      <span>• Ayurvedic Spa</span>
                      <span>• Infinity Pool</span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* PORTAL SELECTOR SECTIONS */}
            <div>
              <div className="text-center space-y-1 mb-6">
                <h3 className="text-lg font-bold text-gray-900 font-serif">
                  Select Your Access Portal to Continue
                </h3>
                <p className="text-xs text-gray-500 max-w-lg mx-auto">
                  Sign in as a Guest to book stays and facility slots, or access the Admin Staff Console.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                {/* Option A: User / Guest */}
                <div
                  onClick={() => setPortalMode('user')}
                  className="group p-6 rounded-2xl border-2 border-amber-200 hover:border-amber-500 bg-gradient-to-b from-white to-amber-50/30 hover:shadow-xl transition-all cursor-pointer text-left flex flex-col justify-between"
                >
                  <div>
                    <div className="w-12 h-12 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center font-bold mb-4 group-hover:scale-105 transition-transform shadow-md">
                      <User className="w-6 h-6" />
                    </div>
                    <h3 className="text-base font-bold text-gray-900 group-hover:text-amber-700 transition-colors font-serif">
                      Guest & Traveler Portal
                    </h3>
                    <p className="text-xs text-gray-600 mt-1.5 leading-relaxed">
                      Reserve Hotel Suites or Resort Pool Villas, book Ayurvedic spa slots, view invoice receipts, and chat with the AI Concierge.
                    </p>
                    
                    <div className="mt-4 space-y-2 text-xs text-gray-700">
                      <div className="flex items-center space-x-2">
                        <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0" />
                        <span>Book Stays with Live Occupancy Pricing</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0" />
                        <span>Access "Artifact-to-Suite" Royal Collections</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-amber-200/60 flex items-center justify-between text-xs font-bold text-amber-700">
                    <span>Proceed to Guest Login</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
                  </div>
                </div>

                {/* Option B: Admin / Staff */}
                <div
                  onClick={() => setPortalMode('admin')}
                  className="group p-6 rounded-2xl border-2 border-slate-200 hover:border-slate-900 bg-gradient-to-b from-white to-slate-50 hover:shadow-xl transition-all cursor-pointer text-left flex flex-col justify-between"
                >
                  <div>
                    <div className="w-12 h-12 rounded-xl bg-slate-950 text-white flex items-center justify-center font-bold mb-4 group-hover:scale-105 transition-transform shadow-md">
                      <ShieldCheck className="w-6 h-6 text-amber-400" />
                    </div>
                    <h3 className="text-base font-bold text-gray-900 group-hover:text-slate-900 transition-colors font-serif">
                      Admin Staff Console
                    </h3>
                    <p className="text-xs text-gray-600 mt-1.5 leading-relaxed">
                      Restricted operations console for hotel managers to adjust dynamic multiplier rules, inspect real-time occupancy graphs, and review guest directory.
                    </p>

                    <div className="mt-4 space-y-2 text-xs text-gray-700">
                      <div className="flex items-center space-x-2">
                        <KeyRound className="w-4 h-4 text-slate-800 shrink-0" />
                        <span>Requires Authorized Staff Credentials</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <ShieldCheck className="w-4 h-4 text-slate-800 shrink-0" />
                        <span>Staff Security PIN Verification</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-200 flex items-center justify-between text-xs font-bold text-slate-950">
                    <span>Proceed to Admin Console</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
                  </div>
                </div>
              </div>
            </div>

          </div>
        )}

        {/* --- VIEW 2: USER / GUEST PORTAL (Sign In & Sign Up) --- */}
        {portalMode === 'user' && (
          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Left Side Info */}
            <div className="p-8 bg-gradient-to-br from-amber-50 to-orange-50 border-b md:border-b-0 md:border-r border-amber-200 flex flex-col justify-between">
              <div>
                <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-200/80 border border-amber-300 text-amber-900 text-xs font-bold mb-4">
                  <UserCheck className="w-3.5 h-3.5 text-amber-700" />
                  <span>Guest & Traveler Portal</span>
                </div>

                <h3 className="text-xl font-extrabold text-gray-900 font-serif">
                  Welcome to RAJ PALACE
                </h3>
                <p className="text-xs text-gray-600 mt-1.5 leading-relaxed">
                  Sign in or create your guest account to reserve Heritage Palace Suites, book Eco-Resort Pool Villas, and explore our centuries-old royal armory & crown jewels.
                </p>

                <div className="mt-6 space-y-3 text-xs text-gray-700">
                  <div className="flex items-center space-x-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Real-time occupancy pricing & instant booking</span>
                  </div>
                  <div className="flex items-center space-x-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Printable invoices with GST tax receipt breakdowns</span>
                  </div>
                  <div className="flex items-center space-x-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Multilingual AI Hotel Concierge in 6 languages</span>
                  </div>
                  <div className="flex items-center space-x-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Artifact-to-Suite 3D Royal Gallery Experience</span>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-amber-200 flex items-center justify-between text-xs">
                <span className="text-gray-500">Hotel Administrator?</span>
                <button
                  type="button"
                  onClick={() => setPortalMode('admin')}
                  className="text-amber-800 font-bold hover:underline flex items-center space-x-1"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-slate-800" />
                  <span>Admin Staff Console</span>
                </button>
              </div>
            </div>

            {/* Right Side: Sign In / Sign Up Form */}
            <div className="p-8">
              {/* Tabs: Sign In vs Sign Up */}
              <div className="flex bg-gray-100 p-1 rounded-xl border border-gray-200 mb-6 text-xs font-semibold">
                <button
                  type="button"
                  onClick={() => {
                    setUserTab('signin');
                    setUserError('');
                  }}
                  className={`flex-1 py-2 rounded-lg transition-all text-center ${
                    userTab === 'signin'
                      ? 'bg-amber-600 text-white shadow-xs font-bold'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Sign In
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setUserTab('signup');
                    setUserError('');
                  }}
                  className={`flex-1 py-2 rounded-lg transition-all text-center ${
                    userTab === 'signup'
                      ? 'bg-amber-600 text-white shadow-xs font-bold'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Sign Up (New Guest)
                </button>
              </div>

              {userError && (
                <div className="mb-4 p-3 bg-rose-50 border border-rose-200 rounded-lg text-xs text-rose-700 flex items-center space-x-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{userError}</span>
                </div>
              )}

              <form onSubmit={handleUserSubmit} className="space-y-3.5 text-xs">
                {userTab === 'signup' && (
                  <div>
                    <label className="font-bold text-gray-700 block mb-1">
                      Full Name
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 absolute left-3 top-2.5 text-gray-400" />
                      <input
                        type="text"
                        required
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                        placeholder="e.g. Rahul Sharma"
                        className="w-full pl-9 pr-3 py-2 border border-gray-200 rounded-lg font-medium text-gray-900 outline-none focus:ring-2 focus:ring-amber-500"
                      />
                    </div>
                  </div>
                )}

                <div>
                  <label className="font-bold text-gray-700 block mb-1">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 absolute left-3 top-2.5 text-gray-400" />
                    <input
                      type="email"
                      required
                      value={userEmail}
                      onChange={(e) => setUserEmail(e.target.value)}
                      placeholder="rahul.sharma@example.com"
                      className="w-full pl-9 pr-3 py-2 border border-gray-200 rounded-lg font-medium text-gray-900 outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                </div>

                {userTab === 'signup' && (
                  <div>
                    <label className="font-bold text-gray-700 block mb-1">
                      Phone Number
                    </label>
                    <div className="relative">
                      <Phone className="w-4 h-4 absolute left-3 top-2.5 text-gray-400" />
                      <input
                        type="text"
                        value={userPhone}
                        onChange={(e) => setUserPhone(e.target.value)}
                        placeholder="+91 98765 43210"
                        className="w-full pl-9 pr-3 py-2 border border-gray-200 rounded-lg font-medium text-gray-900 outline-none focus:ring-2 focus:ring-amber-500"
                      />
                    </div>
                  </div>
                )}

                <div>
                  <label className="font-bold text-gray-700 block mb-1">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 absolute left-3 top-2.5 text-gray-400" />
                    <input
                      type="password"
                      required
                      value={userPassword}
                      onChange={(e) => setUserPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full pl-9 pr-3 py-2 border border-gray-200 rounded-lg font-medium text-gray-900 outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                </div>

                {userTab === 'signup' && (
                  <div>
                    <label className="font-bold text-gray-700 block mb-1">
                      Confirm Password
                    </label>
                    <div className="relative">
                      <Lock className="w-4 h-4 absolute left-3 top-2.5 text-gray-400" />
                      <input
                        type="password"
                        required
                        value={userConfirmPassword}
                        onChange={(e) => setUserConfirmPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full pl-9 pr-3 py-2 border border-gray-200 rounded-lg font-medium text-gray-900 outline-none focus:ring-2 focus:ring-amber-500"
                      />
                    </div>
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full py-2.5 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-lg text-xs flex items-center justify-center space-x-2 shadow-md transition-all cursor-pointer mt-2"
                >
                  <span>{userTab === 'signup' ? 'Create Guest Account & Sign In' : 'Sign In to Guest Portal'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>

              <div className="relative my-5">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200" />
                </div>
                <div className="relative flex justify-center text-[10px] uppercase font-bold text-gray-400">
                  <span className="bg-white px-2">Instant Guest Demo</span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => loginAsGuest('Rahul Sharma', 'rahul.sharma@example.com', '+91 98765 43210')}
                className="w-full py-2 bg-amber-50 hover:bg-amber-100 text-amber-900 font-bold rounded-lg text-xs border border-amber-300 transition-all cursor-pointer"
              >
                🚀 Quick Demo Guest Login
              </button>
            </div>
          </div>
        )}

        {/* --- VIEW 3: ADMIN PORTAL (Distinct Credentials) --- */}
        {portalMode === 'admin' && (
          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Left Side Info */}
            <div className="p-8 bg-slate-950 text-white flex flex-col justify-between">
              <div>
                <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-bold mb-4">
                  <Lock className="w-3.5 h-3.5 text-amber-400" />
                  <span>Restricted Management Console</span>
                </div>

                <h3 className="text-xl font-extrabold text-white font-serif">
                  Staff & Admin Management
                </h3>
                <p className="text-xs text-gray-400 mt-1.5 leading-relaxed">
                  Requires authorized staff credentials to modify room pricing multipliers, inspect real-time occupancy analytics, manage facility schedules, and issue guest receipts.
                </p>

                <div className="mt-6 p-3.5 rounded-xl bg-slate-900 border border-amber-500/30 text-xs space-y-2">
                  <div className="flex items-center space-x-2 text-amber-400 font-bold">
                    <ShieldCheck className="w-4 h-4 shrink-0" />
                    <span>Security Isolation Notice</span>
                  </div>
                  <p className="text-[11px] text-gray-300 leading-snug">
                    Standard guest accounts cannot access administrator functions. Dedicated admin credentials and security PIN are strictly required.
                  </p>
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-slate-800 flex items-center justify-between text-xs">
                <span className="text-gray-400">Guest looking to book rooms?</span>
                <button
                  type="button"
                  onClick={() => setPortalMode('user')}
                  className="text-amber-400 font-bold hover:underline flex items-center space-x-1"
                >
                  <User className="w-3.5 h-3.5" />
                  <span>Guest Portal</span>
                </button>
              </div>
            </div>

            {/* Right Side: Admin Credentials Form */}
            <div className="p-8">
              <div className="mb-6">
                <span className="text-[10px] uppercase font-bold text-slate-900 bg-amber-100 border border-amber-300 px-2 py-0.5 rounded">
                  Admin Credentials
                </span>
                <h3 className="text-lg font-extrabold text-gray-900 mt-1 font-serif">
                  Administrator Sign In
                </h3>
                <p className="text-xs text-gray-500">
                  Enter your assigned staff email, password, and security PIN
                </p>
              </div>

              {adminError && (
                <div className="mb-4 p-3 bg-rose-50 border border-rose-200 rounded-lg text-xs text-rose-700 flex items-center space-x-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{adminError}</span>
                </div>
              )}

              <form onSubmit={handleAdminSubmit} className="space-y-3.5 text-xs">
                <div>
                  <label className="font-bold text-gray-700 block mb-1">
                    Admin Email / Username
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 absolute left-3 top-2.5 text-gray-400" />
                    <input
                      type="email"
                      required
                      value={adminEmail}
                      onChange={(e) => setAdminEmail(e.target.value)}
                      placeholder="admin@rajpalace.com"
                      className="w-full pl-9 pr-3 py-2 border border-gray-200 rounded-lg font-medium text-gray-900 outline-none focus:ring-2 focus:ring-slate-900"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-bold text-gray-700 block mb-1">
                    Admin Password
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 absolute left-3 top-2.5 text-gray-400" />
                    <input
                      type="password"
                      required
                      value={adminPassword}
                      onChange={(e) => setAdminPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full pl-9 pr-3 py-2 border border-gray-200 rounded-lg font-medium text-gray-900 outline-none focus:ring-2 focus:ring-slate-900"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-bold text-gray-700 block mb-1">
                    Staff Security PIN (Default: 8888)
                  </label>
                  <div className="relative">
                    <KeyRound className="w-4 h-4 absolute left-3 top-2.5 text-gray-400" />
                    <input
                      type="text"
                      maxLength={4}
                      value={securityPin}
                      onChange={(e) => setSecurityPin(e.target.value)}
                      placeholder="8888"
                      className="w-full pl-9 pr-3 py-2 border border-gray-200 rounded-lg font-mono font-bold text-gray-900 outline-none focus:ring-2 focus:ring-slate-900"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 bg-slate-950 hover:bg-slate-900 text-white font-bold rounded-lg text-xs flex items-center justify-center space-x-2 shadow-md transition-all cursor-pointer mt-2"
                >
                  <span>Authenticate Admin Credentials</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>

              <div className="relative my-5">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200" />
                </div>
                <div className="relative flex justify-center text-[10px] uppercase font-bold text-gray-400">
                  <span className="bg-white px-2">Instant Admin Demo</span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => loginAsAdmin('admin@rajpalace.com', 'admin123')}
                className="w-full py-2 bg-amber-100 hover:bg-amber-200 text-amber-950 font-bold rounded-lg text-xs border border-amber-300 transition-all cursor-pointer flex items-center justify-center space-x-2"
              >
                <ShieldCheck className="w-4 h-4 text-amber-700" />
                <span>One-Click Admin Staff Login</span>
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
