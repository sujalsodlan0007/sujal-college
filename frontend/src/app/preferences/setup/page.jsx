"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/common/Button";
import Input from "@/components/common/Input";
import { toast } from "react-hot-toast";
import { motion } from "framer-motion";
import { 
  HiOutlineLocationMarker, 
  HiOutlineCurrencyPound, 
  HiOutlineCalendar,
  HiOutlineUsers,
  HiSparkles,
  HiOutlineHome,
  HiOutlineBriefcase,
  HiOutlineUserGroup
} from "react-icons/hi";

export default function PreferenceSetup() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    location: "",
    minBudget: "",
    maxBudget: "",
    moveInDate: "",
    bedrooms: "",
    parking: false,
    pets: false,
    vibe: "modern",
    tenantType: "professional",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
    else handleSubmit();
  };

  const handleSubmit = () => {
    toast.success("Preferences saved! Finding matches...");
    router.push("/find-a-home");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12">
      <div className="max-w-2xl w-full bg-white rounded-[2.5rem] shadow-2xl p-10 md:p-16 relative overflow-hidden">
        {/* Progress Bar */}
        <div className="absolute top-0 left-0 w-full h-2 bg-gray-100">
          <motion.div 
            className="h-full bg-blue-600"
            initial={{ width: "0%" }}
            animate={{ width: `${(step / 3) * 100}%` }}
          />
        </div>

        <div className="mb-10 text-center">
          <span className="text-blue-600 font-bold text-sm uppercase tracking-widest mb-2 block">Step {step} of 3</span>
          <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 font-display">
            {step === 1 && "Where & When?"}
            {step === 2 && "Your Budget & Space"}
            {step === 3 && "Lifestyle & Vibe"}
          </h1>
          <p className="text-slate-500 mt-2 font-medium">
            Help our AI find the best developments for your lifestyle.
          </p>
        </div>

        <div className="space-y-8">
          {step === 1 && (
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <div className="relative">
                <HiOutlineLocationMarker className="absolute left-4 top-[42px] text-gray-400 w-5 h-5 z-10" />
                <Input
                  label="Preferred Location"
                  name="location"
                  placeholder="e.g. Manchester City Centre"
                  value={formData.location}
                  onChange={handleChange}
                  className="pl-12"
                />
              </div>
              <div className="relative">
                <HiOutlineCalendar className="absolute left-4 top-[42px] text-gray-400 w-5 h-5 z-10" />
                <Input
                  label="Move-in Date"
                  name="moveInDate"
                  type="date"
                  value={formData.moveInDate}
                  onChange={handleChange}
                  className="pl-12"
                />
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="Min Budget (pcm)"
                  name="minBudget"
                  type="number"
                  placeholder="£500"
                  value={formData.minBudget}
                  onChange={handleChange}
                />
                <Input
                  label="Max Budget (pcm)"
                  name="maxBudget"
                  type="number"
                  placeholder="£3000"
                  value={formData.maxBudget}
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-3">
                <label className="text-sm font-black uppercase tracking-widest text-slate-900">Bedrooms</label>
                <div className="grid grid-cols-4 gap-3">
                  {["Studio", "1", "2", "3+"].map((num) => (
                    <button
                      key={num}
                      type="button"
                      onClick={() => setFormData({...formData, bedrooms: num})}
                      className={`py-4 rounded-xl border-2 transition-all font-bold ${
                        formData.bedrooms === num
                          ? "border-blue-600 bg-blue-50 text-blue-600 shadow-lg shadow-blue-100"
                          : "border-slate-100 hover:border-blue-200 text-slate-500"
                      }`}
                    >
                      {num}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-8"
            >
              <div className="grid grid-cols-2 gap-6">
                <label className="flex items-center gap-4 p-4 rounded-2xl border-2 border-slate-100 hover:border-blue-200 cursor-pointer transition-all">
                  <input 
                    type="checkbox" 
                    name="parking"
                    checked={formData.parking}
                    onChange={handleChange}
                    className="w-6 h-6 rounded text-blue-600 focus:ring-blue-500"
                  />
                  <span className="font-bold text-slate-700">Parking Required</span>
                </label>
                <label className="flex items-center gap-4 p-4 rounded-2xl border-2 border-slate-100 hover:border-blue-200 cursor-pointer transition-all">
                  <input 
                    type="checkbox" 
                    name="pets"
                    checked={formData.pets}
                    onChange={handleChange}
                    className="w-6 h-6 rounded text-blue-600 focus:ring-blue-500"
                  />
                  <span className="font-bold text-slate-700">Pets Allowed</span>
                </label>
              </div>

              <div className="space-y-3">
                <label className="text-sm font-black uppercase tracking-widest text-slate-900">Tenant Type</label>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { id: "professional", icon: HiOutlineBriefcase, label: "Professional" },
                    { id: "student", icon: HiOutlineUsers, label: "Student" },
                    { id: "family", icon: HiOutlineHome, label: "Family" }
                  ].map((type) => (
                    <button
                      key={type.id}
                      type="button"
                      onClick={() => setFormData({...formData, tenantType: type.id})}
                      className={`flex flex-col items-center py-4 px-2 rounded-xl border-2 transition-all font-bold text-xs ${
                        formData.tenantType === type.id
                          ? "border-blue-600 bg-blue-50 text-blue-600"
                          : "border-slate-100 hover:border-blue-200 text-slate-500"
                      }`}
                    >
                      <type.icon className="w-5 h-5 mb-2" />
                      {type.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-sm font-black uppercase tracking-widest text-slate-900">Lifestyle Vibe</label>
                <div className="grid grid-cols-3 gap-3">
                  {["Modern", "Industrial", "Classic", "Green", "Social", "Quiet"].map((vibe) => (
                    <button
                      key={vibe}
                      type="button"
                      onClick={() => setFormData({...formData, vibe: vibe.toLowerCase()})}
                      className={`py-3 rounded-xl border-2 transition-all font-bold text-xs ${
                        formData.vibe === vibe.toLowerCase()
                          ? "border-blue-600 bg-blue-50 text-blue-600"
                          : "border-slate-100 hover:border-blue-200 text-slate-500"
                      }`}
                    >
                      {vibe}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          <div className="flex gap-4 pt-6">
            {step > 1 && (
              <Button 
                variant="secondary" 
                className="flex-1 py-4 rounded-2xl text-lg font-black uppercase tracking-widest text-xs border-2"
                onClick={() => setStep(step - 1)}
              >
                Back
              </Button>
            )}
            <Button 
              className="flex-[2] py-4 rounded-2xl text-lg font-black uppercase tracking-widest text-xs shadow-xl shadow-blue-200"
              onClick={handleNext}
            >
              {step === 3 ? "Find My Home" : "Next Step"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
