import React, { useState } from 'react';
import { useHotel } from '../context/HotelContext';
import { Facility, TimeSlot } from '../types';
import {
  Waves,
  Dumbbell,
  Users,
  Trophy,
  Sparkles,
  GlassWater,
  Briefcase,
  Gamepad2,
  Calendar,
  Clock,
  CheckCircle2,
  Lock,
  X,
  AlertCircle,
} from 'lucide-react';

export const FacilityBookingPage: React.FC = () => {
  const { facilities, getTimeSlotsForFacility, addFacilityBooking, t } = useHotel();

  const [selectedFacility, setSelectedFacility] = useState<Facility>(facilities[0] || null);
  const [selectedDate, setSelectedDate] = useState(() => new Date().toISOString().split('T')[0]);
  const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(null);

  const [guestName, setGuestName] = useState('Rajesh Sharma');
  const [bookingSuccess, setBookingSuccess] = useState(false);

  const facilitySlots = selectedFacility
    ? getTimeSlotsForFacility(selectedFacility.facilityId, selectedDate)
    : [];

  const handleFacilityBook = () => {
    if (!selectedFacility || !selectedSlot) return;

    addFacilityBooking({
      userId: 'usr_101',
      guestName,
      facilityId: selectedFacility.facilityId,
      facilityName: selectedFacility.facilityName,
      bookingDate: selectedDate,
      timeSlot: selectedSlot.time,
      status: 'confirmed',
      price: selectedFacility.price,
    });

    setBookingSuccess(true);
    setSelectedSlot(null);
  };

  const renderIcon = (iconName: string) => {
    switch (iconName) {
      case 'Waves':
        return <Waves className="w-5 h-5 text-blue-600" />;
      case 'Dumbbell':
        return <Dumbbell className="w-5 h-5 text-amber-600" />;
      case 'Users':
        return <Users className="w-5 h-5 text-purple-600" />;
      case 'Trophy':
        return <Trophy className="w-5 h-5 text-emerald-600" />;
      case 'Sparkles':
        return <Sparkles className="w-5 h-5 text-rose-600" />;
      case 'GlassWater':
        return <GlassWater className="w-5 h-5 text-amber-700" />;
      case 'Briefcase':
        return <Briefcase className="w-5 h-5 text-indigo-600" />;
      default:
        return <Gamepad2 className="w-5 h-5 text-cyan-600" />;
    }
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Title Header */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900">{t('facilityBooking')}</h1>
          <p className="text-xs text-slate-500 mt-1">
            Reserve hotel amenities, swimming pool time slots, spa appointments and sports courts
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <span className="w-3 h-3 rounded-full bg-emerald-500 animate-ping" />
          <span className="text-xs font-bold text-slate-700">Real-Time Slot Engine Active</span>
        </div>
      </div>

      {/* Main Grid: Facilities Catalog + Time Slot Selector */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Facility Cards */}
        <div className="lg:col-span-1 space-y-3">
          <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wider px-1">
            Available Facilities
          </h2>
          <div className="space-y-3 max-h-[600px] overflow-y-auto pr-1">
            {facilities.map((facility) => {
              const isSelected = selectedFacility?.facilityId === facility.facilityId;
              return (
                <div
                  key={facility.facilityId}
                  onClick={() => {
                    setSelectedFacility(facility);
                    setSelectedSlot(null);
                  }}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center space-x-3 ${
                    isSelected
                      ? 'bg-amber-50/80 border-amber-400 ring-2 ring-amber-400/30 shadow-md'
                      : 'bg-white border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <img
                    src={facility.image}
                    alt={facility.facilityName}
                    referrerPolicy="no-referrer"
                    className="w-16 h-16 rounded-xl object-cover shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-1.5">
                      {renderIcon(facility.icon)}
                      <h3 className="text-xs font-bold text-slate-900 truncate">
                        {facility.facilityName}
                      </h3>
                    </div>
                    <p className="text-[11px] text-slate-500 mt-1 truncate">{facility.description}</p>
                    <div className="flex items-center justify-between mt-2 text-[10px]">
                      <span className="text-slate-600 font-semibold">
                        Cap: {facility.capacity} guests
                      </span>
                      <span className="font-extrabold text-amber-700">
                        {facility.price === 0 ? 'Complimentary' : `₹${facility.price}/hr`}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Time Slot Grid & Date Picker (PDF Page 4 requirement) */}
        <div className="lg:col-span-2 space-y-6">
          {selectedFacility && (
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
              {/* Selected Facility Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-100 pb-4 gap-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 rounded-2xl bg-amber-100 flex items-center justify-center shrink-0">
                    {renderIcon(selectedFacility.icon)}
                  </div>
                  <div>
                    <h2 className="text-lg font-extrabold text-slate-900">
                      {selectedFacility.facilityName}
                    </h2>
                    <p className="text-xs text-slate-500">{selectedFacility.description}</p>
                  </div>
                </div>

                {/* Date Picker */}
                <div className="flex items-center space-x-2 bg-slate-50 p-2 rounded-xl border border-slate-200">
                  <Calendar className="w-4 h-4 text-amber-600" />
                  <span className="text-xs font-semibold text-slate-700">{t('selectDate')}:</span>
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => {
                      setSelectedDate(e.target.value);
                      setSelectedSlot(null);
                    }}
                    className="bg-white text-slate-900 px-2 py-1 rounded text-xs font-bold border border-slate-200 outline-none"
                  />
                </div>
              </div>

              {/* Slot Legend */}
              <div className="flex items-center space-x-4 text-xs font-medium">
                <div className="flex items-center space-x-1.5">
                  <span className="w-3 h-3 rounded-full bg-emerald-500" />
                  <span className="text-slate-700">Available</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <span className="w-3 h-3 rounded-full bg-rose-500" />
                  <span className="text-slate-700">Booked</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <span className="w-3 h-3 rounded-full bg-slate-400" />
                  <span className="text-slate-700">Maintenance</span>
                </div>
              </div>

              {/* Time Slots Matrix (PDF Section 6 requirement) */}
              <div>
                <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-3">
                  Facility Time-Slot Availability Matrix
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {facilitySlots.map((slot) => {
                    const isSelected = selectedSlot?.slotId === slot.slotId;
                    const isAvailable = slot.status === 'available';

                    return (
                      <button
                        key={slot.slotId}
                        disabled={!isAvailable}
                        onClick={() => setSelectedSlot(slot)}
                        className={`p-3 rounded-xl border text-left transition-all relative flex flex-col justify-between ${
                          isSelected
                            ? 'bg-amber-500 text-slate-950 border-amber-600 font-bold shadow-md ring-2 ring-amber-400'
                            : isAvailable
                            ? 'bg-emerald-50/50 hover:bg-emerald-100/60 border-emerald-200 text-slate-800'
                            : slot.status === 'booked'
                            ? 'bg-rose-50 border-rose-200 text-rose-800 cursor-not-allowed opacity-80'
                            : 'bg-slate-100 border-slate-200 text-slate-500 cursor-not-allowed'
                        }`}
                      >
                        <div className="flex items-center justify-between w-full">
                          <span className="text-xs font-semibold">{slot.time}</span>
                          {isAvailable ? (
                            <Clock className="w-3.5 h-3.5 text-emerald-600" />
                          ) : slot.status === 'booked' ? (
                            <Lock className="w-3.5 h-3.5 text-rose-600" />
                          ) : (
                            <AlertCircle className="w-3.5 h-3.5 text-slate-400" />
                          )}
                        </div>

                        <span
                          className={`text-[10px] uppercase font-bold mt-2 inline-block px-1.5 py-0.5 rounded ${
                            isAvailable
                              ? 'bg-emerald-200/80 text-emerald-900'
                              : slot.status === 'booked'
                              ? 'bg-rose-200 text-rose-900'
                              : 'bg-slate-200 text-slate-700'
                          }`}
                        >
                          {slot.status === 'booked' ? `Booked (${slot.bookedBy || 'Guest'})` : slot.status}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Confirmation Panel */}
              {selectedSlot && (
                <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200 flex flex-col sm:flex-row items-center justify-between gap-4 animate-in fade-in">
                  <div>
                    <span className="text-xs font-extrabold text-amber-900 block">
                      Ready to reserve slot: {selectedSlot.time}
                    </span>
                    <span className="text-xs text-slate-600">
                      Date: {selectedDate} | Facility: {selectedFacility.facilityName}
                    </span>
                  </div>

                  <button
                    id="btn-confirm-facility-booking"
                    onClick={handleFacilityBook}
                    className="w-full sm:w-auto px-6 py-2.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold rounded-xl text-xs shadow-md transition-all cursor-pointer"
                  >
                    Confirm Facility Slot
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Success Modal */}
      {bookingSuccess && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 text-center space-y-4 shadow-2xl">
            <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Facility Time Slot Locked!</h3>
            <p className="text-xs text-slate-600">
              Your reservation for <span className="font-bold">{selectedFacility?.facilityName}</span> is
              confirmed for <span className="font-bold">{selectedDate}</span>.
            </p>
            <button
              onClick={() => setBookingSuccess(false)}
              className="w-full py-2.5 bg-slate-900 text-white rounded-xl text-xs font-bold"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
