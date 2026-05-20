"use client";

import Link from "next/link";
import { 
  HiOutlineLocationMarker, 
  HiOutlineHeart, 
  HiOutlineLightningBolt, 
  HiOutlineArrowRight,
  HiOutlineCheckCircle
} from "react-icons/hi";
import { motion } from "framer-motion";
import { cn } from "@/utils/cn";

const PropertyCardList = ({ property, isSaved = false, onSaveToggle }) => {
  const { 
    slug, 
    name, 
    location, 
    price_from, 
    image, 
    status, 
    match_score,
    amenities 
  } = property;

  return (
    <Link href={`/developments/${slug}`} className="group block w-full">
      <div className="bg-white rounded-[2.5rem] overflow-hidden border border-slate-100 shadow-sm transition-all duration-500 hover:shadow-2xl hover:shadow-slate-200 hover:-translate-y-1 flex flex-col md:flex-row h-full md:h-64">
        {/* Image Container */}
        <div className="relative w-full md:w-80 lg:w-96 shrink-0 overflow-hidden">
          <img 
            src={image} 
            alt={name} 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          
          {/* AI Match Badge */}
          {match_score && (
            <div className="absolute top-4 left-4 bg-blue-600 text-white px-3 py-1.5 rounded-full flex items-center space-x-1 shadow-lg text-[10px] font-black uppercase tracking-widest">
              <HiOutlineLightningBolt className="w-3.5 h-3.5" />
              <span>{match_score}% match</span>
            </div>
          )}

          {/* Status Overlay */}
          <div className="absolute bottom-4 left-4">
            <div className={cn(
              "px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest shadow-sm border",
              status === "available" ? "bg-green-50 text-green-600 border-green-100" : 
              status === "hold" ? "bg-amber-50 text-amber-600 border-amber-100" : 
              status === "coming_soon" ? "bg-blue-50 text-blue-600 border-blue-100" : 
              "bg-red-50 text-red-600 border-red-100"
            )}>
              {status.replace("_", " ")}
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="p-8 flex flex-col flex-1 min-w-0">
          <div className="flex justify-between items-start gap-4 mb-2">
            <div>
              <div className="flex items-center text-slate-400 text-[10px] font-black uppercase tracking-widest mb-2">
                <HiOutlineLocationMarker className="mr-1.5 w-4 h-4 text-blue-600" />
                <span>{location}</span>
              </div>
              <h3 className="text-2xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors leading-tight font-display">
                {name}
              </h3>
            </div>

            <button 
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onSaveToggle && onSaveToggle(property.id);
              }}
              className={cn(
                "w-12 h-12 backdrop-blur-sm rounded-2xl flex items-center justify-center transition-all shadow-sm border border-slate-100 shrink-0",
                isSaved ? "bg-red-500 text-white border-red-400" : "bg-white text-slate-400 hover:text-red-500 hover:bg-red-50"
              )}
            >
              <HiOutlineHeart className={cn("w-6 h-6", isSaved ? "fill-current" : "")} />
            </button>
          </div>

          {/* Amenities Preview */}
          <div className="flex flex-wrap gap-2 mb-6 mt-4">
            {amenities?.slice(0, 3).map((amenity, i) => (
              <div key={i} className="flex items-center gap-1.5 px-3 py-1 bg-slate-50 border border-slate-100 rounded-lg text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                <HiOutlineCheckCircle className="w-3.5 h-3.5 text-blue-600" />
                {amenity}
              </div>
            ))}
            {amenities?.length > 3 && (
              <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest self-center ml-1">
                +{amenities.length - 3} more
              </span>
            )}
          </div>
          
          <div className="mt-auto flex items-end justify-between">
            <div className="flex flex-col">
              <span className="text-[10px] text-slate-400 font-black uppercase tracking-[0.2em] mb-1">Starting pcm</span>
              <div className="flex items-baseline">
                <span className="text-3xl font-black text-slate-900 tracking-tight">£{price_from.toLocaleString()}</span>
                <span className="text-xs text-slate-400 font-bold ml-1 uppercase tracking-widest">pcm</span>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <span className="text-[10px] font-black text-blue-600 uppercase tracking-[0.2em] opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0 transition-all duration-500">
                View Development
              </span>
              <div className="w-12 h-12 rounded-2xl bg-slate-900 text-white flex items-center justify-center group-hover:bg-blue-600 shadow-xl shadow-slate-200 transition-all duration-300">
                <HiOutlineArrowRight className="w-6 h-6" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PropertyCardList;
