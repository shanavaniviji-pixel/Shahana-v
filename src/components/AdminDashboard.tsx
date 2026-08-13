import React, { useState } from 'react';
import { useHotel } from '../context/HotelContext';
import { Room, Facility, PricingRule, RoomStatus, Booking, PaymentStatus } from '../types';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
} from 'recharts';
import {
  TrendingUp,
  Building2,
  Calendar,
  Users,
  Plus,
  Trash2,
  CheckCircle2,
  AlertCircle,
  Sliders,
  DollarSign,
  ShieldCheck,
  Search,
  X,
  Clock,
  Sparkles,
  CreditCard,
  Receipt,
  FileText,
  Phone,
  Mail,
  UserCheck,
  Filter,
  Check,
  RefreshCw,
  Eye,
  Award,
} from 'lucide-react';

const revenueData = [
  { month: 'Jan', revenue: 125000, bookings: 42 },
  { month: 'Feb', revenue: 148000, bookings: 51 },
  { month: 'Mar', revenue: 162000, bookings: 58 },
  { month: 'Apr', revenue: 195000, bookings: 72 },
  { month: 'May', revenue: 230000, bookings: 88 },
  { month: 'Jun', revenue: 285000, bookings: 110 },
  { month: 'Jul', revenue: 340000, bookings: 135 },
  { month: 'Aug', revenue: 310000, bookings: 120 },
];

const facilityUsageData = [
  { name: 'Swimming Pool', value: 45, color: '#0284c7' },
  { name: 'Fitness Gym', value: 25, color: '#d97706' },
  { name: 'Spa & Wellness', value: 15, color: '#e11d48' },
  { name: 'Conference Hall', value: 10, color: '#7c3aed' },
  { name: 'Sports Court', value: 5, color: '#059669' },
];

export const AdminDashboard: React.FC = () => {
  const {
    rooms,
    addRoom,
    deleteRoom,
    updateRoomStatus,
    facilities,
    addFacility,
    updateFacility,
    pricingRules,
    updatePricingRule,
    occupancyPercentage,
    bookings,
    updateBookingStatus,
    facilityBookings,
    setActiveInvoice,
    t,
  } = useHotel();

  const [adminTab, setAdminTab] = useState<
    'overview' | 'rooms' | 'pricing' | 'facilities' | 'bookings' | 'customers' | 'payments'
  >('overview');

  // Search & Filter state for Customers & Payments
  const [customerSearch, setCustomerSearch] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState<any | null>(null);

  const [paymentSearch, setPaymentSearch] = useState('');
  const [paymentFilterStatus, setPaymentFilterStatus] = useState<string>('all');
  const [paymentFilterMethod, setPaymentFilterMethod] = useState<string>('all');

  // New Room Form State
  const [showAddRoomModal, setShowAddRoomModal] = useState(false);
  const [newRoomNumber, setNewRoomNumber] = useState('');
  const [newRoomType, setNewRoomType] = useState('Deluxe King Suite');
  const [newBasePrice, setNewBasePrice] = useState(3000);
  const [newDesc, setNewDesc] = useState('Spacious room with modern amenities.');

  // Total Revenue Calculation
  const totalRevenue = bookings.reduce((sum, b) => sum + b.price, 0);

  const handleAddRoomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newRoomNumber) return;

    addRoom({
      roomNumber: newRoomNumber,
      roomType: newRoomType,
      description: newDesc,
      basePrice: Number(newBasePrice),
      status: 'available',
      facilities: ['King Bed', 'Free Wi-Fi', 'Air Conditioning', 'Smart TV'],
      image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80',
      capacity: 2,
    });

    setShowAddRoomModal(false);
    setNewRoomNumber('');
  };

  // Derive unique customer list from bookings and facility bookings
  const customerMap = new Map<string, {
    email: string;
    name: string;
    phone: string;
    totalSpend: number;
    roomBookingsCount: number;
    facilityBookingsCount: number;
    status: 'In-House' | 'Upcoming' | 'Checked-Out';
    lastBookingDate: string;
    bookingsList: Booking[];
  }>();

  bookings.forEach((b) => {
    const key = b.guestEmail.toLowerCase();
    const existing = customerMap.get(key) || {
      email: b.guestEmail,
      name: b.guestName,
      phone: b.guestPhone || '+91 98765 43210',
      totalSpend: 0,
      roomBookingsCount: 0,
      facilityBookingsCount: 0,
      status: b.bookingStatus === 'checked_in' ? 'In-House' : b.bookingStatus === 'confirmed' ? 'Upcoming' : 'Checked-Out',
      lastBookingDate: b.checkIn,
      bookingsList: [],
    };

    existing.totalSpend += b.price;
    existing.roomBookingsCount += 1;
    existing.bookingsList.push(b);
    if (b.bookingStatus === 'checked_in') {
      existing.status = 'In-House';
    }
    customerMap.set(key, existing);
  });

  // Add facility bookings to customer map
  facilityBookings.forEach((fb) => {
    const matchedCustomerKey = Array.from(customerMap.keys()).find(
      (k) => customerMap.get(k)?.name.toLowerCase() === fb.guestName.toLowerCase()
    );

    if (matchedCustomerKey) {
      const existing = customerMap.get(matchedCustomerKey)!;
      existing.totalSpend += fb.price;
      existing.facilityBookingsCount += 1;
    } else {
      const key = `guest_${fb.guestName.toLowerCase().replace(/\s+/g, '')}`;
      customerMap.set(key, {
        email: `${fb.guestName.toLowerCase().replace(/\s+/g, '.')}@example.com`,
        name: fb.guestName,
        phone: '+91 98765 43210',
        totalSpend: fb.price,
        roomBookingsCount: 0,
        facilityBookingsCount: 1,
        status: 'Upcoming',
        lastBookingDate: fb.bookingDate,
        bookingsList: [],
      });
    }
  });

  const customerList = Array.from(customerMap.values()).filter(
    (c) =>
      c.name.toLowerCase().includes(customerSearch.toLowerCase()) ||
      c.email.toLowerCase().includes(customerSearch.toLowerCase()) ||
      c.phone.includes(customerSearch)
  );

  // Financial Payment Details ledger derived from bookings
  const filteredPayments = bookings.filter((b) => {
    const matchesSearch =
      b.bookingId.toLowerCase().includes(paymentSearch.toLowerCase()) ||
      b.guestName.toLowerCase().includes(paymentSearch.toLowerCase()) ||
      b.roomType.toLowerCase().includes(paymentSearch.toLowerCase());

    const matchesStatus = paymentFilterStatus === 'all' || b.paymentStatus === paymentFilterStatus;
    const matchesMethod =
      paymentFilterMethod === 'all' ||
      (b.paymentMethod && b.paymentMethod.toLowerCase().includes(paymentFilterMethod.toLowerCase()));

    return matchesSearch && matchesStatus && matchesMethod;
  });

  const totalPaidRevenue = bookings
    .filter((b) => b.paymentStatus === 'paid')
    .reduce((sum, b) => sum + b.price, 0);

  const pendingCollectibles = bookings
    .filter((b) => b.paymentStatus === 'pending' || b.paymentStatus === 'pay_at_hotel')
    .reduce((sum, b) => sum + b.price, 0);

  const upiPaymentsTotal = bookings
    .filter((b) => b.paymentMethod?.includes('UPI') && b.paymentStatus === 'paid')
    .reduce((sum, b) => sum + b.price, 0);

  const cardPaymentsTotal = bookings
    .filter((b) => b.paymentMethod?.includes('Card') && b.paymentStatus === 'paid')
    .reduce((sum, b) => sum + b.price, 0);

  return (
    <div className="space-y-6 pb-12">
      {/* Admin Header */}
      <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <ShieldCheck className="w-5 h-5 text-indigo-600" />
            <h1 className="text-xl font-bold tracking-tight text-gray-900">{t('adminDashboard')}</h1>
          </div>
          <p className="text-gray-500 text-xs mt-0.5">
            Real-time management of rooms, dynamic pricing algorithms, facility slots, customer details, and financial payment ledgers.
          </p>
        </div>

        {/* Navigation Sub-tabs */}
        <div className="flex flex-wrap gap-1 bg-gray-100 p-1 rounded-lg border border-gray-200 text-xs font-medium">
          <button
            onClick={() => setAdminTab('overview')}
            className={`px-3 py-1.5 rounded-md transition-all ${
              adminTab === 'overview' ? 'bg-white text-gray-900 shadow-2xs font-semibold' : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setAdminTab('rooms')}
            className={`px-3 py-1.5 rounded-md transition-all ${
              adminTab === 'rooms' ? 'bg-white text-gray-900 shadow-2xs font-semibold' : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Rooms ({rooms.length})
          </button>
          <button
            onClick={() => setAdminTab('pricing')}
            className={`px-3 py-1.5 rounded-md transition-all ${
              adminTab === 'pricing' ? 'bg-white text-gray-900 shadow-2xs font-semibold' : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Dynamic Pricing
          </button>
          <button
            onClick={() => setAdminTab('facilities')}
            className={`px-3 py-1.5 rounded-md transition-all ${
              adminTab === 'facilities' ? 'bg-white text-gray-900 shadow-2xs font-semibold' : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Facilities ({facilities.length})
          </button>
          <button
            onClick={() => setAdminTab('bookings')}
            className={`px-3 py-1.5 rounded-md transition-all ${
              adminTab === 'bookings' ? 'bg-white text-gray-900 shadow-2xs font-semibold' : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Bookings ({bookings.length})
          </button>
          <button
            onClick={() => setAdminTab('customers')}
            className={`px-3 py-1.5 rounded-md flex items-center space-x-1 transition-all ${
              adminTab === 'customers' ? 'bg-indigo-600 text-white shadow-2xs font-semibold' : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>Customer Details</span>
          </button>
          <button
            onClick={() => setAdminTab('payments')}
            className={`px-3 py-1.5 rounded-md flex items-center space-x-1 transition-all ${
              adminTab === 'payments' ? 'bg-emerald-600 text-white shadow-2xs font-semibold' : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Receipt className="w-3.5 h-3.5" />
            <span>Payment Details</span>
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-xs">
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">{t('totalRevenue')}</span>
          <span className="text-2xl font-extrabold text-gray-900 mt-1 block">
            ₹{totalRevenue.toLocaleString()}
          </span>
          <span className="text-[10px] text-emerald-600 font-bold mt-1 block">
            +18.4% growth from last month
          </span>
        </div>

        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-xs">
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">{t('occupancyRate')}</span>
          <span className="text-2xl font-extrabold text-indigo-600 mt-1 block">{occupancyPercentage}%</span>
          <span className="text-[10px] text-gray-500 font-medium mt-1 block">
            {rooms.filter((r) => r.status === 'occupied').length} Occupied / {rooms.length} Total
          </span>
        </div>

        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-xs">
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Registered Guests</span>
          <span className="text-2xl font-extrabold text-gray-900 mt-1 block">{customerMap.size}</span>
          <span className="text-[10px] text-indigo-600 font-bold mt-1 block">
            {Array.from(customerMap.values()).filter((c) => c.status === 'In-House').length} Currently In-House
          </span>
        </div>

        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-xs">
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Settled Payments</span>
          <span className="text-2xl font-extrabold text-emerald-600 mt-1 block">
            ₹{totalPaidRevenue.toLocaleString()}
          </span>
          <span className="text-[10px] text-amber-600 font-bold mt-1 block">
            ₹{pendingCollectibles.toLocaleString()} pending collection
          </span>
        </div>
      </div>

      {/* Tab 1: Overview & Reports */}
      {adminTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Revenue Chart */}
          <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-gray-200 shadow-xs space-y-4">
            <h2 className="text-base font-bold text-gray-900">Hotel Revenue Trend (₹)</h2>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="month" stroke="#94a3b8" fontSize={11} />
                  <YAxis stroke="#94a3b8" fontSize={11} />
                  <Tooltip formatter={(value) => [`₹${Number(value).toLocaleString()}`, 'Revenue']} />
                  <Area type="monotone" dataKey="revenue" stroke="#4f46e5" fill="#e0e7ff" strokeWidth={3} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Facility Usage Distribution */}
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-xs space-y-4">
            <h2 className="text-base font-bold text-gray-900">Facility Usage Share</h2>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={facilityUsageData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {facilityUsageData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Room Management */}
      {adminTab === 'rooms' && (
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-xs space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-gray-900">{t('roomManagement')}</h2>
            <button
              id="btn-add-room-modal"
              onClick={() => setShowAddRoomModal(true)}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-md text-xs flex items-center space-x-1.5 shadow-xs cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>{t('addRoom')}</span>
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-gray-700">
              <thead className="bg-gray-50 text-gray-400 uppercase text-[10px] font-bold tracking-wider">
                <tr>
                  <th className="p-3">Room No</th>
                  <th className="p-3">Type</th>
                  <th className="p-3">Base Price</th>
                  <th className="p-3">Current Dynamic Price</th>
                  <th className="p-3">Status</th>
                  <th className="p-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {rooms.map((room) => (
                  <tr key={room.roomId} className="hover:bg-gray-50">
                    <td className="p-3 font-bold text-gray-900">{room.roomNumber}</td>
                    <td className="p-3 font-medium text-gray-700">{room.roomType}</td>
                    <td className="p-3 text-gray-500">₹{room.basePrice.toLocaleString()}</td>
                    <td className="p-3 font-bold text-indigo-600">
                      ₹{room.currentPrice.toLocaleString()}
                    </td>
                    <td className="p-3">
                      <select
                        value={room.status}
                        onChange={(e) => updateRoomStatus(room.roomId, e.target.value as RoomStatus)}
                        className="bg-gray-50 border border-gray-200 rounded px-2 py-1 text-xs font-semibold text-gray-900 outline-none"
                      >
                        <option value="available">Available</option>
                        <option value="occupied">Occupied</option>
                        <option value="reserved">Reserved</option>
                        <option value="maintenance">Maintenance</option>
                      </select>
                    </td>
                    <td className="p-3 text-right space-x-2">
                      <button
                        onClick={() => deleteRoom(room.roomId)}
                        className="p-1.5 text-rose-600 hover:bg-rose-50 rounded"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 3: Dynamic Pricing Management */}
      {adminTab === 'pricing' && (
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-xs space-y-6">
          <div>
            <h2 className="text-base font-bold text-gray-900">{t('pricingManagement')}</h2>
            <p className="text-xs text-gray-500 mt-0.5">
              Configure room dynamic multipliers based on occupancy percentage thresholds and weekend conditions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {pricingRules.map((rule) => (
              <div
                key={rule.pricingId}
                className="p-5 rounded-lg border border-gray-200 bg-gray-50 space-y-3"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-gray-900">{rule.name}</h3>
                  <span className="text-xs font-bold text-indigo-700 bg-indigo-50 border border-indigo-200 px-2.5 py-0.5 rounded-full">
                    {rule.priceMultiplier}x Multiplier
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <label className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block mb-1">Min Occupancy %</label>
                    <input
                      type="number"
                      value={rule.minimumOccupancy}
                      onChange={(e) =>
                        updatePricingRule({ ...rule, minimumOccupancy: Number(e.target.value) })
                      }
                      className="w-full bg-white border border-gray-200 px-2 py-1 rounded text-xs text-gray-900"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block mb-1">Max Occupancy %</label>
                    <input
                      type="number"
                      value={rule.maximumOccupancy}
                      onChange={(e) =>
                        updatePricingRule({ ...rule, maximumOccupancy: Number(e.target.value) })
                      }
                      className="w-full bg-white border border-gray-200 px-2 py-1 rounded text-xs text-gray-900"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block mb-1">
                    Multiplier (e.g. 0.88 for Low Demand, 1.28 for Surge)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={rule.priceMultiplier}
                    onChange={(e) =>
                      updatePricingRule({ ...rule, priceMultiplier: Number(e.target.value) })
                    }
                    className="w-full bg-white border border-gray-200 px-3 py-1.5 rounded-md text-xs font-bold text-gray-900"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 4: Facilities Management */}
      {adminTab === 'facilities' && (
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-xs space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-gray-900">Hotel Facilities & Amenities</h2>
              <p className="text-xs text-gray-500 mt-0.5">
                Manage operational status, capacity, and pricing for resort amenities.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {facilities.map((facility) => (
              <div
                key={facility.facilityId}
                className="p-4 rounded-xl border border-gray-200 bg-white shadow-2xs space-y-3"
              >
                <div className="h-32 rounded-lg overflow-hidden relative">
                  <img
                    src={facility.image}
                    alt={facility.facilityName}
                    className="w-full h-full object-cover"
                  />
                  <span
                    className={`absolute top-2 right-2 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                      facility.status === 'available'
                        ? 'bg-emerald-500 text-white'
                        : 'bg-amber-500 text-white'
                    }`}
                  >
                    {facility.status}
                  </span>
                </div>

                <div>
                  <h3 className="font-bold text-gray-900 text-sm">{facility.facilityName}</h3>
                  <p className="text-xs text-gray-500 line-clamp-2 mt-0.5">{facility.description}</p>
                </div>

                <div className="flex items-center justify-between text-xs pt-2 border-t border-gray-100">
                  <span className="font-bold text-indigo-600">
                    {facility.price === 0 ? 'Complimentary' : `₹${facility.price}/hr`}
                  </span>
                  <select
                    value={facility.status}
                    onChange={(e) =>
                      updateFacility({ ...facility, status: e.target.value as any })
                    }
                    className="bg-gray-50 border border-gray-200 rounded px-2 py-1 text-xs font-semibold text-gray-900 outline-none"
                  >
                    <option value="available">Available</option>
                    <option value="maintenance">Maintenance</option>
                    <option value="unavailable">Unavailable</option>
                  </select>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 5: All Bookings Management */}
      {adminTab === 'bookings' && (
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-xs space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-gray-900">Hotel Master Reservations Log</h2>
              <p className="text-xs text-gray-500 mt-0.5">
                Inspect, modify reservation status, or view invoice receipts for guest bookings.
              </p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-gray-700">
              <thead className="bg-gray-50 text-gray-400 uppercase text-[10px] font-bold tracking-wider">
                <tr>
                  <th className="p-3">Booking ID</th>
                  <th className="p-3">Guest Name</th>
                  <th className="p-3">Room / Service</th>
                  <th className="p-3">Dates</th>
                  <th className="p-3">Total Paid</th>
                  <th className="p-3">Status</th>
                  <th className="p-3 text-right">Invoice</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {bookings.map((booking) => (
                  <tr key={booking.bookingId} className="hover:bg-gray-50">
                    <td className="p-3 font-mono font-bold text-indigo-600">{booking.bookingId}</td>
                    <td className="p-3 font-semibold text-gray-900">
                      <div>{booking.guestName}</div>
                      <div className="text-[10px] text-gray-400 font-normal">{booking.guestEmail}</div>
                    </td>
                    <td className="p-3 text-gray-700">
                      <div>{booking.roomType}</div>
                      <div className="text-[10px] text-indigo-600 font-semibold">Room #{booking.roomNumber}</div>
                    </td>
                    <td className="p-3 text-gray-500 font-mono text-[11px]">
                      {booking.checkIn} → {booking.checkOut}
                    </td>
                    <td className="p-3 font-bold text-gray-900">₹{booking.price.toLocaleString()}</td>
                    <td className="p-3">
                      <select
                        value={booking.bookingStatus}
                        onChange={(e) =>
                          updateBookingStatus(
                            booking.bookingId,
                            e.target.value as any,
                            booking.paymentStatus
                          )
                        }
                        className="bg-gray-50 border border-gray-200 rounded px-2 py-1 text-xs font-bold text-gray-900 outline-none"
                      >
                        <option value="confirmed">Confirmed</option>
                        <option value="checked_in">Checked In</option>
                        <option value="checked_out">Checked Out</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </td>
                    <td className="p-3 text-right">
                      <button
                        onClick={() => setActiveInvoice(booking)}
                        className="px-2.5 py-1 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 rounded text-xs font-semibold flex items-center space-x-1 ml-auto cursor-pointer"
                      >
                        <FileText className="w-3.5 h-3.5" />
                        <span>Invoice</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 6: CUSTOMER DETAILS MODULE */}
      {adminTab === 'customers' && (
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-xs space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center space-x-2">
                <Users className="w-5 h-5 text-indigo-600" />
                <h2 className="text-base font-bold text-gray-900">Customer Directory & Guest Profiles</h2>
              </div>
              <p className="text-xs text-gray-500 mt-0.5">
                Centralized customer list containing contact details, lifetime spend, booking counts, and loyalty tiers.
              </p>
            </div>

            {/* Customer Search Bar */}
            <div className="relative max-w-xs w-full">
              <Search className="w-4 h-4 absolute left-3 top-2.5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name, email, phone..."
                value={customerSearch}
                onChange={(e) => setCustomerSearch(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 border border-gray-200 rounded-md text-xs font-medium text-gray-900 outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-gray-700">
              <thead className="bg-gray-50 text-gray-400 uppercase text-[10px] font-bold tracking-wider">
                <tr>
                  <th className="p-3">Customer Name</th>
                  <th className="p-3">Contact Email & Phone</th>
                  <th className="p-3">Loyalty Tier</th>
                  <th className="p-3 text-center">Room / Facility Reservations</th>
                  <th className="p-3">Lifetime Spend (₹)</th>
                  <th className="p-3">Current Status</th>
                  <th className="p-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {customerList.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="p-6 text-center text-gray-400 text-xs">
                      No customer records match your search criteria.
                    </td>
                  </tr>
                ) : (
                  customerList.map((customer) => {
                    // Calculate Tier
                    const tier =
                      customer.totalSpend > 20000
                        ? { label: 'Platinum VIP', color: 'bg-purple-100 text-purple-800 border-purple-300' }
                        : customer.totalSpend > 8000
                        ? { label: 'Gold Member', color: 'bg-amber-100 text-amber-800 border-amber-300' }
                        : { label: 'Silver Guest', color: 'bg-gray-100 text-gray-800 border-gray-300' };

                    return (
                      <tr key={customer.email} className="hover:bg-gray-50">
                        <td className="p-3 font-bold text-gray-900">
                          <div className="flex items-center space-x-2.5">
                            <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 font-bold flex items-center justify-center text-xs">
                              {customer.name.charAt(0)}
                            </div>
                            <div>
                              <span className="block font-bold">{customer.name}</span>
                              <span className="text-[10px] text-gray-400 block font-normal">Last visit: {customer.lastBookingDate}</span>
                            </div>
                          </div>
                        </td>

                        <td className="p-3">
                          <div className="flex items-center space-x-1 text-gray-800 font-medium">
                            <Mail className="w-3.5 h-3.5 text-gray-400" />
                            <span>{customer.email}</span>
                          </div>
                          <div className="flex items-center space-x-1 text-gray-500 text-[11px] mt-0.5">
                            <Phone className="w-3.5 h-3.5 text-gray-400" />
                            <span>{customer.phone}</span>
                          </div>
                        </td>

                        <td className="p-3">
                          <span
                            className={`inline-flex items-center space-x-1 px-2 py-0.5 rounded-full text-[10px] font-bold border ${tier.color}`}
                          >
                            <Award className="w-3 h-3" />
                            <span>{tier.label}</span>
                          </span>
                        </td>

                        <td className="p-3 text-center">
                          <span className="font-bold text-gray-900">{customer.roomBookingsCount} Rooms</span>
                          {customer.facilityBookingsCount > 0 && (
                            <span className="text-gray-400 block text-[10px]">
                              + {customer.facilityBookingsCount} facility slots
                            </span>
                          )}
                        </td>

                        <td className="p-3 font-extrabold text-indigo-600">
                          ₹{customer.totalSpend.toLocaleString()}
                        </td>

                        <td className="p-3">
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                              customer.status === 'In-House'
                                ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                                : customer.status === 'Upcoming'
                                ? 'bg-indigo-100 text-indigo-800 border border-indigo-200'
                                : 'bg-gray-100 text-gray-600'
                            }`}
                          >
                            {customer.status}
                          </span>
                        </td>

                        <td className="p-3 text-right">
                          <button
                            onClick={() => setSelectedCustomer(customer)}
                            className="px-2.5 py-1 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded text-xs font-semibold flex items-center space-x-1 ml-auto cursor-pointer"
                          >
                            <Eye className="w-3.5 h-3.5" />
                            <span>View Details</span>
                          </button>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Customer Detail Inspection Modal */}
      {selectedCustomer && (
        <div className="fixed inset-0 z-50 bg-gray-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-xl relative border border-gray-200 space-y-4">
            <button
              onClick={() => setSelectedCustomer(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-700"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center space-x-3 pb-4 border-b border-gray-100">
              <div className="w-12 h-12 rounded-full bg-indigo-600 text-white font-bold flex items-center justify-center text-lg">
                {selectedCustomer.name.charAt(0)}
              </div>
              <div>
                <h3 className="text-base font-bold text-gray-900">{selectedCustomer.name}</h3>
                <p className="text-xs text-gray-500">{selectedCustomer.email} • {selectedCustomer.phone}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-lg bg-gray-50 border border-gray-200">
                <span className="text-[10px] text-gray-400 font-bold uppercase block">Total Spend</span>
                <span className="text-base font-extrabold text-indigo-600">₹{selectedCustomer.totalSpend.toLocaleString()}</span>
              </div>
              <div className="p-3 rounded-lg bg-gray-50 border border-gray-200">
                <span className="text-[10px] text-gray-400 font-bold uppercase block">Total Reservations</span>
                <span className="text-base font-extrabold text-gray-900">{selectedCustomer.roomBookingsCount} Rooms</span>
              </div>
            </div>

            <div>
              <h4 className="text-xs font-bold text-gray-900 mb-2">Room Reservation History</h4>
              {selectedCustomer.bookingsList.length === 0 ? (
                <p className="text-xs text-gray-400 italic">No room reservations logged.</p>
              ) : (
                <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                  {selectedCustomer.bookingsList.map((b: Booking) => (
                    <div key={b.bookingId} className="p-2.5 rounded-md bg-gray-50 border border-gray-200 text-xs flex items-center justify-between">
                      <div>
                        <span className="font-bold text-gray-900 block">{b.roomType} (Room #{b.roomNumber})</span>
                        <span className="text-[10px] text-gray-500">{b.checkIn} to {b.checkOut}</span>
                      </div>
                      <div className="text-right">
                        <span className="font-bold text-indigo-600 block">₹{b.price.toLocaleString()}</span>
                        <span className="text-[10px] uppercase font-bold text-emerald-600">{b.paymentStatus}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <button
              onClick={() => setSelectedCustomer(null)}
              className="w-full py-2 bg-gray-900 text-white font-semibold text-xs rounded-md"
            >
              Close Customer Details
            </button>
          </div>
        </div>
      )}

      {/* Tab 7: PAYMENT DETAILS MODULE */}
      {adminTab === 'payments' && (
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-xs space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center space-x-2">
                <Receipt className="w-5 h-5 text-emerald-600" />
                <h2 className="text-base font-bold text-gray-900">Hotel Payment Ledger & Financial Details</h2>
              </div>
              <p className="text-xs text-gray-500 mt-0.5">
                Audit complete transactional details, tax breakdowns, payment modes, and invoice status.
              </p>
            </div>
          </div>

          {/* Payment Method Breakdown Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-gray-50 p-4 rounded-xl border border-gray-200 text-xs">
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-lg bg-emerald-100 text-emerald-700 font-bold">
                <CreditCard className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] text-gray-400 font-bold uppercase block">UPI & Card Settled</span>
                <span className="text-sm font-extrabold text-emerald-700">₹{(upiPaymentsTotal + cardPaymentsTotal).toLocaleString()}</span>
              </div>
            </div>

            <div className="flex items-center space-x-3 border-t sm:border-t-0 sm:border-l border-gray-200 pt-3 sm:pt-0 sm:pl-3">
              <div className="p-2 rounded-lg bg-amber-100 text-amber-700 font-bold">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] text-gray-400 font-bold uppercase block">Pay At Hotel / Pending</span>
                <span className="text-sm font-extrabold text-amber-700">₹{pendingCollectibles.toLocaleString()}</span>
              </div>
            </div>

            <div className="flex items-center space-x-3 border-t sm:border-t-0 sm:border-l border-gray-200 pt-3 sm:pt-0 sm:pl-3">
              <div className="p-2 rounded-lg bg-indigo-100 text-indigo-700 font-bold">
                <DollarSign className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] text-gray-400 font-bold uppercase block">GST Tax Collected (18%)</span>
                <span className="text-sm font-extrabold text-indigo-700">
                  ₹{Math.round(totalPaidRevenue * 0.18).toLocaleString()}
                </span>
              </div>
            </div>
          </div>

          {/* Search & Filter Controls */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
            <div className="relative w-full sm:max-w-xs">
              <Search className="w-4 h-4 absolute left-3 top-2.5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by invoice ID, guest name..."
                value={paymentSearch}
                onChange={(e) => setPaymentSearch(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 border border-gray-200 rounded-md text-xs font-medium text-gray-900 outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div className="flex items-center space-x-2 w-full sm:w-auto">
              <select
                value={paymentFilterStatus}
                onChange={(e) => setPaymentFilterStatus(e.target.value)}
                className="bg-gray-50 border border-gray-200 rounded px-2 py-1.5 text-xs font-medium text-gray-900 outline-none"
              >
                <option value="all">All Payment Statuses</option>
                <option value="paid">Paid</option>
                <option value="pending">Pending</option>
                <option value="pay_at_hotel">Pay At Hotel</option>
                <option value="refunded">Refunded</option>
              </select>

              <select
                value={paymentFilterMethod}
                onChange={(e) => setPaymentFilterMethod(e.target.value)}
                className="bg-gray-50 border border-gray-200 rounded px-2 py-1.5 text-xs font-medium text-gray-900 outline-none"
              >
                <option value="all">All Payment Methods</option>
                <option value="upi">UPI / GPay</option>
                <option value="card">Credit / Debit Card</option>
                <option value="netbanking">Net Banking</option>
              </select>
            </div>
          </div>

          {/* Payment Ledger Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-gray-700">
              <thead className="bg-gray-50 text-gray-400 uppercase text-[10px] font-bold tracking-wider">
                <tr>
                  <th className="p-3">Invoice & Booking Ref</th>
                  <th className="p-3">Payer / Guest</th>
                  <th className="p-3">Room / Service</th>
                  <th className="p-3">Payment Method</th>
                  <th className="p-3">Taxable & Total Paid</th>
                  <th className="p-3">Payment Status</th>
                  <th className="p-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredPayments.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="p-6 text-center text-gray-400 text-xs">
                      No payment transactions match your filters.
                    </td>
                  </tr>
                ) : (
                  filteredPayments.map((b) => {
                    const gstTax = Math.round(b.price * 0.18);
                    const baseAmount = b.price - gstTax;

                    return (
                      <tr key={b.bookingId} className="hover:bg-gray-50">
                        <td className="p-3">
                          <span className="font-mono font-bold text-gray-900 block">INV-{b.bookingId.replace('BK-', '')}</span>
                          <span className="font-mono text-[10px] text-gray-400 block">{b.bookingId}</span>
                        </td>

                        <td className="p-3 font-semibold text-gray-900">
                          <div>{b.guestName}</div>
                          <div className="text-[10px] text-gray-400 font-normal">{b.guestEmail}</div>
                        </td>

                        <td className="p-3 text-gray-700">
                          <div>{b.roomType}</div>
                          <div className="text-[10px] text-indigo-600 font-semibold">Room #{b.roomNumber}</div>
                        </td>

                        <td className="p-3 font-medium text-gray-800">
                          <span className="px-2 py-0.5 rounded bg-gray-100 border border-gray-200 text-[10px] font-bold">
                            {b.paymentMethod || 'UPI / Card'}
                          </span>
                        </td>

                        <td className="p-3">
                          <span className="font-bold text-emerald-600 block">₹{b.price.toLocaleString()}</span>
                          <span className="text-[10px] text-gray-400 block">Incl. GST 18% (₹{gstTax})</span>
                        </td>

                        <td className="p-3">
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                              b.paymentStatus === 'paid'
                                ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                                : b.paymentStatus === 'refunded'
                                ? 'bg-purple-100 text-purple-800 border border-purple-200'
                                : 'bg-amber-100 text-amber-800 border border-amber-200'
                            }`}
                          >
                            {b.paymentStatus}
                          </span>
                        </td>

                        <td className="p-3 text-right">
                          <button
                            onClick={() => setActiveInvoice(b)}
                            className="px-2.5 py-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 rounded text-xs font-semibold flex items-center space-x-1 ml-auto cursor-pointer"
                          >
                            <Receipt className="w-3.5 h-3.5" />
                            <span>Invoice PDF</span>
                          </button>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Add Room Modal */}
      {showAddRoomModal && (
        <div className="fixed inset-0 z-50 bg-gray-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl relative border border-gray-200">
            <button
              onClick={() => setShowAddRoomModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-700"
            >
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-base font-bold text-gray-900 mb-4">{t('addRoom')}</h3>

            <form onSubmit={handleAddRoomSubmit} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-gray-700 block mb-1">Room Number</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 601"
                  value={newRoomNumber}
                  onChange={(e) => setNewRoomNumber(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-md outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="font-bold text-gray-700 block mb-1">Room Type</label>
                <input
                  type="text"
                  required
                  value={newRoomType}
                  onChange={(e) => setNewRoomType(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-md outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="font-bold text-gray-700 block mb-1">Base Price (₹)</label>
                <input
                  type="number"
                  required
                  value={newBasePrice}
                  onChange={(e) => setNewBasePrice(Number(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-200 rounded-md outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-md text-xs shadow-xs mt-4"
              >
                Create Room
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
