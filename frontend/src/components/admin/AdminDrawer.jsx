"use client";

import { motion, AnimatePresence } from "framer-motion";
import { HiOutlineX } from "react-icons/hi";
import { cn } from "@/utils/cn";

const AdminDrawer = ({ isOpen, onClose, title, children }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-[60]"
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-y-0 right-0 w-full max-w-xl bg-white shadow-2xl z-[70] overflow-hidden flex flex-col"
          >
            <div className="p-8 border-b border-slate-100 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-slate-900 font-display">{title}</h2>
              <button 
                onClick={onClose}
                className="p-3 bg-slate-50 text-slate-400 hover:text-slate-900 rounded-2xl transition-all"
              >
                <HiOutlineX className="w-6 h-6" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-8">
              {children}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default AdminDrawer;
