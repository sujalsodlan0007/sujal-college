"use client";

import { motion } from "framer-motion";
import { cn } from "@/utils/cn";

const StatsCard = ({ title, value, icon: Icon, color }) => {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-slate-100 transition-all duration-500 group"
    >
      <div className="flex items-center justify-between mb-8">
        <div className={cn(
          "w-14 h-14 rounded-2xl flex items-center justify-center transition-transform duration-500 group-hover:scale-110",
          color
        )}>
          <Icon className="w-7 h-7" />
        </div>
        <div className="flex flex-col items-end">
          <span className="text-[10px] text-slate-400 font-black uppercase tracking-[0.2em] mb-1">Status</span>
          <span className="text-[10px] text-green-600 font-black uppercase tracking-widest bg-green-50 px-2 py-1 rounded-lg border border-green-100">Live</span>
        </div>
      </div>
      
      <div>
        <h4 className="text-4xl font-black text-slate-900 font-display tracking-tight mb-2">{value}</h4>
        <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.2em]">{title}</p>
      </div>
    </motion.div>
  );
};

export default StatsCard;
