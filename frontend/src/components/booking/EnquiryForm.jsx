"use client";

import { useState } from "react";
import Button from "@/components/common/Button";
import Input from "@/components/common/Input";
import { toast } from "react-hot-toast";
import { HiOutlineCheckCircle } from "react-icons/hi";

export default function EnquiryForm({ development, unit, onClose }) {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    moveInDate: "",
    budget: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      setSubmitted(true);
      toast.success("Enquiry sent successfully!");
    } catch (error) {
      toast.error("Failed to send enquiry.");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="text-center py-12">
        <div className="w-20 h-20 bg-green-50 text-green-600 rounded-3xl flex items-center justify-center mx-auto mb-8">
          <HiOutlineCheckCircle className="w-12 h-12" />
        </div>
        <h3 className="text-2xl font-bold text-slate-900 mb-4 font-display">Enquiry Submitted!</h3>
        <p className="text-slate-500 font-medium mb-10">Our team will get back to you within 24 hours regarding {unit ? `Unit ${unit.unit_number} at ` : ''}{development.name}.</p>
        <Button onClick={onClose} className="w-full rounded-2xl py-4 font-black uppercase tracking-widest text-xs">Close</Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 mb-6">
        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Inquiry for</p>
        <div className="flex justify-between items-center">
           <h4 className="text-lg font-bold text-slate-900">{development.name}</h4>
           {unit && <span className="text-sm font-black text-blue-600">Unit {unit.unit_number}</span>}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Input label="First Name" name="firstName" value={formData.firstName} onChange={handleChange} required />
        <Input label="Last Name" name="lastName" value={formData.lastName} onChange={handleChange} required />
      </div>
      <Input label="Email Address" type="email" name="email" value={formData.email} onChange={handleChange} required />
      <Input label="Phone Number" name="phone" value={formData.phone} onChange={handleChange} required />
      
      <div className="grid grid-cols-2 gap-4">
        <Input label="Move-in Date" type="date" name="moveInDate" value={formData.moveInDate} onChange={handleChange} required />
        <Input label="Budget (pcm)" type="number" name="budget" value={formData.budget} onChange={handleChange} required />
      </div>

      <div className="space-y-2">
        <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Message</label>
        <textarea 
          name="message"
          rows={4} 
          className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-slate-900 font-bold focus:outline-none focus:ring-2 focus:ring-blue-500/10 transition-all"
          placeholder="Any specific questions?"
          value={formData.message}
          onChange={handleChange}
        />
      </div>

      <Button type="submit" isLoading={loading} className="w-full py-5 rounded-2xl font-black uppercase tracking-widest text-xs shadow-2xl shadow-blue-200">
        Send Enquiry
      </Button>
    </form>
  );
}
