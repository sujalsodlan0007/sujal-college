import { cn } from "@/utils/cn";
import { 
  HiOutlineChatAlt2, 
  HiOutlineCalendar, 
  HiOutlineCheckCircle, 
  HiOutlineClock,
  HiOutlineShieldCheck,
  HiOutlineXCircle
} from "react-icons/hi";

const ActivityFeed = ({ activities }) => {
  const getIcon = (type) => {
    switch (type) {
      case "enquiry": return HiOutlineChatAlt2;
      case "viewing": return HiOutlineCalendar;
      case "reservation": return HiOutlineShieldCheck;
      case "success": return HiOutlineCheckCircle;
      case "failed": return HiOutlineXCircle;
      default: return HiOutlineClock;
    }
  };

  const getIconColor = (type) => {
    switch (type) {
      case "enquiry": return "bg-blue-50 text-blue-600 border-blue-100";
      case "viewing": return "bg-indigo-50 text-indigo-600 border-indigo-100";
      case "reservation": return "bg-purple-50 text-purple-600 border-purple-100";
      case "success": return "bg-green-50 text-green-600 border-green-100";
      case "failed": return "bg-red-50 text-red-600 border-red-100";
      default: return "bg-slate-50 text-slate-600 border-slate-100";
    }
  };

  return (
    <div className="space-y-8 relative before:absolute before:left-[23px] before:top-2 before:bottom-2 before:w-[2px] before:bg-slate-50">
      {activities.map((activity, i) => {
        const Icon = getIcon(activity.type);
        return (
          <div key={i} className="flex gap-6 relative">
            <div className={cn(
              "w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 border-2 z-10",
              getIconColor(activity.type)
            )}>
              <Icon className="w-6 h-6" />
            </div>
            <div className="pt-1 flex-1">
              <div className="flex items-center justify-between mb-1">
                <h5 className="text-sm font-bold text-slate-900 leading-none">{activity.title}</h5>
                <span className="text-[9px] font-black text-slate-300 uppercase tracking-widest">{activity.timestamp}</span>
              </div>
              <p className="text-xs text-slate-500 font-medium leading-relaxed">{activity.description}</p>
              {activity.status && (
                <div className="mt-3">
                   <span className={cn(
                     "px-2 py-0.5 rounded-md text-[9px] font-black uppercase tracking-widest border",
                     activity.status === "completed" ? "bg-green-50 text-green-600 border-green-100" :
                     activity.status === "pending" ? "bg-amber-50 text-amber-600 border-amber-100" :
                     "bg-slate-50 text-slate-500 border-slate-100"
                   )}>
                     {activity.status}
                   </span>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ActivityFeed;
