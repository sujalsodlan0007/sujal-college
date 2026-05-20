"use client";

import { 
  HiOutlineOfficeBuilding, 
  HiOutlineChatAlt2, 
  HiOutlineCalendar, 
  HiOutlineUsers,
  HiOutlineTrendingUp,
  HiOutlineDotsVertical,
  HiOutlineArrowRight,
  HiOutlinePlus,
  HiOutlineDownload,
  HiOutlineCube
} from "react-icons/hi";
import { motion } from "framer-motion";
import Badge from "@/components/common/Badge";
import Link from "next/link";
import Button from "@/components/common/Button";

import ActivityFeed from "@/components/dashboard/ActivityFeed";

const StatCard = ({ title, value, change, icon: Icon, color }) => (
  <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-slate-100 transition-all duration-500 group">
    <div className="flex items-start justify-between mb-8">
      <div className={`p-4 rounded-2xl ${color} text-white shadow-lg shadow-slate-100 group-hover:scale-110 transition-transform`}>
        <Icon className="w-6 h-6" />
      </div>
      <div className="flex items-center text-green-600 text-[10px] font-black uppercase tracking-widest bg-green-50 px-3 py-1.5 rounded-lg border border-green-100">
        <HiOutlineTrendingUp className="mr-1.5 w-3.5 h-3.5" />
        +{change}%
      </div>
    </div>
    <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.2em] mb-2">{title}</p>
    <h4 className="text-4xl font-black text-slate-900 font-display tracking-tight">{value}</h4>
  </div>
);

export default function AdminDashboard() {
  const stats = [
    { title: "Developments", value: "24", change: "12", icon: HiOutlineOfficeBuilding, color: "bg-blue-600" },
    { title: "Total Units", value: "1,240", change: "15", icon: HiOutlineUsers, color: "bg-indigo-600" },
    { title: "Available Units", value: "452", change: "5", icon: HiOutlineCube, color: "bg-green-600" },
    { title: "Active Leads", value: "156", change: "8", icon: HiOutlineChatAlt2, color: "bg-purple-600" },
    { title: "Booked Tours", value: "89", change: "24", icon: HiOutlineCalendar, color: "bg-amber-600" },
    { title: "Reservations", value: "32", change: "18", icon: HiOutlineArrowRight, color: "bg-red-600" },
  ];

  const recentEnquiries = [
    { id: 1, user: "Sarah Jenkins", property: "The Summit", unit: "102", status: "new", date: "10 mins ago" },
    { id: 2, user: "Michael Chen", property: "Riverside Plaza", unit: "405", status: "responded", date: "2 hours ago" },
    { id: 3, user: "James Wilson", property: "Skyline Towers", unit: "201", status: "new", date: "5 hours ago" },
    { id: 4, user: "Emma Thompson", property: "The Summit", unit: "304", status: "closed", date: "Yesterday" },
  ];

  return (
    <div className="space-y-12 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
        <div>
          <h1 className="text-4xl font-bold text-slate-900 mb-2 font-display tracking-tight">Executive Dashboard</h1>
          <p className="text-slate-500 font-medium text-lg">Portfolio performance and operational insights.</p>
        </div>
        <div className="flex gap-4">
          <button className="px-6 py-4 bg-white border-2 border-slate-100 rounded-2xl text-[10px] font-black uppercase tracking-widest text-slate-600 hover:text-blue-600 hover:border-blue-100 shadow-sm transition-all flex items-center gap-2">
            <HiOutlineDownload className="w-4 h-4" />
            Export Data
          </button>
          <Link href="/admin/developments/new">
            <Button className="rounded-2xl px-8 py-4 font-black uppercase tracking-widest text-[10px] shadow-2xl shadow-blue-100 flex items-center gap-2">
              <HiOutlinePlus className="w-4 h-4" />
              New Property
            </Button>
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <StatCard {...stat} />
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Recent Enquiries Table */}
        <div className="lg:col-span-8 space-y-8">
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-bold text-slate-900 font-display">Recent Activity</h3>
            <Link href="/admin/enquiries" className="text-[10px] font-black uppercase tracking-widest text-blue-600 hover:underline flex items-center gap-2">
              View All Enquiries
              <HiOutlineArrowRight className="w-3 h-3" />
            </Link>
          </div>
          
          <div className="bg-white rounded-[3rem] border border-slate-100 shadow-sm overflow-hidden">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50/50 border-b border-slate-100">
                  <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Renter</th>
                  <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Property</th>
                  <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Status</th>
                  <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Time</th>
                  <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {recentEnquiries.map((enquiry) => (
                  <tr key={enquiry.id} className="hover:bg-slate-50/50 transition-colors group cursor-pointer">
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center font-black text-xs group-hover:bg-blue-600 group-hover:text-white transition-all">
                          {enquiry.user.charAt(0)}
                        </div>
                        <span className="font-bold text-slate-900 text-sm">{enquiry.user}</span>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="text-sm font-bold text-slate-900">{enquiry.property}</div>
                      <div className="text-[10px] text-slate-400 font-black uppercase tracking-widest mt-1">Unit {enquiry.unit}</div>
                    </td>
                    <td className="px-8 py-6">
                      <Badge variant={enquiry.status === "new" ? "info" : enquiry.status === "responded" ? "success" : "default"}>
                        {enquiry.status.toUpperCase()}
                      </Badge>
                    </td>
                    <td className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                      {enquiry.date}
                    </td>
                    <td className="px-8 py-6 text-right">
                      <button className="p-2.5 text-slate-400 hover:text-slate-900 transition-all rounded-xl hover:bg-slate-100">
                        <HiOutlineDotsVertical />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Actions & Activity Feed */}
        <div className="lg:col-span-4 space-y-10">
          <section className="space-y-8">
            <h3 className="text-2xl font-bold text-slate-900 font-display">Recent Activity</h3>
            <div className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm">
              <ActivityFeed 
                activities={[
                  { title: "New Enquiry", description: "Sarah Jenkins for The Summit Unit 102", timestamp: "2 mins ago", type: "enquiry" },
                  { title: "Viewing Confirmed", description: "Michael Chen for Riverside Plaza", timestamp: "1 hour ago", type: "viewing" },
                  { title: "Reservation Approved", description: "Emma Thompson for Skyline Towers", timestamp: "3 hours ago", type: "reservation" },
                  { title: "New User Joined", description: "James Wilson created a renter account", timestamp: "5 hours ago", type: "success" },
                ]}
              />
            </div>
          </section>

          <section className="space-y-8">
            <h3 className="text-2xl font-bold text-slate-900 font-display">Priority Tasks</h3>
            <div className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm space-y-6">
              {[
                { label: "Inventory Management", color: "bg-blue-600", desc: "Update unit availability", link: "/admin/developments" },
                { label: "Pending Viewings", color: "bg-amber-600", desc: "Review 12 new requests", link: "/admin/viewings" },
                { label: "Lead Qualification", color: "bg-purple-600", desc: "Process 8 qualified leads", link: "/admin/enquiries" },
                { label: "User Access", color: "bg-slate-900", desc: "Manage 4 pending staff accounts", link: "/admin/users" },
              ].map((action, i) => (
                <Link 
                  key={i}
                  href={action.link}
                  className="block p-6 rounded-2xl border-2 border-slate-50 hover:border-blue-100 hover:bg-blue-50/30 transition-all group"
                >
                  <div className="flex items-center gap-5">
                    <div className={`w-2 h-12 rounded-full ${action.color} shadow-lg shadow-slate-200`} />
                    <div>
                      <h5 className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors text-sm">{action.label}</h5>
                      <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mt-1">{action.desc}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
