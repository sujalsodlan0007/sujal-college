import { cn } from "@/utils/cn";

const UnitTable = ({ units, onEnquire, onReserve, onBookViewing }) => {
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
    <div className="bg-white rounded-[2rem] border border-slate-100 overflow-hidden shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-slate-50/50 border-b border-slate-100">
              <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Unit</th>
              <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Type & Floor</th>
              <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Size</th>
              <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Price</th>
              <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Available From</th>
              <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Status</th>
              <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {units.map((unit) => (
              <tr key={unit.id} className="hover:bg-slate-50/50 transition-colors group">
                <td className="px-8 py-6">
                  <span className="font-black text-slate-900 font-display text-lg">#{unit.unit_number}</span>
                </td>
                <td className="px-8 py-6">
                  <div className="text-sm font-bold text-slate-700">{unit.type}</div>
                  <div className="text-[10px] text-slate-400 font-black uppercase tracking-widest mt-1">Floor {unit.floor}</div>
                </td>
                <td className="px-8 py-6">
                  <span className="text-sm font-bold text-slate-600">{unit.size} SQ FT</span>
                </td>
                <td className="px-8 py-6">
                  <span className="text-lg font-black text-slate-900">£{unit.price.toLocaleString()}</span>
                  <span className="text-[10px] text-slate-400 font-bold ml-1">pcm</span>
                </td>
                <td className="px-8 py-6">
                  <span className="text-sm font-bold text-slate-600">{unit.available_from || "Immediate"}</span>
                </td>
                <td className="px-8 py-6">
                  <div className={cn(
                    "inline-flex px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest border",
                    getStatusStyles(unit.status)
                  )}>
                    {unit.status.replace("_", " ")}
                  </div>
                </td>
                <td className="px-8 py-6 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button 
                      onClick={() => onBookViewing && onBookViewing(unit)}
                      className="px-4 py-2 bg-slate-50 text-slate-600 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-100 transition-all"
                    >
                      Viewing
                    </button>
                    <button 
                      onClick={() => onEnquire && onEnquire(unit)}
                      className="px-4 py-2 bg-white border border-slate-200 text-slate-900 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-50 transition-all"
                    >
                      Enquire
                    </button>
                    <button 
                      onClick={() => onReserve && onReserve(unit)}
                      className="bg-blue-600 text-white px-5 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-700 shadow-lg shadow-blue-100 transition-all"
                    >
                      Reserve
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UnitTable;
