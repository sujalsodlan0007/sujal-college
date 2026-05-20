"use client";

import { useState, useEffect } from "react";
import { useProperty } from "@/context/PropertyContext";
import FiltersSidebar from "@/components/property/FiltersSidebar";
import PropertyCard from "@/components/property/PropertyCard";
import PropertyCardList from "@/components/property/PropertyCardList";
import PropertyMap from "@/components/property/PropertyMap";
import { Loader } from "@/components/common/Loader";
import EmptyState from "@/components/common/EmptyState";
import developmentService from "@/services/developmentService";
import { 
  HiOutlineViewGrid, 
  HiOutlineMap, 
  HiOutlineViewList, 
  HiOutlineSearch, 
  HiOutlineAdjustments,
  HiOutlineSortDescending,
  HiOutlineX
} from "react-icons/hi";
import { motion, AnimatePresence } from "framer-motion";

const propertiesMock = [
  {
    id: 1,
    slug: "the-summit",
    name: "The Summit",
    location: "Manchester, UK",
    price_from: 1200,
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=1000&auto=format&fit=crop",
    status: "available",
    match_score: 95,
    coordinates: { lng: -2.2426, lat: 53.4808 },
    amenities: ["Gym", "Concierge", "Roof Terrace", "Pet Friendly"]
  },
  {
    id: 2,
    slug: "riverside-plaza",
    name: "Riverside Plaza",
    location: "London, UK",
    price_from: 2500,
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1000&auto=format&fit=crop",
    status: "coming_soon",
    match_score: 88,
    coordinates: { lng: -0.1276, lat: 51.5074 },
    amenities: ["Concierge", "River Views", "Private Balcony", "Parking"]
  },
  {
    id: 3,
    slug: "skyline-towers",
    name: "Skyline Towers",
    location: "Birmingham, UK",
    price_from: 1500,
    image: "https://images.unsplash.com/photo-1460317442991-0ec239f636a7?q=80&w=1000&auto=format&fit=crop",
    status: "available",
    match_score: 92,
    coordinates: { lng: -1.8904, lat: 52.4862 },
    amenities: ["Co-working Space", "Gym", "Cinema Room", "Bike Storage"]
  }
];

const PropertySkeleton = ({ viewMode }) => (
  <div className={viewMode === "list" ? "h-64 mb-8" : "h-[500px]"}>
    <div className="w-full h-full bg-slate-50 animate-pulse rounded-[2.5rem] border border-slate-100" />
  </div>
);

export default function FindAHome() {
  const { viewMode, setViewMode, filters, updateFilters } = useProperty();
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [sortOrder, setSortOrder] = useState("match"); // match, price_asc, price_desc

  useEffect(() => {
    const fetchProperties = async () => {
      setLoading(true);
      try {
        await new Promise(resolve => setTimeout(resolve, 800));
        let results = [...propertiesMock];
        
        // Basic sorting logic
        if (sortOrder === "price_asc") results.sort((a, b) => a.price_from - b.price_from);
        if (sortOrder === "price_desc") results.sort((a, b) => b.price_from - a.price_from);
        if (sortOrder === "match") results.sort((a, b) => b.match_score - a.match_score);

        setProperties(results);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, [filters, sortOrder]);

  return (
    <div className="bg-white min-h-screen">
      {/* Page Header */}
      <div className="bg-slate-50/50 border-b border-slate-100 pt-32 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-10">
            <div className="text-left">
              <div className="text-blue-600 text-[10px] font-black uppercase tracking-[0.3em] mb-4">Marketplace</div>
              <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-4 font-display tracking-tight">Find Your Home</h1>
              <p className="text-slate-500 text-lg font-medium">Discover {properties.length} developments matched to your lifestyle.</p>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              {/* View Toggles */}
              <div className="flex items-center bg-white p-1 rounded-2xl border border-slate-200 shadow-sm">
                {[
                  { id: "grid", icon: HiOutlineViewGrid },
                  { id: "list", icon: HiOutlineViewList },
                  { id: "map", icon: HiOutlineMap }
                ].map((mode) => (
                  <button
                    key={mode.id}
                    onClick={() => setViewMode(mode.id)}
                    className={`p-3 rounded-xl transition-all duration-300 ${
                      viewMode === mode.id ? "bg-blue-600 text-white shadow-lg shadow-blue-100" : "text-slate-400 hover:text-slate-900"
                    }`}
                  >
                    <mode.icon className="w-5 h-5" />
                  </button>
                ))}
              </div>

              {/* Sort Dropdown */}
              <div className="relative">
                <select 
                  value={sortOrder}
                  onChange={(e) => setSortOrder(e.target.value)}
                  className="appearance-none bg-white border border-slate-200 rounded-2xl pl-12 pr-10 py-4 text-[10px] font-black uppercase tracking-widest text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/10 cursor-pointer shadow-sm"
                >
                  <option value="match">Sort: AI Match</option>
                  <option value="price_asc">Price: Low to High</option>
                  <option value="price_desc">Price: High to Low</option>
                </select>
                <HiOutlineSortDescending className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5 pointer-events-none" />
              </div>

              {/* Mobile Filter Toggle */}
              <button 
                onClick={() => setShowMobileFilters(true)}
                className="lg:hidden flex items-center gap-2.5 px-6 py-4 bg-slate-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-slate-200"
              >
                <HiOutlineAdjustments className="w-5 h-5" />
                Filters
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="lg:grid lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Desktop Sidebar */}
          <div className="hidden lg:block lg:col-span-3">
            <FiltersSidebar />
          </div>

          {/* Content Area */}
          <main className="lg:col-span-9">
            {loading ? (
              <div className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 gap-10" : "flex flex-col"}>
                {[1, 2, 3, 4].map(i => (
                  <PropertySkeleton key={i} viewMode={viewMode} />
                ))}
              </div>
            ) : properties.length === 0 ? (
              <EmptyState 
                title="No properties found" 
                description="Try adjusting your filters to find more options." 
              />
            ) : (
              <AnimatePresence mode="wait">
                {viewMode === "grid" && (
                  <motion.div
                    key="grid"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10"
                  >
                    {properties.map((prop) => (
                      <PropertyCard key={prop.id} property={prop} />
                    ))}
                  </motion.div>
                )}
                {viewMode === "list" && (
                  <motion.div
                    key="list"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="flex flex-col gap-8"
                  >
                    {properties.map((prop) => (
                      <PropertyCardList key={prop.id} property={prop} />
                    ))}
                  </motion.div>
                )}
                {viewMode === "map" && (
                  <motion.div
                    key="map"
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    className="h-[calc(100vh-250px)] min-h-[600px] rounded-[4rem] overflow-hidden border border-slate-100 shadow-2xl"
                  >
                    <PropertyMap properties={properties} />
                  </motion.div>
                )}
              </AnimatePresence>
            )}
          </main>
        </div>
      </div>

      {/* Mobile Filter Drawer */}
      <AnimatePresence>
        {showMobileFilters && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowMobileFilters(false)}
              className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[100]"
            />
            <motion.div 
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              className="fixed inset-y-0 right-0 w-full max-w-md bg-white z-[101] shadow-2xl"
            >
              <FiltersSidebar isMobile onClose={() => setShowMobileFilters(false)} />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
