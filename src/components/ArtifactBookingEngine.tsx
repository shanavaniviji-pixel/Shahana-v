import React, { useState } from 'react';
import { useHotel } from '../context/HotelContext';
import { Room } from '../types';
import { motion, AnimatePresence } from 'motion/react';
import {
  ShieldAlert,
  Sparkles,
  Crown,
  Eye,
  Maximize2,
  Minimize2,
  Calendar,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  RotateCw,
  Info,
  Award,
  Clock,
  Compass,
  MapPin,
  Lock,
  ChevronRight,
  Sliders,
  DollarSign,
  Gem,
  Swords,
  UtensilsCrossed,
  Sparkle,
  X,
} from 'lucide-react';

export interface RoyalArtifact {
  id: string;
  name: string;
  category: string;
  era: string;
  origin: string;
  material: string;
  historicalNote: string;
  guardedInSuiteNumber: string;
  guardedInSuiteName: string;
  guardedInSuitePrice: number;
  guardedInSuiteImage: string;
  artifactImage: string;
  iconType: 'sword' | 'jewelry' | 'crockery' | 'shield' | 'relic';
  details: {
    weight: string;
    purity: string;
    vaultSpecs: string;
    curatorRating: string;
  };
}

export const royalArtifactsData: RoyalArtifact[] = [
  {
    id: 'art_talwar',
    name: '17th Century Rajputana Gold-Hilted Talwar',
    category: 'Royal Armory & Ceremonial Weaponry',
    era: 'Circa 1685 AD (Maharajah Sawai Era)',
    origin: 'Jaipur Royal Armoury Vaults',
    material: 'Damascus Steel, 24K Gold Koftgari & 42 Uncut Rubies',
    historicalNote: 'Hand-forged ceremonial sword carried by Maharajah Sawai Jai Singh II during coronation processions. Features sacred solar dynasty crests embossed in pure gold leaf.',
    guardedInSuiteNumber: '601',
    guardedInSuiteName: 'Maharajah Royal Heritage Suite',
    guardedInSuitePrice: 8900,
    guardedInSuiteImage: 'https://images.unsplash.com/photo-1591088398332-8a7791972843?auto=format&fit=crop&w=1200&q=80',
    artifactImage: 'https://images.unsplash.com/photo-1589656966895-2f33e7653819?auto=format&fit=crop&w=800&q=80',
    iconType: 'sword',
    details: {
      weight: '2.8 kg Gold Damascened',
      purity: '24K Gold Inlay (99.9%)',
      vaultSpecs: 'Bulletproof Smart-Glass Vault with Laser Alarm',
      curatorRating: 'National Treasure Class A+',
    },
  },
  {
    id: 'art_emerald',
    name: "Maharani Gayatri's Emerald & Diamond Choker",
    category: 'Royal Crown Jewels & Heirloom Ornaments',
    era: 'Circa 1840 AD (Marwar Royal Court)',
    origin: 'Royal Treasure Vault of Raj Palace',
    material: '180 Carats Zambian Emeralds, Uncut Kundan Diamonds & Platinum',
    historicalNote: 'Commissioned by the royal court for grand evening galas. The center emerald weighs over 45 carats with zero thermal treatment, surrounded by traditional Rajasthani Kundan craftsmanship.',
    guardedInSuiteNumber: '502',
    guardedInSuiteName: 'Royal Rani Pavilion Suite',
    guardedInSuitePrice: 7800,
    guardedInSuiteImage: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80',
    artifactImage: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=80',
    iconType: 'jewelry',
    details: {
      weight: '340 grams Total Weight',
      purity: '180 Carats Certified Emeralds',
      vaultSpecs: 'Climate & Humidity Controlled Glass Pedestal',
      curatorRating: 'Royal Heritage Masterpiece',
    },
  },
  {
    id: 'art_crockery',
    name: '18th Century Gold Gilded Jaipur Enamel Dinner Set',
    category: 'Imperial Crockery & Royal Banquet Relics',
    era: 'Circa 1750 AD',
    origin: 'Royal Palace Banquet House',
    material: 'Bone China, 24K Gold Edging & Hand-Painted Meenakari Enamel',
    historicalNote: 'Custom-crafted for imperial state dinners hosted at Raj Palace. Each plate showcases intricate peacock and lotus vine motifs painted with ground ruby and lapis lazuli pigments.',
    guardedInSuiteNumber: '403',
    guardedInSuiteName: 'Imperial Heritage Dining Suite',
    guardedInSuitePrice: 9800,
    guardedInSuiteImage: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=1200&q=80',
    artifactImage: 'https://images.unsplash.com/photo-1615865417236-d67f189a646d?auto=format&fit=crop&w=800&q=80',
    iconType: 'crockery',
    details: {
      weight: '24-Piece Complete Service',
      purity: '24K Pure Gold Leaf Gilding',
      vaultSpecs: 'Shock-Absorbing Illuminated Acrylic Case',
      curatorRating: 'Imperial Dynasty Artifact',
    },
  },
  {
    id: 'art_shield',
    name: "Emperor's Sterling Silver Ceremonial Shield & Crest",
    category: 'Royal Armory & Dynasty Insignia',
    era: 'Circa 1710 AD',
    origin: 'Mewar Royal Armory',
    material: 'Sterling Silver (925), Blue Sapphires & Crimson Velvet',
    historicalNote: 'Embossed with the legendary solar lion crest of the Raj Palace founders. Used exclusively during victory celebrations and state guard displays.',
    guardedInSuiteNumber: '604',
    guardedInSuiteName: 'Warrior King Grand Royal Suite',
    guardedInSuitePrice: 7200,
    guardedInSuiteImage: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=1200&q=80',
    artifactImage: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=800&q=80',
    iconType: 'shield',
    details: {
      weight: '5.2 kg Sterling Silver',
      purity: '92.5% Fine Silver + Sapphires',
      vaultSpecs: 'Biometric fingerprint sealed display',
      curatorRating: 'Class A Regalia',
    },
  },
  {
    id: 'art_hookah',
    name: 'Vintage Royal Jade & Silver Filigree Hookah',
    category: 'Royal Court Relics & Leisure Antiques',
    era: 'Circa 1890 AD',
    origin: 'Courtyard Royal Pavilion',
    material: 'Natural Green Jade, Sterling Silver Filigree & Ruby Cabochons',
    historicalNote: 'A marvel of lapidary art carved from a single block of natural nephrite jade, designed for relaxing post-banquet hookah sessions in the palatial courtyard.',
    guardedInSuiteNumber: '305',
    guardedInSuiteName: 'Courtyard Garden Villa',
    guardedInSuitePrice: 8500,
    guardedInSuiteImage: 'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?auto=format&fit=crop&w=1200&q=80',
    artifactImage: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=800&q=80',
    iconType: 'relic',
    details: {
      weight: '1.9 kg Carved Nephrite Jade',
      purity: 'Natural Imperial Jade',
      vaultSpecs: 'Tempered Glass Pedestal with Ambient Lighting',
      curatorRating: 'Victorian-Era Royal Antique',
    },
  },
];

export const ArtifactBookingEngine: React.FC<{
  onSelectSuiteToBook?: (roomNumber: string, roomType: string, price: number) => void;
}> = ({ onSelectSuiteToBook }) => {
  const { rooms, t } = useHotel();

  const [selectedArtifact, setSelectedArtifact] = useState<RoyalArtifact>(royalArtifactsData[0]);
  const [viewState, setViewState] = useState<'3d_artifact' | 'zoomed_to_suite'>('3d_artifact');
  const [rotationY, setRotationY] = useState(15);
  const [rotationX, setRotationX] = useState(10);
  const [spotlightOn, setSpotlightOn] = useState(true);
  const [isAutoRotate, setIsAutoRotate] = useState(false);
  const [showBookingConfirmation, setShowBookingConfirmation] = useState(false);

  // Smooth rotation interval if auto rotate is toggled
  React.useEffect(() => {
    if (!isAutoRotate) return;
    const interval = setInterval(() => {
      setRotationY((prev) => (prev + 2) % 360);
    }, 50);
    return () => clearInterval(interval);
  }, [isAutoRotate]);

  const handleZoomOutToSuite = () => {
    setViewState('zoomed_to_suite');
  };

  const handleReturnToArtifact3D = () => {
    setViewState('3d_artifact');
  };

  const handleBookStayWithHistory = () => {
    if (onSelectSuiteToBook) {
      onSelectSuiteToBook(
        selectedArtifact.guardedInSuiteNumber,
        selectedArtifact.guardedInSuiteName,
        selectedArtifact.guardedInSuitePrice
      );
    } else {
      setShowBookingConfirmation(true);
    }
  };

  const matchedRoomInState = rooms.find(
    (r) => r.roomNumber === selectedArtifact.guardedInSuiteNumber
  );

  return (
    <div className="space-y-8 pb-12">
      {/* Engine Hero Header */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-amber-950 via-slate-950 to-indigo-950 text-white p-6 sm:p-10 border border-amber-500/30 shadow-2xl">
        <div className="absolute top-0 right-0 -mt-12 -mr-12 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-300 text-xs font-semibold tracking-wide">
              <Crown className="w-3.5 h-3.5 text-amber-400" />
              <span>The Artifact-to-Suite Royal Booking Engine</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white font-serif">
              Sleep Alongside Centuries of Royal History
            </h1>
            <p className="text-xs sm:text-sm text-amber-100/80 leading-relaxed">
              The Raj Palace holds irreplaceable centuries-old royal armory, crown jewels, and imperial banqueting treasures. Explore each artifact in 3D, then <span className="text-amber-300 font-bold">zoom out</span> to reveal the exact luxurious royal suite where the item is physically guarded.
            </p>
          </div>

          <div className="flex items-center space-x-3 shrink-0">
            <div className="bg-white/10 backdrop-blur-md p-3 rounded-xl border border-white/10 text-center">
              <span className="text-[10px] text-amber-200 uppercase font-bold tracking-wider block">Royal Artifacts</span>
              <span className="text-xl font-bold text-amber-400 font-serif">5 Treasures</span>
            </div>
            <div className="bg-white/10 backdrop-blur-md p-3 rounded-xl border border-white/10 text-center">
              <span className="text-[10px] text-amber-200 uppercase font-bold tracking-wider block">Security Rating</span>
              <span className="text-xl font-bold text-emerald-400 font-serif">Vault Class A+</span>
            </div>
          </div>
        </div>
      </div>

      {/* Artifact Selector Carousel Tabs */}
      <div className="flex items-center space-x-3 overflow-x-auto pb-2 scrollbar-none">
        {royalArtifactsData.map((artifact) => {
          const isSelected = selectedArtifact.id === artifact.id;
          return (
            <button
              key={artifact.id}
              onClick={() => {
                setSelectedArtifact(artifact);
                setViewState('3d_artifact');
              }}
              className={`shrink-0 px-4 py-3 rounded-xl text-xs font-semibold flex items-center space-x-3 transition-all border cursor-pointer ${
                isSelected
                  ? 'bg-gradient-to-r from-amber-600 to-amber-700 text-white border-amber-400 shadow-md ring-2 ring-amber-400/30'
                  : 'bg-white text-gray-700 border-gray-200 hover:border-amber-400 hover:bg-amber-50/50'
              }`}
            >
              <div
                className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                  isSelected ? 'bg-white/20 text-white' : 'bg-amber-100 text-amber-800'
                }`}
              >
                {artifact.iconType === 'sword' && <Swords className="w-4 h-4" />}
                {artifact.iconType === 'jewelry' && <Gem className="w-4 h-4" />}
                {artifact.iconType === 'crockery' && <UtensilsCrossed className="w-4 h-4" />}
                {artifact.iconType === 'shield' && <ShieldCheck className="w-4 h-4" />}
                {artifact.iconType === 'relic' && <Sparkles className="w-4 h-4" />}
              </div>
              <div className="text-left">
                <span className="block font-bold leading-tight line-clamp-1">{artifact.name}</span>
                <span
                  className={`text-[10px] ${
                    isSelected ? 'text-amber-200' : 'text-gray-400'
                  } block`}
                >
                  Guarded in Suite #{artifact.guardedInSuiteNumber}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* MAIN INTERACTIVE DISPLAY AREA */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Interactive 3D Artifact or Zoomed Suite Camera Stage (8 cols) */}
        <div className="lg:col-span-8 bg-slate-950 rounded-2xl border border-amber-500/30 shadow-2xl p-6 relative overflow-hidden min-h-[480px] flex flex-col justify-between">
          {/* Top Controls Bar inside Stage */}
          <div className="flex items-center justify-between z-20">
            <div className="flex items-center space-x-2">
              <span className="px-2.5 py-1 rounded-md bg-amber-500/20 text-amber-300 border border-amber-500/40 text-[11px] font-bold tracking-wider uppercase flex items-center space-x-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{viewState === '3d_artifact' ? '3D Interactive Gallery' : 'Spatial Room View'}</span>
              </span>

              {viewState === '3d_artifact' && (
                <button
                  onClick={() => setIsAutoRotate(!isAutoRotate)}
                  className={`px-2.5 py-1 rounded-md text-[11px] font-semibold flex items-center space-x-1 border transition-all cursor-pointer ${
                    isAutoRotate
                      ? 'bg-indigo-600 text-white border-indigo-400'
                      : 'bg-white/10 text-gray-300 border-white/20 hover:bg-white/20'
                  }`}
                >
                  <RotateCw className={`w-3.5 h-3.5 ${isAutoRotate ? 'animate-spin' : ''}`} />
                  <span>{isAutoRotate ? 'Auto Rotating' : 'Auto Rotate'}</span>
                </button>
              )}
            </div>

            {/* Mode Switcher Buttons */}
            {viewState === 'zoomed_to_suite' ? (
              <button
                onClick={handleReturnToArtifact3D}
                className="px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs flex items-center space-x-1.5 transition-all shadow-md cursor-pointer"
              >
                <Maximize2 className="w-3.5 h-3.5" />
                <span>Inspect Artifact Close-Up</span>
              </button>
            ) : (
              <button
                onClick={handleZoomOutToSuite}
                className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs flex items-center space-x-1.5 transition-all shadow-lg cursor-pointer"
              >
                <Compass className="w-3.5 h-3.5" />
                <span>Zoom Out to Guarded Suite</span>
              </button>
            )}
          </div>

          {/* DYNAMIC CANVAS CONTENT WITH MOTION ANIMATION */}
          <div className="relative my-8 flex items-center justify-center min-h-[320px] z-10">
            <AnimatePresence mode="wait">
              {viewState === '3d_artifact' ? (
                /* VIEW STATE A: 3D ARTIFACT GALLERY */
                <motion.div
                  key="artifact-3d"
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.25, filter: 'blur(10px)' }}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                  className="flex flex-col items-center justify-center w-full"
                >
                  {/* Spotlight Cone Glow */}
                  {spotlightOn && (
                    <div className="absolute top-0 w-64 h-64 bg-gradient-to-b from-amber-400/20 via-amber-500/5 to-transparent rounded-full blur-2xl pointer-events-none" />
                  )}

                  {/* 3D Perspective Card Container */}
                  <div
                    className="relative w-72 sm:w-80 h-72 rounded-2xl overflow-hidden border border-amber-400/40 shadow-2xl transition-transform duration-200 cursor-grab active:cursor-grabbing"
                    style={{
                      transform: `perspective(1000px) rotateY(${rotationY}deg) rotateX(${rotationX}deg) scale(1.05)`,
                      boxShadow: '0 25px 50px -12px rgba(217, 119, 6, 0.25)',
                    }}
                  >
                    <img
                      src={selectedArtifact.artifactImage}
                      alt={selectedArtifact.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />

                    {/* Royal Gold Frame Overlay */}
                    <div className="absolute inset-0 border-2 border-amber-400/50 pointer-events-none rounded-2xl m-2" />

                    <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent p-4 text-white">
                      <span className="text-[10px] text-amber-400 font-bold uppercase tracking-widest block">
                        {selectedArtifact.category}
                      </span>
                      <h3 className="font-serif font-bold text-base text-amber-100">
                        {selectedArtifact.name}
                      </h3>
                      <span className="text-[11px] text-amber-300/80 block mt-0.5">
                        {selectedArtifact.era}
                      </span>
                    </div>
                  </div>

                  {/* 3D Rotation Sliders */}
                  <div className="mt-6 flex items-center space-x-4 bg-slate-900/80 border border-amber-500/30 px-4 py-2 rounded-xl text-xs text-amber-200">
                    <span className="text-[10px] font-bold uppercase">3D Y-Axis Angle:</span>
                    <input
                      type="range"
                      min="-60"
                      max="60"
                      value={rotationY}
                      onChange={(e) => setRotationY(Number(e.target.value))}
                      className="accent-amber-500 w-32 cursor-pointer"
                    />
                    <span className="font-mono text-amber-400 font-bold">{rotationY}°</span>
                  </div>
                </motion.div>
              ) : (
                /* VIEW STATE B: ZOOMED OUT ROOM SUITE VIEW */
                <motion.div
                  key="suite-zoom"
                  initial={{ opacity: 0, scale: 1.4, filter: 'blur(12px)' }}
                  animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.6, ease: 'easeOut' }}
                  className="w-full relative rounded-xl overflow-hidden border border-amber-400/40 shadow-2xl"
                >
                  <div className="relative h-80 sm:h-96 w-full">
                    <img
                      src={selectedArtifact.guardedInSuiteImage}
                      alt={selectedArtifact.guardedInSuiteName}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

                    {/* Highlighted Vault Pedestal Indicator in Room */}
                    <div className="absolute top-6 left-6 bg-slate-950/90 backdrop-blur-md p-3 rounded-xl border border-amber-500/50 text-white max-w-xs space-y-1">
                      <div className="flex items-center space-x-1.5 text-amber-400 font-bold text-xs">
                        <Lock className="w-3.5 h-3.5" />
                        <span>Safeguarded Artifact Vault Inside</span>
                      </div>
                      <p className="text-[11px] text-gray-300 leading-snug">
                        Houses the <span className="text-amber-300 font-bold">{selectedArtifact.name}</span> in a bulletproof glass display cabinet.
                      </p>
                    </div>

                    {/* Room Info Bottom Bar */}
                    <div className="absolute bottom-0 inset-x-0 p-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4 text-white">
                      <div>
                        <div className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded bg-amber-500 text-slate-950 font-bold text-[10px] uppercase tracking-wider mb-1">
                          <span>Suite Room #{selectedArtifact.guardedInSuiteNumber}</span>
                        </div>
                        <h2 className="text-xl sm:text-2xl font-extrabold font-serif text-white">
                          {selectedArtifact.guardedInSuiteName}
                        </h2>
                        <p className="text-xs text-amber-200/80 mt-1">
                          Includes 24/7 Royal Butler, Vault Viewing Pass, and Private Balcony.
                        </p>
                      </div>

                      <div className="shrink-0 text-right">
                        <span className="text-[10px] text-amber-300 uppercase font-bold tracking-wider block">Nightly Tariff</span>
                        <span className="text-2xl font-extrabold text-amber-400 font-serif">
                          ₹{selectedArtifact.guardedInSuitePrice.toLocaleString()}
                        </span>
                        <span className="text-[10px] text-gray-300 block">/ night + taxes</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Bottom Action Bar inside Stage */}
          <div className="pt-4 border-t border-amber-500/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3 z-20">
            <div className="flex items-center space-x-2 text-xs text-amber-200">
              <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0" />
              <span>
                Artifact location verified by Raj Palace Heritage Trust. Vault viewing included during stay.
              </span>
            </div>

            <button
              onClick={handleBookStayWithHistory}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 text-slate-950 font-extrabold text-xs flex items-center justify-center space-x-2 shadow-lg hover:shadow-amber-500/20 transition-all cursor-pointer transform hover:-translate-y-0.5"
            >
              <Crown className="w-4 h-4 text-slate-950" />
              <span>Book Stay Alongside History</span>
            </button>
          </div>
        </div>

        {/* Right Column: Historical Provenance & Vault Specifications (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          {/* Artifact Details Card */}
          <div className="bg-white rounded-2xl border border-amber-200 shadow-sm p-6 space-y-4">
            <div className="flex items-center space-x-2 pb-3 border-b border-gray-100">
              <Award className="w-5 h-5 text-amber-600" />
              <h2 className="text-base font-bold text-gray-900 font-serif">Historical Provenance</h2>
            </div>

            <div className="space-y-2 text-xs">
              <div>
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Artifact Name</span>
                <span className="font-bold text-gray-900 text-sm">{selectedArtifact.name}</span>
              </div>

              <div>
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Era & Origin</span>
                <span className="font-semibold text-amber-800">{selectedArtifact.era} • {selectedArtifact.origin}</span>
              </div>

              <div>
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Materials & Purity</span>
                <span className="text-gray-700 leading-relaxed block">{selectedArtifact.material}</span>
              </div>

              <div>
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Historical Note</span>
                <p className="text-gray-600 italic leading-relaxed bg-amber-50/50 p-2.5 rounded-lg border border-amber-100 mt-1">
                  "{selectedArtifact.historicalNote}"
                </p>
              </div>
            </div>

            {/* Spec Highlights Grid */}
            <div className="grid grid-cols-2 gap-2 text-[11px] pt-2">
              <div className="p-2 bg-gray-50 rounded-md border border-gray-100">
                <span className="text-[9px] text-gray-400 font-bold uppercase block">Weight / Mass</span>
                <span className="font-bold text-gray-900">{selectedArtifact.details.weight}</span>
              </div>
              <div className="p-2 bg-gray-50 rounded-md border border-gray-100">
                <span className="text-[9px] text-gray-400 font-bold uppercase block">Purity Rating</span>
                <span className="font-bold text-amber-700">{selectedArtifact.details.purity}</span>
              </div>
              <div className="p-2 bg-gray-50 rounded-md border border-gray-100 col-span-2">
                <span className="text-[9px] text-gray-400 font-bold uppercase block">Security Safeguard</span>
                <span className="font-bold text-emerald-700">{selectedArtifact.details.vaultSpecs}</span>
              </div>
            </div>
          </div>

          {/* Guarded Suite Preview Card */}
          <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl border border-amber-200 p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Compass className="w-5 h-5 text-amber-700" />
                <h3 className="text-sm font-bold text-gray-900 font-serif">Guarded Suite Location</h3>
              </div>
              <span className="px-2 py-0.5 rounded bg-amber-200 text-amber-900 text-[10px] font-bold">
                Room #{selectedArtifact.guardedInSuiteNumber}
              </span>
            </div>

            <div className="h-32 rounded-xl overflow-hidden relative border border-amber-300/60">
              <img
                src={selectedArtifact.guardedInSuiteImage}
                alt={selectedArtifact.guardedInSuiteName}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent flex items-end p-3">
                <span className="text-white font-bold text-xs">{selectedArtifact.guardedInSuiteName}</span>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs pt-1">
              <span className="text-gray-600">Dynamic Nightly Rate:</span>
              <span className="font-extrabold text-amber-700 text-sm">
                ₹{selectedArtifact.guardedInSuitePrice.toLocaleString()} / night
              </span>
            </div>

            <button
              onClick={handleBookStayWithHistory}
              className="w-full py-2.5 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs font-bold shadow-md transition-all flex items-center justify-center space-x-1.5 cursor-pointer"
            >
              <span>Reserve Suite #{selectedArtifact.guardedInSuiteNumber}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      {showBookingConfirmation && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl relative border border-amber-300 space-y-4">
            <button
              onClick={() => setShowBookingConfirmation(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-700"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="w-12 h-12 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center mx-auto">
              <Crown className="w-6 h-6" />
            </div>

            <div className="text-center">
              <h3 className="text-lg font-bold text-gray-900 font-serif">Reserve Stay Alongside History</h3>
              <p className="text-xs text-gray-500 mt-1">
                You are reserving <span className="font-bold text-gray-900">{selectedArtifact.guardedInSuiteName} (Room #{selectedArtifact.guardedInSuiteNumber})</span> safeguarding the <span className="font-bold text-amber-700">{selectedArtifact.name}</span>.
              </p>
            </div>

            <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs space-y-1">
              <div className="flex justify-between">
                <span className="text-gray-600">Nightly Rate:</span>
                <span className="font-bold text-amber-800">₹{selectedArtifact.guardedInSuitePrice.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Guarded Artifact:</span>
                <span className="font-bold text-gray-900">{selectedArtifact.name}</span>
              </div>
            </div>

            <button
              onClick={() => {
                alert(`Reservation initiated for Suite #${selectedArtifact.guardedInSuiteNumber}! Our Royal Concierge will contact you shortly.`);
                setShowBookingConfirmation(false);
              }}
              className="w-full py-3 bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs rounded-xl shadow-md"
            >
              Confirm Royal Suite Reservation
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
