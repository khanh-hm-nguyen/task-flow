"use client";

import { TaskDto } from "@/types/task";
import { 
  CheckCircleOutline, 
  RadioButtonUnchecked, 
  TrendingUp 
} from "@mui/icons-material";

interface TaskStatsProps {
  tasks: TaskDto[];
}

const TaskStats = ({ tasks }: TaskStatsProps) => {
 const total = tasks.length;
  const completed = tasks.filter(t => t.status === "CLOSED").length;
  const pending = total - completed;
  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
      {/* Progress Card */}
      <div className="bg-slate-900 border border-slate-800 p-6 rounded-[2rem] flex items-center gap-5">
        <div className="relative flex items-center justify-center">
          <svg className="w-16 h-16 transform -rotate-90">
            <circle
              cx="32"
              cy="32"
              r="28"
              stroke="currentColor"
              strokeWidth="4"
              fill="transparent"
              className="text-slate-800"
            />
            <circle
              cx="32"
              cy="32"
              r="28"
              stroke="currentColor"
              strokeWidth="4"
              fill="transparent"
              strokeDasharray={175.9}
              strokeDashoffset={175.9 - (175.9 * percentage) / 100}
              className="text-indigo-500 transition-all duration-1000"
            />
          </svg>
          <span className="absolute text-xs font-black text-white">{percentage}%</span>
        </div>
        <div>
          <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Completion</p>
          <h4 className="text-xl font-black text-white leading-none">Efficiency</h4>
        </div>
      </div>

      {/* Pending Tasks */}
      <div className="bg-slate-900 border border-slate-800 p-6 rounded-[2rem] flex items-center gap-5">
        <div className="bg-amber-500/10 p-4 rounded-2xl text-amber-500">
          <RadioButtonUnchecked />
        </div>
        <div>
          <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">To Do</p>
          <h4 className="text-xl font-black text-white leading-none">{pending} <span className="text-slate-600 text-sm">Items</span></h4>
        </div>
      </div>

      {/* Done Tasks */}
      <div className="bg-slate-900 border border-slate-800 p-6 rounded-[2rem] flex items-center gap-5">
        <div className="bg-emerald-500/10 p-4 rounded-2xl text-emerald-500">
          <CheckCircleOutline />
        </div>
        <div>
          <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Completed</p>
          <h4 className="text-xl font-black text-white leading-none">{completed} <span className="text-slate-600 text-sm">Items</span></h4>
        </div>
      </div>
    </div>
  );
};

export default TaskStats