import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { cn } from "@/utils/cn";

/**
 * Reusable Full-page or Container Loader
 */
export const Loader = ({ className, size = "md" }) => {
  const sizes = {
    sm: "w-6 h-6",
    md: "w-10 h-10",
    lg: "w-16 h-16",
  };

  return (
    <div className={cn("flex items-center justify-center p-4", className)}>
      <AiOutlineLoading3Quarters 
        className={cn("text-blue-600 animate-spin", sizes[size])} 
      />
    </div>
  );
};

/**
 * Reusable Skeleton loader
 */
export const Skeleton = ({ className }) => {
  return (
    <div 
      className={cn(
        "animate-pulse bg-gray-200 rounded-md", 
        className
      )} 
    />
  );
};
