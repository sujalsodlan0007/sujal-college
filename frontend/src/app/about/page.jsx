"use client";

import { motion } from "framer-motion";
import { HiOutlineLightBulb, HiOutlineUsers, HiOutlineGlobe, HiOutlineShieldCheck } from "react-icons/hi";

export default function AboutPage() {
  return (
    <main className="min-h-screen pt-24 bg-white">
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold text-slate-900 font-display tracking-tight leading-[1.1] mb-8">
              Redefining the <br />
              <span className="text-blue-600 font-black">rental experience.</span>
            </h1>
            <p className="text-xl text-slate-500 font-medium max-w-2xl mx-auto">
              Property Sense was founded with a single mission: to use technology to bridge the gap between premium Build-to-Rent developments and the modern tenant.
            </p>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-2 gap-24 items-center mb-32">
          <div className="bg-slate-50 rounded-[4rem] aspect-square overflow-hidden border border-slate-100 p-2">
             <img 
               src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1000&auto=format&fit=crop" 
               className="w-full h-full object-cover rounded-[3.8rem]" 
             />
          </div>
          <div className="space-y-10">
            <h2 className="text-4xl font-bold text-slate-900 font-display">Our Vision</h2>
            <p className="text-lg text-slate-600 leading-relaxed font-medium">
              We believe that finding a home should be an intelligent, stress-free process. By combining AI-driven lifestyle matching with immersive 3D technology, we're building the future of property leasing.
            </p>
            <div className="grid grid-cols-2 gap-8">
               {[
                 { label: "Innovation", icon: HiOutlineLightBulb },
                 { label: "Community", icon: HiOutlineUsers },
                 { label: "Transparency", icon: HiOutlineShieldCheck },
                 { label: "Global Reach", icon: HiOutlineGlobe }
               ].map((item, i) => (
                 <div key={i} className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 shadow-sm">
                       <item.icon className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-black uppercase tracking-widest text-slate-900">{item.label}</span>
                 </div>
               ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
