"use client";

import { useState } from "react";
import AdminTable from "@/components/admin/AdminTable";
import { 
  HiOutlineSearch, 
  HiOutlineMail, 
  HiOutlinePhone,
  HiOutlineTrash,
  HiOutlineShieldCheck,
  HiOutlineDotsVertical,
  HiOutlineEye,
  HiOutlineCheckCircle,
  HiOutlineBan
} from "react-icons/hi";
import Badge from "@/components/common/Badge";
import { toast } from "react-hot-toast";

export default function AdminUsers() {
  const [searchTerm, setSearchTerm] = useState("");
  const [users, setUsers] = useState([
    { id: 1, name: "Sarah Jenkins", email: "sarah.j@example.com", phone: "+44 7700 900123", role: "renter", status: "active", joined: "2026-01-15", saved_count: 12, enquiries_count: 3, viewings_count: 1 },
    { id: 2, name: "Admin User", email: "admin@propertysense.co.uk", phone: "+44 7700 900456", role: "admin", status: "active", joined: "2025-12-01", saved_count: 0, enquiries_count: 0, viewings_count: 0 },
    { id: 3, name: "Michael Chen", email: "m.chen@example.com", phone: "+44 7700 900789", role: "renter", status: "pending", joined: "2026-05-10", saved_count: 5, enquiries_count: 2, viewings_count: 2 },
    { id: 4, name: "Emma Thompson", email: "emma.t@example.com", phone: "+44 7700 900111", role: "renter", status: "inactive", joined: "2026-03-22", saved_count: 8, enquiries_count: 1, viewings_count: 0 },
  ]);

  const handleStatusChange = (id, status) => {
    setUsers(prev => prev.map(u => u.id === id ? { ...u, status } : u));
    toast.success(`User ${status === 'active' ? 'activated' : 'disabled'}!`);
  };

  const getRoleBadge = (role) => {
    return role === "admin" 
      ? <Badge variant="info">ADMIN</Badge> 
      : <Badge variant="default">RENTER</Badge>;
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "active": return <Badge variant="success">ACTIVE</Badge>;
      case "pending": return <Badge variant="warning">PENDING</Badge>;
      case "inactive": return <Badge variant="danger">INACTIVE</Badge>;
      default: return <Badge>{status.toUpperCase()}</Badge>;
    }
  };

  const columns = [
    {
      header: "User",
      render: (u) => (
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-slate-100 text-slate-600 rounded-full flex items-center justify-center font-black text-xs group-hover:bg-blue-600 group-hover:text-white transition-all">
            {u.name.charAt(0)}
          </div>
          <div className="font-bold text-slate-900 text-sm">{u.name}</div>
        </div>
      )
    },
    {
      header: "Role",
      render: (u) => getRoleBadge(u.role)
    },
    {
      header: "Contact",
      render: (u) => (
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2 text-slate-600 text-xs font-bold">
            <HiOutlineMail className="w-3.5 h-3.5 text-blue-600" />
            {u.email}
          </div>
          <div className="flex items-center gap-2 text-slate-400 text-[10px] font-bold">
            <HiOutlinePhone className="w-3.5 h-3.5" />
            {u.phone}
          </div>
        </div>
      )
    },
    {
      header: "Activity Stats",
      render: (u) => (
        <div className="flex items-center gap-3">
           <div className="text-center">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Saved</p>
              <p className="text-xs font-bold text-slate-900">{u.saved_count}</p>
           </div>
           <div className="w-px h-6 bg-slate-100" />
           <div className="text-center">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Enq</p>
              <p className="text-xs font-bold text-slate-900">{u.enquiries_count}</p>
           </div>
           <div className="w-px h-6 bg-slate-100" />
           <div className="text-center">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">View</p>
              <p className="text-xs font-bold text-slate-900">{u.viewings_count}</p>
           </div>
        </div>
      )
    },
    {
      header: "Status",
      render: (u) => getStatusBadge(u.status)
    },
    {
      header: "Joined",
      render: (u) => <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">{u.joined}</span>
    },
    {
      header: "Actions",
      className: "text-right",
      render: (u) => (
        <div className="flex items-center justify-end gap-2">
          {u.status === 'inactive' ? (
             <button onClick={() => handleStatusChange(u.id, 'active')} className="p-2.5 text-green-600 bg-green-50 rounded-xl hover:bg-green-600 hover:text-white transition-all shadow-sm" title="Activate User">
                <HiOutlineCheckCircle className="w-5 h-5" />
             </button>
          ) : (
             <button onClick={() => handleStatusChange(u.id, 'inactive')} className="p-2.5 text-red-600 bg-red-50 rounded-xl hover:bg-red-600 hover:text-white transition-all shadow-sm" title="Disable User">
                <HiOutlineBan className="w-5 h-5" />
             </button>
          )}
          <button className="p-2.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all" title="View Profile">
            <HiOutlineEye className="w-5 h-5" />
          </button>
          <button className="p-2.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all" title="Delete User">
            <HiOutlineTrash className="w-5 h-5" />
          </button>
        </div>
      )
    }
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-slate-900 mb-2 font-display tracking-tight">User Management</h1>
        <p className="text-slate-500 font-medium">Monitor user activity and manage platform access permissions.</p>
      </div>

      <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm flex flex-col md:flex-row gap-6">
        <div className="relative flex-1">
          <HiOutlineSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search users by name or email..."
            className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-4">
          <select className="px-8 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-xs font-black uppercase tracking-widest text-slate-600 outline-none hover:border-blue-200 transition-all cursor-pointer">
            <option>All Roles</option>
            <option>Admin</option>
            <option>Renter</option>
          </select>
          <select className="px-8 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-xs font-black uppercase tracking-widest text-slate-600 outline-none hover:border-blue-200 transition-all cursor-pointer">
            <option>All Statuses</option>
            <option>Active</option>
            <option>Pending</option>
            <option>Inactive</option>
          </select>
        </div>
      </div>

      <AdminTable 
        columns={columns} 
        data={users} 
        loading={false} 
        pagination={{ from: 1, to: 4, total: users.length }}
      />
    </div>
  );
}
