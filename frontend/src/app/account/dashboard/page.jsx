"use client";

import { motion } from "framer-motion";
import { useAuth } from "@/context/AuthContext";
import StatsCard from "@/components/dashboard/StatsCard";
import ActivityFeed from "@/components/dashboard/ActivityFeed";
import Button from "@/components/common/Button";
import { 
  HiOutlineStar, 
  HiOutlineChatAlt2, 
  HiOutlineCalendar, 
  HiOutlineOfficeBuilding,
  HiOutlineArrowRight,
  HiOutlineLightningBolt,
  HiOutlineHeart
} from "react-icons/hi";
import Link from "next/link";

export default function Dashboard() {
  const { user } = useAuth();

  const stats = [
    { title: "Saved Properties", value: "12", icon: HiOutlineHeart, color: "bg-red-50 text-red-600 shadow-lg shadow-red-100" },
    { title: "Active Enquiries", value: "03", icon: HiOutlineChatAlt2, color: "bg-blue-50 text-blue-600 shadow-lg shadow-blue-100" },
    { title: "Upcoming Viewings", value: "01", icon: HiOutlineCalendar, color: "bg-indigo-50 text-indigo-600 shadow-lg shadow-indigo-100" },
    { title: "AI Matches", value: "24", icon: HiOutlineLightningBolt, color: "bg-amber-50 text-amber-600 shadow-lg shadow-amber-100" },
  ];

  return (
    <div className="space-y-16 pb-20">
      {/* Welcome Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-10">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <div className="inline-flex items-center space-x-2 bg-blue-50 border border-blue-100 px-4 py-1.5 rounded-full mb-6">
            <span className="w-2 h-2 bg-blue-600 rounded-full animate-pulse" />
            <span className="text-blue-700 text-[10px] font-black tracking-widest uppercase">Member Dashboard</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-slate-900 font-display tracking-tight leading-[1.1]">
            Welcome back, <br />
            <span className="text-blue-600 font-black">{user?.name?.split(' ')[0] || "Member"}!</span>
          </h1>
        </motion.div>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-slate-500 text-xl font-medium max-w-sm leading-relaxed"
        >
          Your lifestyle-matched property search is progressing perfectly. Here's what's happening.
        </motion.p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <StatsCard {...stat} />
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Recommended Section */}
        <div className="lg:col-span-8 space-y-10">
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-bold text-slate-900 font-display">Recommended for You</h3>
            <Link href="/find-a-home" className="text-[10px] font-black uppercase tracking-widest text-blue-600 hover:underline flex items-center gap-2 group">
              Explore More
              <HiOutlineArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {[1, 2].map((i) => (
              <Link href={`/developments/${i === 1 ? 'the-summit' : 'riverside-plaza'}`} key={i}>
                <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden hover:shadow-2xl hover:shadow-slate-100 transition-all duration-500 group">
                  <div className="relative h-56 overflow-hidden">
                    <img 
                      src={i === 1 ? "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=600&auto=format&fit=crop" : "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=600&auto=format&fit=crop"} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" 
                    />
                    <div className="absolute top-4 left-4 bg-blue-600 text-white px-3 py-1.5 rounded-full flex items-center gap-1 shadow-lg text-[10px] font-black uppercase tracking-widest">
                      <HiOutlineLightningBolt className="w-3 h-3" />
                      98% Match
                    </div>
                  </div>
                  <div className="p-8">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors font-display">{i === 1 ? "The Summit" : "Riverside Plaza"}</h4>
                      <span className="text-lg font-black text-slate-900">£{i === 1 ? '1,200' : '2,500'}</span>
                    </div>
                    <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mb-6">{i === 1 ? "Manchester, UK" : "London, UK"}</p>
                    <div className="flex gap-2">
                      {["Gym", "Concierge", "Roof Terrace"].map(tag => (
                        <span key={tag} className="px-3 py-1.5 bg-slate-50 text-[9px] font-black text-slate-400 rounded-lg uppercase tracking-widest border border-slate-100">{tag}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Recent Activity / Next Steps */}
        <div className="lg:col-span-4 space-y-12">
          <section className="space-y-8">
            <h3 className="text-2xl font-bold text-slate-900 font-display">Recent Activity</h3>
            <div className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm">
              <ActivityFeed 
                activities={[
                  { 
                    title: "Viewing Scheduled", 
                    description: "Your viewing for The Summit Unit 102 is confirmed.", 
                    timestamp: "2 hours ago", 
                    type: "viewing",
                    status: "upcoming"
                  },
                  { 
                    title: "Enquiry Sent", 
                    description: "Sent enquiry for Riverside Plaza.", 
                    timestamp: "Yesterday", 
                    type: "enquiry",
                    status: "pending"
                  },
                  { 
                    title: "Profile Verified", 
                    description: "Your identity documents have been approved.", 
                    timestamp: "2 days ago", 
                    type: "success",
                    status: "completed"
                  }
                ]}
              />
            </div>
          </section>

          <section className="space-y-8">
            <h3 className="text-2xl font-bold text-slate-900 font-display">Next Steps</h3>
            <div className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm space-y-8">
              {[
                { label: "Complete Profile", desc: "Add your employment details", icon: HiOutlineStar, color: "text-amber-500", bg: "bg-amber-50" },
                { label: "Schedule Viewing", desc: "The Summit (Unit 102)", icon: HiOutlineCalendar, color: "text-blue-500", bg: "bg-blue-50" },
                { label: "Check Enquiries", desc: "2 new responses received", icon: HiOutlineChatAlt2, color: "text-purple-500", bg: "bg-purple-50" },
              ].map((step, i) => (
                <div key={i} className="flex items-start gap-5 group cursor-pointer">
                  <div className={`w-12 h-12 rounded-2xl ${step.bg} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}>
                    <step.icon className={`w-6 h-6 ${step.color}`} />
                  </div>
                  <div>
                    <h5 className="font-bold text-slate-900 text-sm">{step.label}</h5>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">{step.desc}</p>
                  </div>
                </div>
              ))}
              <Button variant="secondary" className="w-full py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] border-2 mt-4">
                View All Tasks
              </Button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
