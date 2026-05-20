import { cn } from "@/utils/cn";

const SkeletonCard = ({ className }) => {
  return (
    <div className={cn("bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden animate-pulse", className)}>
      <div className="aspect-[4/3] bg-slate-100" />
      <div className="p-8 space-y-4">
        <div className="flex justify-between items-start">
          <div className="h-6 w-2/3 bg-slate-100 rounded-lg" />
          <div className="h-6 w-1/4 bg-slate-100 rounded-lg" />
        </div>
        <div className="h-4 w-1/2 bg-slate-100 rounded-lg" />
        <div className="flex gap-4 pt-4">
          <div className="h-10 flex-1 bg-slate-100 rounded-xl" />
          <div className="h-10 flex-1 bg-slate-100 rounded-xl" />
        </div>
      </div>
    </div>
  );
};

const SkeletonTable = ({ rows = 5, cols = 4, className }) => {
  return (
    <div className={cn("bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden animate-pulse", className)}>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-100">
              {Array.from({ length: cols }).map((_, i) => (
                <th key={i} className="px-8 py-5">
                  <div className="h-3 w-20 bg-slate-200 rounded-full" />
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {Array.from({ length: rows }).map((_, i) => (
              <tr key={i}>
                {Array.from({ length: cols }).map((_, j) => (
                  <td key={j} className="px-8 py-6">
                    <div className="h-4 w-2/3 bg-slate-100 rounded-lg" />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export { SkeletonCard, SkeletonTable };
