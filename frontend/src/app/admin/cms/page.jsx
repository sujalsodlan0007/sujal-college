"use client";

import { useState } from "react";
import { 
  HiOutlinePencilAlt, 
  HiOutlineEye, 
  HiOutlineSave,
  HiOutlineViewGrid,
  HiOutlineTemplate,
  HiOutlineDocumentText,
  HiOutlinePhotograph
} from "react-icons/hi";
import { cn } from "@/utils/cn";
import Button from "@/components/common/Button";
import Input from "@/components/common/Input";
import { toast } from "react-hot-toast";

const CMS_SECTIONS = [
  { id: "hero", label: "Homepage Hero", icon: HiOutlineTemplate },
  { id: "features", label: "Feature Sections", icon: HiOutlineViewGrid },
  { id: "pricing", label: "Pricing Packages", icon: HiOutlineDocumentText },
  { id: "testimonials", label: "Testimonials", icon: HiOutlinePhotograph },
  { id: "footer", label: "Footer Content", icon: HiOutlineDocumentText },
];

export default function CMSPage() {
  const [activeSection, setActiveSection] = useState("hero");
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState({
    hero: {
      title: "The Modern Renter Ecosystem",
      subtitle: "Transforming the property experience through AI-driven lead management and immersive virtual tours.",
      cta_text: "Get Started",
      cta_link: "/find-a-home"
    },
    footer: {
      address: "123 Innovation Way, Manchester, UK",
      email: "hello@propertysense.co.uk",
      phone: "+44 161 123 4567"
    }
  });

  const handleUpdate = (field, value) => {
    setContent(prev => ({
      ...prev,
      [activeSection]: {
        ...prev[activeSection],
        [field]: value
      }
    }));
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      toast.success("Content updated successfully!");
    } catch (error) {
      toast.error("Failed to update content.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-bold text-slate-900 mb-2 font-display tracking-tight">Content Management</h1>
          <p className="text-slate-500 font-medium">Manage marketing copy and homepage sections across the platform.</p>
        </div>
        <div className="flex gap-4">
          <Button variant="secondary" className="px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] border-2 flex items-center gap-2">
            <HiOutlineEye className="w-4 h-4" />
            Preview Site
          </Button>
          <Button 
            onClick={handleSave}
            isLoading={loading}
            className="px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-2xl shadow-blue-100 flex items-center gap-2"
          >
            <HiOutlineSave className="w-4 h-4" />
            Save Changes
          </Button>
        </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-10">
        {/* Section Selector */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-white p-6 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-2">
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-6 ml-4">Site Sections</p>
            {CMS_SECTIONS.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={cn(
                  "w-full flex items-center gap-4 px-6 py-4 rounded-2xl text-sm font-bold transition-all group",
                  activeSection === section.id 
                    ? "bg-blue-600 text-white shadow-xl shadow-blue-100" 
                    : "text-slate-400 hover:bg-slate-50 hover:text-slate-900"
                )}
              >
                <section.icon className={cn("w-5 h-5", activeSection === section.id ? "text-white" : "group-hover:text-blue-600")} />
                {section.label}
              </button>
            ))}
          </div>

          <div className="p-8 bg-blue-50 rounded-[2.5rem] border border-blue-100/50">
             <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-sm">
                <HiOutlinePencilAlt className="w-6 h-6 text-blue-600" />
             </div>
             <h4 className="font-black text-slate-900 text-sm uppercase tracking-tight mb-2">Editor Mode</h4>
             <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest leading-relaxed">
                Changes made here are saved to the staging environment. Use the "Preview" button to see them live before publishing.
             </p>
          </div>
        </div>

        {/* Editor Area */}
        <div className="lg:col-span-8">
          <div className="bg-white p-10 md:p-16 rounded-[3rem] border border-slate-100 shadow-sm space-y-12">
            <div className="flex items-center gap-4 mb-8">
               <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center">
                  {CMS_SECTIONS.find(s => s.id === activeSection)?.icon({ className: "w-6 h-6 text-slate-400" })}
               </div>
               <div>
                  <h3 className="text-2xl font-bold text-slate-900 font-display tracking-tight">
                    {CMS_SECTIONS.find(s => s.id === activeSection)?.label}
                  </h3>
                  <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">Section Editor</p>
               </div>
            </div>

            {activeSection === "hero" && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <Input 
                  label="Hero Title" 
                  value={content.hero.title}
                  onChange={(e) => handleUpdate("title", e.target.value)}
                  placeholder="The Modern Renter Ecosystem"
                />
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Hero Subtitle</label>
                  <textarea 
                    value={content.hero.subtitle}
                    onChange={(e) => handleUpdate("subtitle", e.target.value)}
                    rows={4}
                    className="w-full px-6 py-5 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold focus:outline-none focus:ring-2 focus:ring-blue-500/10 transition-all"
                  />
                </div>
                <div className="grid md:grid-cols-2 gap-8">
                  <Input 
                    label="CTA Button Text" 
                    value={content.hero.cta_text}
                    onChange={(e) => handleUpdate("cta_text", e.target.value)}
                    placeholder="Get Started"
                  />
                  <Input 
                    label="CTA Button Link" 
                    value={content.hero.cta_link}
                    onChange={(e) => handleUpdate("cta_link", e.target.value)}
                    placeholder="/find-a-home"
                  />
                </div>
              </div>
            )}

            {activeSection === "footer" && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <Input 
                  label="Office Address" 
                  value={content.footer.address}
                  onChange={(e) => handleUpdate("address", e.target.value)}
                />
                <div className="grid md:grid-cols-2 gap-8">
                  <Input 
                    label="Public Email" 
                    value={content.footer.email}
                    onChange={(e) => handleUpdate("email", e.target.value)}
                  />
                  <Input 
                    label="Contact Phone" 
                    value={content.footer.phone}
                    onChange={(e) => handleUpdate("phone", e.target.value)}
                  />
                </div>
              </div>
            )}

            {["features", "pricing", "testimonials"].includes(activeSection) && (
              <div className="flex flex-col items-center justify-center py-20 text-center border-2 border-dashed border-slate-100 rounded-[2rem]">
                 <div className="w-16 h-16 bg-slate-50 text-slate-300 rounded-2xl flex items-center justify-center mb-6">
                    <HiOutlineTemplate className="w-8 h-8" />
                 </div>
                 <h4 className="font-bold text-slate-900 mb-2">Block Editor Coming Soon</h4>
                 <p className="text-xs text-slate-400 max-w-xs font-medium">
                    This section will allow you to drag and drop feature blocks and pricing packages.
                 </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
