import React, { useState } from 'react';
import { useHotel } from '../context/HotelContext';
import { Bot, Send, X, Sparkles, User, Loader2 } from 'lucide-react';

interface AIConciergeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Message {
  sender: 'ai' | 'user';
  text: string;
}

export const AIConciergeModal: React.FC<AIConciergeModalProps> = ({ isOpen, onClose }) => {
  const { language, t, rooms, occupancyPercentage, activePricingLevel } = useHotel();
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: 'ai',
      text: 'Namaste & Welcome to RAJ PALACE Hotel & Resort! I am your AI Hotel Concierge. How can I assist you with rooms, dynamic pricing, or facility bookings today?',
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMsg = input.trim();
    setInput('');
    setMessages((prev) => [...prev, { sender: 'user', text: userMsg }]);
    setLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userMsg,
          language,
          context: {
            totalRooms: rooms.length,
            occupancyPercentage,
            activePricingLevel,
          },
        }),
      });

      if (res.ok) {
        const data = await res.json();
        setMessages((prev) => [...prev, { sender: 'ai', text: data.reply }]);
      } else {
        // Fallback smart responses if server offline or no API key configured
        let reply = `Thank you for asking! Currently our hotel occupancy is at ${occupancyPercentage}%. Our rooms start from ₹2,200 with dynamic rate discounts. You can reserve our rooftop infinity pool or spa directly from the Facilities menu!`;
        if (userMsg.toLowerCase().includes('pool')) {
          reply = 'The Infinity Swimming Pool is open from 08:00 AM to 08:00 PM. It is complimentary for hotel guests. You can lock your preferred slot in the Facility Booking section!';
        } else if (userMsg.toLowerCase().includes('price') || userMsg.toLowerCase().includes('rate')) {
          reply = `Our room prices adjust automatically based on demand and occupancy. Current rate level is ${activePricingLevel.replace(
            '_',
            ' '
          )}. Standard room rates range from ₹2,200 to ₹3,200.`;
        }
        setMessages((prev) => [...prev, { sender: 'ai', text: reply }]);
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          sender: 'ai',
          text: `Welcome! Our hotel features Deluxe King Suites, Ocean View Villas, an Infinity Pool, Ayurvedic Spa, and a Grand Banquet Hall. Please feel free to browse and reserve from the main menu!`,
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-gray-900/50 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-lg w-full h-[520px] flex flex-col shadow-xl border border-gray-200 overflow-hidden animate-in zoom-in-95">
        {/* Header */}
        <div className="bg-indigo-600 p-4 text-white flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-lg bg-white/20 text-white flex items-center justify-center">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold leading-tight">{t('aiAssistant')}</h3>
              <p className="text-[10px] text-indigo-100">Multilingual Hotel Concierge</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 text-indigo-100 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Chat Stream */}
        <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-gray-50">
          {messages.map((m, idx) => (
            <div
              key={idx}
              className={`flex items-start space-x-2 ${
                m.sender === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              {m.sender === 'ai' && (
                <div className="w-6 h-6 rounded-md bg-indigo-600 text-white flex items-center justify-center shrink-0 mt-1">
                  <Bot className="w-3.5 h-3.5" />
                </div>
              )}
              <div
                className={`max-w-[80%] p-3 rounded-xl text-xs leading-relaxed ${
                  m.sender === 'user'
                    ? 'bg-indigo-600 text-white font-medium rounded-tr-none'
                    : 'bg-white text-gray-800 border border-gray-200 shadow-2xs rounded-tl-none'
                }`}
              >
                {m.text}
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex items-center space-x-2 text-xs text-gray-400">
              <Loader2 className="w-4 h-4 animate-spin text-indigo-600" />
              <span>Concierge thinking...</span>
            </div>
          )}
        </div>

        {/* Input Bar */}
        <form onSubmit={handleSend} className="p-3 bg-white border-t border-gray-200 flex items-center space-x-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={t('askAiPlaceholder')}
            className="flex-1 px-3 py-2 bg-gray-50 border border-gray-200 rounded-md text-xs outline-none focus:ring-2 focus:ring-indigo-500 text-gray-900"
          />
          <button
            type="submit"
            className="p-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 font-bold transition-all"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
