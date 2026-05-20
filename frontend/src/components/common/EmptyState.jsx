import { cn } from "@/utils/cn";
import { HiOutlineFolderOpen } from "react-icons/hi";

/**
 * Reusable Empty State component
 */
const EmptyState = ({ 
  title = "No data found", 
  description = "There is nothing to display here at the moment.", 
  icon: Icon = HiOutlineFolderOpen,
  children,
  className
}) => {
  return (
    <div className={cn("flex flex-col items-center justify-center p-12 text-center", className)}>
      <div className="p-4 bg-gray-50 rounded-full mb-4">
        <Icon className="w-12 h-12 text-gray-400" />
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-1">{title}</h3>
      <p className="text-gray-500 max-w-xs mb-6">{description}</p>
      {children}
    </div>
  );
};

export default EmptyState;
