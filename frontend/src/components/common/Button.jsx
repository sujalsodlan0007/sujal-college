import { cn } from "@/utils/cn";
// Actually user said React Icons. Let's use react-icons.
import { AiOutlineLoading3Quarters } from "react-icons/ai";

/**
 * Reusable Button component
 */
const Button = ({ 
  children, 
  className, 
  variant = "primary", 
  size = "md", 
  isLoading = false, 
  disabled = false, 
  ...props 
}) => {
  const variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-200",
    secondary: "bg-white text-slate-700 border border-slate-200 hover:bg-slate-50 shadow-sm",
    outline: "bg-transparent border-2 border-blue-600 text-blue-600 hover:bg-blue-50",
    ghost: "bg-transparent text-slate-600 hover:bg-slate-100 hover:text-slate-900",
    danger: "bg-red-600 text-white hover:bg-red-700 shadow-lg shadow-red-200",
    dark: "bg-slate-900 text-white hover:bg-slate-800 shadow-xl",
  };

  const sizes = {
    xs: "px-3 py-1.5 text-[10px] font-black uppercase tracking-widest",
    sm: "px-5 py-2.5 text-xs font-black uppercase tracking-widest",
    md: "px-8 py-3.5 text-xs font-black uppercase tracking-widest",
    lg: "px-10 py-4.5 text-sm font-black uppercase tracking-widest",
  };

  return (
    <button
      disabled={isLoading || disabled}
      className={cn(
        "inline-flex items-center justify-center rounded-2xl transition-all duration-500 focus:outline-none focus:ring-4 focus:ring-blue-500/10 disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98] font-bold tracking-tight",
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {isLoading && (
        <AiOutlineLoading3Quarters className="w-4 h-4 mr-2 animate-spin" />
      )}
      {children}
    </button>
  );
};

export default Button;
