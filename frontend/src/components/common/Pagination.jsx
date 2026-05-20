"use client";

import { 
  HiOutlineChevronLeft, 
  HiOutlineChevronRight 
} from "react-icons/hi";
import { cn } from "@/utils/cn";

const Pagination = ({ 
  currentPage, 
  totalPages, 
  onPageChange,
  className 
}) => {
  if (totalPages <= 1) return null;

  return (
    <div className={cn("flex items-center justify-center gap-2", className)}>
      <button 
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="p-3 bg-white border border-slate-200 rounded-xl text-slate-400 hover:text-blue-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <HiOutlineChevronLeft className="w-5 h-5" />
      </button>
      
      <div className="flex items-center gap-1">
        {Array.from({ length: totalPages }).map((_, i) => {
          const page = i + 1;
          const isActive = page === currentPage;
          return (
            <button 
              key={page}
              onClick={() => onPageChange(page)}
              className={cn(
                "w-12 h-12 rounded-xl text-[10px] font-black transition-all",
                isActive 
                  ? "bg-blue-600 text-white shadow-xl shadow-blue-100" 
                  : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"
              )}
            >
              {page}
            </button>
          );
        })}
      </div>

      <button 
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="p-3 bg-white border border-slate-200 rounded-xl text-slate-400 hover:text-blue-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <HiOutlineChevronRight className="w-5 h-5" />
      </button>
    </div>
  );
};

export default Pagination;
