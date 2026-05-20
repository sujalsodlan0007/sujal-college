"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { 
  HiOutlineLightningBolt, 
  HiOutlineShieldCheck, 
  HiOutlineUserGroup,
  HiOutlineSearch,
  HiOutlineChartBar,
  HiOutlineCube,
  HiOutlineDatabase,
  HiOutlineCloudUpload
} from "react-icons/hi";
import Button from "@/components/common/Button";

export default function PlatformPage() {
  const features = [
    {
      title: "Lifestyle Matching",
      desc: "Go beyond basic filters. Our AI matches renters with developments based on 50+ lifestyle data points.",
      icon: HiOutlineUserGroup,
      color: "bg-blue-600"
    },
    {
      title: "Inventory Sync",
      desc: "Direct integration with major CRMs and PMS systems for real-time unit availability.",
      icon: HiOutlineDatabase,
      color: "bg-indigo-600"
    },
    {
      title: "Place-3D Engine",
      desc: "Interactive 3D walkthroughs that let prospective tenants walk through their exact unit.",
      icon: HiOutlineCube,
      color: "bg-purple-600"
    },
    {
      title: "Smart Qualify",
      desc: "Automated lead qualification and credit pre-checks to reduce administrative overhead.",
      icon: HiOutlineShieldCheck,
      color: "bg-blue-500"
    }
  ];

  return (
    <main className="min-h-screen pt-24 bg-white">
      {/* Hero */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-30 radial-mask" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center space-x-2 bg-blue-50 border border-blue-100 px-4 py-1.5 rounded-full mb-8"
              >
                <span className="w-2 h-2 bg-blue-600 rounded-full animate-pulse" />
                <span className="text-blue-700 text-[10px] font-black tracking-widest uppercase">The PreLease AI Platform</span>
              </motion.div>
              <h1 className="text-5xl md:text-7xl font-bold text-slate-900 font-display tracking-tight leading-[1.1] mb-8">
                The OS for modern <br />
                <span className="text-blue-600 font-black">rental operations.</span>
              </h1>
              <p className="text-xl text-slate-500 font-medium leading-relaxed mb-12 max-w-lg">
                Property Sense combines advanced AI matching, 3D visualization, and automated leasing into a single, unified platform.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/contact">
                  <Button size="lg" className="rounded-2xl font-black px-12 py-6 text-xs uppercase tracking-widest shadow-2xl shadow-blue-200">Book Demo</Button>
                </Link>
                <Link href="/how-it-works">
                  <Button variant="secondary" size="lg" className="rounded-2xl font-black px-12 py-6 text-xs uppercase tracking-widest border-2">How it Works</Button>
                </Link>
              </div>
            </div>
            <div className="relative">
               <div className="bg-slate-900 rounded-[4rem] aspect-square p-8 shadow-2xl relative overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-transparent" />
                  {/* Abstract UI Elements */}
                  <div className="relative z-10 h-full flex flex-col justify-center space-y-8">
                     {[85, 92, 78].map((val, i) => (
                       <motion.div 
                        key={i}
                        initial={{ width: 0 }}
                        whileInView={{ width: '100%' }}
                        className="space-y-3"
                       >
                         <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-slate-400">
                           <span>Data Stream {i+1}</span>
                           <span className="text-blue-400">{val}% Sync</span>
                         </div>
                         <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                           <div style={{ width: `${val}%` }} className="h-full bg-blue-600 shadow-[0_0_20px_rgba(37,99,235,0.5)]" />
                         </div>
                       </motion.div>
                     ))}
                     <div className="pt-8 flex justify-center">
                        <div className="w-32 h-32 bg-blue-600 rounded-[2.5rem] flex items-center justify-center shadow-2xl shadow-blue-500/50 animate-bounce">
                           <HiOutlineLightningBolt className="w-16 h-16 text-white" />
                        </div>
                     </div>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-32 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-24">
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 font-display tracking-tight mb-6">Built for the future of BTR</h2>
            <p className="text-slate-500 text-lg font-medium max-w-2xl mx-auto">Every module is designed to increase conversion, reduce churn, and automate manual tasks.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -10 }}
                className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-xl shadow-slate-200/50"
              >
                <div className={`w-14 h-14 ${feature.color} text-white rounded-2xl flex items-center justify-center mb-8 shadow-lg`}>
                  <feature.icon className="w-6 h-6" />
                </div>
                <h4 className="text-xl font-bold text-slate-900 mb-4 font-display">{feature.title}</h4>
                <p className="text-sm text-slate-500 font-medium leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Integration Logos Simplified */}
      <section className="py-32 bg-white border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-12">Seamlessly integrated with</p>
          <div className="flex flex-wrap justify-center items-center gap-16 grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-700">
            {["Place-3D", "VerbaFlo", "M360", "Reapit", "Alto"].map(logo => (
              <span key={logo} className="text-2xl font-black text-slate-900 font-display">{logo}</span>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
