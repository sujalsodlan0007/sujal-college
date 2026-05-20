"use client";

import { useState } from "react";
import Button from "@/components/common/Button";
import Input from "@/components/common/Input";
import { toast } from "react-hot-toast";
import { HiOutlineCheckCircle, HiOutlineShieldCheck } from "react-icons/hi";

export default function ReservationForm({ development, unit, onClose }) {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    moveInDate: "",
    notes: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      setSubmitted(true);
      toast.success("Reservation request submitted!");
    } catch (error) {
      toast.error("Failed to submit reservation.");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="text-center py-12">
        <div className="w-20 h-20 bg-blue-50 text-blue-600 rounded-3xl flex items-center justify-center mx-auto mb-8">
          <HiOutlineShieldCheck className="w-12 h-12" />
        </div>
        <h3 className="text-2xl font-bold text-slate-900 mb-4 font-display">Reservation Submitted!</h3>
        <p className="text-slate-500 font-medium mb-10">Your reservation request for Unit {unit.unit_number} has been received. Our team will review it and send the digital lease shortly.</p>
        <Button onClick={onClose} className="w-full rounded-2xl py-4 font-black uppercase tracking-widest text-xs">Go to My Enquiries</Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 mb-8">
        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Selected Unit</p>
        <div className="flex justify-between items-center">
           <h4 className="text-xl font-bold text-slate-900">Unit {unit.unit_number}</h4>
           <span className="text-lg font-black text-blue-600">£{unit.price.toLocaleString()}pcm</span>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <Input label="Full Name" name="name" value={formData.name} onChange={handleChange} required />
        <Input label="Email Address" type="email" name="email" value={formData.email} onChange={handleChange} required />
      </div>
      <Input label="Phone Number" name="phone" value={formData.phone} onChange={handleChange} required />

      <Input label="Planned Move-in Date" type="date" name="moveInDate" value={formData.moveInDate} onChange={handleChange} required />
      
      <div className="space-y-2">
        <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Additional Notes</label>
        <textarea 
          name="notes"
          rows={4} 
          className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-slate-900 font-bold focus:outline-none focus:ring-2 focus:ring-blue-500/10 transition-all"
          placeholder="Any special requirements or notes?"
          value={formData.notes}
          onChange={handleChange}
        />
      </div>

      <div className="flex items-start gap-3 p-4 bg-amber-50 border border-amber-100 rounded-2xl">
         <div className="w-5 h-5 rounded-full bg-amber-100 flex items-center justify-center shrink-0 mt-0.5">
            <span className="text-amber-600 font-black text-[10px]">!</span>
         </div>
         <p className="text-[10px] font-bold text-amber-800 leading-relaxed">
            By clicking "Submit Reservation", you are expressing serious interest in this unit. A holding deposit may be required once your application is approved.
         </p>
      </div>

      <Button type="submit" isLoading={loading} className="w-full py-5 rounded-2xl font-black uppercase tracking-widest text-xs shadow-2xl shadow-blue-200">
        Submit Reservation
      </Button>
    </form>
  );
}
