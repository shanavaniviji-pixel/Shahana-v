import React from 'react';
import { Booking } from '../types';
import { Hotel, Printer, X, CheckCircle2 } from 'lucide-react';

interface InvoiceModalProps {
  booking: Booking | null;
  onClose: () => void;
}

export const InvoiceModal: React.FC<InvoiceModalProps> = ({ booking, onClose }) => {
  if (!booking) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-gray-900/50 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-xl relative border border-gray-200 animate-in zoom-in-95">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-700"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Invoice Printable Body */}
        <div id="printable-invoice" className="space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-gray-200 pb-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-bold">
                <Hotel className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-base font-bold text-gray-900 leading-tight">
                  RAJ PALACE Hotel & Resort
                </h2>
                <p className="text-[10px] text-gray-400">Official Booking Invoice & Receipt</p>
              </div>
            </div>
            <div className="text-right">
              <span className="text-xs font-bold text-indigo-600 block">Ref: {booking.bookingId}</span>
              <span className="text-[10px] text-gray-400">Issued: {booking.createdAt}</span>
            </div>
          </div>

          {/* Guest & Room Details */}
          <div className="grid grid-cols-2 gap-4 text-xs bg-gray-50 p-4 rounded-lg border border-gray-200">
            <div>
              <span className="text-[10px] uppercase font-bold text-gray-400 block tracking-wider">Guest Details</span>
              <span className="font-bold text-gray-900 block mt-0.5">{booking.guestName}</span>
              <span className="text-gray-600 block text-[11px]">{booking.guestEmail}</span>
              <span className="text-gray-600 block text-[11px]">{booking.guestPhone}</span>
            </div>

            <div>
              <span className="text-[10px] uppercase font-bold text-gray-400 block tracking-wider">
                Reservation Info
              </span>
              <span className="font-bold text-gray-900 block mt-0.5">
                {booking.roomType} (Room {booking.roomNumber})
              </span>
              <span className="text-gray-600 block text-[11px]">Check-in: {booking.checkIn}</span>
              <span className="text-gray-600 block text-[11px]">Check-out: {booking.checkOut}</span>
            </div>
          </div>

          {/* Pricing Table */}
          <div className="border border-gray-200 rounded-lg overflow-hidden text-xs">
            <div className="bg-gray-50 px-4 py-2 font-bold text-gray-500 uppercase tracking-wider text-[10px] flex justify-between border-b border-gray-200">
              <span>Description</span>
              <span>Amount</span>
            </div>
            <div className="p-4 space-y-2">
              <div className="flex justify-between text-gray-800">
                <span>Room Stay ({booking.roomType})</span>
                <span className="font-semibold">₹{booking.price.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-gray-400 text-[11px]">
                <span>Taxes & Service Charges</span>
                <span>Included</span>
              </div>
              <div className="border-t border-gray-100 pt-2 flex justify-between font-bold text-gray-900 text-sm">
                <span>Total Amount Paid</span>
                <span className="text-indigo-600">₹{booking.price.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Payment Status Badge */}
          <div className="flex items-center justify-between text-xs bg-emerald-50 p-3 rounded-lg border border-emerald-200">
            <div className="flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span className="font-bold text-emerald-900 uppercase tracking-wider text-[11px]">
                Status: {booking.paymentStatus}
              </span>
            </div>
            <span className="text-gray-600 text-[11px]">{booking.paymentMethod || 'Online Payment'}</span>
          </div>
        </div>

        {/* Footer Controls */}
        <div className="mt-6 flex space-x-3">
          <button
            onClick={handlePrint}
            className="flex-1 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-md text-xs flex items-center justify-center space-x-2 shadow-xs"
          >
            <Printer className="w-4 h-4" />
            <span>Print Receipt</span>
          </button>
          <button
            onClick={onClose}
            className="px-5 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-md text-xs"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
