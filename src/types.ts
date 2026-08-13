export type Language = 'en' | 'kn' | 'hi' | 'ta' | 'te' | 'ml';

export type UserRole = 'guest' | 'admin';

export interface User {
  userId: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  preferredLanguage: Language;
}

export type RoomStatus = 'available' | 'occupied' | 'reserved' | 'unavailable' | 'maintenance';

export interface Room {
  roomId: string;
  roomNumber: string;
  roomType: string; // e.g. 'Deluxe Room', 'Executive Suite', 'Ocean View Suite', 'Presidential Villa'
  description: string;
  basePrice: number;
  currentPrice: number;
  status: RoomStatus;
  facilities: string[];
  image: string;
  images?: string[];
  capacity: number; // max guest count
}

export type PaymentStatus = 'pending' | 'paid' | 'refunded' | 'pay_at_hotel';
export type BookingStatus = 'confirmed' | 'checked_in' | 'checked_out' | 'cancelled';

export interface Booking {
  bookingId: string;
  userId: string;
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  roomId: string;
  roomNumber: string;
  roomType: string;
  checkIn: string; // YYYY-MM-DD
  checkOut: string; // YYYY-MM-DD
  guests: number;
  price: number;
  paymentStatus: PaymentStatus;
  paymentMethod?: string;
  bookingStatus: BookingStatus;
  createdAt: string;
}

export type FacilityStatus = 'available' | 'maintenance' | 'unavailable';

export interface Facility {
  facilityId: string;
  facilityName: string;
  description: string;
  capacity: number;
  price: number; // 0 if free, or hourly cost in INR
  status: FacilityStatus;
  image: string;
  icon: string;
}

export interface TimeSlot {
  slotId: string;
  facilityId: string;
  time: string; // e.g., "08:00 AM - 09:00 AM"
  status: 'available' | 'booked' | 'maintenance' | 'reserved';
  bookedBy?: string;
  bookingId?: string;
}

export interface FacilityBooking {
  facilityBookingId: string;
  userId: string;
  guestName: string;
  facilityId: string;
  facilityName: string;
  bookingDate: string; // YYYY-MM-DD
  timeSlot: string; // e.g. "08:00 AM - 09:00 AM"
  status: 'confirmed' | 'cancelled' | 'completed';
  price: number;
  createdAt: string;
}

export interface PricingRule {
  pricingId: string;
  condition: 'low_occupancy' | 'normal_demand' | 'weekend' | 'high_occupancy';
  name: string;
  minimumOccupancy: number; // e.g., 0
  maximumOccupancy: number; // e.g., 30
  priceMultiplier: number; // e.g. 0.88 for 2200 base 2500, or exact base price target
  examplePrice: number;
  active: boolean;
  isWeekendOnly?: boolean;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'alert';
  timestamp: string;
  read: boolean;
}

export interface ReportStats {
  totalBookings: number;
  totalRevenue: number;
  roomOccupancyRate: number;
  facilityUsageRate: number;
}
