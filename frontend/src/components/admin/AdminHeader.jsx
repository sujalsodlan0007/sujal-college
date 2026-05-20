"use client";

import { HiOutlineBell, HiOutlineSearch, HiOutlineMenuAlt1 } from "react-icons/hi";
import { useAuth } from "@/context/AuthContext";

const AdminHeader = ({ onMenuClick }) => {
  const { user } = useAuth();

  return (
    <header className="bg-white border-b border-slate-100 h-24 flex items-center px-8 sticky top-0 z-30">
      <div className="flex-1 flex items-center gap-6">
        <button 
          onClick={onMenuClick}
          className="p-2.5 text-slate-400 hover:text-slate-900 hover:bg-slate-50 rounded-xl lg:hidden transition-all"
        >
          <HiOutlineMenuAlt1 className="w-6 h-6" />
        </button>

        <div className="hidden md:flex relative max-w-md w-full">
          <HiOutlineSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
          <input 
            type="text" 
            placeholder="Search everything..."
            className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-sm font-bold focus:outline-none focus:ring-2 focus:ring-blue-500/10 transition-all"
          />
        </div>
      </div>

      <div className="flex items-center gap-6">
        <button className="relative p-3 bg-slate-50 text-slate-400 hover:text-blue-600 rounded-xl transition-all group">
          <HiOutlineBell className="w-6 h-6" />
          <span className="absolute top-3 right-3 w-2.5 h-2.5 bg-red-500 border-2 border-white rounded-full" />
        </button>

        <div className="h-10 w-px bg-slate-100" />

        <div className="flex items-center gap-4">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-bold text-slate-900 leading-none mb-1">{user?.name || "Admin User"}</p>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Platform Admin</p>
          </div>
          <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white font-black text-lg shadow-lg shadow-blue-100">
            {user?.name?.charAt(0) || "A"}
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
