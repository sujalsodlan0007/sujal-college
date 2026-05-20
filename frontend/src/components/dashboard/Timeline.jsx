"use client";

import { cn } from "@/utils/cn";
import { HiOutlineChevronRight } from "react-icons/hi";

const Timeline = ({ steps }) => {
  return (
    <div className="relative flex items-center justify-between w-full">
      {/* Background Line */}
      <div className="absolute left-0 right-0 h-1 bg-slate-100 top-1/2 -translate-y-1/2 -z-10" />
      
      {steps.map((step, i) => (
        <div key={i} className="flex flex-col items-center gap-4 bg-white px-2">
          {/* Step Icon/Circle */}
          <div className={cn(
            "w-10 h-10 rounded-full flex items-center justify-center border-4 transition-all duration-500",
            step.completed 
              ? "bg-blue-600 border-blue-50 text-white" 
              : step.active 
                ? "bg-white border-blue-600 text-blue-600 animate-pulse shadow-lg shadow-blue-100" 
                : "bg-white border-slate-100 text-slate-300"
          )}>
            {step.completed ? (
              <HiOutlineChevronRight className="w-5 h-5 rotate-90" />
            ) : (
              <span className="text-[10px] font-black">{i + 1}</span>
            )}
          </div>

          {/* Step Label */}
          <div className="text-center min-w-[80px]">
            <p className={cn(
              "text-[10px] font-black uppercase tracking-widest whitespace-nowrap",
              step.active ? "text-blue-600" : "text-slate-400"
            )}>
              {step.label}
            </p>
            {step.date && (
              <p className="text-[9px] font-bold text-slate-300 mt-1 uppercase">{step.date}</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Timeline;
