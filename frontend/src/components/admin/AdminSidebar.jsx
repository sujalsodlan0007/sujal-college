"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  HiOutlineViewGrid, 
  HiOutlineOfficeBuilding, 
  HiOutlineCube, 
  HiOutlineChatAlt2, 
  HiOutlineCalendar, 
  HiOutlineUsers,
  HiOutlineLogout,
  HiOutlineX,
  HiOutlinePencilAlt
} from "react-icons/hi";
import { cn } from "@/utils/cn";
import { useAuth } from "@/context/AuthContext";

const AdminSidebar = ({ isOpen, onClose }) => {
  const pathname = usePathname();
  const { logout } = useAuth();

  const menuItems = [
    { label: "Dashboard", icon: HiOutlineViewGrid, href: "/admin/dashboard" },
    { label: "Developments", icon: HiOutlineOfficeBuilding, href: "/admin/developments" },
    { label: "Units", icon: HiOutlineCube, href: "/admin/units/all" },
    { label: "Enquiries", icon: HiOutlineChatAlt2, href: "/admin/enquiries" },
    { label: "Viewings", icon: HiOutlineCalendar, href: "/admin/viewings" },
    { label: "Users", icon: HiOutlineUsers, href: "/admin/users" },
    { label: "Content (CMS)", icon: HiOutlinePencilAlt, href: "/admin/cms" },
  ];

  const isActive = (href) => pathname === href;

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside className={cn(
        "fixed inset-y-0 left-0 w-72 bg-white border-r border-slate-100 z-50 transition-transform duration-300 lg:translate-x-0 lg:static",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="flex flex-col h-full p-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-12">
            <Link href="/" className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white font-black text-xl shadow-lg shadow-blue-100">
                P
              </div>
              <span className="text-xl font-black text-slate-900 tracking-tight font-display italic uppercase">Sense AI</span>
            </Link>
            <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-900 lg:hidden">
              <HiOutlineX className="w-6 h-6" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-2">
            {menuItems.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => onClose()}
                  className={cn(
                    "flex items-center gap-4 px-6 py-4 rounded-2xl text-sm font-bold transition-all duration-300 group",
                    active 
                      ? "bg-blue-600 text-white shadow-xl shadow-blue-100 translate-x-2" 
                      : "text-slate-400 hover:bg-slate-50 hover:text-slate-900"
                  )}
                >
                  <item.icon className={cn("w-5 h-5", active ? "text-white" : "group-hover:text-blue-600")} />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Footer */}
          <div className="pt-8 border-t border-slate-50">
            <button 
              onClick={() => logout()}
              className="flex items-center gap-4 px-6 py-4 w-full rounded-2xl text-sm font-bold text-red-500 hover:bg-red-50 transition-all group"
            >
              <HiOutlineLogout className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              Sign Out
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default AdminSidebar;
