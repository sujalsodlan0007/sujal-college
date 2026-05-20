"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { 
  HiOutlinePlus, 
  HiOutlineArrowLeft, 
  HiOutlinePencil, 
  HiOutlineTrash,
  HiOutlineCheckCircle,
  HiOutlineClock,
  HiOutlineLockClosed,
  HiOutlineBan,
  HiOutlineSearch
} from "react-icons/hi";
import AdminTable from "@/components/admin/AdminTable";
import Button from "@/components/common/Button";
import developmentService from "@/services/developmentService";
import { cn } from "@/utils/cn";
import { toast } from "react-hot-toast";

export default function ManageUnits() {
  const { developmentId } = useParams();
  const router = useRouter();
  const [development, setDevelopment] = useState(null);
  const [units, setUnits] = useState([
    { id: 1, unit_number: "101", floor: "1", type: "1 Bed Apartment", size: 650, price: 1250, status: "available", available_from: "2026-06-01", place3d_id: "U-101" },
    { id: 2, unit_number: "102", floor: "1", type: "2 Bed Apartment", size: 850, price: 1550, status: "hold", available_from: "2026-07-15", place3d_id: "U-102" },
    { id: 3, unit_number: "201", floor: "2", type: "1 Bed Apartment", size: 650, price: 1275, status: "available", available_from: "Immediate", place3d_id: "U-201" },
    { id: 4, unit_number: "202", floor: "2", type: "2 Bed Apartment", size: 900, price: 1650, status: "reserved", available_from: "2026-08-01", place3d_id: "U-202" },
    { id: 5, unit_number: "301", floor: "3", type: "3 Bed Penthouse", size: 1200, price: 2450, status: "coming_soon", available_from: "2026-12-01", place3d_id: "U-301" },
  ]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDev = async () => {
      try {
        const data = await developmentService.getBySlug("the-summit"); // Mock
        setDevelopment(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchDev();
  }, [developmentId]);

  const handleStatusChange = (unitId, newStatus) => {
    setUnits(prev => prev.map(u => u.id === unitId ? { ...u, status: newStatus } : u));
    toast.success("Unit status updated!");
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "available": return <HiOutlineCheckCircle className="w-4 h-4 text-green-500" />;
      case "hold": return <HiOutlineClock className="w-4 h-4 text-amber-500" />;
      case "reserved":
      case "let_agreed": return <HiOutlineLockClosed className="w-4 h-4 text-red-500" />;
      case "coming_soon": return <HiOutlineBan className="w-4 h-4 text-blue-500" />;
      default: return null;
    }
  };

  const columns = [
    {
      header: "Unit No.",
      render: (unit) => <span className="font-black text-slate-900 text-lg">#{unit.unit_number}</span>
    },
    {
      header: "Type & Floor",
      render: (unit) => (
        <div>
          <div className="text-sm font-bold text-slate-700">{unit.type}</div>
          <div className="text-[10px] text-slate-400 font-black uppercase tracking-widest mt-1">Floor {unit.floor} • {unit.size} SQ FT</div>
        </div>
      )
    },
    {
      header: "Place-3D ID",
      render: (unit) => (
        <div className="flex items-center gap-2">
           <div className="w-2 h-2 bg-blue-500 rounded-full" />
           <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{unit.place3d_id}</span>
        </div>
      )
    },
    {
      header: "Price pcm",
      render: (unit) => <span className="font-black text-slate-900">£{unit.price.toLocaleString()}</span>
    },
    {
      header: "Available From",
      render: (unit) => <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{unit.available_from}</span>
    },
    {
      header: "Status",
      render: (unit) => (
        <div className={cn(
          "inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border shadow-sm",
          unit.status === "available" ? "bg-green-50 text-green-600 border-green-100" :
          unit.status === "hold" ? "bg-amber-50 text-amber-600 border-amber-100" :
          unit.status === "coming_soon" ? "bg-blue-50 text-blue-600 border-blue-100" :
          "bg-red-50 text-red-600 border-red-100"
        )}>
          {getStatusIcon(unit.status)}
          {unit.status.replace("_", " ")}
        </div>
      )
    },
    {
      header: "Management",
      className: "text-right",
      render: (unit) => (
        <div className="flex items-center justify-end gap-3">
          <select 
            value={unit.status}
            onChange={(e) => handleStatusChange(unit.id, e.target.value)}
            className="px-4 py-2 bg-slate-50 border border-slate-100 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-600 outline-none hover:border-blue-200 transition-all cursor-pointer"
          >
            <option value="available">Set Available</option>
            <option value="hold">Set Hold</option>
            <option value="reserved">Set Reserved</option>
            <option value="let_agreed">Set Let Agreed</option>
            <option value="coming_soon">Set Coming Soon</option>
          </select>
          <button className="p-2.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all">
            <HiOutlinePencil className="w-5 h-5" />
          </button>
        </div>
      )
    }
  ];

  return (
    <div className="space-y-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-6">
          <button onClick={() => router.back()} className="p-3 bg-white border border-slate-100 rounded-2xl text-slate-400 hover:text-blue-600 transition-all shadow-sm">
            <HiOutlineArrowLeft className="w-6 h-6" />
          </button>
          <div>
            <h1 className="text-4xl font-bold text-slate-900 mb-2 font-display tracking-tight">Inventory Management</h1>
            <p className="text-slate-500 font-medium">Managing units for <span className="text-blue-600 font-bold">{development?.name || 'The Summit'}</span></p>
          </div>
        </div>
        <div className="flex gap-4">
          <button className="px-8 py-4 bg-white border-2 border-slate-100 rounded-2xl text-[10px] font-black uppercase tracking-widest text-slate-600 hover:text-blue-600 hover:border-blue-100 shadow-sm transition-all flex items-center gap-2">
            Import CSV
          </button>
          <Button className="rounded-2xl px-8 py-4 font-black uppercase tracking-widest text-[10px] shadow-2xl shadow-blue-100 flex items-center gap-2">
            <HiOutlinePlus className="w-5 h-5" />
            Add New Unit
          </Button>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm flex flex-col md:flex-row gap-6">
        <div className="relative flex-1">
          <HiOutlineSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search by unit number or type..."
            className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
          />
        </div>
        <div className="flex gap-4">
          <select className="px-8 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-xs font-black uppercase tracking-widest text-slate-600 outline-none hover:border-blue-200 transition-all cursor-pointer">
            <option>All Floors</option>
            <option>Floor 1</option>
            <option>Floor 2</option>
          </select>
          <select className="px-8 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-xs font-black uppercase tracking-widest text-slate-600 outline-none hover:border-blue-200 transition-all cursor-pointer">
            <option>All Statuses</option>
            <option>Available</option>
            <option>Reserved</option>
          </select>
        </div>
      </div>

      {/* Units Table */}
      <AdminTable 
        columns={columns} 
        data={units} 
        loading={false} 
        pagination={{ from: 1, to: 5, total: units.length }}
      />
    </div>
  );
}
