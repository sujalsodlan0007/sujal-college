import { cn } from "@/utils/cn";

/**
 * Reusable Input component
 */
const Input = ({ 
  label, 
  error, 
  className, 
  id, 
  ...props 
}) => {
  return (
    <div className="w-full space-y-2">
      {label && (
        <label 
          htmlFor={id} 
          className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1"
        >
          {label}
        </label>
      )}
      <input
        id={id}
        className={cn(
          "w-full px-5 py-4 bg-white border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 font-medium",
          error && "border-red-500 focus:ring-red-500",
          className
        )}
        {...props}
      />
      {error && (
        <p className="text-xs font-bold text-red-500 mt-1 ml-1">{error}</p>
      )}
    </div>
  );
};

export default Input;
