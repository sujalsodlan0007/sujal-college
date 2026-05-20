"use client";

import { useState } from "react";
import PropertyCard from "@/components/property/PropertyCard";
import EmptyState from "@/components/common/EmptyState";
import { HiOutlineHeart } from "react-icons/hi";
import { toast } from "react-hot-toast";

export default function SavedProperties() {
  const [savedProperties, setSavedProperties] = useState([
    {
      id: 1,
      slug: "the-summit",
      name: "The Summit",
      location: "Manchester, UK",
      price_from: 1200,
      image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=1000&auto=format&fit=crop",
      status: "available",
      match_score: 95,
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
    }
  ]);

  const handleRemove = (id) => {
    setSavedProperties(prev => prev.filter(p => p.id !== id));
    toast.success("Property removed from saved.");
  };

  return (
    <div className="space-y-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2 font-display tracking-tight">Saved Properties</h1>
          <p className="text-slate-500 font-medium">You have {savedProperties.length} properties bookmarked for later.</p>
        </div>
      </div>

      {savedProperties.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {savedProperties.map((prop) => (
            <PropertyCard 
              key={prop.id} 
              property={prop} 
              isSaved={true}
              onSaveToggle={handleRemove}
            />
          ))}
        </div>
      ) : (
        <EmptyState 
          icon={HiOutlineHeart}
          title="No saved properties" 
          description="Start browsing to save developments you love! Click the heart icon on any property card to save it here."
        />
      )}
    </div>
  );
}
