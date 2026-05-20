"use client";

import { useState } from "react";
import AdminTable from "@/components/admin/AdminTable";
import { 
  HiOutlineSearch, 
  HiOutlineCalendar, 
  HiOutlineClock,
  HiOutlineVideoCamera,
  HiOutlineUser,
  HiOutlineCheck,
  HiOutlineX,
  HiOutlineDotsVertical,
  HiOutlineRefresh,
  HiOutlineBan
} from "react-icons/hi";
import Badge from "@/components/common/Badge";
import Button from "@/components/common/Button";
import { toast } from "react-hot-toast";

export default function AdminViewings() {
  const [searchTerm, setSearchTerm] = useState("");
  const [viewings, setViewings] = useState([
    { id: 1, renter: "Sarah Jenkins", development: "The Summit", unit: "102", date: "2026-05-22", time: "11:00 AM", type: "in-person", status: "confirmed" },
    { id: 2, renter: "Michael Chen", development: "Riverside Plaza", unit: "405", date: "2026-05-23", time: "02:30 PM", type: "virtual", status: "pending" },
    { id: 3, renter: "James Wilson", development: "Skyline Towers", unit: "201", date: "2026-05-24", time: "09:15 AM", type: "3d-self-guided", status: "pending" },
    { id: 4, renter: "Emma Thompson", development: "The Summit", unit: "304", date: "2026-05-20", time: "03:00 PM", type: "in-person", status: "completed" },
  ]);

  const handleStatusChange = (id, status) => {
    setViewings(prev => prev.map(v => v.id === id ? { ...v, status } : v));
    toast.success(`Viewing ${status}!`);
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "pending": return <Badge variant="warning">AWAITING CONFIRMATION</Badge>;
      case "confirmed": return <Badge variant="info">SCHEDULED</Badge>;
      case "completed": return <Badge variant="success">COMPLETED</Badge>;
      case "cancelled": return <Badge variant="danger">CANCELLED</Badge>;
      case "no-show": return <Badge variant="default">NO SHOW</Badge>;
      default: return <Badge>{status.toUpperCase()}</Badge>;
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case "virtual": return <HiOutlineVideoCamera className="w-4 h-4 text-purple-500" />;
      case "in-person": return <HiOutlineUser className="w-4 h-4 text-blue-500" />;
      case "3d-self-guided": return <HiOutlineVideoCamera className="w-4 h-4 text-indigo-500" />;
      default: return null;
    }
  };

  const columns = [
    {
      header: "Renter",
      render: (v) => <span className="font-bold text-slate-900 text-sm">{v.renter}</span>
    },
    {
      header: "Development & Unit",
      render: (v) => (
        <div>
          <div className="text-sm font-bold text-slate-900">{v.development}</div>
          <div className="text-[10px] text-slate-400 font-black uppercase tracking-widest mt-1">Unit {v.unit}</div>
        </div>
      )
    },
    {
      header: "Date & Time",
      render: (v) => (
        <div>
          <div className="flex items-center gap-2 text-slate-600 text-xs font-bold mb-1">
            <HiOutlineCalendar className="w-4 h-4 text-blue-600" />
            {v.date}
          </div>
          <div className="flex items-center gap-2 text-slate-400 text-[10px] font-black uppercase tracking-widest">
            <HiOutlineClock className="w-4 h-4" />
            {v.time}
          </div>
        </div>
      )
    },
    {
      header: "Type",
      render: (v) => (
        <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-slate-50 rounded-lg border border-slate-100">
          {getTypeIcon(v.type)}
          <span className="text-[10px] font-black uppercase tracking-widest text-slate-600">{v.type.replace("-", " ")}</span>
        </div>
      )
    },
    {
      header: "Status",
      render: (v) => getStatusBadge(v.status)
    },
    {
      header: "Actions",
      className: "text-right",
      render: (v) => (
        <div className="flex items-center justify-end gap-2">
          {v.status === "pending" && (
            <>
              <button onClick={() => handleStatusChange(v.id, "confirmed")} className="p-2.5 text-green-600 bg-green-50 rounded-xl hover:bg-green-600 hover:text-white transition-all shadow-sm" title="Confirm Viewing">
                <HiOutlineCheck className="w-5 h-5" />
              </button>
              <button onClick={() => handleStatusChange(v.id, "cancelled")} className="p-2.5 text-red-600 bg-red-50 rounded-xl hover:bg-red-600 hover:text-white transition-all shadow-sm" title="Cancel Viewing">
                <HiOutlineX className="w-5 h-5" />
              </button>
            </>
          )}
          {v.status === "confirmed" && (
            <>
              <button onClick={() => handleStatusChange(v.id, "completed")} className="p-2.5 text-blue-600 bg-blue-50 rounded-xl hover:bg-blue-600 hover:text-white transition-all shadow-sm" title="Mark Completed">
                <HiOutlineRefresh className="w-5 h-5" />
              </button>
              <button onClick={() => handleStatusChange(v.id, "no-show")} className="p-2.5 text-slate-400 bg-slate-50 rounded-xl hover:bg-slate-900 hover:text-white transition-all shadow-sm" title="Mark No-show">
                <HiOutlineBan className="w-5 h-5" />
              </button>
            </>
          )}
          <button className="p-2.5 text-slate-400 hover:text-slate-900 hover:bg-slate-50 rounded-xl transition-all">
            <HiOutlineDotsVertical className="w-5 h-5" />
          </button>
        </div>
      )
    }
  ];

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-bold text-slate-900 mb-2 font-display tracking-tight">Viewing Schedule</h1>
          <p className="text-slate-500 font-medium">Coordinate and manage property tours across all developments.</p>
        </div>
        <div className="flex gap-4">
          <button className="px-8 py-4 bg-white border-2 border-slate-100 rounded-2xl text-[10px] font-black uppercase tracking-widest text-slate-600 hover:text-blue-600 hover:border-blue-100 shadow-sm transition-all flex items-center gap-2">
            <HiOutlineCalendar className="w-4 h-4" />
            Calendar View
          </button>
        </div>
      </div>

      <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm flex flex-col md:flex-row gap-6">
        <div className="relative flex-1">
          <HiOutlineSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search by renter or development..."
            className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-4">
          <select className="px-8 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-xs font-black uppercase tracking-widest text-slate-600 outline-none hover:border-blue-200 transition-all cursor-pointer">
            <option>All Types</option>
            <option>In-Person</option>
            <option>Virtual</option>
            <option>3D Self-Guided</option>
          </select>
          <select className="px-8 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-xs font-black uppercase tracking-widest text-slate-600 outline-none hover:border-blue-200 transition-all cursor-pointer">
            <option>All Statuses</option>
            <option>Awaiting Confirmation</option>
            <option>Scheduled</option>
            <option>Completed</option>
          </select>
        </div>
      </div>

      <AdminTable 
        columns={columns} 
        data={viewings} 
        loading={false} 
        pagination={{ from: 1, to: 4, total: viewings.length }}
      />
    </div>
  );
}
