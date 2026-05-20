"use client";

import { 
  HiOutlineChevronLeft, 
  HiOutlineChevronRight, 
  HiOutlineDotsHorizontal 
} from "react-icons/hi";
import { cn } from "@/utils/cn";

const AdminTable = ({ 
  columns, 
  data, 
  loading, 
  emptyMessage = "No data found.",
  pagination = null 
}) => {
  return (
    <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-slate-50/50 border-b border-slate-100">
              {columns.map((col, i) => (
                <th 
                  key={i} 
                  className={cn(
                    "px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]",
                    col.className
                  )}
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {loading ? (
              [1, 2, 3, 4, 5].map(i => (
                <tr key={i} className="animate-pulse">
                  {columns.map((_, j) => (
                    <td key={j} className="px-8 py-6 h-20 bg-slate-50/10"></td>
                  ))}
                </tr>
              ))
            ) : data.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="px-8 py-20 text-center">
                  <div className="flex flex-col items-center gap-4">
                    <div className="w-16 h-16 bg-slate-50 rounded-3xl flex items-center justify-center">
                      <HiOutlineDotsHorizontal className="w-8 h-8 text-slate-200" />
                    </div>
                    <p className="text-slate-400 font-bold">{emptyMessage}</p>
                  </div>
                </td>
              </tr>
            ) : (
              data.map((row, i) => (
                <tr key={i} className="hover:bg-slate-50/50 transition-colors group">
                  {columns.map((col, j) => (
                    <td key={j} className={cn("px-8 py-6", col.className)}>
                      {col.render ? col.render(row) : row[col.accessor]}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {pagination && (
        <div className="px-8 py-6 bg-slate-50/50 border-t border-slate-100 flex items-center justify-between">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
            Showing <span className="text-slate-900">{pagination.from}</span> to <span className="text-slate-900">{pagination.to}</span> of <span className="text-slate-900">{pagination.total}</span> entries
          </p>
          <div className="flex items-center gap-2">
            <button className="p-2 bg-white border border-slate-200 rounded-xl text-slate-400 hover:text-blue-600 transition-all disabled:opacity-50">
              <HiOutlineChevronLeft className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-1">
              {[1, 2, 3].map(p => (
                <button key={p} className={cn(
                  "w-10 h-10 rounded-xl text-[10px] font-black transition-all",
                  p === 1 ? "bg-blue-600 text-white shadow-lg shadow-blue-100" : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"
                )}>
                  {p}
                </button>
              ))}
            </div>
            <button className="p-2 bg-white border border-slate-200 rounded-xl text-slate-400 hover:text-blue-600 transition-all">
              <HiOutlineChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminTable;
