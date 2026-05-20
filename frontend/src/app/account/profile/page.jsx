"use client";

import { useState } from "react";
import Button from "@/components/common/Button";
import Input from "@/components/common/Input";
import { toast } from "react-hot-toast";
import { 
  HiOutlineUser, 
  HiOutlineMail, 
  HiOutlinePhone, 
  HiOutlineLockClosed, 
  HiOutlineBell,
  HiOutlineShieldCheck
} from "react-icons/hi";

export default function ProfilePage() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phone: "+44 7700 900123",
  });

  const [notifications, setNotifications] = useState({
    email: true,
    sms: false,
    whatsapp: true,
    viewingReminders: true,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleToggle = (key) => {
    setNotifications(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success("Profile updated successfully!");
    } catch (error) {
      toast.error("Failed to update profile.");
    } finally {
      setLoading(false);
    }
  };

  const [securityData, setSecurityData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleSecurityChange = (e) => {
    setSecurityData({ ...securityData, [e.target.name]: e.target.value });
  };

  const handlePasswordUpdate = async (e) => {
    e.preventDefault();
    if (securityData.newPassword !== securityData.confirmPassword) {
      toast.error("New passwords do not match!");
      return;
    }
    if (securityData.newPassword.length < 8) {
      toast.error("Password must be at least 8 characters long.");
      return;
    }
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      toast.success("Password updated successfully!");
      setSecurityData({ currentPassword: "", newPassword: "", confirmPassword: "" });
    } catch (error) {
      toast.error("Failed to update password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-12 pb-20">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 mb-2 font-display tracking-tight">Account Settings</h1>
        <p className="text-slate-500 font-medium text-lg">Manage your personal information and preferences.</p>
      </div>

      <div className="grid lg:grid-cols-12 gap-12">
        {/* Personal Information */}
        <div className="lg:col-span-8 space-y-12">
          <section className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm">
            <div className="flex items-center gap-4 mb-10 pb-6 border-b border-slate-50">
               <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600">
                  <HiOutlineUser className="w-6 h-6" />
               </div>
               <h2 className="text-xl font-bold text-slate-900 font-display">Personal Information</h2>
            </div>
            
            <form onSubmit={handleProfileUpdate} className="space-y-8">
              <div className="grid md:grid-cols-2 gap-8">
                <Input label="First Name" name="firstName" value={formData.firstName} onChange={handleChange} />
                <Input label="Last Name" name="lastName" value={formData.lastName} onChange={handleChange} />
              </div>
              <div className="grid md:grid-cols-2 gap-8">
                <Input label="Email Address" type="email" name="email" value={formData.email} onChange={handleChange} />
                <Input label="Phone Number" name="phone" value={formData.phone} onChange={handleChange} />
              </div>
              <div className="flex justify-end">
                <Button type="submit" isLoading={loading} className="px-10 rounded-2xl font-black uppercase tracking-widest text-[10px]">
                  Save Changes
                </Button>
              </div>
            </form>
          </section>

          {/* Security / Password */}
          <section className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm">
            <div className="flex items-center gap-4 mb-10 pb-6 border-b border-slate-50">
               <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600">
                  <HiOutlineLockClosed className="w-6 h-6" />
               </div>
               <h2 className="text-xl font-bold text-slate-900 font-display">Security</h2>
            </div>
            
            <form onSubmit={handlePasswordUpdate} className="space-y-8">
              <div className="grid md:grid-cols-2 gap-8">
                 <Input 
                   label="Current Password" 
                   type="password" 
                   name="currentPassword"
                   value={securityData.currentPassword}
                   onChange={handleSecurityChange}
                   placeholder="••••••••" 
                   required
                 />
                 <div className="hidden md:block" />
                 <Input 
                   label="New Password" 
                   type="password" 
                   name="newPassword"
                   value={securityData.newPassword}
                   onChange={handleSecurityChange}
                   placeholder="••••••••" 
                   required
                 />
                 <Input 
                   label="Confirm New Password" 
                   type="password" 
                   name="confirmPassword"
                   value={securityData.confirmPassword}
                   onChange={handleSecurityChange}
                   placeholder="••••••••" 
                   required
                 />
              </div>
              <div className="flex justify-between items-center p-6 bg-slate-50 rounded-[2rem] border border-slate-100">
                 <div className="flex items-center gap-4">
                    <HiOutlineShieldCheck className="w-6 h-6 text-green-500" />
                    <div>
                       <p className="text-sm font-bold text-slate-900">Two-Factor Authentication</p>
                       <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mt-1">Status: Disabled</p>
                    </div>
                 </div>
                 <button type="button" className="text-[10px] font-black uppercase tracking-widest text-blue-600 hover:text-blue-700">Enable Now</button>
              </div>
              <div className="flex justify-end">
                <Button type="submit" isLoading={loading} variant="secondary" className="px-10 rounded-2xl font-black uppercase tracking-widest text-[10px] border-2">
                  Update Password
                </Button>
              </div>
            </form>
          </section>
        </div>

        {/* Notifications Sidebar */}
        <div className="lg:col-span-4">
          <section className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm sticky top-32">
            <div className="flex items-center gap-4 mb-10 pb-6 border-b border-slate-50">
               <div className="w-12 h-12 bg-purple-50 rounded-2xl flex items-center justify-center text-purple-600">
                  <HiOutlineBell className="w-6 h-6" />
               </div>
               <h2 className="text-xl font-bold text-slate-900 font-display">Preferences</h2>
            </div>

            <div className="space-y-8">
              {[
                { id: 'email', label: 'Email Notifications', desc: 'Get updates on matches & messages' },
                { id: 'whatsapp', label: 'WhatsApp Alerts', desc: 'Real-time status updates' },
                { id: 'viewingReminders', label: 'Viewing Reminders', desc: 'Reminders 24h before viewing' },
              ].map((pref) => (
                <div key={pref.id} className="flex items-center justify-between group cursor-pointer" onClick={() => handleToggle(pref.id)}>
                   <div className="flex-1">
                      <p className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors">{pref.label}</p>
                      <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mt-1">{pref.desc}</p>
                   </div>
                   <div className={`w-12 h-6 rounded-full relative transition-all duration-300 ${notifications[pref.id] ? 'bg-blue-600' : 'bg-slate-200'}`}>
                      <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all duration-300 ${notifications[pref.id] ? 'left-7' : 'left-1'}`} />
                   </div>
                </div>
              ))}
            </div>

            <div className="mt-12 pt-12 border-t border-slate-50">
               <Button variant="danger" className="w-full rounded-2xl py-4 font-black uppercase tracking-widest text-[10px] bg-red-50 text-red-600 hover:bg-red-100 border-none shadow-none">
                  Delete Account
               </Button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
