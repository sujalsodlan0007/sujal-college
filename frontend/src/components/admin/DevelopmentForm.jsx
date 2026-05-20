"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/common/Button";
import Input from "@/components/common/Input";
import { toast } from "react-hot-toast";
import { HiOutlineArrowLeft, HiOutlineCloudUpload, HiOutlineTrash } from "react-icons/hi";
import Link from "next/link";

const DevelopmentForm = ({ initialData = null, isEdit = false }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    description: "",
    address: "",
    city: "",
    postcode: "",
    price_from: "",
    image: "",
    hero_image: "",
    virtual_tour_url: "",
    amenities: [],
    status: "active",
    package: "premium",
    coordinates: { lat: "", lng: "" },
    ...initialData
  });

  const handleImageChange = (e, field) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, [field]: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const amenitiesList = [
    "Gym", "Concierge", "Roof Terrace", "Pet Friendly", "Parking", 
    "Co-working Space", "Private Cinema", "Bike Storage", "24/7 Security"
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAmenityToggle = (amenity) => {
    setFormData(prev => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter(a => a !== amenity)
        : [...prev.amenities, amenity]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // In a real app, call API
      // await developmentService.save(formData);
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success(isEdit ? "Development updated!" : "Development created!");
      router.push("/admin/developments");
    } catch (error) {
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto pb-20">
      <div className="mb-10 flex items-center gap-4">
        <Link href="/admin/developments" className="p-2.5 bg-white border border-slate-100 rounded-xl text-slate-400 hover:text-blue-600 transition-all">
          <HiOutlineArrowLeft className="w-5 h-5" />
        </Link>
        <h1 className="text-3xl font-bold text-slate-900 font-display">
          {isEdit ? "Edit Development" : "Add New Development"}
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Basic Info */}
        <div className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-8">
          <h3 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 mb-6">Basic Information</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <Input
              label="Development Name"
              name="name"
              placeholder="e.g. The Summit"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <Input
              label="URL Slug"
              name="slug"
              placeholder="e.g. the-summit"
              value={formData.slug}
              onChange={handleChange}
              required
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Description</label>
            <textarea
              name="description"
              rows={5}
              className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-slate-900 font-bold focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
              placeholder="Describe the development..."
              value={formData.description}
              onChange={handleChange}
              required
            />
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <Input
              label="Starting Price (pcm)"
              name="price_from"
              type="number"
              placeholder="1200"
              value={formData.price_from}
              onChange={handleChange}
              required
            />
            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Status</label>
              <select
                name="status"
                className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-slate-900 font-bold focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all appearance-none cursor-pointer"
                value={formData.status}
                onChange={handleChange}
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="coming_soon">Coming Soon</option>
              </select>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Operator Package</label>
              <select
                name="package"
                className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-slate-900 font-bold focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all appearance-none cursor-pointer"
                value={formData.package}
                onChange={handleChange}
              >
                <option value="basic">Basic Listing</option>
                <option value="standard">Standard Growth</option>
                <option value="premium">Premium Experience</option>
                <option value="enterprise">Enterprise Solution</option>
              </select>
            </div>
          </div>
        </div>

        {/* Location Info */}
        <div className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-8">
          <h3 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 mb-6">Location & Address</h3>
          <Input
            label="Street Address"
            name="address"
            placeholder="123 Luxury Lane"
            value={formData.address}
            onChange={handleChange}
            required
          />
          <div className="grid md:grid-cols-2 gap-6">
            <Input
              label="City"
              name="city"
              placeholder="Manchester"
              value={formData.city}
              onChange={handleChange}
              required
            />
            <Input
              label="Postcode"
              name="postcode"
              placeholder="M1 1AB"
              value={formData.postcode}
              onChange={handleChange}
              required
            />
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <Input
              label="Latitude"
              name="lat"
              placeholder="53.4808"
              value={formData.coordinates?.lat}
              onChange={(e) => setFormData(prev => ({ ...prev, coordinates: { ...prev.coordinates, lat: e.target.value } }))}
            />
            <Input
              label="Longitude"
              name="lng"
              placeholder="-2.2426"
              value={formData.coordinates?.lng}
              onChange={(e) => setFormData(prev => ({ ...prev, coordinates: { ...prev.coordinates, lng: e.target.value } }))}
            />
          </div>
        </div>

        {/* Media & Interactive */}
        <div className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-8">
          <h3 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 mb-6">Media & Virtual Tour</h3>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Card Image (Thumbnail)</label>
              <div className="relative aspect-video rounded-2xl bg-slate-50 border-2 border-dashed border-slate-200 flex flex-col items-center justify-center overflow-hidden group">
                {formData.image ? (
                  <>
                    <img src={formData.image} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                       <button type="button" onClick={() => setFormData(prev => ({ ...prev, image: "" }))} className="p-3 bg-red-500 text-white rounded-xl shadow-lg">
                          <HiOutlineTrash className="w-5 h-5" />
                       </button>
                    </div>
                  </>
                ) : (
                  <label className="cursor-pointer flex flex-col items-center gap-2">
                    <HiOutlineCloudUpload className="w-10 h-10 text-slate-300" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Upload Thumbnail</span>
                    <input type="file" className="hidden" onChange={(e) => handleImageChange(e, "image")} accept="image/*" />
                  </label>
                )}
              </div>
            </div>

            <div className="space-y-4">
              <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Hero Image (Banner)</label>
              <div className="relative aspect-video rounded-2xl bg-slate-50 border-2 border-dashed border-slate-200 flex flex-col items-center justify-center overflow-hidden group">
                {formData.hero_image ? (
                  <>
                    <img src={formData.hero_image} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                       <button type="button" onClick={() => setFormData(prev => ({ ...prev, hero_image: "" }))} className="p-3 bg-red-500 text-white rounded-xl shadow-lg">
                          <HiOutlineTrash className="w-5 h-5" />
                       </button>
                    </div>
                  </>
                ) : (
                  <label className="cursor-pointer flex flex-col items-center gap-2">
                    <HiOutlineCloudUpload className="w-10 h-10 text-slate-300" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Upload Hero Image</span>
                    <input type="file" className="hidden" onChange={(e) => handleImageChange(e, "hero_image")} accept="image/*" />
                  </label>
                )}
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Place-3D Virtual Tour URL</label>
            <div className="flex gap-4">
              <Input
                name="virtual_tour_url"
                placeholder="https://viewer.place-3d.com/..."
                value={formData.virtual_tour_url}
                onChange={handleChange}
                className="flex-1"
              />
              {!formData.virtual_tour_url && (
                <div className="flex items-center px-6 bg-amber-50 border border-amber-100 rounded-2xl text-[10px] font-black text-amber-600 uppercase tracking-widest">
                  Tour Coming Soon
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Amenities */}
        <div className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-8">
          <h3 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 mb-6">Amenities</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {amenitiesList.map((amenity) => (
              <button
                key={amenity}
                type="button"
                onClick={() => handleAmenityToggle(amenity)}
                className={`flex items-center gap-3 p-4 rounded-xl border-2 transition-all font-bold text-xs ${
                  formData.amenities.includes(amenity)
                    ? "border-blue-600 bg-blue-50 text-blue-600 shadow-lg shadow-blue-100"
                    : "border-slate-50 hover:border-blue-100 text-slate-500"
                }`}
              >
                {amenity}
              </button>
            ))}
          </div>
        </div>

        <div className="flex justify-end gap-4">
          <Link href="/admin/developments">
            <Button variant="secondary" className="px-10 rounded-2xl font-black uppercase tracking-widest text-[10px] border-2">
              Cancel
            </Button>
          </Link>
          <Button 
            type="submit" 
            isLoading={loading}
            className="px-12 rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-2xl shadow-blue-200"
          >
            {isEdit ? "Update Development" : "Create Development"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default DevelopmentForm;
