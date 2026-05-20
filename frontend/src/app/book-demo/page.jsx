"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { 
  HiOutlineCalendar, 
  HiOutlineCheckCircle, 
  HiOutlineArrowRight,
  HiOutlineMail,
  HiOutlineOfficeBuilding,
  HiOutlineUserGroup
} from "react-icons/hi";
import Input from "@/components/common/Input";
import Button from "@/components/common/Button";
import { toast } from "react-hot-toast";

export default function BookDemoPage() {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    companyName: "",
    email: "",
    phone: "",
    role: "",
    companySize: "",
    message: ""
  });

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      setSubmitted(true);
      toast.success("Demo request sent successfully!");
    } catch (error) {
      toast.error("Failed to send request. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen pt-32 pb-20 flex items-center justify-center px-4">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-xl w-full text-center"
        >
          <div className="w-24 h-24 bg-green-50 text-green-600 rounded-[2.5rem] flex items-center justify-center mx-auto mb-10 shadow-2xl shadow-green-100">
            <HiOutlineCheckCircle className="w-12 h-12" />
          </div>
          <h1 className="text-5xl font-black text-slate-900 mb-6 font-display tracking-tight leading-tight italic uppercase">Demo Requested!</h1>
          <p className="text-xl text-slate-500 font-medium mb-12 leading-relaxed">
            Thank you for your interest. One of our product specialists will reach out within 24 hours to schedule your personalized tour of PreLease AI.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button href="/" className="px-10 py-5 rounded-[2rem] font-black uppercase tracking-widest text-xs shadow-2xl shadow-blue-100">
              Back to Home
            </Button>
            <Button href="/operators" variant="secondary" className="px-10 py-5 rounded-[2rem] font-black uppercase tracking-widest text-xs border-2">
              View Solutions
            </Button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 pb-20 bg-slate-50/50 overflow-hidden relative">
      {/* Decorative background */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-blue-600/5 -skew-x-12 translate-x-1/4" />
      
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <div>
            <div className="inline-flex items-center gap-3 px-6 py-2 bg-blue-50 text-blue-600 rounded-full text-xs font-black uppercase tracking-[0.2em] mb-8">
              <HiOutlineCalendar className="w-4 h-4" />
              Book a personalized tour
            </div>
            <h1 className="text-6xl xl:text-7xl font-black text-slate-900 mb-10 font-display tracking-tighter leading-[1.1] italic uppercase">
              See PreLease AI <br />
              <span className="text-blue-600">In Action</span>
            </h1>
            <p className="text-xl text-slate-500 font-medium mb-12 max-w-lg leading-relaxed">
              Discover how our AI-driven ecosystem transforms property management from lead capture to reservation.
            </p>

            <div className="space-y-10">
              {[
                { label: "Personalized Workflow", icon: HiOutlineUserGroup, desc: "See how we tailor our AI to your specific development portfolio." },
                { label: "CRM Integration", icon: HiOutlineOfficeBuilding, desc: "Watch how leads flow seamlessly into your existing stack." },
                { label: "Interactive Demos", icon: HiOutlineMail, desc: "Get hands-on with our renter experience and 3D virtual tours." },
              ].map((feature, i) => (
                <div key={i} className="flex gap-6 items-start group">
                  <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg shadow-slate-100 group-hover:scale-110 transition-transform">
                    <feature.icon className="w-7 h-7 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-black text-slate-900 text-lg mb-2 uppercase tracking-tight">{feature.label}</h4>
                    <p className="text-slate-400 font-bold text-sm leading-relaxed">{feature.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white p-10 md:p-16 rounded-[4rem] border border-slate-100 shadow-2xl shadow-slate-200/50"
          >
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid md:grid-cols-2 gap-8">
                <Input label="First Name" name="firstName" value={formData.firstName} onChange={handleChange} required placeholder="John" />
                <Input label="Last Name" name="lastName" value={formData.lastName} onChange={handleChange} required placeholder="Doe" />
              </div>
              <Input label="Business Email" type="email" name="email" value={formData.email} onChange={handleChange} required placeholder="john@company.com" />
              <div className="grid md:grid-cols-2 gap-8">
                <Input label="Company Name" name="companyName" value={formData.companyName} onChange={handleChange} required placeholder="Property Group" />
                <Input label="Phone Number" name="phone" value={formData.phone} onChange={handleChange} required placeholder="+44 ..." />
              </div>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Your Role</label>
                  <select 
                    name="role" 
                    value={formData.role} 
                    onChange={handleChange}
                    className="w-full px-6 py-5 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold focus:outline-none focus:ring-2 focus:ring-blue-500/10 transition-all appearance-none cursor-pointer"
                    required
                  >
                    <option value="">Select Role</option>
                    <option value="owner">Owner / Principal</option>
                    <option value="director">Leasing Director</option>
                    <option value="manager">Property Manager</option>
                    <option value="marketing">Marketing Lead</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Company Size</label>
                  <select 
                    name="companySize" 
                    value={formData.companySize} 
                    onChange={handleChange}
                    className="w-full px-6 py-5 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold focus:outline-none focus:ring-2 focus:ring-blue-500/10 transition-all appearance-none cursor-pointer"
                    required
                  >
                    <option value="">Select Size</option>
                    <option value="1-10">1-10 units</option>
                    <option value="11-50">11-50 units</option>
                    <option value="51-200">51-200 units</option>
                    <option value="200+">200+ units</option>
                  </select>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Additional Message</label>
                <textarea 
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-6 py-5 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold focus:outline-none focus:ring-2 focus:ring-blue-500/10 transition-all"
                  placeholder="Tell us about your portfolio..."
                />
              </div>

              <Button 
                type="submit" 
                isLoading={loading}
                className="w-full py-6 rounded-[2.5rem] font-black uppercase tracking-widest text-xs shadow-2xl shadow-blue-100 flex items-center justify-center gap-3"
              >
                Schedule Demo
                <HiOutlineArrowRight className="w-4 h-4" />
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
