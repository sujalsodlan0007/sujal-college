"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { 
  HiOutlineOfficeBuilding, 
  HiOutlineLightningBolt, 
  HiOutlineChartBar, 
  HiOutlineShieldCheck,
  HiOutlineUserGroup,
  HiOutlineCheckCircle,
  HiOutlineArrowRight,
  HiOutlineDatabase,
  HiOutlineDesktopComputer
} from "react-icons/hi";
import Button from "@/components/common/Button";

export default function OperatorsPage() {
  return (
    <main className="min-h-screen pt-24">
      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden bg-white">
        <div className="absolute inset-0 grid-pattern opacity-30 radial-mask" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center space-x-2 bg-blue-50 border border-blue-100 px-4 py-1.5 rounded-full mb-8"
            >
              <span className="w-2 h-2 bg-blue-600 rounded-full animate-pulse" />
              <span className="text-blue-700 text-[10px] font-black tracking-widest uppercase">For Operators & Developers</span>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-7xl font-bold text-slate-900 font-display tracking-tight leading-[1.1] mb-8"
            >
              Lease up faster with <br />
              <span className="text-blue-600 font-black">AI-qualified leads.</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-slate-500 font-medium leading-relaxed mb-12 max-w-2xl mx-auto"
            >
              Property Sense provides Build-to-Rent operators with a complete marketing and leasing engine powered by PreLease AI.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link href="/contact">
                <Button size="lg" className="w-full sm:w-auto px-12 rounded-2xl font-black uppercase tracking-widest text-xs py-6 shadow-2xl shadow-blue-200">
                  Book a Demo
                </Button>
              </Link>
              <Link href="/pricing">
                <Button variant="secondary" size="lg" className="w-full sm:w-auto px-12 rounded-2xl font-black uppercase tracking-widest text-xs py-6 border-2">
                  View Pricing
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Core Benefits Grid */}
      <section className="py-32 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 font-display tracking-tight mb-6">The Operator Advantage</h2>
            <p className="text-slate-500 text-lg font-medium max-w-2xl mx-auto">Our platform handles the heavy lifting, from inventory management to tenant pre-qualification.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-10">
            {[
              {
                title: "AI Lead Scoring",
                desc: "PreLease AI scores every lead based on lifestyle, budget, and move-in timeline before they even reach your inbox.",
                icon: HiOutlineLightningBolt,
                color: "bg-blue-600"
              },
              {
                title: "Live Inventory",
                desc: "Real-time unit availability sync with Place-3D and your CRM. Never double-book or show an unavailable unit.",
                icon: HiOutlineDatabase,
                color: "bg-indigo-600"
              },
              {
                title: "Digital Onboarding",
                desc: "Seamless move-in process with digital lease signing, automated references, and instant deposit payments.",
                icon: HiOutlineDesktopComputer,
                color: "bg-purple-600"
              }
            ].map((benefit, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -10 }}
                className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-xl shadow-slate-200/50 group"
              >
                <div className={`w-16 h-16 ${benefit.color} text-white rounded-2xl flex items-center justify-center mb-8 shadow-lg group-hover:scale-110 transition-transform`}>
                  <benefit.icon className="w-8 h-8" />
                </div>
                <h4 className="text-2xl font-bold text-slate-900 mb-4 font-display">{benefit.title}</h4>
                <p className="text-slate-500 font-medium leading-relaxed mb-8">{benefit.desc}</p>
                <div className="flex items-center text-blue-600 text-[10px] font-black uppercase tracking-widest">
                  Learn More <HiOutlineArrowRight className="ml-2 w-4 h-4" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Place-3D Section */}
      <section className="py-32 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div>
              <h2 className="text-4xl md:text-6xl font-bold text-slate-900 font-display tracking-tight leading-tight mb-8">
                Immersive 3D <br />
                <span className="text-blue-600 font-black">Digital Twins.</span>
              </h2>
              <p className="text-xl text-slate-500 font-medium leading-relaxed mb-10">
                Give your prospective tenants the ultimate viewing experience. Our integration with Place-3D allows renters to walk through every unit from anywhere in the world.
              </p>
              <ul className="space-y-6 mb-12">
                {[
                  "Virtual Walkthroughs for every unit",
                  "Real-time sunlight & view simulations",
                  "Integrated 'Reserve Now' buttons in 3D",
                  "Reduced site visits by 65%"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-4 text-slate-700 font-bold text-sm uppercase tracking-widest">
                    <HiOutlineCheckCircle className="w-6 h-6 text-blue-600" />
                    {item}
                  </li>
                ))}
              </ul>
              <Button size="lg" className="rounded-2xl font-black px-10">See 3D Demo</Button>
            </div>
            <div className="relative">
              <div className="bg-slate-900 rounded-[4rem] aspect-[4/5] p-2 shadow-2xl overflow-hidden relative group">
                 <img 
                   src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=1000&auto=format&fit=crop" 
                   className="w-full h-full object-cover rounded-[3.8rem] opacity-80 group-hover:scale-105 transition-transform duration-1000" 
                 />
                 <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-24 h-24 bg-white/20 backdrop-blur-xl rounded-full flex items-center justify-center group-hover:scale-110 transition-transform cursor-pointer">
                       <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-2xl">
                          <HiOutlineLightningBolt className="w-8 h-8 text-blue-600" />
                       </div>
                    </div>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h2 className="text-4xl md:text-6xl font-bold mb-10 font-display tracking-tight leading-tight">
            Scale your leasing operations <br /> with intelligence.
          </h2>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link href="/contact">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white border-none w-full sm:w-auto px-12 rounded-2xl font-black uppercase tracking-widest text-xs py-6 shadow-2xl shadow-blue-900/50">
                Book a Demo
              </Button>
            </Link>
            <Link href="/platform">
              <Button variant="secondary" size="lg" className="bg-white/10 hover:bg-white/20 text-white border-white/20 w-full sm:w-auto px-12 rounded-2xl font-black uppercase tracking-widest text-xs py-6">
                Explore Platform
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
