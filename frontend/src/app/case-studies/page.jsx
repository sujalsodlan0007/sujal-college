"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { HiOutlineArrowRight, HiOutlineOfficeBuilding, HiOutlineTrendingUp } from "react-icons/hi";
import Button from "@/components/common/Button";

export default function CaseStudiesPage() {
  const cases = [
    {
      title: "The Riverside Plaza",
      location: "London, UK",
      stat: "95% Lease-up in 4 months",
      desc: "How a 250-unit development achieved record-breaking stabilization using PreLease AI.",
      image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=800&auto=format&fit=crop"
    },
    {
      title: "Manchester Skyline",
      location: "Manchester, UK",
      stat: "40% Lower Acquisition Cost",
      desc: "Reducing marketing spend while increasing lead quality through lifestyle matching.",
      image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=800&auto=format&fit=crop"
    }
  ];

  return (
    <main className="min-h-screen pt-24 bg-white">
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-24">
          <h1 className="text-5xl md:text-7xl font-bold text-slate-900 font-display tracking-tight leading-[1.1] mb-8">
            Proven <br />
            <span className="text-blue-600 font-black">performance.</span>
          </h1>
          <p className="text-xl text-slate-500 font-medium max-w-2xl mx-auto">
            See how the UK's leading developers and operators are using Property Sense to transform their portfolios.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {cases.map((item, i) => (
            <motion.div 
              key={i}
              whileHover={{ y: -10 }}
              className="bg-slate-50 rounded-[4rem] overflow-hidden border border-slate-100 group cursor-pointer shadow-xl shadow-slate-100/50"
            >
              <div className="h-80 overflow-hidden relative">
                <img src={item.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                <div className="absolute top-8 left-8 bg-white/90 backdrop-blur-md px-6 py-3 rounded-2xl shadow-xl flex items-center gap-3">
                   <HiOutlineTrendingUp className="text-green-600 w-6 h-6" />
                   <span className="text-sm font-black uppercase tracking-widest text-slate-900">{item.stat}</span>
                </div>
              </div>
              <div className="p-12">
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-600 mb-4">{item.location}</p>
                <h3 className="text-3xl font-bold text-slate-900 font-display mb-6">{item.title}</h3>
                <p className="text-slate-500 font-medium text-lg leading-relaxed mb-10">{item.desc}</p>
                <div className="flex items-center text-slate-900 font-black uppercase tracking-widest text-xs group-hover:text-blue-600 transition-colors">
                  Read Case Study <HiOutlineArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-2 transition-transform" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </main>
  );
}
