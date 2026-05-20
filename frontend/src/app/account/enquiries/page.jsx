"use client";

import Badge from "@/components/common/Badge";
import EmptyState from "@/components/common/EmptyState";
import Timeline from "@/components/dashboard/Timeline";
import { HiOutlineChatAlt2, HiOutlineDotsVertical, HiOutlineChevronRight } from "react-icons/hi";
import { motion } from "framer-motion";

export default function Enquiries() {
  const enquiries = [
    { 
      id: 1, 
      property: "The Summit", 
      unit: "102", 
      status: "viewing_scheduled", 
      date: "May 15, 2026",
      lastMessage: "Your viewing for Unit 102 has been confirmed for May 22nd at 11:00 AM.",
      timeline: [
        { label: "Enquiry Sent", date: "May 10", completed: true },
        { label: "Viewing Scheduled", date: "May 15", completed: true },
        { label: "Viewing Completed", date: "May 22", active: true },
        { label: "Reservation Sent", date: "-", completed: false },
        { label: "Reservation Approved", date: "-", completed: false },
        { label: "Move-in", date: "-", completed: false },
      ]
    },
    { 
      id: 2, 
      property: "Skyline Towers", 
      unit: "402", 
      status: "awaiting_feedback", 
      date: "May 12, 2026",
      lastMessage: "I'm interested in the 2-bedroom unit. Is parking included?",
      timeline: [
        { label: "Enquiry Sent", date: "May 12", completed: true },
        { label: "Awaiting Feedback", date: "May 12", completed: false, active: true },
        { label: "Questionnaire Submitted", date: "-", completed: false },
      ]
    }
  ];

  const getStatusBadge = (status) => {
    switch (status) {
      case "viewing_scheduled": return <Badge variant="warning">VIEWING SET</Badge>;
      case "awaiting_feedback": return <Badge variant="info">AWAITING FEEDBACK</Badge>;
      case "reservation_complete": return <Badge variant="success">RESERVED</Badge>;
      default: return <Badge>{status.toUpperCase()}</Badge>;
    }
  };

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 mb-2 font-display tracking-tight">My Enquiries</h1>
        <p className="text-slate-500 font-medium">Track your application progress and conversations.</p>
      </div>

      {enquiries.length > 0 ? (
        <div className="space-y-8">
          {enquiries.map((enquiry) => (
            <div key={enquiry.id} className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden hover:shadow-xl hover:shadow-slate-100 transition-all duration-500 group">
              <div className="p-10">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
                  <div className="flex items-center gap-6">
                    <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center">
                      <HiOutlineChatAlt2 className="w-8 h-8" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors font-display tracking-tight">
                        {enquiry.property} • Unit {enquiry.unit}
                      </h3>
                      <p className="text-xs text-slate-400 font-black uppercase tracking-widest mt-1">Submitted on {enquiry.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    {getStatusBadge(enquiry.status)}
                    <button className="p-3 bg-slate-50 text-slate-400 rounded-xl hover:bg-slate-100 transition-all">
                      <HiOutlineDotsVertical className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {/* Timeline */}
                <div className="mb-10 px-2 overflow-x-auto no-scrollbar">
                  <Timeline steps={enquiry.timeline} />
                </div>

                <div className="bg-slate-50/50 p-8 rounded-[2rem] border border-slate-100 flex items-center justify-between group-hover:bg-white transition-all">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm">
                      <HiOutlineChatAlt2 className="w-5 h-5 text-blue-600" />
                    </div>
                    <p className="text-sm text-slate-600 font-medium italic">"{enquiry.lastMessage}"</p>
                  </div>
                  <button className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-600 hover:text-blue-700 transition-all flex items-center gap-2">
                    Open Chat
                    <HiOutlineChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <EmptyState 
          icon={HiOutlineChatAlt2}
          title="No enquiries yet" 
          description="Send an enquiry on any property page to start a conversation."
        />
      )}
    </div>
  );
}

