import { cn } from "@/utils/cn";
import Badge from "@/components/common/Badge";
import Button from "@/components/common/Button";

const UnitCard = ({ unit, onEnquire, onReserve, onBookViewing }) => {
  const { 
    unit_number, 
    floor, 
    size, 
    type, 
    price, 
    status,
    available_from
  } = unit;

  const getStatusStyles = (status) => {
    switch (status) {
      case "available":
        return "bg-green-50 text-green-600 border-green-100";
      case "hold":
        return "bg-amber-50 text-amber-600 border-amber-100";
      case "let_agreed":
      case "reserved":
        return "bg-red-50 text-red-600 border-red-100";
      case "coming_soon":
        return "bg-blue-50 text-blue-600 border-blue-100";
      default:
        return "bg-slate-50 text-slate-600 border-slate-100";
    }
  };

  return (
    <div className="bg-white border border-slate-100 rounded-[2rem] p-8 shadow-sm hover:shadow-2xl hover:shadow-slate-200 hover:-translate-y-1 transition-all duration-500 group">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h4 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors font-display">Unit {unit_number}</h4>
          <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.2em] mt-2">{type} • Floor {floor}</p>
        </div>
        <div className={cn(
          "px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border shadow-sm",
          getStatusStyles(status)
        )}>
          {status.replace("_", " ")}
        </div>
      </div>

      <div className="flex items-center justify-between mb-10 pb-8 border-b border-slate-50">
        <div>
          <span className="text-[10px] text-slate-400 font-black uppercase tracking-widest block mb-2">Monthly</span>
          <div className="flex items-baseline">
            <span className="text-3xl font-black text-slate-900 tracking-tight">£{price.toLocaleString()}</span>
            <span className="text-xs text-slate-400 font-bold ml-1">/mo</span>
          </div>
        </div>
        <div className="text-right">
          <span className="text-[10px] text-slate-400 font-black uppercase tracking-widest block mb-2">Total Area</span>
          <span className="text-sm font-black text-slate-700 tracking-tight">{size} SQ FT</span>
        </div>
      </div>

      <div className="mb-10 flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100/50">
        <div>
          <span className="text-[10px] text-slate-400 font-black uppercase tracking-widest block mb-1">Available From</span>
          <span className="text-xs font-bold text-slate-700">{available_from || "Immediate"}</span>
        </div>
        <Button 
          variant="ghost" 
          size="sm" 
          className="text-[10px] font-black uppercase tracking-widest text-blue-600 hover:text-blue-700 p-0 h-auto"
          onClick={() => onEnquire && onEnquire(unit)}
        >
          View Details
        </Button>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Button 
          variant="secondary" 
          size="sm" 
          className="w-full py-4 rounded-xl font-black uppercase tracking-widest text-[10px] border-2"
          onClick={() => onEnquire && onEnquire(unit)}
        >
          Enquire
        </Button>
        <Button 
          size="sm" 
          className="w-full py-4 rounded-xl font-black uppercase tracking-widest text-[10px] shadow-lg shadow-blue-100"
          onClick={() => onReserve && onReserve(unit)}
        >
          Reserve
        </Button>
        <Button 
          variant="ghost" 
          size="sm" 
          className="w-full py-4 rounded-xl font-black uppercase tracking-widest text-[10px] col-span-2 border border-slate-100 hover:bg-slate-50"
          onClick={() => onBookViewing && onBookViewing(unit)}
        >
          Book Viewing
        </Button>
      </div>
    </div>
  );
};

export default UnitCard;
