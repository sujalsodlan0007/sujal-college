"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { HiOutlineArrowRight, HiOutlineChatAlt2, HiOutlineHome, HiOutlineCheckCircle } from "react-icons/hi";
import Button from "@/components/common/Button";

export default function LettingsPage() {
  return (
    <main className="min-h-screen pt-24 bg-white">
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <div>
            <h1 className="text-5xl md:text-7xl font-bold text-slate-900 font-display tracking-tight leading-[1.1] mb-8">
              End-to-end <br />
              <span className="text-blue-600 font-black">lettings management.</span>
            </h1>
            <p className="text-xl text-slate-500 font-medium leading-relaxed mb-12">
              From lead generation to move-in day, our platform handles every aspect of the modern BTR lettings journey.
            </p>
            <div className="space-y-6 mb-12">
              {[
                "Automated tenant referencing",
                "Digital lease generation & signing",
                "Deposit protection integration",
                "First month rent collection",
                "Move-in day coordination"
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4 text-slate-700 font-bold text-sm uppercase tracking-widest">
                  <HiOutlineCheckCircle className="w-6 h-6 text-blue-600" />
                  {item}
                </div>
              ))}
            </div>
            <Link href="/contact">
              <Button size="lg" className="rounded-2xl px-12 py-6 font-black uppercase tracking-widest text-xs shadow-2xl shadow-blue-200">Book Demo</Button>
            </Link>
          </div>
          <div className="relative">
            <div className="bg-slate-50 rounded-[4rem] aspect-[4/5] overflow-hidden p-8 border border-slate-100">
               <div className="bg-white rounded-[2.5rem] p-8 shadow-xl border border-slate-100 h-full">
                  <div className="flex items-center justify-between mb-10">
                    <h4 className="text-xl font-bold font-display">Lease Status</h4>
                    <span className="px-4 py-1.5 bg-green-50 text-green-600 text-[10px] font-black uppercase tracking-widest rounded-lg">Active</span>
                  </div>
                  <div className="space-y-6">
                     {[1, 2, 3, 4].map(i => (
                       <div key={i} className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100">
                          <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center">
                             <HiOutlineHome className="text-blue-600 w-5 h-5" />
                          </div>
                          <div className="flex-1">
                             <div className="h-2 bg-slate-200 rounded-full w-24 mb-2" />
                             <div className="h-1.5 bg-slate-100 rounded-full w-32" />
                          </div>
                          <HiOutlineCheckCircle className="text-green-500 w-5 h-5" />
                       </div>
                     ))}
                  </div>
               </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
