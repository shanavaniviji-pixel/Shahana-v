import React, { useState } from 'react';
import { useHotel } from '../context/HotelContext';
import { languageNames } from '../data/translations';
import { Language, UserRole } from '../types';
import {
  Hotel,
  Globe,
  Bell,
  User,
  ShieldCheck,
  Bot,
  CheckCircle2,
  AlertCircle,
  Menu,
  X,
  LogOut,
  Key,
} from 'lucide-react';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  openAiChat: () => void;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab, openAiChat }) => {
  const {
    currentUser,
    isLoggedIn,
    authPortal,
    setAuthPortal,
    logout,
    language,
    setLanguage,
    switchRole,
    t,
    notifications,
    markNotificationRead,
    clearNotifications,
  } = useHotel();

  const [showLangMenu, setShowLangMenu] = useState(false);
  const [showNotifMenu, setShowNotifMenu] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const navItems =
    currentUser.role === 'admin'
      ? [
          { id: 'adminDashboard', label: t('adminDashboard') },
          { id: 'realTimeAvailability', label: t('realTimeAvailability') },
        ]
      : [
          { id: 'dashboard', label: t('dashboard') },
          { id: 'roomBooking', label: t('roomBooking') },
          { id: 'facilityBooking', label: t('facilityBooking') },
          { id: 'realTimeAvailability', label: t('realTimeAvailability') },
          { id: 'myBookings', label: t('myBookings') },
        ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-2xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Brand */}
          <div
            className="flex items-center space-x-3 cursor-pointer"
            onClick={() => {
              if (isLoggedIn) {
                setActiveTab(currentUser.role === 'admin' ? 'adminDashboard' : 'dashboard');
              }
            }}
          >
            <div className="w-10 h-10 rounded-lg bg-indigo-600 flex items-center justify-center text-white shadow-xs font-bold">
              <Hotel className="w-5 h-5" />
            </div>
            <div>
              <span className="text-base font-bold text-gray-900 tracking-tight block leading-tight">
                RAJ PALACE
              </span>
              <span className="text-[10px] text-indigo-600 font-bold uppercase tracking-wider block">
                Hotel & Resort
              </span>
            </div>
          </div>

          {!isLoggedIn ? null : (
            <>
              {/* Desktop Navigation Tabs */}
              <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    id={`nav-${item.id}`}
                    onClick={() => setActiveTab(item.id)}
                    className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                      activeTab === item.id
                        ? 'bg-indigo-50 text-indigo-700 font-semibold border border-indigo-200'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </nav>

              {/* Action Controls */}
              <div className="flex items-center space-x-2 sm:space-x-3">
                {/* AI Concierge Chatbot Button (Only for Guests) */}
                {currentUser.role !== 'admin' && (
                  <button
                    id="btn-ai-assistant"
                    onClick={openAiChat}
                    className="flex items-center space-x-1.5 px-3 py-1.5 rounded-md bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-medium shadow-xs transition-all cursor-pointer"
                  >
                    <Bot className="w-4 h-4" />
                    <span className="hidden sm:inline">{t('aiAssistant')}</span>
                  </button>
                )}

                {/* Language Selector */}
                <div className="relative">
                  <button
                    id="btn-language-selector"
                    onClick={() => setShowLangMenu(!showLangMenu)}
                    className="flex items-center space-x-1 px-2.5 py-1.5 rounded-md border border-gray-200 text-xs font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    <Globe className="w-3.5 h-3.5 text-indigo-600" />
                    <span>{languageNames[language]?.native || 'English'}</span>
                  </button>

                  {showLangMenu && (
                    <div className="absolute right-0 mt-2 w-44 bg-white rounded-lg shadow-lg border border-gray-200 py-1.5 z-50 animate-in fade-in slide-in-from-top-2">
                      <div className="px-3 py-1 text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                        {t('language')}
                      </div>
                      {(Object.keys(languageNames) as Language[]).map((langKey) => (
                        <button
                          key={langKey}
                          onClick={() => {
                            setLanguage(langKey);
                            setShowLangMenu(false);
                          }}
                          className={`w-full text-left px-3 py-1.5 text-xs flex items-center justify-between hover:bg-indigo-50 ${
                            language === langKey ? 'text-indigo-600 font-semibold bg-indigo-50/50' : 'text-gray-700'
                          }`}
                        >
                          <span>{languageNames[langKey].native}</span>
                          <span className="text-[10px] text-gray-400">{languageNames[langKey].english}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Notifications Dropdown */}
                <div className="relative">
                  <button
                    id="btn-notifications"
                    onClick={() => setShowNotifMenu(!showNotifMenu)}
                    className="relative p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors"
                  >
                    <Bell className="w-4 h-4" />
                    {unreadCount > 0 && (
                      <span className="absolute top-1 right-1 w-3.5 h-3.5 bg-rose-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                        {unreadCount}
                      </span>
                    )}
                  </button>

                  {showNotifMenu && (
                    <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50">
                      <div className="px-4 py-2 border-b border-gray-100 flex items-center justify-between">
                        <span className="text-xs font-bold text-gray-900">{t('notifications')}</span>
                        {notifications.length > 0 && (
                          <button
                            onClick={clearNotifications}
                            className="text-[11px] text-indigo-600 hover:underline"
                          >
                            Clear all
                          </button>
                        )}
                      </div>
                      <div className="max-h-64 overflow-y-auto divide-y divide-gray-100">
                        {notifications.length === 0 ? (
                          <div className="p-4 text-center text-xs text-gray-400">No new notifications</div>
                        ) : (
                          notifications.map((n) => (
                            <div
                              key={n.id}
                              onClick={() => markNotificationRead(n.id)}
                              className={`p-3 text-xs cursor-pointer hover:bg-gray-50 transition-colors ${
                                !n.read ? 'bg-indigo-50/40' : ''
                              }`}
                            >
                              <div className="flex items-start space-x-2">
                                {n.type === 'success' ? (
                                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                                ) : (
                                  <AlertCircle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                                )}
                                <div>
                                  <p className="font-semibold text-gray-800">{n.title}</p>
                                  <p className="text-gray-600 text-[11px] mt-0.5">{n.message}</p>
                                  <span className="text-[10px] text-gray-400 mt-1 block">{n.timestamp}</span>
                                </div>
                              </div>
                            </div>
                          ))
                        )}
                      </div>
                    </div>
                  )}
                </div>

                {/* Admin Status Badge (Only shown if Admin) */}
                {currentUser.role === 'admin' && (
                  <div className="hidden sm:flex items-center space-x-1.5 px-2.5 py-1.5 rounded-md text-xs font-semibold bg-gray-900 text-indigo-300 border border-gray-900 shadow-2xs">
                    <ShieldCheck className="w-3.5 h-3.5 text-indigo-400" />
                    <span>Admin Staff</span>
                  </div>
                )}

                {/* User Profile Shortcut */}
                <button
                  id="btn-profile"
                  onClick={() => setActiveTab('profile')}
                  className="p-1.5 rounded-md border border-gray-200 text-gray-700 hover:bg-gray-50 transition-colors"
                  title="Profile"
                >
                  <User className="w-4 h-4 text-gray-600" />
                </button>

                {/* Logout Button */}
                <button
                  id="btn-logout"
                  onClick={logout}
                  className="p-1.5 rounded-md border border-gray-200 text-gray-600 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                  title="Logout"
                >
                  <LogOut className="w-4 h-4" />
                </button>

                {/* Mobile Menu Toggle */}
                <button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="md:hidden p-2 text-gray-600"
                >
                  {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && isLoggedIn && (
        <div className="md:hidden bg-white border-b border-gray-200 px-4 pt-2 pb-4 space-y-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id);
                setMobileMenuOpen(false);
              }}
              className={`w-full text-left px-3 py-2 rounded-md text-xs font-medium ${
                activeTab === item.id ? 'bg-indigo-50 text-indigo-700 font-bold' : 'text-gray-700'
              }`}
            >
              {item.label}
            </button>
          ))}
          <div className="pt-2 border-t border-gray-100">
            <button
              onClick={() => {
                logout();
                setMobileMenuOpen(false);
              }}
              className="w-full text-left px-3 py-2 rounded-md text-xs font-medium text-rose-600 hover:bg-rose-50 flex items-center space-x-2"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

