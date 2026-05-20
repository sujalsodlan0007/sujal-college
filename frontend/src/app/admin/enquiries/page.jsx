"use client";

import { useState } from "react";
import { 
  HiOutlineSearch, 
  HiOutlineDotsVertical, 
  HiOutlineMail, 
  HiOutlinePhone,
  HiOutlineChatAlt2,
  HiOutlineEye,
  HiOutlineCheck,
  HiOutlineX
} from "react-icons/hi";
import Badge from "@/components/common/Badge";
import AdminTable from "@/components/admin/AdminTable";
import AdminDrawer from "@/components/admin/AdminDrawer";
import { cn } from "@/utils/cn";

export default function AdminEnquiries() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedEnquiry, setSelectedEnquiry] = useState(null);
  const [enquiries, setEnquiries] = useState([
    { id: 1, name: "Sarah Jenkins", email: "sarah.j@example.com", phone: "+44 7700 900123", development: "The Summit", unit: "102", status: "new", date: "2026-05-20", time: "10:30 AM", whatsapp_sent: true, qualified: true },
    { id: 2, name: "Michael Chen", email: "m.chen@example.com", phone: "+44 7700 900456", development: "Riverside Plaza", unit: "405", status: "qualified", date: "2026-05-19", time: "02:15 PM", whatsapp_sent: false, qualified: true },
    { id: 3, name: "James Wilson", email: "j.wilson@example.com", phone: "+44 7700 900789", development: "Skyline Towers", unit: "201", status: "viewing_scheduled", date: "2026-05-19", time: "09:00 AM", whatsapp_sent: true, qualified: false },
    { id: 4, name: "Emma Thompson", email: "emma.t@example.com", phone: "+44 7700 900111", development: "The Summit", unit: "304", status: "closed", date: "2026-05-18", time: "04:45 PM", whatsapp_sent: false, qualified: true },
  ]);

  const getStatusBadge = (status) => {
    switch (status) {
      case "new": return <Badge variant="info">NEW LEAD</Badge>;
      case "qualified": return <Badge variant="success">QUALIFIED</Badge>;
      case "viewing_scheduled": return <Badge variant="warning">VIEWING SET</Badge>;
      case "closed": return <Badge variant="default">CLOSED</Badge>;
      default: return <Badge>{status.toUpperCase()}</Badge>;
    }
  };

  const columns = [
    {
      header: "Renter",
      render: (enquiry) => (
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-black text-xs">
            {enquiry.name.charAt(0)}
          </div>
          <div className="font-bold text-slate-900 text-sm">{enquiry.name}</div>
        </div>
      )
    },
    {
      header: "Development & Unit",
      render: (enquiry) => (
        <div>
          <div className="text-sm font-bold text-slate-900">{enquiry.development}</div>
          <div className="text-[10px] text-slate-400 font-black uppercase tracking-widest mt-1">Unit {enquiry.unit}</div>
        </div>
      )
    },
    {
      header: "Contact",
      render: (enquiry) => (
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2 text-slate-600 text-xs font-bold">
            <HiOutlineMail className="w-3.5 h-3.5" />
            {enquiry.email}
          </div>
          <div className="flex items-center gap-2 text-slate-400 text-[10px] font-bold">
            <HiOutlinePhone className="w-3.5 h-3.5" />
            {enquiry.phone}
          </div>
        </div>
      )
    },
    {
      header: "WhatsApp",
      render: (enquiry) => (
        <Badge variant={enquiry.whatsapp_sent ? "success" : "default"}>
          {enquiry.whatsapp_sent ? "SENT" : "NOT SENT"}
        </Badge>
      )
    },
    {
      header: "Qualified",
      render: (enquiry) => (
        <div className={cn(
          "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest border",
          enquiry.qualified ? "bg-green-50 text-green-600 border-green-100" : "bg-red-50 text-red-600 border-red-100"
        )}>
          {enquiry.qualified ? <HiOutlineCheck className="w-3 h-3" /> : <HiOutlineX className="w-3 h-3" />}
          {enquiry.qualified ? "YES" : "NO"}
        </div>
      )
    },
    {
      header: "Status",
      render: (enquiry) => getStatusBadge(enquiry.status)
    },
    {
      header: "Date",
      render: (enquiry) => (
        <div>
          <div className="text-xs font-bold text-slate-900">{enquiry.date}</div>
          <div className="text-[10px] text-slate-400 font-black uppercase tracking-widest mt-1">{enquiry.time}</div>
        </div>
      )
    },
    {
      header: "Actions",
      className: "text-right",
      render: (enquiry) => (
        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button onClick={() => setSelectedEnquiry(enquiry)} className="p-2.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all" title="View Details">
            <HiOutlineEye className="w-5 h-5" />
          </button>
          <button className="p-2.5 text-slate-400 hover:text-green-600 hover:bg-green-50 rounded-xl transition-all" title="Send WhatsApp">
            <HiOutlineChatAlt2 className="w-5 h-5" />
          </button>
        </div>
      )
    }
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-slate-900 mb-2 font-display tracking-tight">Leads & Enquiries</h1>
        <p className="text-slate-500 font-medium">Manage and qualify renter enquiries across your portfolio.</p>
      </div>

      <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm flex flex-col md:flex-row gap-6">
        <div className="relative flex-1">
          <HiOutlineSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search enquiries by name or property..."
            className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-4">
          <select className="px-8 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-xs font-black uppercase tracking-widest text-slate-600 outline-none hover:border-blue-200 transition-all cursor-pointer">
            <option>All Statuses</option>
            <option>New Lead</option>
            <option>Qualified</option>
            <option>Viewing Set</option>
          </select>
          <select className="px-8 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-xs font-black uppercase tracking-widest text-slate-600 outline-none hover:border-blue-200 transition-all cursor-pointer">
            <option>All Qualification</option>
            <option>Qualified</option>
            <option>Not Qualified</option>
          </select>
        </div>
      </div>

      <AdminTable 
        columns={columns} 
        data={enquiries} 
        loading={false} 
        pagination={{ from: 1, to: 4, total: enquiries.length }}
      />

      <AdminDrawer
        isOpen={!!selectedEnquiry}
        onClose={() => setSelectedEnquiry(null)}
        title="Enquiry Details"
      >
        {selectedEnquiry && (
          <div className="space-y-10">
            <div className="flex items-center gap-6 p-6 bg-slate-50 rounded-[2rem] border border-slate-100">
              <div className="w-16 h-16 bg-blue-600 text-white rounded-2xl flex items-center justify-center font-black text-2xl shadow-lg shadow-blue-100">
                {selectedEnquiry.name.charAt(0)}
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900">{selectedEnquiry.name}</h3>
                <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mt-1">Lead ID: #ENQ-{selectedEnquiry.id}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="p-6 bg-white border border-slate-100 rounded-2xl">
                 <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mb-2">Email Address</p>
                 <p className="text-sm font-bold text-slate-900">{selectedEnquiry.email}</p>
              </div>
              <div className="p-6 bg-white border border-slate-100 rounded-2xl">
                 <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mb-2">Phone Number</p>
                 <p className="text-sm font-bold text-slate-900">{selectedEnquiry.phone}</p>
              </div>
            </div>

            <div className="space-y-4">
               <h4 className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Internal Notes</h4>
               <textarea 
                 rows={5}
                 className="w-full px-6 py-5 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold focus:outline-none focus:ring-2 focus:ring-blue-500/10 transition-all"
                 placeholder="Add a private note about this lead..."
               />
            </div>

            <div className="flex gap-4">
               <button className="flex-1 py-4 bg-blue-600 text-white rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-xl shadow-blue-100 hover:bg-blue-700 transition-all">
                  Qualify Lead
               </button>
               <button className="flex-1 py-4 bg-white border-2 border-slate-100 text-slate-600 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:border-blue-100 hover:text-blue-600 transition-all">
                  Close Lead
               </button>
            </div>
          </div>
        )}
      </AdminDrawer>
    </div>
  );
}
