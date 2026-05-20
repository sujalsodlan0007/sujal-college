"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import developmentService from "@/services/developmentService";
import { Loader } from "@/components/common/Loader";
import Button from "@/components/common/Button";
import Badge from "@/components/common/Badge";
import UnitCard from "@/components/property/UnitCard";
import UnitTable from "@/components/property/UnitTable";
import PropertyMap from "@/components/property/PropertyMap";
import Modal from "@/components/common/Modal";
import EnquiryForm from "@/components/booking/EnquiryForm";
import ViewingBookingForm from "@/components/booking/ViewingBookingForm";
import ReservationForm from "@/components/booking/ReservationForm";
import { 
  HiOutlineLocationMarker, 
  HiOutlineCheckCircle, 
  HiOutlineCalendar, 
  HiOutlineChatAlt2,
  HiOutlineCube,
  HiOutlineLightningBolt,
  HiOutlineArrowRight,
  HiOutlineViewGrid,
  HiOutlineViewList,
  HiOutlineOfficeBuilding,
  HiOutlineTruck
} from "react-icons/hi";
import { motion, AnimatePresence } from "framer-motion";

export default function DevelopmentDetail() {
  const { slug } = useParams();
  const [development, setDevelopment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");
  const [unitView, setUnitView] = useState("grid"); // grid or table
  const [selectedUnit, setSelectedUnit] = useState(null);
  const [activeModal, setActiveTabModal] = useState(null); // 'enquiry', 'viewing', 'reserve'

  const openModal = (unit, type) => {
    setSelectedUnit(unit);
    setActiveTabModal(type);
  };

  const closeModal = () => {
    setSelectedUnit(null);
    setActiveTabModal(null);
  };

  // Mock units
  const units = [
    { id: 1, unit_number: "101", floor: "1", size: 650, type: "1 Bed Apartment", price: 1250, status: "available" },
    { id: 2, unit_number: "102", floor: "1", size: 850, type: "2 Bed Apartment", price: 1550, status: "hold" },
    { id: 3, unit_number: "201", floor: "2", size: 650, type: "1 Bed Apartment", price: 1275, status: "available" },
    { id: 4, unit_number: "202", floor: "2", size: 900, type: "2 Bed Apartment", price: 1650, status: "reserved" },
    { id: 5, unit_number: "301", floor: "3", size: 1200, type: "3 Bed Penthouse", price: 2450, status: "coming_soon" },
  ];

  const nearbyPlaces = [
    { name: "Central Station", distance: "0.2 miles", type: "Transport" },
    { name: "City Park", distance: "0.5 miles", type: "Leisure" },
    { name: "Supermarket", distance: "0.1 miles", type: "Shopping" },
    { name: "University", distance: "0.8 miles", type: "Education" },
  ];

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const data = await developmentService.getBySlug(slug);
        data.coordinates = data.coordinates || { lng: -2.2426, lat: 53.4808 };
        setDevelopment(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchDetail();
  }, [slug]);

  if (loading) return <Loader className="min-h-screen" />;
  if (!development) return <div className="min-h-screen flex items-center justify-center">Development not found</div>;

  return (
    <div className="pb-24 pt-24 bg-white">
      {/* Hero Gallery */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 h-[500px] md:h-[650px]">
          <div className="md:col-span-2 h-full overflow-hidden rounded-[3rem] relative group">
            <img 
              src={development.image} 
              alt={development.name} 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </div>
          <div className="md:col-span-2 grid grid-cols-2 gap-4 h-full">
            {[1, 2, 3].map((i) => (
              <div key={i} className="overflow-hidden rounded-[2.5rem] relative group">
                <img 
                  src={`https://images.unsplash.com/photo-${1502672260266 + i}-1c1ef2d93688?q=80&w=800&auto=format&fit=crop`} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" 
                />
              </div>
            ))}
            <div className="relative group cursor-pointer overflow-hidden rounded-[2.5rem]">
              <img 
                src="https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=800&auto=format&fit=crop" 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" 
              />
              <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-[2px] flex flex-col items-center justify-center text-white group-hover:bg-slate-900/70 transition-all">
                <span className="text-3xl font-black mb-1">+12</span>
                <span className="text-[10px] font-black uppercase tracking-[0.2em]">View Gallery</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
          {/* Main Info */}
          <div className="lg:col-span-8 space-y-24">
            <div className="border-b border-slate-100 pb-16">
              <div className="flex flex-wrap items-center gap-3 mb-10">
                <div className="bg-blue-600 text-white px-5 py-2 rounded-full flex items-center space-x-2 shadow-xl shadow-blue-200 text-[10px] font-black uppercase tracking-[0.2em]">
                  <HiOutlineLightningBolt className="w-4 h-4" />
                  <span>98% AI Lifestyle Match</span>
                </div>
                <div className="bg-slate-100 text-slate-500 px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.2em] border border-slate-200">
                  Premium Operator
                </div>
              </div>
              <h1 className="text-5xl md:text-7xl font-bold text-slate-900 mb-8 font-display tracking-tight leading-[1.1]">{development.name}</h1>
              <div className="flex items-center text-slate-400 font-black text-xs uppercase tracking-[0.2em]">
                <HiOutlineLocationMarker className="mr-3 text-blue-600 w-6 h-6" />
                <span>{development.location}</span>
              </div>
            </div>

            {/* Navigation Tabs */}
            <div className="flex items-center space-x-12 border-b border-slate-100 pb-6 overflow-x-auto no-scrollbar sticky top-[80px] bg-white z-20 pt-4">
              {["Overview", "Inventory", "3D Tour", "Floorplans", "Location"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab.toLowerCase().replace(" ", "-"))}
                  className={`text-xs font-black uppercase tracking-[0.3em] pb-6 transition-all relative whitespace-nowrap ${
                    activeTab === tab.toLowerCase().replace(" ", "-")
                      ? "text-blue-600"
                      : "text-slate-400 hover:text-slate-900"
                  }`}
                >
                  {tab}
                  {activeTab === tab.toLowerCase().replace(" ", "-") && (
                    <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-1 bg-blue-600 rounded-full" />
                  )}
                </button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              {activeTab === "overview" && (
                <motion.div
                  key="overview"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-24"
                >
                  <section>
                    <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-10">The Development</h3>
                    <p className="text-slate-600 leading-relaxed text-2xl font-medium font-display">
                      {development.description} Experience the ultimate in urban living with 
                      unparalleled views, world-class amenities, and modern design. Each unit is crafted with 
                      premium materials and high-end finishes.
                    </p>
                  </section>

                  <section>
                    <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-10">Amenities & Features</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                      {development.amenities.map((amenity) => (
                        <div key={amenity} className="flex items-center gap-5 p-8 bg-slate-50/50 border border-slate-100 rounded-[2.5rem] hover:bg-white hover:shadow-2xl hover:shadow-slate-100 transition-all duration-500 group">
                          <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-sm group-hover:bg-blue-600 group-hover:text-white transition-all duration-500 group-hover:scale-110 text-blue-600">
                            <HiOutlineCheckCircle className="w-6 h-6" />
                          </div>
                          <span className="font-black text-slate-900 text-[10px] uppercase tracking-widest">{amenity}</span>
                        </div>
                      ))}
                    </div>
                  </section>

                  <section>
                    <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-10">What's Nearby</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                       {nearbyPlaces.map((place, i) => (
                         <div key={i} className="flex items-center justify-between p-8 bg-white border border-slate-100 rounded-[2.5rem] shadow-sm">
                            <div className="flex items-center gap-6">
                               <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400">
                                  {place.type === "Transport" ? <HiOutlineTruck className="w-6 h-6" /> : <HiOutlineOfficeBuilding className="w-6 h-6" />}
                               </div>
                               <div>
                                  <p className="text-sm font-bold text-slate-900">{place.name}</p>
                                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mt-1">{place.type}</p>
                               </div>
                            </div>
                            <span className="text-[10px] font-black uppercase tracking-widest text-blue-600 bg-blue-50 px-3 py-1.5 rounded-lg">{place.distance}</span>
                         </div>
                       ))}
                    </div>
                  </section>
                </motion.div>
              )}

              {activeTab === "inventory" && (
                <motion.div
                  key="inventory"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  <div className="flex items-center justify-between mb-12">
                    <div>
                      <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-2">Available Inventory</h3>
                      <div className="flex items-center gap-2">
                        <span className="text-3xl font-black text-slate-900 font-display">{units.length}</span>
                        <span className="text-slate-500 font-medium">units found</span>
                      </div>
                    </div>
                    <div className="flex items-center bg-slate-50 p-1 rounded-2xl border border-slate-100">
                      <button 
                        onClick={() => setUnitView("grid")}
                        className={cn("p-3 rounded-xl transition-all", unitView === "grid" ? "bg-white text-blue-600 shadow-sm" : "text-slate-400 hover:text-slate-600")}
                      >
                        <HiOutlineViewGrid className="w-5 h-5" />
                      </button>
                      <button 
                        onClick={() => setUnitView("table")}
                        className={cn("p-3 rounded-xl transition-all", unitView === "table" ? "bg-white text-blue-600 shadow-sm" : "text-slate-400 hover:text-slate-600")}
                      >
                        <HiOutlineViewList className="w-5 h-5" />
                      </button>
                    </div>
                  </div>

                  {unitView === "grid" ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      {units.map((unit) => (
                        <UnitCard 
                          key={unit.id} 
                          unit={unit} 
                          onEnquire={(u) => openModal(u, 'enquiry')}
                          onReserve={(u) => openModal(u, 'reserve')}
                          onBookViewing={(u) => openModal(u, 'viewing')}
                        />
                      ))}
                    </div>
                  ) : (
                    <UnitTable 
                      units={units} 
                      onEnquire={(u) => openModal(u, 'enquiry')}
                      onReserve={(u) => openModal(u, 'reserve')}
                      onBookViewing={(u) => openModal(u, 'viewing')}
                    />
                  )}
                </motion.div>
              )}

              {activeTab === "3d-tour" && (
                <motion.div
                  key="3d-tour"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-10">Place-3D Virtual Experience</h3>
                  {development.virtual_tour_url ? (
                    <div className="aspect-video w-full rounded-[3rem] overflow-hidden border border-slate-100 shadow-2xl bg-slate-900">
                      <iframe 
                        src={development.virtual_tour_url} 
                        className="w-full h-full border-none"
                        allowFullScreen
                      />
                    </div>
                  ) : (
                    <div className="aspect-video bg-slate-50 rounded-[3rem] flex flex-col items-center justify-center text-center p-12 border border-slate-100">
                      <div className="w-24 h-24 bg-white rounded-3xl flex items-center justify-center shadow-xl mb-8 text-blue-600">
                        <HiOutlineCube className="w-12 h-12" />
                      </div>
                      <h4 className="text-2xl font-bold text-slate-900 mb-4 font-display">Virtual Tour Processing</h4>
                      <p className="text-slate-500 max-w-md font-medium text-lg">Our team is currently building the digital twin for this development. Check back soon for a full 3D walkthrough.</p>
                      <Button variant="secondary" className="mt-10 px-10 rounded-2xl font-black uppercase tracking-widest text-[10px] border-2">Notify Me When Ready</Button>
                    </div>
                  )}
                </motion.div>
              )}

              {activeTab === "floorplans" && (
                <motion.div
                  key="floorplans"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-12"
                >
                   <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-10">Development Floorplans</h3>
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                      {[1, 2].map((i) => (
                        <div key={i} className="bg-slate-50 rounded-[3rem] p-10 border border-slate-100 group cursor-pointer hover:bg-white hover:shadow-2xl transition-all duration-500">
                           <div className="aspect-square bg-white rounded-[2rem] border border-slate-100 p-8 flex items-center justify-center mb-8">
                              <img src={`https://images.unsplash.com/photo-1574362848149-11496d93a7c7?q=80&w=600&auto=format&fit=crop`} className="max-w-full h-auto opacity-40 group-hover:opacity-100 transition-opacity" />
                           </div>
                           <div className="flex items-center justify-between">
                              <div>
                                 <h4 className="text-xl font-bold text-slate-900 font-display">{i} Bedroom Suite</h4>
                                 <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mt-1">Type {String.fromCharCode(64 + i)} • {600 + (i*200)} SQ FT</p>
                              </div>
                              <Button variant="secondary" size="sm" className="rounded-xl border-2 p-3"><HiOutlineArrowRight className="w-5 h-5" /></Button>
                           </div>
                        </div>
                      ))}
                   </div>
                </motion.div>
              )}

              {activeTab === "location" && (
                <motion.div
                  key="location"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-10">Explore the Area</h3>
                  <div className="h-[600px] rounded-[4rem] overflow-hidden border border-slate-100 shadow-2xl">
                    <PropertyMap properties={[development]} center={[development.coordinates.lng, development.coordinates.lat]} zoom={15} />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Sidebar / CTA Card */}
          <div className="lg:col-span-4">
            <div className="bg-white p-12 rounded-[3.5rem] border border-slate-100 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.08)] sticky top-32">
              <div className="mb-12">
                <span className="text-[10px] text-slate-400 font-black uppercase tracking-[0.2em] block mb-4">Starting from</span>
                <div className="flex items-baseline gap-2">
                  <span className="text-6xl font-black text-slate-900 tracking-tight font-display">£{development.price_from.toLocaleString()}</span>
                  <span className="text-slate-400 font-bold uppercase text-[10px] tracking-widest">/ month</span>
                </div>
              </div>

              <div className="space-y-4">
                <Button className="w-full py-6 rounded-2xl font-black uppercase tracking-widest text-xs shadow-2xl shadow-blue-200 flex items-center justify-center gap-3">
                  <HiOutlineCalendar className="w-5 h-5" />
                  Book a Viewing
                </Button>
                <Button variant="secondary" className="w-full py-6 rounded-2xl font-black uppercase tracking-widest text-xs flex items-center justify-center gap-3 border-2">
                  <HiOutlineChatAlt2 className="w-5 h-5" />
                  Enquire Now
                </Button>
              </div>

              <div className="mt-12 pt-12 border-t border-slate-100">
                <div className="flex items-center justify-between mb-8">
                  <h4 className="font-black text-xs uppercase tracking-widest text-slate-900">Digital Features</h4>
                  <HiOutlineLightningBolt className="text-blue-600 w-5 h-5" />
                </div>
                <div className="space-y-6">
                  {[
                    "Instant Reservation System",
                    "AI Lifestyle Matching",
                    "3D Immersive Walkthroughs",
                    "Paperless Leasing"
                  ].map((feature, i) => (
                    <div key={i} className="flex items-center space-x-4">
                      <HiOutlineCheckCircle className="text-blue-600 w-5 h-5 flex-shrink-0" />
                      <span className="text-[11px] font-bold text-slate-600 uppercase tracking-widest">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button className="mt-12 w-full flex items-center justify-between p-6 bg-slate-50 rounded-[2rem] border border-slate-100 group hover:bg-slate-900 transition-all duration-500">
                <div className="text-left">
                  <span className="block text-[10px] font-black uppercase tracking-widest text-slate-400 group-hover:text-slate-500 mb-1">Download</span>
                  <span className="block text-sm font-bold text-slate-900 group-hover:text-white transition-colors">Digital Brochure</span>
                </div>
                <HiOutlineArrowRight className="w-5 h-5 text-slate-400 group-hover:text-white transition-all group-hover:translate-x-1" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Booking Modals */}
      <Modal 
        isOpen={activeModal === 'enquiry'} 
        onClose={closeModal} 
        title="Send Enquiry"
      >
        <EnquiryForm development={development} unit={selectedUnit} onClose={closeModal} />
      </Modal>

      <Modal 
        isOpen={activeModal === 'viewing'} 
        onClose={closeModal} 
        title="Book a Viewing"
      >
        <ViewingBookingForm development={development} unit={selectedUnit} onClose={closeModal} />
      </Modal>

      <Modal 
        isOpen={activeModal === 'reserve'} 
        onClose={closeModal} 
        title="Reserve Unit"
      >
        <ReservationForm development={development} unit={selectedUnit} onClose={closeModal} />
      </Modal>
    </div>
  );
}
