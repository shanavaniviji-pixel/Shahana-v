import React, { useState } from 'react';
import { useHotel } from '../context/HotelContext';
import { ShieldCheck, Lock, Mail, ArrowRight, Hotel, User, AlertCircle } from 'lucide-react';

export const AdminLoginPage: React.FC = () => {
  const { loginAsAdmin, setAuthPortal, t } = useHotel();
  const [email, setEmail] = useState('admin@grandhorizon.com');
  const [password, setPassword] = useState('admin123');
  const [securityPin, setSecurityPin] = useState('8888');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      setErrorMsg('Please enter an admin email address');
      return;
    }
    // Simple verification check for clean demo
    loginAsAdmin(email, password);
  };

  const handleDemoAdmin = () => {
    loginAsAdmin('admin@grandhorizon.com', 'admin123');
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center py-8 px-4">
      <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        
        {/* Left Side: Restricted Admin Visual */}
        <div className="p-8 bg-gray-900 text-white flex flex-col justify-between">
          <div>
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-bold shadow-xs">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <span className="text-base font-extrabold text-white tracking-tight block">
                  Grand Horizon
                </span>
                <span className="text-[10px] text-indigo-400 font-bold uppercase tracking-wider block">
                  Management Console
                </span>
              </div>
            </div>

            <div className="inline-flex items-center space-x-2 px-2.5 py-1 rounded-full bg-indigo-950 border border-indigo-800 text-indigo-300 text-xs font-semibold mb-4">
              <Lock className="w-3.5 h-3.5 text-indigo-400" />
              <span>Restricted Access Control</span>
            </div>

            <h2 className="text-xl font-bold text-white leading-snug">
              Hotel Administration & Operations
            </h2>
            <p className="text-xs text-gray-400 mt-2 leading-relaxed">
              Authorized portal for property management, occupancy pricing rules, room inventory, guest reservations, and revenue analytics.
            </p>

            <div className="mt-6 p-3 rounded-lg bg-gray-800/80 border border-gray-700 text-xs text-gray-300 space-y-2">
              <div className="flex items-center space-x-2 text-indigo-300 font-semibold">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>Security Notice</span>
              </div>
              <p className="text-[11px] text-gray-400">
                Unauthorized login attempts are monitored and logged. Only verified administrators and front-desk staff are permitted access.
              </p>
            </div>
          </div>

          <div className="mt-8 pt-4 border-t border-gray-800 flex items-center justify-between text-xs">
            <span className="text-gray-400">Looking for room reservations?</span>
            <button
              type="button"
              onClick={() => setAuthPortal('guest')}
              className="text-indigo-400 font-bold hover:underline flex items-center space-x-1"
            >
              <Hotel className="w-3.5 h-3.5" />
              <span>Guest Portal</span>
            </button>
          </div>
        </div>

        {/* Right Side: Admin Authentication Form */}
        <div className="p-8 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-bold text-gray-900">Administrator Sign In</h3>
                <p className="text-xs text-gray-500">
                  Enter admin credentials to access operations
                </p>
              </div>
              <span className="text-[10px] uppercase font-extrabold bg-gray-100 text-gray-800 px-2 py-1 rounded border border-gray-200">
                Staff Only
              </span>
            </div>

            {errorMsg && (
              <div className="mb-4 p-3 bg-rose-50 border border-rose-200 rounded-md text-xs text-rose-700 flex items-center space-x-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-gray-700 block mb-1">
                  Admin Email / Username
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 absolute left-3 top-2.5 text-gray-400" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin@grandhorizon.com"
                    className="w-full pl-9 pr-3 py-2 border border-gray-200 rounded-md text-xs font-medium focus:ring-2 focus:ring-indigo-500 outline-none text-gray-900"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-gray-700 block mb-1">
                  Password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 absolute left-3 top-2.5 text-gray-400" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-9 pr-3 py-2 border border-gray-200 rounded-md text-xs font-medium focus:ring-2 focus:ring-indigo-500 outline-none text-gray-900"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-gray-700 block mb-1">
                  Security PIN
                </label>
                <div className="relative">
                  <ShieldCheck className="w-4 h-4 absolute left-3 top-2.5 text-gray-400" />
                  <input
                    type="text"
                    maxLength={4}
                    value={securityPin}
                    onChange={(e) => setSecurityPin(e.target.value)}
                    placeholder="8888"
                    className="w-full pl-9 pr-3 py-2 border border-gray-200 rounded-md text-xs font-mono font-medium focus:ring-2 focus:ring-indigo-500 outline-none text-gray-900"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-gray-900 hover:bg-black text-white font-medium rounded-md text-xs flex items-center justify-center space-x-2 shadow-xs transition-all cursor-pointer"
              >
                <span>Login to Admin Dashboard</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200" />
              </div>
              <div className="relative flex justify-center text-[10px] uppercase font-bold text-gray-400">
                <span className="bg-white px-2">Instant Admin Demo</span>
              </div>
            </div>

            <button
              type="button"
              onClick={handleDemoAdmin}
              className="w-full py-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-900 font-semibold rounded-md text-xs border border-indigo-200 transition-all cursor-pointer flex items-center justify-center space-x-2"
            >
              <ShieldCheck className="w-4 h-4 text-indigo-600" />
              <span>One-Click Admin Login</span>
            </button>
          </div>

          <div className="mt-6 text-center text-xs text-gray-500">
            Need guest access instead?{' '}
            <button
              type="button"
              onClick={() => setAuthPortal('guest')}
              className="text-indigo-600 font-bold hover:underline"
            >
              Switch to Guest Portal
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
