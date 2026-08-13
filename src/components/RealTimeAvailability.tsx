import React, { useState } from 'react';
import { useHotel } from '../context/HotelContext';
import {
  Clock,
  Bed,
  CheckCircle2,
  Lock,
  AlertTriangle,
  Waves,
  Shield,
  Search,
} from 'lucide-react';

export const RealTimeAvailability: React.FC = () => {
  const { rooms, facilities, getTimeSlotsForFacility, t } = useHotel();
  const [selectedDate, setSelectedDate] = useState(() => new Date().toISOString().split('T')[0]);
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const filteredRooms = rooms.filter((r) => {
    if (filterStatus === 'all') return true;
    return r.status === filterStatus;
  });

  return (
    <div className="space-y-8 pb-12">
      {/* Page Title */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900">{t('realTimeAvailability')}</h1>
          <p className="text-xs text-slate-500 mt-1">
            Live status tracking across all hotel room numbers and facility hourly schedules
          </p>
        </div>

        {/* Status Filter */}
        <div className="flex items-center space-x-2">
          <span className="text-xs font-semibold text-slate-700">Filter Status:</span>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="bg-slate-100 border border-slate-200 text-slate-900 text-xs font-bold rounded-lg px-3 py-1.5 outline-none"
          >
            <option value="all">All Statuses</option>
            <option value="available">Available</option>
            <option value="occupied">Occupied</option>
            <option value="reserved">Reserved</option>
            <option value="maintenance">Maintenance</option>
          </select>
        </div>
      </div>

      {/* Real-time Room Status Matrix */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Bed className="w-5 h-5 text-amber-600" />
            <h2 className="text-lg font-bold text-slate-900">Hotel Room Real-Time Matrix</h2>
          </div>
          <span className="text-xs text-slate-500 font-medium">
            Showing {filteredRooms.length} of {rooms.length} Rooms
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {filteredRooms.map((room) => {
            const isAvailable = room.status === 'available';
            const isOccupied = room.status === 'occupied';
            const isReserved = room.status === 'reserved';

            return (
              <div
                key={room.roomId}
                className={`p-3.5 rounded-xl border text-center transition-all ${
                  isAvailable
                    ? 'bg-emerald-50/60 border-emerald-300 text-emerald-950'
                    : isOccupied
                    ? 'bg-blue-50 border-blue-300 text-blue-950'
                    : isReserved
                    ? 'bg-amber-50 border-amber-300 text-amber-950'
                    : 'bg-slate-100 border-slate-300 text-slate-600'
                }`}
              >
                <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Room
                </div>
                <div className="text-2xl font-black mt-0.5">{room.roomNumber}</div>
                <div className="text-[11px] font-bold mt-1 line-clamp-1">{room.roomType}</div>

                <div className="mt-2">
                  <span
                    className={`inline-block text-[10px] uppercase font-black px-2 py-0.5 rounded-full ${
                      isAvailable
                        ? 'bg-emerald-600 text-white'
                        : isOccupied
                        ? 'bg-blue-600 text-white'
                        : isReserved
                        ? 'bg-amber-600 text-white'
                        : 'bg-slate-500 text-white'
                    }`}
                  >
                    {room.status}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Real-time Facility Schedule View */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-100 pb-4 gap-4">
          <div className="flex items-center space-x-2">
            <Clock className="w-5 h-5 text-blue-600" />
            <h2 className="text-lg font-bold text-slate-900">Facility Time-Slot Live Tracker</h2>
          </div>

          <div className="flex items-center space-x-2">
            <span className="text-xs font-semibold text-slate-700">Date:</span>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="bg-slate-50 border border-slate-200 text-slate-900 text-xs font-bold rounded-lg px-2.5 py-1.5 outline-none"
            />
          </div>
        </div>

        <div className="space-y-6 divide-y divide-slate-100">
          {facilities.map((fac) => {
            const slots = getTimeSlotsForFacility(fac.facilityId, selectedDate);
            return (
              <div key={fac.facilityId} className="pt-4 first:pt-0 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Waves className="w-4 h-4 text-amber-600" />
                    <h3 className="text-sm font-bold text-slate-900">{fac.facilityName}</h3>
                  </div>
                  <span className="text-[11px] text-slate-500">Capacity: {fac.capacity} guests</span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-2">
                  {slots.map((s) => (
                    <div
                      key={s.slotId}
                      className={`p-2 rounded-lg border text-center text-xs ${
                        s.status === 'available'
                          ? 'bg-emerald-50 border-emerald-200 text-emerald-900 font-medium'
                          : s.status === 'booked'
                          ? 'bg-rose-50 border-rose-200 text-rose-900 font-bold'
                          : 'bg-slate-100 border-slate-200 text-slate-500'
                      }`}
                    >
                      <span className="block text-[11px]">{s.time.split('-')[0]}</span>
                      <span
                        className={`text-[9px] font-bold uppercase block mt-0.5 ${
                          s.status === 'available'
                            ? 'text-emerald-700'
                            : s.status === 'booked'
                            ? 'text-rose-700'
                            : 'text-slate-500'
                        }`}
                      >
                        {s.status === 'booked' ? `Booked` : s.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
