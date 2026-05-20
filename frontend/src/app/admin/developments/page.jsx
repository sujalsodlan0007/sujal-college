"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { 
  HiOutlinePlus, 
  HiOutlineSearch, 
  HiOutlinePencil, 
  HiOutlineTrash, 
  HiOutlineEye,
  HiOutlineCube
} from "react-icons/hi";
import Button from "@/components/common/Button";
import Badge from "@/components/common/Badge";
import AdminTable from "@/components/admin/AdminTable";
import developmentService from "@/services/developmentService";
import { motion } from "framer-motion";

export default function AdminDevelopments() {
  const [developments, setDevelopments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchDevelopments = async () => {
      try {
        const data = await developmentService.getAll();
        setDevelopments(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchDevelopments();
  }, []);

  const filteredDevelopments = developments.filter(dev => 
    dev.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    dev.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const columns = [
    {
      header: "Development",
      render: (dev) => (
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl overflow-hidden bg-slate-100 flex-shrink-0">
            <img src={dev.image} className="w-full h-full object-cover" alt={dev.name} />
          </div>
          <div>
            <div className="font-bold text-slate-900 text-sm">{dev.name}</div>
            <div className="text-[10px] text-slate-400 font-black uppercase tracking-widest mt-1">ID: {dev.id}</div>
          </div>
        </div>
      )
    },
    {
      header: "Location",
      accessor: "location",
      className: "text-sm font-bold text-slate-600"
    },
    {
      header: "Price Range",
      render: (dev) => (
        <div>
          <div className="text-sm font-bold text-slate-900">£{dev.price_from.toLocaleString()}</div>
          <div className="text-[10px] text-slate-400 font-black uppercase tracking-widest">Starting pcm</div>
        </div>
      )
    },
    {
      header: "Units",
      render: (dev) => (
        <Link href={`/admin/units/${dev.id}`} className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition-all group">
          <HiOutlineCube className="w-4 h-4" />
          <span className="text-[10px] font-black uppercase tracking-widest">Manage Units</span>
        </Link>
      )
    },
    {
      header: "Status",
      render: (dev) => <Badge variant={dev.status === "active" ? "success" : "default"}>{dev.status?.toUpperCase() || "ACTIVE"}</Badge>
    },
    {
      header: "Actions",
      className: "text-right",
      render: (dev) => (
        <div className="flex items-center justify-end gap-2">
          <Link href={`/admin/developments/${dev.id}/edit`} className="p-2.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all">
            <HiOutlinePencil className="w-5 h-5" />
          </Link>
          <button className="p-2.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all">
            <HiOutlineTrash className="w-5 h-5" />
          </button>
        </div>
      )
    }
  ];

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-bold text-slate-900 mb-2 font-display tracking-tight">Portfolio Management</h1>
          <p className="text-slate-500 font-medium">Add, edit, and monitor your property developments.</p>
        </div>
        <Link href="/admin/developments/new">
          <Button className="rounded-2xl px-8 py-4 font-black uppercase tracking-widest text-[10px] shadow-2xl shadow-blue-100 flex items-center gap-2">
            <HiOutlinePlus className="w-4 h-4" />
            Add Development
          </Button>
        </Link>
      </div>

      {/* Filters & Search */}
      <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm flex flex-col md:flex-row gap-6">
        <div className="relative flex-1">
          <HiOutlineSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search developments by name or city..."
            className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-4">
          <select className="px-8 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-xs font-black uppercase tracking-widest text-slate-600 outline-none hover:border-blue-200 transition-all cursor-pointer">
            <option>All Cities</option>
            <option>London</option>
            <option>Manchester</option>
          </select>
          <select className="px-8 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-xs font-black uppercase tracking-widest text-slate-600 outline-none hover:border-blue-200 transition-all cursor-pointer">
            <option>All Statuses</option>
            <option>Active</option>
            <option>Inactive</option>
          </select>
        </div>
      </div>

      {/* Developments Table */}
      <AdminTable 
        columns={columns} 
        data={filteredDevelopments} 
        loading={loading}
        pagination={{ from: 1, to: 10, total: filteredDevelopments.length }}
      />
    </div>
  );
}
