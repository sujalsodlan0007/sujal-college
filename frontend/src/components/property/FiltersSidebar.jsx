"use client";

import { useProperty } from "@/context/PropertyContext";
import Button from "@/components/common/Button";
import Input from "@/components/common/Input";
import { 
  HiOutlineAdjustments, 
  HiOutlineX, 
  HiOutlineSearch,
  HiOutlineCalendar,
  HiOutlineCheckCircle,
  HiOutlineLocationMarker,
  HiOutlineCurrencyPound,
  HiOutlineHome
} from "react-icons/hi";

const FiltersSidebar = ({ isMobile = false, onClose }) => {
  const { filters, updateFilters, clearFilters } = useProperty();

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    updateFilters({ [name]: type === "checkbox" ? checked : value });
  };

  const content = (
    <div className={`flex flex-col h-full ${isMobile ? 'p-6' : ''}`}>
      <div className="flex items-center justify-between mb-10">
        <h3 className="text-xl font-bold text-slate-900 flex items-center gap-3 font-display">
          <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center">
            <HiOutlineAdjustments className="text-blue-600 w-5 h-5" />
          </div>
          Filters
        </h3>
        <div className="flex items-center gap-4">
          <button 
            onClick={clearFilters}
            className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-blue-600 transition-colors"
          >
            Reset
          </button>
          {isMobile && (
            <button onClick={onClose} className="p-2 bg-slate-100 rounded-xl text-slate-500">
              <HiOutlineX className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>

      <div className="space-y-10 overflow-y-auto pr-2 custom-scrollbar">
        {/* Search */}
        <div className="space-y-4">
          <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Search</label>
          <div className="relative group">
            <HiOutlineSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5 group-focus-within:text-blue-600 transition-colors" />
            <input
              name="search"
              placeholder="Search developments..."
              value={filters.search || ""}
              onChange={handleInputChange}
              className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-slate-900 font-bold focus:outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 transition-all"
            />
          </div>
        </div>

        {/* Location */}
        <div className="space-y-4">
          <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">City</label>
          <div className="relative">
            <HiOutlineLocationMarker className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
            <select
              name="location"
              value={filters.location}
              onChange={handleInputChange}
              className="w-full pl-12 pr-10 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-slate-900 font-bold focus:outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 transition-all appearance-none cursor-pointer"
            >
              <option value="">All Cities</option>
              <option value="London">London</option>
              <option value="Manchester">Manchester</option>
              <option value="Birmingham">Birmingham</option>
              <option value="Leeds">Leeds</option>
            </select>
          </div>
        </div>

        {/* Budget Range */}
        <div className="space-y-4">
          <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Monthly Budget (pcm)</label>
          <div className="grid grid-cols-2 gap-4">
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-sm">£</span>
              <input
                name="minBudget"
                placeholder="Min"
                type="number"
                value={filters.minBudget}
                onChange={handleInputChange}
                className="w-full pl-8 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-slate-900 font-bold focus:outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 transition-all"
              />
            </div>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-sm">£</span>
              <input
                name="maxBudget"
                placeholder="Max"
                type="number"
                value={filters.maxBudget}
                onChange={handleInputChange}
                className="w-full pl-8 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-slate-900 font-bold focus:outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 transition-all"
              />
            </div>
          </div>
        </div>

        {/* Bedrooms */}
        <div className="space-y-4">
          <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Bedrooms</label>
          <div className="grid grid-cols-4 gap-2 bg-slate-50 p-1.5 rounded-[1.25rem] border border-slate-100">
            {["Studio", "1", "2", "3+"].map((num) => (
              <button
                key={num}
                type="button"
                onClick={() => updateFilters({ bedrooms: num })}
                className={`py-2.5 text-[10px] font-black uppercase tracking-tight rounded-xl transition-all duration-300 ${
                  filters.bedrooms === num
                    ? "bg-white text-blue-600 shadow-md scale-[1.02]"
                    : "text-slate-500 hover:text-slate-900 hover:bg-white/50"
                }`}
              >
                {num}
              </button>
            ))}
          </div>
        </div>

        {/* Move-in Date */}
        <div className="space-y-4">
          <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Move-in Date</label>
          <div className="relative">
            <HiOutlineCalendar className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input
              name="moveInDate"
              type="date"
              value={filters.moveInDate || ""}
              onChange={handleInputChange}
              className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-slate-900 font-bold focus:outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 transition-all"
            />
          </div>
        </div>

        {/* Requirements */}
        <div className="space-y-4">
          <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Lifestyle Requirements</label>
          <div className="space-y-3">
            {[
              { id: 'pets', label: 'Pet Friendly', icon: '🐾' },
              { id: 'parking', label: 'Parking Required', icon: '🚗' },
              { id: 'gym', label: 'Gym On-site', icon: '💪' },
              { id: 'concierge', label: 'Concierge', icon: '🛎️' }
            ].map((req) => (
              <label key={req.id} className="flex items-center gap-4 p-4 rounded-2xl border border-slate-100 bg-slate-50/30 cursor-pointer hover:bg-slate-50 hover:border-blue-100 transition-all group">
                <input 
                  type="checkbox" 
                  name={req.id} 
                  checked={filters[req.id] || false}
                  onChange={handleInputChange}
                  className="w-5 h-5 rounded-lg border-slate-200 text-blue-600 focus:ring-blue-500" 
                />
                <span className="text-xs font-bold text-slate-700 flex-1">{req.label}</span>
                <span className="text-sm opacity-50">{req.icon}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Availability Status */}
        <div className="space-y-4">
          <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Availability</label>
          <div className="grid grid-cols-2 gap-3">
            {[
              { id: 'available', label: 'Available Now' },
              { id: 'coming_soon', label: 'Coming Soon' },
            ].map((status) => (
              <button
                key={status.id}
                type="button"
                onClick={() => updateFilters({ status: status.id })}
                className={`px-4 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all border ${
                  filters.status === status.id
                    ? "bg-blue-600 text-white border-blue-600 shadow-lg shadow-blue-100"
                    : "bg-white text-slate-500 border-slate-100 hover:bg-slate-50"
                }`}
              >
                {status.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-auto pt-8">
        <Button className="w-full py-5 rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-2xl shadow-blue-100">
          Show Results
        </Button>
      </div>
    </div>
  );

  if (isMobile) return content;

  return (
    <aside className="w-full bg-white p-8 rounded-[3rem] border border-slate-100 shadow-xl shadow-slate-100/50 h-[calc(100vh-140px)] sticky top-28 flex flex-col">
      {content}
    </aside>
  );
};

export default FiltersSidebar;
