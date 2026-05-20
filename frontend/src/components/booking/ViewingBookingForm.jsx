"use client";

import { useState } from "react";
import Button from "@/components/common/Button";
import Input from "@/components/common/Input";
import { toast } from "react-hot-toast";
import { HiOutlineCheckCircle, HiOutlineCalendar } from "react-icons/hi";

export default function ViewingBookingForm({ development, unit, onClose }) {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    viewingDate: "",
    viewingTime: "",
    viewingType: "in-person",
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
      toast.success("Viewing booked successfully!");
    } catch (error) {
      toast.error("Failed to book viewing.");
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCalendar = () => {
    const title = `Viewing at ${development.name}${unit ? ` - Unit ${unit.unit_number}` : ""}`;
    const description = `Viewing type: ${formData.viewingType}`;
    const location = development.location || "Development Location";
    const date = formData.viewingDate.replace(/-/g, "");
    const time = formData.viewingTime.replace(/:/g, "") + "00";
    
    const googleCalendarUrl = `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(title)}&details=${encodeURIComponent(description)}&location=${encodeURIComponent(location)}&dates=${date}T${time}/${date}T${time}`;
    window.open(googleCalendarUrl, "_blank");
  };

  if (submitted) {
    return (
      <div className="text-center py-12">
        <div className="w-20 h-20 bg-green-50 text-green-600 rounded-3xl flex items-center justify-center mx-auto mb-8">
          <HiOutlineCheckCircle className="w-12 h-12" />
        </div>
        <h3 className="text-2xl font-bold text-slate-900 mb-4 font-display">Viewing Scheduled!</h3>
        <p className="text-slate-500 font-medium mb-10">Your {formData.viewingType} viewing is set for {formData.viewingDate} at {formData.viewingTime}.</p>
        <div className="space-y-4">
          <Button 
            onClick={handleAddToCalendar}
            className="w-full rounded-2xl py-4 font-black uppercase tracking-widest text-xs flex items-center justify-center gap-2"
          >
            <HiOutlineCalendar className="w-5 h-5" />
            Add to Calendar
          </Button>
          <Button onClick={onClose} variant="secondary" className="w-full rounded-2xl py-4 font-black uppercase tracking-widest text-xs border-2">Close</Button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 mb-6">
        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Viewing at</p>
        <div className="flex justify-between items-center">
           <h4 className="text-lg font-bold text-slate-900">{development.name}</h4>
           {unit && <span className="text-sm font-black text-blue-600">Unit {unit.unit_number}</span>}
        </div>
      </div>

      <Input label="Full Name" name="name" value={formData.name} onChange={handleChange} required />
      <Input label="Email Address" type="email" name="email" value={formData.email} onChange={handleChange} required />
      <Input label="Phone Number" name="phone" value={formData.phone} onChange={handleChange} required />
      
      <div className="grid grid-cols-2 gap-4">
        <Input label="Preferred Date" type="date" name="viewingDate" value={formData.viewingDate} onChange={handleChange} required />
        <Input label="Preferred Time" type="time" name="viewingTime" value={formData.viewingTime} onChange={handleChange} required />
      </div>

      <div className="space-y-2">
        <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Viewing Type</label>
        <div className="grid grid-cols-3 gap-3">
          {["In-Person", "Virtual", "3D Tour"].map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => setFormData({...formData, viewingType: type.toLowerCase().replace(" ", "-")})}
              className={`py-3 rounded-xl border-2 transition-all font-bold text-[10px] uppercase tracking-widest ${
                formData.viewingType === type.toLowerCase().replace(" ", "-")
                  ? "border-blue-600 bg-blue-50 text-blue-600"
                  : "border-slate-50 text-slate-500 hover:border-slate-200"
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      <Button type="submit" isLoading={loading} className="w-full py-5 rounded-2xl font-black uppercase tracking-widest text-xs shadow-2xl shadow-blue-200">
        Book Viewing
      </Button>
    </form>
  );
}
