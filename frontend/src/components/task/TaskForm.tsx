"use client";

import { useState } from "react";
import { Priority } from "@/types/task";

interface TaskFormProps {
  initialTitle?: string;
  initialPriority?: Priority;
  initialDate?: string;
  onSubmit: (title: string, priority: Priority, date: string) => void;
  onCancel: () => void;
  submitLabel: string;
}

const TaskForm = ({
  initialTitle = "",
  initialPriority = "MEDIUM",
  initialDate = "",
  onSubmit,
  onCancel,
  submitLabel,
}: TaskFormProps) => {
  const [title, setTitle] = useState(initialTitle);
  const [priority, setPriority] = useState<Priority>(initialPriority);
  const [date, setDate] = useState(initialDate);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    onSubmit(title, priority, date);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mb-10 bg-slate-900 border border-slate-800 p-8 rounded-[2.5rem] shadow-2xl animate-in fade-in slide-in-from-top-4 duration-300"
    >
      <div className="flex flex-col gap-6">
        <input
          type="text"
          placeholder="Enter task details..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full bg-slate-950 border border-slate-800 rounded-2xl px-6 py-4 focus:outline-none focus:border-indigo-500 text-xl font-bold text-white placeholder:text-slate-800 transition-all"
          autoFocus
        />
        <div className="flex flex-wrap gap-4 items-center">
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value as Priority)}
            className="bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm font-bold text-slate-400 focus:border-indigo-500 outline-none cursor-pointer"
          >
            <option value="LOW">Priority: Low</option>
            <option value="MEDIUM">Priority: Medium</option>
            <option value="HIGH">Priority: High</option>
          </select>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm font-bold text-slate-400 focus:border-indigo-500 outline-none"
          />
          <div className="flex gap-2 flex-1 sm:flex-none">
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 sm:flex-none bg-slate-800 text-slate-400 px-6 py-3.5 rounded-xl font-black uppercase tracking-widest text-xs hover:bg-slate-700 transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 sm:flex-none bg-indigo-600 text-white px-10 py-3.5 rounded-xl font-black uppercase tracking-widest text-xs hover:bg-indigo-500 transition-all shadow-lg shadow-indigo-600/20"
            >
              {submitLabel}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default TaskForm;
