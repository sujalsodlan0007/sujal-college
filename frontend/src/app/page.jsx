"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { 
  HiOutlineLightningBolt, 
  HiOutlineShieldCheck, 
  HiOutlineUserGroup, 
  HiOutlineCheckCircle,
  HiOutlineOfficeBuilding,
  HiOutlineCursorClick,
  HiOutlineSearch,
  HiOutlineArrowRight
} from "react-icons/hi";
import Button from "@/components/common/Button";
import Input from "@/components/common/Input";

export default function Home() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <main className="min-h-screen">
      {/* 1. HERO SECTION */}
      <section className="relative min-h-screen flex items-center pt-24 pb-12 overflow-hidden bg-white">
        {/* Background Grid Pattern */}
        <div className="absolute inset-0 grid-pattern opacity-40 radial-mask" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left Content */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center space-x-2 bg-blue-50 border border-blue-100 px-4 py-2 rounded-full mb-10">
                <span className="w-2 h-2 bg-blue-600 rounded-full animate-pulse" />
                <span className="text-blue-700 text-xs font-black tracking-widest uppercase">Property Sense & PreLease AI</span>
              </div>

              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-slate-900 leading-[1.1] mb-10 font-display tracking-tight">
                Premium homes, <br />
                <span className="text-blue-600">intelligently matched.</span>
              </h1>
              
              <p className="text-xl text-slate-500 mb-10 leading-relaxed max-w-lg font-medium">
                The UK's leading B2B and B2C solution for modern rental living. We bridge the gap between premium Build-to-Rent developments and the perfect tenants.
              </p>

              {/* Quick Search Bar */}
              <div className="bg-white p-2 rounded-2xl shadow-2xl border border-slate-100 flex items-center gap-2 mb-12 max-w-xl group focus-within:ring-2 focus-within:ring-blue-500/20 transition-all">
                <div className="flex-1 flex items-center px-4 gap-3">
                  <HiOutlineSearch className="w-5 h-5 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
                  <input 
                    type="text" 
                    placeholder="Search by city or development..." 
                    className="w-full bg-transparent border-none outline-none py-3 text-sm font-bold text-slate-900 placeholder:text-slate-400"
                  />
                </div>
                <Link href="/find-a-home">
                  <Button className="rounded-xl px-8 py-3 font-black uppercase tracking-widest text-[10px] shadow-lg shadow-blue-100 flex items-center gap-2">
                    Search
                    <HiOutlineArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <Link href="/find-a-home">
                  <Button size="lg" className="w-full sm:w-auto px-10 rounded-xl font-black uppercase tracking-widest text-xs shadow-xl shadow-blue-200">
                    Find a Home
                  </Button>
                </Link>
                <Link href="/book-demo">
                  <Button variant="secondary" size="lg" className="w-full sm:w-auto px-10 rounded-xl font-black uppercase tracking-widest text-xs border-2">
                    Book a Demo
                  </Button>
                </Link>
              </div>

              <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
                {[
                  { icon: HiOutlineCheckCircle, text: "Verified Operators" },
                  { icon: HiOutlineCheckCircle, text: "AI-Powered Matching" },
                  { icon: HiOutlineCheckCircle, text: "Digital Onboarding" }
                ].map((item, i) => (
                  <div key={i} className="flex items-center space-x-2 text-slate-400 font-bold text-xs uppercase tracking-widest">
                    <item.icon className="text-blue-600 w-5 h-5" />
                    <span>{item.text}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Right Content - Animated Mockup */}
            <div className="relative lg:block">
              <motion.div
                initial={{ opacity: 0, scale: 0.9, rotate: 2 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="relative z-10 bg-white rounded-[3rem] p-5 shadow-2xl border border-slate-100 group"
              >
                <div className="relative rounded-[2.5rem] overflow-hidden aspect-[4/5]">
                  <img 
                    src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1200&auto=format&fit=crop" 
                    alt="Premium Home" 
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent" />
                  
                  {/* Match Badge */}
                  <div className="absolute top-8 left-8 bg-blue-600 text-white px-5 py-2.5 rounded-full font-black text-xs uppercase tracking-widest shadow-lg flex items-center space-x-2">
                    <HiOutlineLightningBolt className="w-4 h-4" />
                    <span>98% AI Match</span>
                  </div>

                  <div className="absolute bottom-10 left-10 right-10 text-white">
                    <h3 className="text-3xl font-bold mb-3 font-display">Riverside Plaza</h3>
                    <div className="flex items-center space-x-4 opacity-80 font-bold text-sm uppercase tracking-widest">
                      <span>London, UK</span>
                      <span className="w-1.5 h-1.5 bg-white/50 rounded-full" />
                      <span>From £2,500/mo</span>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Floating Cards */}
              <motion.div
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="absolute -top-6 -right-6 z-20 bg-white p-6 rounded-2xl shadow-2xl border border-slate-100 max-w-[260px] animate-float"
              >
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                    <HiOutlineUserGroup className="text-blue-600 w-5 h-5" />
                  </div>
                  <span className="font-black text-xs uppercase tracking-widest text-slate-900">PreLease AI</span>
                </div>
                <p className="text-sm text-slate-500 leading-relaxed font-bold">
                  "This development matches your preference for pet-friendly spaces and high-speed fiber."
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8, duration: 0.8 }}
                className="absolute -bottom-8 -left-8 z-20 bg-slate-900 text-white p-5 rounded-2xl shadow-2xl border border-slate-800 flex items-center space-x-5"
              >
                <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center">
                  <HiOutlineShieldCheck className="text-blue-400 w-7 h-7" />
                </div>
                <div>
                  <p className="text-xs font-black uppercase tracking-widest text-slate-400 mb-1">Status</p>
                  <p className="text-sm font-bold">Lease Confirmed</p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. DUAL JOURNEY SECTION */}
      <section className="py-32 bg-slate-50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 font-display tracking-tight">The Future of Rental Living</h2>
            <p className="text-slate-500 text-xl max-w-2xl mx-auto font-medium">Whether you're discovery your next home or optimizing your portfolio, our platform provides the intelligence you need.</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-10">
            {/* Renters Side */}
            <motion.div 
              whileHover={{ y: -10 }}
              className="group bg-white p-12 rounded-[3rem] shadow-xl shadow-slate-200 border border-slate-100 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:scale-110 transition-transform duration-700">
                <HiOutlineUserGroup className="w-64 h-64 text-blue-600" />
              </div>
              <div className="w-20 h-20 bg-blue-50 rounded-3xl flex items-center justify-center mb-10 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-500">
                <HiOutlineUserGroup className="text-blue-600 w-10 h-10 group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-3xl font-bold mb-6 text-slate-900 font-display tracking-tight">For Renters</h3>
              <p className="text-slate-500 text-lg mb-10 leading-relaxed font-medium">
                Find more than just a place to stay. Discover lifestyle-matched Build-to-Rent developments with virtual tours and instant reservations.
              </p>
              <ul className="space-y-4 mb-12">
                {["Lifestyle Matching", "3D Virtual Tours", "Direct Reservation", "Move-in Support"].map((item, i) => (
                  <li key={i} className="flex items-center space-x-3 text-sm font-bold text-slate-600 uppercase tracking-widest">
                    <HiOutlineCheckCircle className="text-blue-600 w-5 h-5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <Link href="/find-a-home">
                <Button size="lg" className="w-full rounded-2xl font-black uppercase tracking-widest text-xs py-5">
                  Find Your Home
                </Button>
              </Link>
            </motion.div>

            {/* Operators Side */}
            <motion.div 
              whileHover={{ y: -10 }}
              className="group bg-slate-900 p-12 rounded-[3rem] shadow-2xl text-white relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-8 opacity-[0.05] group-hover:scale-110 transition-transform duration-700">
                <HiOutlineOfficeBuilding className="w-64 h-64 text-white" />
              </div>
              <div className="w-20 h-20 bg-white/10 rounded-3xl flex items-center justify-center mb-10 group-hover:bg-blue-600 transition-colors duration-500">
                <HiOutlineOfficeBuilding className="text-blue-400 w-10 h-10 group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-3xl font-bold mb-6 font-display tracking-tight">For Operators</h3>
              <p className="text-slate-300 text-lg mb-10 leading-relaxed font-medium">
                Automate your leasing funnel. Our AI pre-qualifies tenants based on lifestyle and financial data, increasing conversion and retention.
              </p>
              <ul className="space-y-4 mb-12">
                {["Lead Qualification", "Inventory Management", "Marketing Suite", "Performance Analytics"].map((item, i) => (
                  <li key={i} className="flex items-center space-x-3 text-sm font-bold text-slate-400 uppercase tracking-widest">
                    <HiOutlineCheckCircle className="text-blue-400 w-5 h-5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <Link href="/book-demo">
                <Button size="lg" className="w-full rounded-2xl font-black uppercase tracking-widest text-xs py-5 bg-blue-600 border-none shadow-xl shadow-blue-900/50">
                  Book a Demo
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 3. HOW IT WORKS SECTION */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-20 items-center mb-32">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-8 font-display tracking-tight">How It Works</h2>
              <p className="text-slate-500 text-xl mb-12 font-medium leading-relaxed">We've simplified the complex leasing journey into three intelligent steps for both renters and operators.</p>
              
              <div className="space-y-12">
                {[
                  { 
                    step: "01", 
                    title: "Preference Capture", 
                    desc: "Input your lifestyle needs, budget, and location. Our AI builds your unique renter profile.",
                    icon: HiOutlineCursorClick
                  },
                  { 
                    step: "02", 
                    title: "AI Matching", 
                    desc: "PreLease AI scans thousands of premium units to find your perfect match with 95%+ accuracy.",
                    icon: HiOutlineLightningBolt
                  },
                  { 
                    step: "03", 
                    title: "Digital Secure", 
                    desc: "Book a 3D viewing, chat with the operator, and secure your home with a digital reservation.",
                    icon: HiOutlineShieldCheck
                  }
                ].map((item, i) => (
                  <div key={i} className="flex items-start space-x-6">
                    <div className="flex-shrink-0 w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 font-black text-xl font-display">
                      <item.icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-slate-900 mb-2 font-display">{item.title}</h4>
                      <p className="text-slate-500 font-medium leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-slate-900 rounded-[3rem] p-8 shadow-2xl overflow-hidden aspect-square flex items-center justify-center">
                {/* Mockup UI for Matching Engine */}
                <div className="w-full space-y-6">
                  {[80, 60, 95].map((width, i) => (
                    <motion.div 
                      key={i}
                      initial={{ width: 0 }}
                      whileInView={{ width: `${width}%` }}
                      transition={{ duration: 1, delay: i * 0.2 }}
                      className="h-12 bg-blue-600/20 border border-blue-600/30 rounded-2xl flex items-center px-6 justify-between overflow-hidden"
                    >
                      <span className="text-blue-400 font-black text-xs uppercase tracking-widest">Matching Data {i+1}</span>
                      <span className="text-blue-400 font-bold">{width}%</span>
                    </motion.div>
                  ))}
                  <div className="pt-10 flex justify-center">
                    <div className="w-48 h-48 rounded-full border-4 border-blue-600 border-t-transparent animate-spin flex items-center justify-center">
                      <div className="w-32 h-32 rounded-full bg-blue-600 flex items-center justify-center shadow-2xl shadow-blue-500/50">
                        <HiOutlineLightningBolt className="text-white w-16 h-16" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. PRICING SECTION (Simplified) */}
      <section className="py-32 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 font-display tracking-tight">Flexible Packages</h2>
          <p className="text-slate-500 text-xl mb-20 font-medium">Tailored solutions for every scale of operation.</p>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: "Lite", price: "£499", desc: "For boutique developments", features: ["10 Unit Listings", "Standard Support", "Basic Analytics"] },
              { name: "Professional", price: "£1,299", desc: "For mid-size portfolios", features: ["Unlimited Listings", "Priority Support", "PreLease AI Matching", "CRM Integration"], featured: true },
              { name: "Enterprise", price: "Custom", desc: "For national operators", features: ["White-label App", "Dedicated Manager", "Full API Access", "Custom Integrations"] }
            ].map((plan, i) => (
              <div 
                key={i} 
                className={`p-10 rounded-[2.5rem] bg-white border ${plan.featured ? 'border-blue-600 ring-4 ring-blue-50 shadow-2xl' : 'border-slate-100 shadow-xl'} text-left flex flex-col`}
              >
                {plan.featured && <span className="text-blue-600 font-black text-[10px] uppercase tracking-[0.2em] mb-4">Most Popular</span>}
                <h3 className="text-2xl font-bold text-slate-900 mb-2 font-display">{plan.name}</h3>
                <p className="text-slate-500 text-sm mb-8 font-bold uppercase tracking-widest">{plan.desc}</p>
                <div className="mb-10">
                  <span className="text-4xl font-bold text-slate-900">{plan.price}</span>
                  {plan.price !== "Custom" && <span className="text-slate-400 text-lg font-medium">/mo</span>}
                </div>
                <ul className="space-y-4 mb-12 flex-grow">
                  {plan.features.map((feature, j) => (
                    <li key={j} className="flex items-center space-x-3 text-sm font-bold text-slate-600">
                      <HiOutlineCheckCircle className="text-blue-600 w-5 h-5 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link href={plan.price === "Custom" ? "/book-demo" : "/register"} className="block w-full">
                  <Button variant={plan.featured ? "primary" : "secondary"} className="w-full rounded-xl py-4 font-black uppercase tracking-widest text-xs">
                    {plan.price === "Custom" ? "Contact Us" : "Get Started"}
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. TESTIMONIALS SECTION */}
      <section className="py-32 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 font-display tracking-tight uppercase italic">Trusted by Industry Leaders</h2>
            <p className="text-slate-500 text-xl max-w-2xl mx-auto font-medium">Join hundreds of premium developments optimizing their leasing with PreLease AI.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { 
                name: "Alexander Wright", 
                role: "Operations Director, Urban Living", 
                content: "PreLease AI transformed our leasing process. We've seen a 40% increase in qualified leads and significantly reduced our time-to-lease.",
                image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&auto=format&fit=crop"
              },
              { 
                name: "Sarah Montgomery", 
                role: "Marketing Head, Prime Estates", 
                content: "The AI matching is scarily accurate. Renters arrive for viewings already knowing the unit is perfect for them. It's a game changer.",
                image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop"
              },
              { 
                name: "David Chen", 
                role: "CEO, Skyline Portfolios", 
                content: "The most comprehensive B2B solution we've found. The 3D tours and digital reservation flow are exactly what the modern market demands.",
                image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop"
              }
            ].map((testimonial, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -10 }}
                className="bg-slate-50 p-10 rounded-[3rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-500"
              >
                <div className="flex items-center gap-4 mb-8">
                  <img src={testimonial.image} className="w-14 h-14 rounded-2xl object-cover shadow-lg" alt={testimonial.name} />
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">{testimonial.name}</h4>
                    <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mt-1">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-slate-600 font-medium leading-relaxed italic">"{testimonial.content}"</p>
                <div className="flex gap-1 mt-8">
                  {[1, 2, 3, 4, 5].map(star => (
                    <HiOutlineCheckCircle key={star} className="text-blue-600 w-4 h-4" />
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. CTA SECTION */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-blue-600 rounded-[4rem] p-16 md:p-24 text-center text-white relative overflow-hidden shadow-2xl shadow-blue-200">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="relative z-10"
            >
              <h2 className="text-4xl md:text-6xl font-bold mb-10 font-display tracking-tight">Ready to transform <br /> your rental journey?</h2>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Link href="/find-a-home">
                  <Button size="lg" className="bg-white text-blue-600 hover:bg-slate-50 w-full sm:w-auto px-12 rounded-2xl font-black uppercase tracking-widest text-xs py-6 border-none shadow-xl">
                    Find a Home
                  </Button>
                </Link>
                <Link href="/book-demo">
                  <Button size="lg" className="bg-blue-700 text-white hover:bg-blue-800 w-full sm:w-auto px-12 rounded-2xl font-black uppercase tracking-widest text-xs py-6 border-none shadow-xl">
                    Book a Demo
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
}
