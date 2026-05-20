import { cn } from "@/utils/cn";

/**
 * Reusable Badge component
 */
const Badge = ({ 
  children, 
  variant = "default", 
  className 
}) => {
  const variants = {
    default: "bg-slate-100 text-slate-800",
    success: "bg-blue-600 text-white shadow-lg shadow-blue-200",
    warning: "bg-amber-50 text-amber-600 border border-amber-100",
    danger: "bg-red-50 text-red-600 border border-red-100",
    info: "bg-blue-50 text-blue-600 border border-blue-100",
    outline: "bg-transparent border border-slate-200 text-slate-500",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest",
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
};

export default Badge;
