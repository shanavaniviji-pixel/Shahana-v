import React, { useState } from 'react';
import { HotelProvider, useHotel } from './context/HotelContext';
import { Header } from './components/Header';
import { UserDashboard } from './components/UserDashboard';
import { RoomBookingPage } from './components/RoomBookingPage';
import { FacilityBookingPage } from './components/FacilityBookingPage';
import { RealTimeAvailability } from './components/RealTimeAvailability';
import { MyBookings } from './components/MyBookings';
import { ProfilePage } from './components/ProfilePage';
import { AdminDashboard } from './components/AdminDashboard';
import { AuthPage } from './components/AuthPage';
import { AIConciergeModal } from './components/AIConciergeModal';
import { InvoiceModal } from './components/InvoiceModal';

function MainApp() {
  const { currentUser, isLoggedIn, activeInvoice, setActiveInvoice } = useHotel();
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [showAiModal, setShowAiModal] = useState(false);

  // If not logged in, present front page asking for User or Admin login
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gray-50 text-gray-900 font-sans antialiased">
        <Header
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          openAiChat={() => setShowAiModal(true)}
        />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <AuthPage />
        </main>
        <AIConciergeModal isOpen={showAiModal} onClose={() => setShowAiModal(false)} />
      </div>
    );
  }

  // Determine active view based on user role and active tab
  const renderMainContent = () => {
    // Admin Role Views
    if (currentUser.role === 'admin') {
      if (activeTab === 'realTimeAvailability') {
        return <RealTimeAvailability />;
      }
      if (activeTab === 'profile') {
        return <ProfilePage />;
      }
      return <AdminDashboard />;
    }

    // Guest Role Views (Admin Dashboard is strictly inaccessible)
    if (activeTab === 'roomBooking') {
      return <RoomBookingPage />;
    }
    if (activeTab === 'facilityBooking') {
      return <FacilityBookingPage />;
    }
    if (activeTab === 'realTimeAvailability') {
      return <RealTimeAvailability />;
    }
    if (activeTab === 'myBookings') {
      return <MyBookings />;
    }
    if (activeTab === 'profile') {
      return <ProfilePage />;
    }

    return <UserDashboard setActiveTab={setActiveTab} />;
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans antialiased">
      {/* Top Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        openAiChat={() => setShowAiModal(true)}
      />

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        {renderMainContent()}
      </main>

      {/* Global Modals */}
      {currentUser.role !== 'admin' && (
        <AIConciergeModal isOpen={showAiModal} onClose={() => setShowAiModal(false)} />
      )}
      <InvoiceModal booking={activeInvoice} onClose={() => setActiveInvoice(null)} />
    </div>
  );
}

export default function App() {
  return (
    <HotelProvider>
      <MainApp />
    </HotelProvider>
  );
}
