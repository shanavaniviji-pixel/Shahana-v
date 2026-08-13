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
    <div className="min-h-[85vh] flex items-center justify-center py-8 px-4">
      <div className="max-w-4xl w-full bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        
        {/* Top Header Bar inside Auth Modal */}
        <div className="bg-gray-900 text-white p-4 sm:p-6 flex items-center justify-between border-b border-gray-800">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-bold shadow-xs">
              <Hotel className="w-5 h-5" />
            </div>
            <div>
              <span className="text-base font-extrabold tracking-tight block text-white">
                RAJ PALACE
              </span>
              <span className="text-[10px] text-indigo-400 font-bold uppercase tracking-wider block">
                Hotel & Resort Portal
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            {portalMode !== 'gateway' && (
              <button
                type="button"
                onClick={() => setPortalMode('gateway')}
                className="text-xs text-gray-300 hover:text-white flex items-center space-x-1 bg-gray-800 px-3 py-1.5 rounded-md border border-gray-700 transition-all cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Change Portal</span>
              </button>
            )}

            {/* Language Picker */}
            <div className="relative flex items-center space-x-1.5 bg-gray-800 px-2.5 py-1.5 rounded-md border border-gray-700 text-xs text-gray-200">
              <Globe className="w-3.5 h-3.5 text-indigo-400" />
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value as any)}
                className="bg-transparent text-xs text-gray-200 outline-none cursor-pointer"
              >
                {Object.keys(languageNames).map((lang) => (
                  <option key={lang} value={lang} className="bg-gray-900 text-gray-200">
                    {languageNames[lang as keyof typeof languageNames].native}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* --- VIEW 1: GATEWAY (Select User or Admin) --- */}
        {portalMode === 'gateway' && (
          <div className="p-8 sm:p-12 text-center">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-semibold mb-4">
              <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
              <span>Welcome to RAJ PALACE Hotel & Resort Portal</span>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
              Select Your Access Portal
            </h2>
            <p className="text-xs text-gray-500 mt-2 max-w-lg mx-auto">
              Please choose how you would like to log in to proceed. Guest users and hotel administrators have completely separate credentials and security portals.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8 max-w-3xl mx-auto">
              {/* Option A: User / Guest */}
              <div
                onClick={() => setPortalMode('user')}
                className="group p-6 rounded-xl border border-gray-200 bg-white hover:border-indigo-600 hover:shadow-md transition-all cursor-pointer text-left flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold mb-4 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                    <User className="w-6 h-6" />
                  </div>
                  <h3 className="text-base font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">
                    Guest / User Portal
                  </h3>
                  <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                    Access room reservations, book luxury facility slots, view active bookings, and chat with the AI Concierge.
                  </p>
                  
                  <div className="mt-4 space-y-1.5 text-xs text-gray-600">
                    <div className="flex items-center space-x-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>Sign In or Create a New Guest Account</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>Book Rooms with Dynamic Pricing</span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between text-xs font-bold text-indigo-600">
                  <span>Proceed to User Login</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>

              {/* Option B: Admin / Staff */}
              <div
                onClick={() => setPortalMode('admin')}
                className="group p-6 rounded-xl border border-gray-200 bg-white hover:border-gray-900 hover:shadow-md transition-all cursor-pointer text-left flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-gray-100 text-gray-900 flex items-center justify-center font-bold mb-4 group-hover:bg-gray-900 group-hover:text-white transition-all">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <h3 className="text-base font-bold text-gray-900 group-hover:text-gray-900 transition-colors">
                    Admin / Staff Console
                  </h3>
                  <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                    Restricted management portal for hotel operations, occupancy multipliers, room inventory, and revenue analytics.
                  </p>

                  <div className="mt-4 space-y-1.5 text-xs text-gray-600">
                    <div className="flex items-center space-x-2">
                      <KeyRound className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                      <span>Requires Authorized Staff Credentials</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <ShieldCheck className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                      <span>Security PIN Verification</span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between text-xs font-bold text-gray-900">
                  <span>Proceed to Admin Console</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* --- VIEW 2: USER / GUEST PORTAL (Sign In & Sign Up) --- */}
        {portalMode === 'user' && (
          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Left Side Info */}
            <div className="p-8 bg-gray-50 border-b md:border-b-0 md:border-r border-gray-200 flex flex-col justify-between">
              <div>
                <div className="inline-flex items-center space-x-2 px-2.5 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-semibold mb-4">
                  <UserCheck className="w-3.5 h-3.5 text-indigo-600" />
                  <span>Guest & Visitor Portal</span>
                </div>

                <h3 className="text-lg font-bold text-gray-900">
                  Experience Horizon Hospitality
                </h3>
                <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                  Sign in or create your guest account to manage room reservations, reserve infinity pool or spa slots, and access 24/7 AI assistance.
                </p>

                <div className="mt-6 space-y-3 text-xs text-gray-600">
                  <div className="flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Real-time occupancy pricing optimization</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Printable invoices & official booking receipts</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Multilingual AI Concierge in 6 regional languages</span>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-gray-200 flex items-center justify-between text-xs">
                <span className="text-gray-500">Need Administrator Access?</span>
                <button
                  type="button"
                  onClick={() => setPortalMode('admin')}
                  className="text-indigo-600 font-bold hover:underline flex items-center space-x-1"
                >
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Admin Login</span>
                </button>
              </div>
            </div>

            {/* Right Side: Sign In / Sign Up Form */}
            <div className="p-8">
              {/* Tabs: Sign In vs Sign Up */}
              <div className="flex bg-gray-100 p-1 rounded-lg border border-gray-200 mb-6 text-xs font-semibold">
                <button
                  type="button"
                  onClick={() => {
                    setUserTab('signin');
                    setUserError('');
                  }}
                  className={`flex-1 py-2 rounded-md transition-all text-center ${
                    userTab === 'signin'
                      ? 'bg-white text-gray-900 shadow-2xs font-bold'
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
                  className={`flex-1 py-2 rounded-md transition-all text-center ${
                    userTab === 'signup'
                      ? 'bg-white text-gray-900 shadow-2xs font-bold'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Sign Up (New Guest)
                </button>
              </div>

              {userError && (
                <div className="mb-4 p-3 bg-rose-50 border border-rose-200 rounded-md text-xs text-rose-700 flex items-center space-x-2">
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
                        className="w-full pl-9 pr-3 py-2 border border-gray-200 rounded-md font-medium text-gray-900 outline-none focus:ring-2 focus:ring-indigo-500"
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
                      className="w-full pl-9 pr-3 py-2 border border-gray-200 rounded-md font-medium text-gray-900 outline-none focus:ring-2 focus:ring-indigo-500"
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
                        className="w-full pl-9 pr-3 py-2 border border-gray-200 rounded-md font-medium text-gray-900 outline-none focus:ring-2 focus:ring-indigo-500"
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
                      className="w-full pl-9 pr-3 py-2 border border-gray-200 rounded-md font-medium text-gray-900 outline-none focus:ring-2 focus:ring-indigo-500"
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
                        className="w-full pl-9 pr-3 py-2 border border-gray-200 rounded-md font-medium text-gray-900 outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-md text-xs flex items-center justify-center space-x-2 shadow-xs transition-all cursor-pointer mt-2"
                >
                  <span>{userTab === 'signup' ? 'Create Guest Account & Sign In' : 'Sign In as User'}</span>
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
                className="w-full py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold rounded-md text-xs border border-gray-200 transition-all cursor-pointer"
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
            <div className="p-8 bg-gray-900 text-white flex flex-col justify-between">
              <div>
                <div className="inline-flex items-center space-x-2 px-2.5 py-1 rounded-full bg-indigo-950 border border-indigo-800 text-indigo-300 text-xs font-semibold mb-4">
                  <Lock className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Restricted Management Portal</span>
                </div>

                <h3 className="text-lg font-bold text-white">
                  Hotel Staff & Admin Console
                </h3>
                <p className="text-xs text-gray-400 mt-1 leading-relaxed">
                  Requires authorized staff credentials to modify room pricing rules, inspect real-time occupancy graphs, manage facility schedules, and issue invoices.
                </p>

                <div className="mt-6 p-3 rounded-lg bg-gray-800/80 border border-gray-700 text-xs space-y-2">
                  <div className="flex items-center space-x-2 text-indigo-300 font-semibold">
                    <ShieldCheck className="w-4 h-4 shrink-0 text-indigo-400" />
                    <span>Security Isolation Notice</span>
                  </div>
                  <p className="text-[11px] text-gray-400">
                    Standard guest accounts cannot access administrator functions. Dedicated admin credentials and security PIN are strictly required.
                  </p>
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-gray-800 flex items-center justify-between text-xs">
                <span className="text-gray-400">Guest looking to book rooms?</span>
                <button
                  type="button"
                  onClick={() => setPortalMode('user')}
                  className="text-indigo-400 font-bold hover:underline flex items-center space-x-1"
                >
                  <User className="w-3.5 h-3.5" />
                  <span>User Portal</span>
                </button>
              </div>
            </div>

            {/* Right Side: Admin Credentials Form */}
            <div className="p-8">
              <div className="mb-6">
                <span className="text-[10px] uppercase font-bold text-indigo-600 bg-indigo-50 border border-indigo-200 px-2 py-0.5 rounded">
                  Admin Credentials
                </span>
                <h3 className="text-lg font-bold text-gray-900 mt-1">
                  Administrator Sign In
                </h3>
                <p className="text-xs text-gray-500">
                  Enter your assigned admin username, password, and security PIN
                </p>
              </div>

              {adminError && (
                <div className="mb-4 p-3 bg-rose-50 border border-rose-200 rounded-md text-xs text-rose-700 flex items-center space-x-2">
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
                      placeholder="admin@grandhorizon.com"
                      className="w-full pl-9 pr-3 py-2 border border-gray-200 rounded-md font-medium text-gray-900 outline-none focus:ring-2 focus:ring-indigo-500"
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
                      className="w-full pl-9 pr-3 py-2 border border-gray-200 rounded-md font-medium text-gray-900 outline-none focus:ring-2 focus:ring-indigo-500"
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
                      className="w-full pl-9 pr-3 py-2 border border-gray-200 rounded-md font-mono font-bold text-gray-900 outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 bg-gray-900 hover:bg-black text-white font-medium rounded-md text-xs flex items-center justify-center space-x-2 shadow-xs transition-all cursor-pointer mt-2"
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
                onClick={() => loginAsAdmin('admin@grandhorizon.com', 'admin123')}
                className="w-full py-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-900 font-semibold rounded-md text-xs border border-indigo-200 transition-all cursor-pointer flex items-center justify-center space-x-2"
              >
                <ShieldCheck className="w-4 h-4 text-indigo-600" />
                <span>One-Click Admin Login</span>
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
