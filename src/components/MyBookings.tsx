import React, { useState } from 'react';
import { useHotel } from '../context/HotelContext';
import {
  Receipt,
  Trash2,
  CheckCircle2,
  Clock,
  Ban,
  Calendar,
  Building2,
  CreditCard,
  Bed,
  Waves,
} from 'lucide-react';

export const MyBookings: React.FC = () => {
  const {
    bookings,
    facilityBookings,
    currentUser,
    cancelBooking,
    cancelFacilityBooking,
    setActiveInvoice,
    t,
  } = useHotel();

  const [activeTab, setActiveTab] = useState<'rooms' | 'facilities'>('rooms');

  const myRoomBookings = bookings.filter((b) => b.userId === currentUser.userId);
  const myFacilityBookings = facilityBookings.filter((fb) => fb.userId === currentUser.userId);

  return (
    <div className="space-y-8 pb-12">
      {/* Title Header */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900">{t('myBookings')}</h1>
          <p className="text-xs text-slate-500 mt-1">
            Track active reservations, payment receipts and cancellation requests
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex bg-slate-100 p-1 rounded-xl">
          <button
            onClick={() => setActiveTab('rooms')}
            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'rooms' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600'
            }`}
          >
            {t('roomBookings')} ({myRoomBookings.length})
          </button>
          <button
            onClick={() => setActiveTab('facilities')}
            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'facilities' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600'
            }`}
          >
            {t('facilityBookings')} ({myFacilityBookings.length})
          </button>
        </div>
      </div>

      {/* Room Bookings List */}
      {activeTab === 'rooms' && (
        <div className="space-y-4">
          {myRoomBookings.length === 0 ? (
            <div className="bg-white p-12 text-center rounded-2xl border border-slate-200 text-slate-400 text-xs">
              No room bookings found in your account.
            </div>
          ) : (
            myRoomBookings.map((b) => (
              <div
                key={b.bookingId}
                className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-bold text-amber-700 bg-amber-50 px-2.5 py-1 rounded-md border border-amber-200">
                      ID: {b.bookingId}
                    </span>
                    <span
                      className={`text-[10px] uppercase font-bold px-2.5 py-0.5 rounded-full ${
                        b.bookingStatus === 'confirmed'
                          ? 'bg-emerald-100 text-emerald-800'
                          : b.bookingStatus === 'checked_in'
                          ? 'bg-blue-100 text-blue-800'
                          : b.bookingStatus === 'cancelled'
                          ? 'bg-rose-100 text-rose-800'
                          : 'bg-slate-100 text-slate-700'
                      }`}
                    >
                      {b.bookingStatus}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900">
                    {b.roomType} (Room {b.roomNumber})
                  </h3>

                  <div className="flex flex-wrap items-center gap-4 text-xs text-slate-600">
                    <span className="flex items-center space-x-1">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      <span>
                        {b.checkIn} → {b.checkOut}
                      </span>
                    </span>
                    <span>Guests: {b.guests}</span>
                    <span className="font-extrabold text-slate-900">₹{b.price.toLocaleString()}</span>
                    <span className="text-[10px] bg-slate-100 px-2 py-0.5 rounded font-medium text-slate-700">
                      Payment: {b.paymentStatus} ({b.paymentMethod || 'Online'})
                    </span>
                  </div>
                </div>

                <div className="flex items-center space-x-2 pt-2 md:pt-0 border-t md:border-t-0 border-slate-100">
                  <button
                    onClick={() => setActiveInvoice(b)}
                    className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold flex items-center space-x-1.5 shadow-xs"
                  >
                    <Receipt className="w-4 h-4" />
                    <span>Receipt</span>
                  </button>

                  {b.bookingStatus !== 'cancelled' && b.bookingStatus !== 'checked_out' && (
                    <button
                      onClick={() => cancelBooking(b.bookingId)}
                      className="px-3 py-2 bg-rose-50 hover:bg-rose-100 text-rose-700 rounded-xl text-xs font-bold flex items-center space-x-1 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                      <span>{t('cancel')}</span>
                    </button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Facility Bookings List */}
      {activeTab === 'facilities' && (
        <div className="space-y-4">
          {myFacilityBookings.length === 0 ? (
            <div className="bg-white p-12 text-center rounded-2xl border border-slate-200 text-slate-400 text-xs">
              No facility reservations found.
            </div>
          ) : (
            myFacilityBookings.map((fb) => (
              <div
                key={fb.facilityBookingId}
                className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-bold text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-md border border-blue-200">
                      {fb.facilityBookingId}
                    </span>
                    <span
                      className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full ${
                        fb.status === 'confirmed'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-rose-100 text-rose-800'
                      }`}
                    >
                      {fb.status}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900">{fb.facilityName}</h3>

                  <div className="flex flex-wrap items-center gap-4 text-xs text-slate-600">
                    <span>Date: {fb.bookingDate}</span>
                    <span className="font-semibold text-slate-800">Time Slot: {fb.timeSlot}</span>
                    <span className="font-extrabold text-slate-900">
                      {fb.price === 0 ? 'Complimentary' : `₹${fb.price}`}
                    </span>
                  </div>
                </div>

                {fb.status === 'confirmed' && (
                  <button
                    onClick={() => cancelFacilityBooking(fb.facilityBookingId)}
                    className="px-3 py-2 bg-rose-50 hover:bg-rose-100 text-rose-700 rounded-xl text-xs font-bold flex items-center space-x-1"
                  >
                    <Trash2 className="w-4 h-4" />
                    <span>Cancel Reservation</span>
                  </button>
                )}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};
