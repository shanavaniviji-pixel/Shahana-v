import React, { useState } from 'react';
import { useHotel } from '../context/HotelContext';
import { Room, Booking } from '../types';
import {
  Search,
  Calendar,
  Users,
  Check,
  Building2,
  Sparkles,
  CreditCard,
  ShieldCheck,
  X,
  TrendingUp,
  Receipt,
  Bed,
} from 'lucide-react';

export const RoomBookingPage: React.FC = () => {
  const {
    rooms,
    t,
    addBooking,
    activePricingLevel,
    pricingRules,
    setActiveInvoice,
  } = useHotel();

  const [checkIn, setCheckIn] = useState(() => new Date().toISOString().split('T')[0]);
  const [checkOut, setCheckOut] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 2);
    return d.toISOString().split('T')[0];
  });
  const [guestsCount, setGuestsCount] = useState<number>(2);
  const [selectedTypeFilter, setSelectedTypeFilter] = useState<string>('all');
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);

  // Modal checkout state
  const [guestName, setGuestName] = useState('Rajesh Sharma');
  const [guestEmail, setGuestEmail] = useState('rajesh.sharma@example.com');
  const [guestPhone, setGuestPhone] = useState('+91 98765 43210');
  const [paymentMethod, setPaymentMethod] = useState('UPI (GPay / PhonePe)');
  const [payStatus, setPayStatus] = useState<'paid' | 'pay_at_hotel'>('paid');
  const [confirmedBooking, setConfirmedBooking] = useState<Booking | null>(null);

  // Filter rooms
  const availableRooms = rooms.filter((r) => {
    if (r.status === 'unavailable' || r.status === 'maintenance') return false;
    if (selectedTypeFilter !== 'all' && r.roomType !== selectedTypeFilter) return false;
    if (r.capacity < guestsCount) return false;
    return true;
  });

  const roomTypesList = Array.from(new Set(rooms.map((r) => r.roomType)));

  // Calculate nights
  const date1 = new Date(checkIn);
  const date2 = new Date(checkOut);
  const diffTime = Math.abs(date2.getTime() - date1.getTime());
  const nights = Math.max(1, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));

  const handleBookSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedRoom) return;

    const totalPrice = selectedRoom.currentPrice * nights;

    const newBk = addBooking({
      userId: 'usr_101',
      guestName,
      guestEmail,
      guestPhone,
      roomId: selectedRoom.roomId,
      roomNumber: selectedRoom.roomNumber,
      roomType: selectedRoom.roomType,
      checkIn,
      checkOut,
      guests: guestsCount,
      price: totalPrice,
      paymentStatus: payStatus === 'paid' ? 'paid' : 'pay_at_hotel',
      paymentMethod,
      bookingStatus: 'confirmed',
    });

    setConfirmedBooking(newBk);
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Header Section */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900">{t('roomBooking')}</h1>
          <p className="text-xs text-slate-500 mt-1">
            Search available luxury rooms with automated dynamic price optimization
          </p>
        </div>
        <div className="flex items-center space-x-2 bg-amber-50 px-3.5 py-2 rounded-xl border border-amber-200 text-xs font-semibold text-amber-800">
          <TrendingUp className="w-4 h-4 text-amber-600" />
          <span>Active Tariff: {pricingRules.find((r) => r.condition === activePricingLevel)?.name}</span>
        </div>
      </div>

      {/* Filter Controls Bar */}
      <div className="bg-slate-900 text-white p-5 rounded-2xl shadow-md grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div>
          <label className="text-[11px] font-semibold text-amber-300 block mb-1">
            {t('checkInDate')}
          </label>
          <div className="relative">
            <Calendar className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
            <input
              type="date"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
              className="w-full bg-slate-800 text-white pl-9 pr-3 py-1.5 rounded-lg text-xs font-medium focus:ring-2 focus:ring-amber-500 outline-none"
            />
          </div>
        </div>

        <div>
          <label className="text-[11px] font-semibold text-amber-300 block mb-1">
            {t('checkOutDate')}
          </label>
          <div className="relative">
            <Calendar className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
            <input
              type="date"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
              className="w-full bg-slate-800 text-white pl-9 pr-3 py-1.5 rounded-lg text-xs font-medium focus:ring-2 focus:ring-amber-500 outline-none"
            />
          </div>
        </div>

        <div>
          <label className="text-[11px] font-semibold text-amber-300 block mb-1">
            {t('guestsCount')}
          </label>
          <div className="relative">
            <Users className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
            <select
              value={guestsCount}
              onChange={(e) => setGuestsCount(Number(e.target.value))}
              className="w-full bg-slate-800 text-white pl-9 pr-3 py-1.5 rounded-lg text-xs font-medium focus:ring-2 focus:ring-amber-500 outline-none"
            >
              <option value={1}>1 Guest</option>
              <option value={2}>2 Guests</option>
              <option value={3}>3 Guests</option>
              <option value={4}>4+ Guests</option>
            </select>
          </div>
        </div>

        <div>
          <label className="text-[11px] font-semibold text-amber-300 block mb-1">
            {t('roomType')} Filter
          </label>
          <div className="relative">
            <Building2 className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
            <select
              value={selectedTypeFilter}
              onChange={(e) => setSelectedTypeFilter(e.target.value)}
              className="w-full bg-slate-800 text-white pl-9 pr-3 py-1.5 rounded-lg text-xs font-medium focus:ring-2 focus:ring-amber-500 outline-none"
            >
              <option value="all">All Room Types</option>
              {roomTypesList.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Room Catalog Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {availableRooms.map((room) => {
          const isOccupiedOrReserved = room.status === 'occupied' || room.status === 'reserved';

          return (
            <div
              key={room.roomId}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-lg transition-all flex flex-col justify-between"
            >
              <div>
                {/* Room Photo Header */}
                <div className="relative h-48 overflow-hidden bg-slate-100">
                  <img
                    src={room.image}
                    alt={room.roomType}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-md text-white text-[11px] font-bold px-2.5 py-1 rounded-full">
                    Room {room.roomNumber}
                  </div>
                  <div className="absolute top-3 right-3">
                    <span
                      className={`text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider ${
                        room.status === 'available'
                          ? 'bg-emerald-500 text-white shadow-xs'
                          : 'bg-amber-500 text-white'
                      }`}
                    >
                      {room.status}
                    </span>
                  </div>
                </div>

                {/* Content Details */}
                <div className="p-5 space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-base font-bold text-slate-900">{room.roomType}</h3>
                      <p className="text-xs text-slate-500 mt-1 line-clamp-2">{room.description}</p>
                    </div>
                  </div>

                  {/* Amenities Badges */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {room.facilities.slice(0, 4).map((f) => (
                      <span
                        key={f}
                        className="text-[10px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md font-medium"
                      >
                        {f}
                      </span>
                    ))}
                    {room.facilities.length > 4 && (
                      <span className="text-[10px] bg-amber-50 text-amber-700 px-2 py-0.5 rounded-md font-medium">
                        +{room.facilities.length - 4} more
                      </span>
                    )}
                  </div>

                  {/* Pricing Box with Dynamic Rate tag */}
                  <div className="bg-amber-50/60 rounded-xl p-3 border border-amber-200/60 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-slate-500 block uppercase font-bold">
                        Dynamic Rate
                      </span>
                      <div className="flex items-baseline space-x-1.5">
                        <span className="text-xl font-black text-amber-800">
                          ₹{room.currentPrice.toLocaleString()}
                        </span>
                        <span className="text-[11px] text-slate-500">{t('perNight')}</span>
                      </div>
                    </div>
                    {room.currentPrice !== room.basePrice && (
                      <div className="text-right">
                        <span className="text-[10px] line-through text-slate-400 block">
                          Base ₹{room.basePrice.toLocaleString()}
                        </span>
                        <span className="text-[10px] font-bold text-emerald-600 bg-emerald-100 px-1.5 py-0.5 rounded">
                          Dynamic Adjusted
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="p-5 pt-0">
                <button
                  id={`btn-book-room-${room.roomNumber}`}
                  disabled={isOccupiedOrReserved}
                  onClick={() => setSelectedRoom(room)}
                  className={`w-full py-2.5 px-4 rounded-xl text-xs font-bold transition-all shadow-xs cursor-pointer ${
                    isOccupiedOrReserved
                      ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                      : 'bg-amber-500 hover:bg-amber-600 text-slate-950 hover:shadow-md'
                  }`}
                >
                  {isOccupiedOrReserved ? 'Reserved' : t('bookNow')}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Booking Checkout Modal */}
      {selectedRoom && !confirmedBooking && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-100 relative animate-in zoom-in-95">
            <button
              onClick={() => setSelectedRoom(null)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center space-x-2 border-b border-slate-100 pb-3 mb-4">
              <Bed className="w-5 h-5 text-amber-600" />
              <h2 className="text-lg font-bold text-slate-900">Confirm Room Reservation</h2>
            </div>

            <form onSubmit={handleBookSubmit} className="space-y-4">
              {/* Room Summary Box */}
              <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 flex items-center space-x-3">
                <img
                  src={selectedRoom.image}
                  alt={selectedRoom.roomType}
                  referrerPolicy="no-referrer"
                  className="w-16 h-16 rounded-xl object-cover shrink-0"
                />
                <div>
                  <h4 className="text-xs font-bold text-slate-900">{selectedRoom.roomType}</h4>
                  <p className="text-[11px] text-slate-500">Room Number: {selectedRoom.roomNumber}</p>
                  <p className="text-xs font-extrabold text-amber-700 mt-0.5">
                    ₹{selectedRoom.currentPrice.toLocaleString()} / night × {nights} nights = ₹
                    {(selectedRoom.currentPrice * nights).toLocaleString()}
                  </p>
                </div>
              </div>

              {/* Dates & Guests */}
              <div className="grid grid-cols-2 gap-3 text-xs bg-amber-50/50 p-3 rounded-xl border border-amber-100">
                <div>
                  <span className="text-slate-500 block text-[10px]">Check-in</span>
                  <span className="font-bold text-slate-800">{checkIn}</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px]">Check-out</span>
                  <span className="font-bold text-slate-800">{checkOut}</span>
                </div>
              </div>

              {/* Guest Details Input */}
              <div className="space-y-2">
                <div>
                  <label className="text-[11px] font-semibold text-slate-700 block mb-1">
                    Guest Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    className="w-full px-3 py-1.5 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-amber-500 outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-[11px] font-semibold text-slate-700 block mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      value={guestEmail}
                      onChange={(e) => setGuestEmail(e.target.value)}
                      className="w-full px-3 py-1.5 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-amber-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-semibold text-slate-700 block mb-1">
                      Phone Number
                    </label>
                    <input
                      type="text"
                      required
                      value={guestPhone}
                      onChange={(e) => setGuestPhone(e.target.value)}
                      className="w-full px-3 py-1.5 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-amber-500 outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Payment Mode Selection */}
              <div>
                <label className="text-[11px] font-semibold text-slate-700 block mb-1">
                  Payment Method
                </label>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <button
                    type="button"
                    onClick={() => {
                      setPaymentMethod('UPI (GPay / PhonePe)');
                      setPayStatus('paid');
                    }}
                    className={`p-2 rounded-xl border text-left font-medium transition-all ${
                      paymentMethod.includes('UPI')
                        ? 'border-amber-500 bg-amber-50 text-amber-900 font-bold'
                        : 'border-slate-200 text-slate-700'
                    }`}
                  >
                    UPI / GPay / NetBanking
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setPaymentMethod('Pay at Hotel Desk');
                      setPayStatus('pay_at_hotel');
                    }}
                    className={`p-2 rounded-xl border text-left font-medium transition-all ${
                      paymentMethod.includes('Hotel')
                        ? 'border-amber-500 bg-amber-50 text-amber-900 font-bold'
                        : 'border-slate-200 text-slate-700'
                    }`}
                  >
                    Pay at Hotel Desk
                  </button>
                </div>
              </div>

              {/* Total Summary Button */}
              <div className="pt-2">
                <button
                  id="btn-confirm-booking-final"
                  type="submit"
                  className="w-full py-3 bg-amber-500 hover:bg-amber-600 text-slate-950 font-extrabold rounded-xl text-xs shadow-lg hover:shadow-amber-500/30 transition-all cursor-pointer"
                >
                  Confirm & Book for ₹{(selectedRoom.currentPrice * nights).toLocaleString()}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Success Confirmation Modal */}
      {confirmedBooking && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 text-center space-y-4 shadow-2xl">
            <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
              <Check className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-black text-slate-900">Booking Confirmed!</h3>
            <p className="text-xs text-slate-500">
              Booking Ref: <span className="font-bold text-amber-700">{confirmedBooking.bookingId}</span>
            </p>
            <div className="bg-slate-50 p-3 rounded-xl text-xs space-y-1 text-left">
              <p>
                <span className="font-semibold text-slate-700">Room:</span> {confirmedBooking.roomType} (
                {confirmedBooking.roomNumber})
              </p>
              <p>
                <span className="font-semibold text-slate-700">Dates:</span> {confirmedBooking.checkIn} to{' '}
                {confirmedBooking.checkOut}
              </p>
              <p>
                <span className="font-semibold text-slate-700">Total Amount:</span> ₹
                {confirmedBooking.price.toLocaleString()} ({confirmedBooking.paymentStatus})
              </p>
            </div>
            <div className="flex space-x-2 pt-2">
              <button
                onClick={() => {
                  setActiveInvoice(confirmedBooking);
                  setConfirmedBooking(null);
                  setSelectedRoom(null);
                }}
                className="flex-1 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold flex items-center justify-center space-x-1"
              >
                <Receipt className="w-4 h-4" />
                <span>View Receipt</span>
              </button>
              <button
                onClick={() => {
                  setConfirmedBooking(null);
                  setSelectedRoom(null);
                }}
                className="px-4 py-2 bg-slate-100 text-slate-700 rounded-xl text-xs font-bold"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
