import React, { useState } from 'react';
import { useHotel } from '../context/HotelContext';
import {
  Search,
  Calendar,
  Users,
  TrendingUp,
  Sparkles,
  Waves,
  Dumbbell,
  ShieldAlert,
  ArrowRight,
  Clock,
  CheckCircle2,
  Receipt,
  Crown,
} from 'lucide-react';

interface UserDashboardProps {
  setActiveTab: (tab: string) => void;
  openBookingModalWithSearch?: (checkIn: string, checkOut: string, guests: number) => void;
}

export const UserDashboard: React.FC<UserDashboardProps> = ({ setActiveTab }) => {
  const {
    currentUser,
    t,
    occupancyPercentage,
    activePricingLevel,
    pricingRules,
    rooms,
    bookings,
    facilityBookings,
    setActiveInvoice,
  } = useHotel();

  const [checkIn, setCheckIn] = useState(() => {
    const d = new Date();
    return d.toISOString().split('T')[0];
  });

  const [checkOut, setCheckOut] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 2);
    return d.toISOString().split('T')[0];
  });

  const [guests, setGuests] = useState(2);

  const activeUserBookings = bookings.filter(
    (b) => b.userId === currentUser.userId && b.bookingStatus !== 'cancelled'
  );

  const activeUserFacilityBookings = facilityBookings.filter(
    (fb) => fb.userId === currentUser.userId && fb.status !== 'cancelled'
  );

  // Active pricing rule label
  const activeRuleObj = pricingRules.find((r) => r.condition === activePricingLevel);

  return (
    <div className="space-y-8 pb-12">
      {/* Welcome Hero Banner */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-slate-900 via-amber-950 to-slate-900 text-white p-6 sm:p-10 shadow-xl">
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Luxury Hospitality & Smart Booking</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            {t('welcome')} {currentUser.name}!
          </h1>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Experience world-class amenities with our dynamic occupancy-based pricing and seamless facility booking.
          </p>

          {/* Quick Room Search Bar */}
          <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20 mt-6 grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            <div>
              <label className="text-[11px] font-semibold text-amber-200 block mb-1">
                {t('checkInDate')}
              </label>
              <div className="relative">
                <Calendar className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
                <input
                  type="date"
                  value={checkIn}
                  onChange={(e) => setCheckIn(e.target.value)}
                  className="w-full bg-white text-slate-900 pl-9 pr-3 py-1.5 rounded-lg text-xs font-medium focus:ring-2 focus:ring-amber-500 outline-none"
                />
              </div>
            </div>

            <div>
              <label className="text-[11px] font-semibold text-amber-200 block mb-1">
                {t('checkOutDate')}
              </label>
              <div className="relative">
                <Calendar className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
                <input
                  type="date"
                  value={checkOut}
                  onChange={(e) => setCheckOut(e.target.value)}
                  className="w-full bg-white text-slate-900 pl-9 pr-3 py-1.5 rounded-lg text-xs font-medium focus:ring-2 focus:ring-amber-500 outline-none"
                />
              </div>
            </div>

            <div>
              <label className="text-[11px] font-semibold text-amber-200 block mb-1">
                {t('guestsCount')}
              </label>
              <div className="relative">
                <Users className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
                <select
                  value={guests}
                  onChange={(e) => setGuests(Number(e.target.value))}
                  className="w-full bg-white text-slate-900 pl-9 pr-3 py-1.5 rounded-lg text-xs font-medium focus:ring-2 focus:ring-amber-500 outline-none"
                >
                  <option value={1}>1 Guest</option>
                  <option value={2}>2 Guests</option>
                  <option value={3}>3 Guests</option>
                  <option value={4}>4+ Guests</option>
                </select>
              </div>
            </div>

            <div className="sm:col-span-3 lg:col-span-1 flex items-end">
              <button
                id="btn-search-rooms-hero"
                onClick={() => setActiveTab('roomBooking')}
                className="w-full bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold py-2 px-4 rounded-xl text-xs flex items-center justify-center space-x-2 shadow-lg hover:shadow-amber-500/30 transition-all cursor-pointer"
              >
                <Search className="w-4 h-4" />
                <span>{t('searchRooms')}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Royal Collections "Artifact-to-Suite" Callout Banner */}
      <div className="bg-gradient-to-r from-amber-950 via-slate-950 to-amber-950 rounded-2xl p-6 text-white border border-amber-500/40 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center space-x-1.5 px-3 py-0.5 rounded-full bg-amber-500/20 border border-amber-400 text-amber-300 text-[11px] font-bold">
            <Crown className="w-3.5 h-3.5 text-amber-400" />
            <span>Interactive Feature Showcase</span>
          </div>
          <h3 className="text-xl font-serif font-extrabold text-amber-100">
            The "Artifact-to-Suite" Royal Booking Engine
          </h3>
          <p className="text-xs text-amber-200/80 max-w-2xl leading-relaxed">
            Explore centuries-old 17th-century Rajputana swords, Maharani emerald chokers, and imperial gold dinnerware in interactive 3D, then <span className="text-amber-300 font-bold">zoom out</span> to reveal and book the exact guarded suite!
          </p>
        </div>

        <button
          onClick={() => setActiveTab('royalArtifacts')}
          className="shrink-0 px-5 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-extrabold text-xs flex items-center space-x-2 shadow-lg transition-all cursor-pointer hover:scale-105"
        >
          <Sparkles className="w-4 h-4" />
          <span>Explore Royal Collections</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Dynamic Room Pricing Overview Card (PDF Section 3 & 3.2 requirement) */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-slate-100 pb-4 mb-4 gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <TrendingUp className="w-5 h-5 text-amber-600" />
              <h2 className="text-lg font-bold text-slate-900">{t('dynamicPricingTitle')}</h2>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">{t('priceBreakdown')}</p>
          </div>

          <div className="flex items-center space-x-4 bg-amber-50 px-4 py-2 rounded-xl border border-amber-200">
            <div>
              <span className="text-[11px] text-slate-500 font-medium block">
                {t('currentOccupancy')}
              </span>
              <span className="text-xl font-black text-amber-700">{occupancyPercentage}%</span>
            </div>
            <div className="h-8 w-px bg-amber-200" />
            <div>
              <span className="text-[11px] text-slate-500 font-medium block">Active Tariff Level</span>
              <span className="text-xs font-bold text-slate-900">{activeRuleObj?.name || 'Standard'}</span>
            </div>
          </div>
        </div>

        {/* Dynamic Pricing Condition Grid from PDF Page 2 / Page 3 */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div
            className={`p-3.5 rounded-xl border transition-all ${
              activePricingLevel === 'low_occupancy'
                ? 'bg-emerald-50 border-emerald-300 ring-2 ring-emerald-400/30'
                : 'bg-slate-50 border-slate-200'
            }`}
          >
            <span className="text-[11px] font-semibold text-emerald-800 uppercase block">
              Low Occupancy (&lt;30%)
            </span>
            <span className="text-lg font-extrabold text-slate-900 mt-1 block">₹2,200</span>
            <span className="text-[10px] text-slate-500 block">Lowest demand discount</span>
          </div>

          <div
            className={`p-3.5 rounded-xl border transition-all ${
              activePricingLevel === 'normal_demand'
                ? 'bg-amber-50 border-amber-300 ring-2 ring-amber-400/30'
                : 'bg-slate-50 border-slate-200'
            }`}
          >
            <span className="text-[11px] font-semibold text-amber-800 uppercase block">
              Normal Day (30%–60%)
            </span>
            <span className="text-lg font-extrabold text-slate-900 mt-1 block">₹2,500</span>
            <span className="text-[10px] text-slate-500 block">Standard base rate</span>
          </div>

          <div
            className={`p-3.5 rounded-xl border transition-all ${
              activePricingLevel === 'weekend'
                ? 'bg-purple-50 border-purple-300 ring-2 ring-purple-400/30'
                : 'bg-slate-50 border-slate-200'
            }`}
          >
            <span className="text-[11px] font-semibold text-purple-800 uppercase block">
              Weekend
            </span>
            <span className="text-lg font-extrabold text-slate-900 mt-1 block">₹2,800</span>
            <span className="text-[10px] text-slate-500 block">Friday & Weekend rate</span>
          </div>

          <div
            className={`p-3.5 rounded-xl border transition-all ${
              activePricingLevel === 'high_occupancy'
                ? 'bg-rose-50 border-rose-300 ring-2 ring-rose-400/30'
                : 'bg-slate-50 border-slate-200'
            }`}
          >
            <span className="text-[11px] font-semibold text-rose-800 uppercase block">
              High Occupancy (&gt;80%)
            </span>
            <span className="text-lg font-extrabold text-slate-900 mt-1 block">₹3,200</span>
            <span className="text-[10px] text-slate-500 block">High demand surge</span>
          </div>
        </div>
      </div>

      {/* Main Feature Quick Portals */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Portal 1: Online Room Booking */}
        <div
          onClick={() => setActiveTab('roomBooking')}
          className="group bg-white p-6 rounded-2xl border border-slate-200 hover:border-amber-400 hover:shadow-lg transition-all cursor-pointer relative overflow-hidden"
        >
          <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <Search className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-slate-900 group-hover:text-amber-700 transition-colors">
            {t('roomBooking')}
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            Browse available deluxe rooms, villas & ocean suites with real-time dynamic pricing.
          </p>
          <div className="mt-4 flex items-center text-xs font-bold text-amber-600 space-x-1">
            <span>Explore Rooms</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>

        {/* Portal 2: Easy Facility Booking */}
        <div
          onClick={() => setActiveTab('facilityBooking')}
          className="group bg-white p-6 rounded-2xl border border-slate-200 hover:border-amber-400 hover:shadow-lg transition-all cursor-pointer relative overflow-hidden"
        >
          <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <Waves className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-700 transition-colors">
            {t('facilityBooking')}
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            Reserve pool cabanas, spa treatments, gym slots & conference halls with live time-slot grid.
          </p>
          <div className="mt-4 flex items-center text-xs font-bold text-blue-600 space-x-1">
            <span>Book Facilities</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>

        {/* Portal 3: Real-Time Availability */}
        <div
          onClick={() => setActiveTab('realTimeAvailability')}
          className="group bg-white p-6 rounded-2xl border border-slate-200 hover:border-amber-400 hover:shadow-lg transition-all cursor-pointer relative overflow-hidden"
        >
          <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <Clock className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
            {t('realTimeAvailability')}
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            Live matrix tracking occupied vs available rooms and slot reservation status.
          </p>
          <div className="mt-4 flex items-center text-xs font-bold text-emerald-600 space-x-1">
            <span>Check Matrix</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </div>

      {/* User Current Bookings Overview Section */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-4">
          <div>
            <h2 className="text-lg font-bold text-slate-900">{t('myBookings')}</h2>
            <p className="text-xs text-slate-500">Your active room reservations and facility time slots</p>
          </div>
          <button
            onClick={() => setActiveTab('myBookings')}
            className="text-xs font-bold text-amber-600 hover:underline"
          >
            View All ({activeUserBookings.length + activeUserFacilityBookings.length})
          </button>
        </div>

        {activeUserBookings.length === 0 && activeUserFacilityBookings.length === 0 ? (
          <div className="py-8 text-center text-slate-400 text-xs">
            No active bookings found. Select a room or facility above to start booking!
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Room Bookings */}
            {activeUserBookings.map((b) => (
              <div
                key={b.bookingId}
                className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 flex justify-between items-center"
              >
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-bold text-amber-700">{b.roomType}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-semibold">
                      Room {b.roomNumber}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 mt-1">
                    {b.checkIn} to {b.checkOut} ({b.guests} Guests)
                  </p>
                  <p className="text-xs font-bold text-slate-900 mt-1">₹{b.price.toLocaleString()}</p>
                </div>
                <button
                  onClick={() => setActiveInvoice(b)}
                  className="px-3 py-1.5 bg-slate-900 text-white rounded-lg text-xs font-medium flex items-center space-x-1 hover:bg-slate-800"
                >
                  <Receipt className="w-3.5 h-3.5" />
                  <span>Invoice</span>
                </button>
              </div>
            ))}

            {/* Facility Bookings */}
            {activeUserFacilityBookings.map((fb) => (
              <div
                key={fb.facilityBookingId}
                className="p-4 rounded-xl border border-blue-100 bg-blue-50/30 flex justify-between items-center"
              >
                <div>
                  <span className="text-xs font-bold text-blue-900 block">{fb.facilityName}</span>
                  <p className="text-xs text-slate-600 mt-1">
                    Date: {fb.bookingDate} | Slot: {fb.timeSlot}
                  </p>
                  <span className="text-[10px] font-semibold text-blue-700 bg-blue-100 px-2 py-0.5 rounded-full mt-1 inline-block">
                    Reserved
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
