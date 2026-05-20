"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { cn } from "@/utils/cn";
import { 
  HiOutlineViewGrid, 
  HiOutlineHeart, 
  HiOutlineChatAlt2, 
  HiOutlineCalendar, 
  HiOutlineAdjustments, 
  HiOutlineUserCircle,
  HiOutlineLogout,
  HiOutlineOfficeBuilding,
  HiOutlineUsers
} from "react-icons/hi";

const Sidebar = ({ type = "user" }) => {
  const pathname = usePathname();
  const { user, logout } = useAuth();

  const userLinks = [
    { name: "Dashboard", href: "/account/dashboard", icon: HiOutlineViewGrid },
    { name: "Saved", href: "/account/saved", icon: HiOutlineHeart },
    { name: "Enquiries", href: "/account/enquiries", icon: HiOutlineChatAlt2 },
    { name: "Viewings", href: "/account/viewings", icon: HiOutlineCalendar },
    { name: "Preferences", href: "/account/preferences", icon: HiOutlineAdjustments },
    { name: "Profile", href: "/account/profile", icon: HiOutlineUserCircle },
  ];

  const adminLinks = [
    { name: "Overview", href: "/admin/dashboard", icon: HiOutlineViewGrid },
    { name: "Developments", href: "/admin/developments", icon: HiOutlineOfficeBuilding },
    { name: "Enquiries", href: "/admin/enquiries", icon: HiOutlineChatAlt2 },
    { name: "Viewings", href: "/admin/viewings", icon: HiOutlineCalendar },
    { name: "Users", href: "/admin/users", icon: HiOutlineUsers },
  ];

  const links = type === "admin" ? adminLinks : userLinks;

  return (
    <aside className="w-64 h-screen sticky top-0 bg-white border-r border-gray-100 flex flex-col">
      <div className="p-6">
        <Link href="/" className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-xl">P</span>
          </div>
          <span className="text-xl font-bold tracking-tight text-gray-900">
            PreLease <span className="text-blue-600">AI</span>
          </span>
        </Link>
      </div>

      <nav className="flex-1 px-4 py-4 space-y-1">
        {links.map((link) => {
          const Icon = link.icon;
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.name}
              href={link.href}
              className={cn(
                "flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-medium transition-all",
                isActive 
                  ? "bg-blue-50 text-blue-600" 
                  : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
              )}
            >
              <Icon className={cn("w-5 h-5", isActive ? "text-blue-600" : "text-gray-400")} />
              <span>{link.name}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-gray-100 space-y-2">
        {user && (
          <div className="flex items-center space-x-3 px-4 py-3 mb-2">
            <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-black text-xs">
              {user.name?.charAt(0) || "U"}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-slate-900 truncate">{user.name}</p>
              <p className="text-[10px] text-slate-400 font-medium truncate">{user.email}</p>
            </div>
          </div>
        )}
        <button 
          onClick={logout}
          className="flex items-center space-x-3 px-4 py-3 w-full rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 transition-all"
        >
          <HiOutlineLogout className="w-5 h-5" />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
