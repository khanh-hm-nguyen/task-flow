"use client";

import { useState } from "react";
import { TaskDto, Priority } from "@/types/task";
import { Delete, Check, Circle, Edit } from "@mui/icons-material";
import TaskForm from "./TaskForm";

interface TaskItemProps {
  task: TaskDto;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, title: string, priority: Priority, date: string) => void;
}

const TaskItem = ({ task, onToggle, onDelete, onEdit }: TaskItemProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const isCompleted = task.status === "CLOSED";

  const formatDate = (isoDate?: string) => {
    if (!isoDate) return null;
    const d = new Date(isoDate);
    return d.toLocaleDateString(undefined, { month: "short", day: "numeric" });
  };

  if (isEditing) {
    return (
      <TaskForm
        initialTitle={task.title}
        initialPriority={task.priority}
        initialDate={task.dueDate?.split("T")[0]}
        submitLabel="Update"
        onCancel={() => setIsEditing(false)}
        onSubmit={(title, priority, date) => {
          onEdit(task.id!, title, priority, date);
          setIsEditing(false);
        }}
      />
    );
  }

  return (
    <div className={`group flex items-center gap-5 p-5 rounded-[2rem] border transition-all duration-300 ${
      isCompleted
        ? "bg-slate-950/50 border-slate-900 opacity-40"
        : "bg-slate-900 border-slate-800 hover:border-indigo-500/50 hover:shadow-2xl hover:shadow-indigo-500/5"
    }`}>
      <button
        onClick={() => task.id && onToggle(task.id)}
        className={`flex-shrink-0 transition-all ${isCompleted ? "text-indigo-500" : "text-slate-700 hover:text-indigo-400"}`}
      >
        {isCompleted ? <Check /> : <Circle />}
      </button>

      <div className="flex-1 min-w-0">
        <p className={`font-bold text-lg truncate ${isCompleted ? "line-through text-slate-600" : "text-slate-200"}`}>
          {task.title}
        </p>
        <div className="flex items-center gap-3 mt-1 text-[10px] font-black uppercase tracking-widest">
          <span className={
            task.priority === "HIGH" ? "text-rose-500" : 
            task.priority === "MEDIUM" ? "text-amber-500" : "text-emerald-500"
          }>
            {task.priority}
          </span>
          {task.dueDate && (
            <span className="text-slate-600 flex items-center gap-1 opacity-60 tracking-widest leading-none underline decoration-slate-800">
              {formatDate(task.dueDate)}
            </span>
          )}
        </div>
      </div>

      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-all">
        <button
          onClick={() => setIsEditing(true)}
          className="p-3 text-slate-700 hover:text-indigo-400 hover:bg-indigo-400/10 rounded-2xl"
        >
          <Edit />
        </button>
        <button
          onClick={() => task.id && onDelete(task.id)}
          className="p-3 text-slate-700 hover:text-rose-400 hover:bg-rose-400/10 rounded-2xl"
        >
          <Delete />
        </button>
      </div>
    </div>
  );
};

export default TaskItem