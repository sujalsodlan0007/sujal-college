"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { 
  HiOutlineSearch, 
  HiOutlineLightningBolt, 
  HiOutlineShieldCheck, 
  HiOutlineUserGroup,
  HiOutlineCheckCircle,
  HiOutlineCursorClick,
  HiOutlineHeart,
  HiOutlineClipboardList
} from "react-icons/hi";
import Button from "@/components/common/Button";

export default function HowItWorksPage() {
  const steps = [
    {
      number: "01",
      title: "Preference Discovery",
      desc: "Tell us about your lifestyle, commute, budget, and must-have amenities. Our AI builds a unique profile beyond just bedrooms and price.",
      icon: HiOutlineCursorClick,
      color: "bg-blue-600"
    },
    {
      number: "02",
      title: "AI Lifestyle Matching",
      desc: "PreLease AI scans thousands of premium units to find your perfect match with 95%+ accuracy based on 50+ data points.",
      icon: HiOutlineLightningBolt,
      color: "bg-indigo-600"
    },
    {
      number: "03",
      title: "3D Virtual Tours",
      desc: "Walk through your matched units in immersive 3D powered by Place-3D. See the exact views and floorplans from your sofa.",
      icon: HiOutlineSearch,
      color: "bg-purple-600"
    },
    {
      number: "04",
      title: "Instant Reservation",
      desc: "Found the one? Reserve it instantly through our secure digital platform. No paperwork, no stress, just your new home.",
      icon: HiOutlineShieldCheck,
      color: "bg-blue-500"
    }
  ];

  return (
    <main className="min-h-screen pt-24">
      {/* Hero Section */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-30" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-bold text-slate-900 font-display tracking-tight leading-[1.1] mb-8">
              The intelligence <br />
              <span className="text-blue-600 font-black">behind the match.</span>
            </h1>
            <p className="text-xl text-slate-500 font-medium leading-relaxed">
              We've replaced the traditional, stressful leasing journey with an intelligent, AI-powered experience.
            </p>
          </div>
        </div>
      </section>

      {/* Steps Section */}
      <section className="py-32 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-24">
            {steps.map((step, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className={`flex flex-col lg:flex-row items-center gap-16 ${i % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}
              >
                <div className="lg:w-1/2">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white border border-slate-100 shadow-xl text-blue-600 font-black text-2xl mb-8 font-display">
                    {step.number}
                  </div>
                  <h2 className="text-4xl md:text-5xl font-bold text-slate-900 font-display tracking-tight mb-6">{step.title}</h2>
                  <p className="text-xl text-slate-500 font-medium leading-relaxed mb-10">{step.desc}</p>
                  <ul className="space-y-4">
                    {[1, 2, 3].map((_, j) => (
                      <li key={j} className="flex items-center gap-3 text-slate-700 font-bold text-sm uppercase tracking-widest">
                        <HiOutlineCheckCircle className="w-5 h-5 text-blue-600" />
                        <span>Proprietary Matching Point {j+1}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="lg:w-1/2 w-full">
                  <div className={`aspect-video rounded-[3rem] ${step.color} p-1 shadow-2xl overflow-hidden relative group`}>
                    <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-slate-900/0 transition-colors" />
                    <img 
                      src={`https://images.unsplash.com/photo-1556761175-b413da4baf72?q=80&w=1000&auto=format&fit=crop`} 
                      className="w-full h-full object-cover rounded-[2.9rem] mix-blend-overlay opacity-60" 
                      alt={step.title}
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <step.icon className="w-24 h-24 text-white drop-shadow-2xl" />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Matching Engine Deep Dive */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-slate-900 rounded-[4rem] p-12 md:p-24 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 p-12 opacity-10">
              <HiOutlineLightningBolt className="w-64 h-64 text-white" />
            </div>
            <div className="relative z-10 grid lg:grid-cols-2 gap-20 items-center">
              <div>
                <h2 className="text-4xl md:text-5xl font-bold font-display tracking-tight mb-8">The PreLease AI <br /> Matching Engine.</h2>
                <p className="text-slate-400 text-lg leading-relaxed mb-12">
                  Our algorithm doesn't just look at what you want; it looks at who you are. We analyze 50+ lifestyle data points to predict your long-term satisfaction in a property.
                </p>
                <div className="grid grid-cols-2 gap-8">
                  {[
                    { label: "Lifestyle Fit", pts: "30" },
                    { label: "Budget Match", pts: "25" },
                    { label: "Move Timeline", pts: "20" },
                    { label: "Amenity Score", pts: "25" }
                  ].map((item, i) => (
                    <div key={i} className="space-y-2">
                      <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-slate-500">
                        <span>{item.label}</span>
                        <span className="text-blue-400">{item.pts} pts</span>
                      </div>
                      <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          whileInView={{ width: `${item.pts}%` }}
                          className="h-full bg-blue-600" 
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[3rem] p-10">
                <h4 className="text-xl font-bold mb-8 font-display">AI Compatibility Report</h4>
                <div className="space-y-6">
                   {[1, 2, 3].map((_, i) => (
                     <div key={i} className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/5">
                        <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center font-black text-xs">9{8-i}%</div>
                        <div>
                           <p className="text-xs font-bold">Property Match Insight #{i+1}</p>
                           <p className="text-[10px] text-slate-500 font-medium mt-1">Based on your gym and co-working preferences.</p>
                        </div>
                     </div>
                   ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 bg-slate-50 text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-6xl font-bold text-slate-900 mb-10 font-display tracking-tight leading-tight">Ready to find your <br /> perfect match?</h2>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link href="/register">
              <Button size="lg" className="w-full sm:w-auto px-12 rounded-2xl font-black uppercase tracking-widest text-xs py-6 shadow-2xl shadow-blue-200">
                Start My Profile
              </Button>
            </Link>
            <Link href="/find-a-home">
              <Button variant="secondary" size="lg" className="w-full sm:w-auto px-12 rounded-2xl font-black uppercase tracking-widest text-xs py-6 border-2">
                Browse Developments
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
