"use client";

import { cn } from "@/utils/cn";
import { HiOutlineExclamationCircle, HiOutlineRefresh } from "react-icons/hi";
import Button from "./Button";

const ErrorState = ({ 
  title = "Something went wrong", 
  description = "We encountered an error while processing your request. Please try again.", 
  onRetry,
  className 
}) => {
  return (
    <div className={cn("flex flex-col items-center justify-center p-12 text-center min-h-[400px]", className)}>
      <div className="w-20 h-20 bg-red-50 text-red-500 rounded-3xl flex items-center justify-center mb-8">
        <HiOutlineExclamationCircle className="w-10 h-10" />
      </div>
      <h3 className="text-2xl font-bold text-slate-900 mb-3 font-display">{title}</h3>
      <p className="text-slate-500 font-medium max-w-sm mb-10 leading-relaxed">{description}</p>
      {onRetry && (
        <Button 
          onClick={onRetry}
          className="rounded-2xl px-8 py-4 font-black uppercase tracking-widest text-[10px] shadow-xl shadow-blue-100 flex items-center gap-2"
        >
          <HiOutlineRefresh className="w-4 h-4" />
          Try Again
        </Button>
      )}
    </div>
  );
};

export default ErrorState;
