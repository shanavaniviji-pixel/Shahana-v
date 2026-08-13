import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  User,
  Room,
  Facility,
  PricingRule,
  Booking,
  FacilityBooking,
  NotificationItem,
  Language,
  UserRole,
  TimeSlot,
  RoomStatus,
} from '../types';
import {
  initialUser,
  initialRooms,
  initialFacilities,
  initialPricingRules,
  initialBookings,
  initialFacilityBookings,
  initialNotifications,
} from '../data/mockData';
import { translations } from '../data/translations';

interface HotelContextType {
  currentUser: User;
  isLoggedIn: boolean;
  authPortal: 'guest' | 'admin';
  setAuthPortal: (portal: 'guest' | 'admin') => void;
  loginAsGuest: (name: string, email: string, phone?: string) => void;
  loginAsAdmin: (email: string, password?: string) => void;
  logout: () => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  switchRole: (role: UserRole) => void;
  t: (key: string) => string;
  
  // Rooms & Pricing
  rooms: Room[];
  pricingRules: PricingRule[];
  occupancyPercentage: number;
  activePricingLevel: string;
  recalculateDynamicPrices: () => void;
  addRoom: (room: Omit<Room, 'roomId' | 'currentPrice'>) => void;
  updateRoom: (room: Room) => void;
  deleteRoom: (roomId: string) => void;
  updateRoomStatus: (roomId: string, status: RoomStatus) => void;
  
  // Facilities
  facilities: Facility[];
  addFacility: (facility: Omit<Facility, 'facilityId'>) => void;
  updateFacility: (facility: Facility) => void;
  getTimeSlotsForFacility: (facilityId: string, date: string) => TimeSlot[];
  
  // Bookings
  bookings: Booking[];
  addBooking: (booking: Omit<Booking, 'bookingId' | 'createdAt'>) => Booking;
  cancelBooking: (bookingId: string) => void;
  updateBookingStatus: (bookingId: string, bookingStatus: Booking['bookingStatus'], paymentStatus?: Booking['paymentStatus']) => void;
  
  // Facility Bookings
  facilityBookings: FacilityBooking[];
  addFacilityBooking: (facilityBooking: Omit<FacilityBooking, 'facilityBookingId' | 'createdAt'>) => void;
  cancelFacilityBooking: (facilityBookingId: string) => void;
  
  // Rules
  updatePricingRule: (updatedRule: PricingRule) => void;
  
  // Notifications
  notifications: NotificationItem[];
  markNotificationRead: (id: string) => void;
  clearNotifications: () => void;
  
  // Active Invoice View
  activeInvoice: Booking | null;
  setActiveInvoice: (booking: Booking | null) => void;
}

const HotelContext = createContext<HotelContextType | undefined>(undefined);

export const HotelProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User>(() => {
    const saved = localStorage.getItem('hms_user');
    return saved ? JSON.parse(saved) : initialUser;
  });

  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => {
    const saved = localStorage.getItem('hms_is_logged_in');
    return saved !== null ? JSON.parse(saved) : false;
  });

  const [authPortal, setAuthPortal] = useState<'guest' | 'admin'>('guest');

  useEffect(() => {
    localStorage.setItem('hms_is_logged_in', JSON.stringify(isLoggedIn));
  }, [isLoggedIn]);

  const loginAsGuest = (name: string, email: string, phone: string = '') => {
    const guestUser: User = {
      userId: `guest_${Date.now()}`,
      name: name || 'Guest User',
      email: email || 'guest@example.com',
      phone: phone || '+91 98765 43210',
      role: 'guest',
      preferredLanguage: language || 'en',
    };
    setCurrentUser(guestUser);
    setIsLoggedIn(true);
    pushNotification('Welcome Guest!', `Logged in as ${guestUser.name}.`, 'success');
  };

  const loginAsAdmin = (email: string, password?: string) => {
    const adminUser: User = {
      userId: 'usr_admin_001',
      name: 'System Admin',
      email: email || 'admin@grandhorizon.com',
      phone: '+91 99999 00000',
      role: 'admin',
      preferredLanguage: language || 'en',
    };
    setCurrentUser(adminUser);
    setIsLoggedIn(true);
    pushNotification('Admin Session Active', `Authorized as ${adminUser.email}.`, 'info');
  };

  const logout = () => {
    setIsLoggedIn(false);
    pushNotification('Logged Out', 'You have been signed out.', 'info');
  };

  const [language, setLanguageState] = useState<Language>(() => {
    const savedLang = localStorage.getItem('hms_language') as Language;
    return savedLang || currentUser.preferredLanguage || 'en';
  });

  const [rooms, setRooms] = useState<Room[]>(() => {
    const saved = localStorage.getItem('hms_rooms');
    return saved ? JSON.parse(saved) : initialRooms;
  });

  const [facilities, setFacilities] = useState<Facility[]>(() => {
    const saved = localStorage.getItem('hms_facilities');
    return saved ? JSON.parse(saved) : initialFacilities;
  });

  const [pricingRules, setPricingRules] = useState<PricingRule[]>(() => {
    const saved = localStorage.getItem('hms_pricing_rules');
    return saved ? JSON.parse(saved) : initialPricingRules;
  });

  const [bookings, setBookings] = useState<Booking[]>(() => {
    const saved = localStorage.getItem('hms_bookings');
    return saved ? JSON.parse(saved) : initialBookings;
  });

  const [facilityBookings, setFacilityBookings] = useState<FacilityBooking[]>(() => {
    const saved = localStorage.getItem('hms_facility_bookings');
    return saved ? JSON.parse(saved) : initialFacilityBookings;
  });

  const [notifications, setNotifications] = useState<NotificationItem[]>(() => {
    const saved = localStorage.getItem('hms_notifications');
    return saved ? JSON.parse(saved) : initialNotifications;
  });

  const [activeInvoice, setActiveInvoice] = useState<Booking | null>(null);

  // Save changes to localStorage
  useEffect(() => {
    localStorage.setItem('hms_user', JSON.stringify(currentUser));
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('hms_language', language);
  }, [language]);

  useEffect(() => {
    localStorage.setItem('hms_rooms', JSON.stringify(rooms));
  }, [rooms]);

  useEffect(() => {
    localStorage.setItem('hms_facilities', JSON.stringify(facilities));
  }, [facilities]);

  useEffect(() => {
    localStorage.setItem('hms_pricing_rules', JSON.stringify(pricingRules));
  }, [pricingRules]);

  useEffect(() => {
    localStorage.setItem('hms_bookings', JSON.stringify(bookings));
  }, [bookings]);

  useEffect(() => {
    localStorage.setItem('hms_facility_bookings', JSON.stringify(facilityBookings));
  }, [facilityBookings]);

  useEffect(() => {
    localStorage.setItem('hms_notifications', JSON.stringify(notifications));
  }, [notifications]);

  // Translate helper
  const t = (key: string): string => {
    const langDict = translations[language] || translations.en;
    return langDict[key] || translations.en[key] || key;
  };

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    setCurrentUser((prev) => ({ ...prev, preferredLanguage: lang }));
  };

  const switchRole = (role: UserRole) => {
    setCurrentUser((prev) => ({ ...prev, role }));
  };

  // Occupancy calculation formula from PDF:
  // Occupancy Percentage = (Occupied Rooms / Total Rooms) * 100
  const occupiedCount = rooms.filter((r) => r.status === 'occupied' || r.status === 'reserved').length;
  const occupancyPercentage = rooms.length > 0 ? Math.round((occupiedCount / rooms.length) * 100) : 0;

  // Determine active pricing level
  const today = new Date();
  const isWeekend = today.getDay() === 0 || today.getDay() === 5 || today.getDay() === 6;

  let activePricingLevel = 'normal_demand';
  let activeMultiplier = 1.0;

  const weekendRule = pricingRules.find((r) => r.condition === 'weekend' && r.active);
  const lowRule = pricingRules.find((r) => r.condition === 'low_occupancy' && r.active);
  const highRule = pricingRules.find((r) => r.condition === 'high_occupancy' && r.active);
  const normalRule = pricingRules.find((r) => r.condition === 'normal_demand' && r.active);

  if (occupancyPercentage > (highRule?.minimumOccupancy || 80) && highRule) {
    activePricingLevel = 'high_occupancy';
    activeMultiplier = highRule.priceMultiplier;
  } else if (isWeekend && weekendRule) {
    activePricingLevel = 'weekend';
    activeMultiplier = weekendRule.priceMultiplier;
  } else if (occupancyPercentage < (lowRule?.maximumOccupancy || 30) && lowRule) {
    activePricingLevel = 'low_occupancy';
    activeMultiplier = lowRule.priceMultiplier;
  } else if (normalRule) {
    activePricingLevel = 'normal_demand';
    activeMultiplier = normalRule.priceMultiplier;
  }

  // Recalculate dynamic prices for all rooms whenever occupancy or rules change
  const recalculateDynamicPrices = () => {
    setRooms((prevRooms) =>
      prevRooms.map((room) => {
        const calculatedPrice = Math.round((room.basePrice * activeMultiplier) / 50) * 50; // rounded nicely
        return {
          ...room,
          currentPrice: calculatedPrice,
        };
      })
    );
  };

  useEffect(() => {
    recalculateDynamicPrices();
  }, [occupancyPercentage, isWeekend, pricingRules]);

  // Admin Room Management
  const addRoom = (roomData: Omit<Room, 'roomId' | 'currentPrice'>) => {
    const newRoomId = `rm_${Date.now()}`;
    const calculatedPrice = Math.round((roomData.basePrice * activeMultiplier) / 50) * 50;
    const newRoom: Room = {
      ...roomData,
      roomId: newRoomId,
      currentPrice: calculatedPrice,
    };
    setRooms((prev) => [...prev, newRoom]);
    pushNotification('Room Added', `Room ${roomData.roomNumber} (${roomData.roomType}) was added to inventory.`, 'info');
  };

  const updateRoom = (updatedRoom: Room) => {
    setRooms((prev) => prev.map((r) => (r.roomId === updatedRoom.roomId ? updatedRoom : r)));
    pushNotification('Room Updated', `Room ${updatedRoom.roomNumber} details updated.`, 'info');
  };

  const deleteRoom = (roomId: string) => {
    const target = rooms.find((r) => r.roomId === roomId);
    setRooms((prev) => prev.filter((r) => r.roomId !== roomId));
    if (target) {
      pushNotification('Room Removed', `Room ${target.roomNumber} deleted from inventory.`, 'warning');
    }
  };

  const updateRoomStatus = (roomId: string, status: RoomStatus) => {
    setRooms((prev) => prev.map((r) => (r.roomId === roomId ? { ...r, status } : r)));
  };

  // Facility Management
  const addFacility = (facilityData: Omit<Facility, 'facilityId'>) => {
    const newFacility: Facility = {
      ...facilityData,
      facilityId: `fac_${Date.now()}`,
    };
    setFacilities((prev) => [...prev, newFacility]);
    pushNotification('Facility Created', `${facilityData.facilityName} added to hotel services.`, 'info');
  };

  const updateFacility = (updatedFacility: Facility) => {
    setFacilities((prev) => prev.map((f) => (f.facilityId === updatedFacility.facilityId ? updatedFacility : f)));
  };

  // Real-time time slot grid helper for PDF Section 6 requirement
  const getTimeSlotsForFacility = (facilityId: string, date: string): TimeSlot[] => {
    const defaultHours = [
      '08:00 AM - 09:00 AM',
      '09:00 AM - 10:00 AM',
      '10:00 AM - 11:00 AM',
      '11:00 AM - 12:00 PM',
      '12:00 PM - 01:00 PM',
      '02:00 PM - 03:00 PM',
      '03:00 PM - 04:00 PM',
      '04:00 PM - 05:00 PM',
      '05:00 PM - 06:00 PM',
      '06:00 PM - 07:00 PM',
      '07:00 PM - 08:00 PM',
    ];

    const reservedSlots = facilityBookings.filter(
      (fb) => fb.facilityId === facilityId && fb.bookingDate === date && fb.status === 'confirmed'
    );

    return defaultHours.map((time, index) => {
      const slotId = `${facilityId}_${date}_${index}`;
      const existing = reservedSlots.find((r) => r.timeSlot === time);

      if (existing) {
        return {
          slotId,
          facilityId,
          time,
          status: 'booked',
          bookedBy: existing.guestName,
          bookingId: existing.facilityBookingId,
        };
      }

      // Sample fixed maintenance slot for demonstration as shown in PDF page 4 table!
      if (time === '11:00 AM - 12:00 PM') {
        return {
          slotId,
          facilityId,
          time,
          status: 'maintenance',
        };
      }

      return {
        slotId,
        facilityId,
        time,
        status: 'available',
      };
    });
  };

  // Bookings
  const addBooking = (bookingData: Omit<Booking, 'bookingId' | 'createdAt'>): Booking => {
    const newBookingId = `BK-${Math.floor(1000 + Math.random() * 9000)}`;
    const newBooking: Booking = {
      ...bookingData,
      bookingId: newBookingId,
      createdAt: new Date().toISOString().split('T')[0],
    };

    setBookings((prev) => [newBooking, ...prev]);

    // Mark room as occupied or reserved
    updateRoomStatus(bookingData.roomId, 'reserved');

    pushNotification(
      'Booking Confirmed!',
      `Room ${bookingData.roomNumber} (${bookingData.roomType}) reserved for ${bookingData.checkIn} to ${bookingData.checkOut}. ID: ${newBookingId}`,
      'success'
    );

    return newBooking;
  };

  const cancelBooking = (bookingId: string) => {
    const booking = bookings.find((b) => b.bookingId === bookingId);
    if (!booking) return;

    setBookings((prev) =>
      prev.map((b) => (b.bookingId === bookingId ? { ...b, bookingStatus: 'cancelled' } : b))
    );

    // Free up room
    updateRoomStatus(booking.roomId, 'available');

    pushNotification('Booking Cancelled', `Booking ${bookingId} has been cancelled successfully.`, 'warning');
  };

  const updateBookingStatus = (
    bookingId: string,
    bookingStatus: Booking['bookingStatus'],
    paymentStatus?: Booking['paymentStatus']
  ) => {
    setBookings((prev) =>
      prev.map((b) => {
        if (b.bookingId === bookingId) {
          const updated = { ...b, bookingStatus };
          if (paymentStatus) updated.paymentStatus = paymentStatus;

          if (bookingStatus === 'checked_in') {
            updateRoomStatus(b.roomId, 'occupied');
          } else if (bookingStatus === 'checked_out' || bookingStatus === 'cancelled') {
            updateRoomStatus(b.roomId, 'available');
          }

          return updated;
        }
        return b;
      })
    );
  };

  // Facility Bookings
  const addFacilityBooking = (
    facilityBookingData: Omit<FacilityBooking, 'facilityBookingId' | 'createdAt'>
  ) => {
    const newId = `FB-${Math.floor(100 + Math.random() * 900)}`;
    const newFb: FacilityBooking = {
      ...facilityBookingData,
      facilityBookingId: newId,
      createdAt: new Date().toISOString().split('T')[0],
    };

    setFacilityBookings((prev) => [newFb, ...prev]);

    pushNotification(
      'Facility Reserved!',
      `${facilityBookingData.facilityName} booked for ${facilityBookingData.bookingDate} at ${facilityBookingData.timeSlot}.`,
      'success'
    );
  };

  const cancelFacilityBooking = (facilityBookingId: string) => {
    setFacilityBookings((prev) =>
      prev.map((fb) => (fb.facilityBookingId === facilityBookingId ? { ...fb, status: 'cancelled' } : fb))
    );
    pushNotification('Reservation Cancelled', `Facility reservation ${facilityBookingId} cancelled.`, 'warning');
  };

  // Pricing Rule Updates
  const updatePricingRule = (updatedRule: PricingRule) => {
    setPricingRules((prev) => prev.map((r) => (r.pricingId === updatedRule.pricingId ? updatedRule : r)));
    pushNotification('Pricing Rule Updated', `Updated rate condition: ${updatedRule.name}.`, 'info');
  };

  const pushNotification = (title: string, message: string, type: NotificationItem['type']) => {
    const notif: NotificationItem = {
      id: `notif_${Date.now()}`,
      title,
      message,
      type,
      timestamp: 'Just now',
      read: false,
    };
    setNotifications((prev) => [notif, ...prev]);
  };

  const markNotificationRead = (id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
  };

  const clearNotifications = () => {
    setNotifications([]);
  };

  return (
    <HotelContext.Provider
      value={{
        currentUser,
        isLoggedIn,
        authPortal,
        setAuthPortal,
        loginAsGuest,
        loginAsAdmin,
        logout,
        language,
        setLanguage,
        switchRole,
        t,
        rooms,
        pricingRules,
        occupancyPercentage,
        activePricingLevel,
        recalculateDynamicPrices,
        addRoom,
        updateRoom,
        deleteRoom,
        updateRoomStatus,
        facilities,
        addFacility,
        updateFacility,
        getTimeSlotsForFacility,
        bookings,
        addBooking,
        cancelBooking,
        updateBookingStatus,
        facilityBookings,
        addFacilityBooking,
        cancelFacilityBooking,
        updatePricingRule,
        notifications,
        markNotificationRead,
        clearNotifications,
        activeInvoice,
        setActiveInvoice,
      }}
    >
      {children}
    </HotelContext.Provider>
  );
};

export const useHotel = () => {
  const context = useContext(HotelContext);
  if (!context) {
    throw new Error('useHotel must be used within a HotelProvider');
  }
  return context;
};
