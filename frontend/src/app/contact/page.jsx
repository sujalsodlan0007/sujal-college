"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { 
  HiOutlineMail, 
  HiOutlinePhone, 
  HiOutlineLocationMarker,
  HiOutlineChatAlt2,
  HiOutlineArrowRight,
  HiOutlineCheckCircle
} from "react-icons/hi";
import Button from "@/components/common/Button";
import Input from "@/components/common/Input";
import { toast } from "react-hot-toast";

export default function ContactPage() {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API
    await new Promise(resolve => setTimeout(resolve, 1500));
    setLoading(false);
    setSubmitted(true);
    toast.success("Message sent successfully!");
  };

  return (
    <main className="min-h-screen pt-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="grid lg:grid-cols-2 gap-24 items-start">
          {/* Left Side: Info */}
          <div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <h1 className="text-5xl md:text-7xl font-bold text-slate-900 font-display tracking-tight leading-[1.1] mb-8">
                Let's start <br />
                <span className="text-blue-600 font-black">the conversation.</span>
              </h1>
              <p className="text-xl text-slate-500 font-medium leading-relaxed mb-12 max-w-lg">
                Whether you're looking for a new home or looking to optimize your portfolio, our team is ready to help.
              </p>

              <div className="space-y-10">
                {[
                  { icon: HiOutlineMail, title: "Email Us", detail: "hello@propertysense.co.uk", sub: "General enquiries & support" },
                  { icon: HiOutlinePhone, title: "Call Us", detail: "+44 (0) 20 7123 4567", sub: "Mon-Fri, 9am - 6pm GMT" },
                  { icon: HiOutlineLocationMarker, title: "Our Office", detail: "The Shard, London SE1 9SG", sub: "HQ & Innovation Lab" }
                ].map((item, i) => (
                  <div key={i} className="flex gap-6 items-start group">
                    <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center text-blue-600 border border-slate-100 group-hover:bg-blue-600 group-hover:text-white transition-all duration-500 shadow-sm">
                      <item.icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 mb-2">{item.title}</h4>
                      <p className="text-xl font-bold text-slate-900 mb-1 font-display">{item.detail}</p>
                      <p className="text-sm text-slate-500 font-medium">{item.sub}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Side: Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-slate-50 p-12 md:p-16 rounded-[4rem] border border-slate-100 shadow-2xl shadow-slate-200/50"
          >
            {submitted ? (
              <div className="text-center py-12">
                <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-8">
                  <HiOutlineCheckCircle className="w-12 h-12" />
                </div>
                <h3 className="text-3xl font-bold text-slate-900 mb-4 font-display">Message Sent!</h3>
                <p className="text-slate-500 font-medium text-lg mb-10">Our team will get back to you within 24 hours.</p>
                <Button onClick={() => setSubmitted(false)} variant="secondary" className="rounded-xl px-8 font-black uppercase tracking-widest text-[10px]">Send Another Message</Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid md:grid-cols-2 gap-6">
                  <Input label="First Name" placeholder="Alex" required />
                  <Input label="Last Name" placeholder="Smith" required />
                </div>
                <Input label="Email Address" type="email" placeholder="alex@example.com" required />
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">What are you looking for?</label>
                  <select className="w-full px-5 py-4 bg-white border border-slate-200 rounded-2xl text-slate-900 font-bold focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all appearance-none cursor-pointer">
                    <option>I'm looking for a home</option>
                    <option>I'm an operator/developer</option>
                    <option>Partnership Enquiry</option>
                    <option>Other</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Message</label>
                  <textarea 
                    rows={5} 
                    className="w-full px-5 py-4 bg-white border border-slate-200 rounded-2xl text-slate-900 font-bold focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
                    placeholder="How can we help you?"
                    required
                  />
                </div>
                <Button 
                  type="submit" 
                  isLoading={loading}
                  className="w-full py-6 rounded-2xl font-black uppercase tracking-widest text-xs shadow-2xl shadow-blue-200 flex items-center justify-center gap-3"
                >
                  Send Message
                  <HiOutlineArrowRight className="w-5 h-5" />
                </Button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </main>
  );
}
