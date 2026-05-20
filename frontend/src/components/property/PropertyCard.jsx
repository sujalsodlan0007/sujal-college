import Link from "next/link";
import { HiOutlineLocationMarker, HiOutlineHeart, HiOutlineLightningBolt, HiOutlineArrowRight } from "react-icons/hi";
import { motion } from "framer-motion";
import { cn } from "@/utils/cn";

const PropertyCard = ({ property, isSaved = false, onSaveToggle }) => {
  const { 
    slug, 
    name, 
    location, 
    price_from, 
    image, 
    status, 
    match_score 
  } = property;

  return (
    <Link href={`/developments/${slug}`} className="group block" data-testid={`property-card-${slug}`}>
      <div className="bg-white rounded-[2rem] overflow-hidden border border-slate-100 shadow-sm transition-all duration-500 hover:shadow-2xl hover:shadow-slate-200 hover:-translate-y-2 flex flex-col h-full">
        {/* Image Container */}
        <div className="relative aspect-[4/3] overflow-hidden">
          <img 
            src={image} 
            alt={name} 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          
          {/* AI Match Badge */}
          {match_score && (
            <div className="absolute top-4 left-4 bg-blue-600 text-white px-3 py-1.5 rounded-full flex items-center space-x-1 shadow-lg text-xs font-bold">
              <HiOutlineLightningBolt className="w-3.5 h-3.5" />
              <span>{match_score}% match</span>
            </div>
          )}

          {/* Save Button */}
          <button 
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onSaveToggle && onSaveToggle(property.id);
            }}
            className={cn(
              "absolute top-4 right-4 w-10 h-10 backdrop-blur-sm rounded-full flex items-center justify-center transition-all shadow-sm z-10",
              isSaved ? "bg-red-500 text-white" : "bg-white/90 text-slate-400 hover:text-red-500"
            )}
          >
            <HiOutlineHeart className={cn("w-5 h-5", isSaved ? "fill-current" : "")} />
          </button>

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

        {/* Content */}
        <div className="p-8 flex flex-col flex-1">
          <div className="flex items-center text-slate-400 text-xs font-bold uppercase tracking-widest mb-3">
            <HiOutlineLocationMarker className="mr-1.5 w-4 h-4" />
            <span>{location}</span>
          </div>
          <h3 className="text-xl font-bold text-slate-900 mb-6 group-hover:text-blue-600 transition-colors leading-tight">
            {name}
          </h3>
          
          <div className="mt-auto flex items-center justify-between pt-6 border-t border-slate-50">
            <div>
              <span className="text-xs text-slate-400 font-bold uppercase block mb-1">From</span>
              <div className="flex items-baseline">
                <span className="text-2xl font-black text-slate-900">£{price_from.toLocaleString()}</span>
                <span className="text-sm text-slate-400 font-bold ml-1">/mo</span>
              </div>
            </div>
            <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-900 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
              <HiOutlineArrowRight className="w-5 h-5" />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PropertyCard;
