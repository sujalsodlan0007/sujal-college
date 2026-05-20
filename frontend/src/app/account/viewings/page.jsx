"use client";

import { useState } from "react";
import { cn } from "@/utils/cn";
import { 
  HiOutlineCalendar, 
  HiOutlineClock, 
  HiOutlineLocationMarker,
  HiOutlineVideoCamera,
  HiOutlineUser,
  HiOutlineX,
  HiOutlinePlus
} from "react-icons/hi";
import Button from "@/components/common/Button";
import Badge from "@/components/common/Badge";
import EmptyState from "@/components/common/EmptyState";
import { toast } from "react-hot-toast";

export default function MyViewings() {
  const [viewings, setViewings] = useState([
    { 
      id: 1, 
      property: "The Summit", 
      unit: "102", 
      date: "May 22, 2026", 
      time: "11:00 AM", 
      type: "in-person", 
      status: "confirmed",
      image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=400&auto=format&fit=crop"
    },
    { 
      id: 2, 
      property: "Riverside Plaza", 
      unit: "405", 
      date: "May 25, 2026", 
      time: "02:30 PM", 
      type: "virtual", 
      status: "pending",
      image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=400&auto=format&fit=crop"
    }
  ]);

  const handleCancel = (id) => {
    setViewings(prev => prev.filter(v => v.id !== id));
    toast.success("Viewing cancelled successfully.");
  };

  return (
    <div className="space-y-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2 font-display tracking-tight">My Viewings</h1>
          <p className="text-slate-500 font-medium">Manage your upcoming property tours.</p>
        </div>
        <Button variant="secondary" className="rounded-xl px-6 py-3 font-black uppercase tracking-widest text-[10px] border-2">
          <HiOutlinePlus className="w-4 h-4 mr-2" />
          Book New Viewing
        </Button>
      </div>

      {viewings.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {viewings.map((viewing) => (
            <div key={viewing.id} className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden hover:shadow-xl hover:shadow-slate-100 transition-all duration-500 group">
              <div className="flex flex-col md:flex-row h-full">
                <div className="md:w-1/3 relative h-48 md:h-auto overflow-hidden">
                  <img src={viewing.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute top-4 left-4">
                    <div className={cn(
                      "px-3 py-1.5 rounded-lg text-[8px] font-black uppercase tracking-widest shadow-lg",
                      viewing.type === "virtual" ? "bg-purple-600 text-white" : "bg-blue-600 text-white"
                    )}>
                      {viewing.type === "virtual" ? <HiOutlineVideoCamera className="inline mr-1 w-3 h-3" /> : <HiOutlineUser className="inline mr-1 w-3 h-3" />}
                      {viewing.type.replace("-", " ")}
                    </div>
                  </div>
                </div>
                
                <div className="md:w-2/3 p-8 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <Badge variant={viewing.status === "confirmed" ? "success" : "warning"}>
                        {viewing.status.toUpperCase()}
                      </Badge>
                      <span className="text-[10px] text-slate-400 font-black uppercase tracking-widest">#{viewing.id}</span>
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2 font-display">{viewing.property}</h3>
                    <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mb-6">Unit {viewing.unit}</p>
                    
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 text-slate-600 text-sm font-bold">
                        <HiOutlineCalendar className="w-5 h-5 text-blue-600" />
                        {viewing.date}
                      </div>
                      <div className="flex items-center gap-3 text-slate-600 text-sm font-bold">
                        <HiOutlineClock className="w-5 h-5 text-blue-600" />
                        {viewing.time}
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 pt-8 border-t border-slate-50 flex gap-3">
                    <Button className="flex-1 py-3.5 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-blue-100">
                      Add to Calendar
                    </Button>
                    <button 
                      onClick={() => handleCancel(viewing.id)}
                      className="p-3.5 bg-slate-50 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all"
                    >
                      <HiOutlineX className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <EmptyState 
          icon={HiOutlineCalendar}
          title="No viewings scheduled" 
          description="Browse developments and book a viewing to see them in person or virtually."
        />
      )}
    </div>
  );
}
