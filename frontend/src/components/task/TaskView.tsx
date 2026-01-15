"use client";

import { useState } from "react";
import { TaskDto, Priority } from "@/types/task";
import TaskForm from "./TaskForm";
import TaskItem from "./TaskItem";
import TaskStats from "./TaskStats";


interface TaskViewProps {
  listName: string;
  tasks: TaskDto[];
  onAddTask: (title: string, priority: Priority, date: string) => void;
  onToggleTask: (id: string) => void;
  onDeleteTask: (id: string) => void;
  onUpdateTask: (id: string, title: string, priority: Priority, date: string) => void;
}

const TaskView = ({
  listName,
  tasks,
  onAddTask,
  onToggleTask,
  onDeleteTask,
  onUpdateTask,
}: TaskViewProps) => {
  const [isFormOpen, setIsFormOpen] = useState(false);

  return (
    <div className="max-w-4xl mx-auto w-full pb-20 text-slate-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12 px-1">
        <div>
          <h1 className="text-5xl font-black text-white tracking-tighter uppercase">
            {listName}
          </h1>
          <div className="flex items-center gap-2 mt-3">
            <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse"></span>
            <p className="text-slate-500 font-black text-xs uppercase tracking-[0.2em]">
              {tasks.filter((t) => t.status === "OPEN").length} Active Items
            </p>
          </div>
        </div>

        <button
          onClick={() => setIsFormOpen(!isFormOpen)}
          className={`px-8 py-3.5 rounded-full font-black text-sm uppercase tracking-widest transition-all ${
            isFormOpen
              ? "bg-slate-800 text-slate-400 hover:bg-slate-700"
              : "bg-indigo-600 text-white hover:bg-indigo-500 shadow-xl shadow-indigo-600/20"
          }`}
        >
          {isFormOpen ? "Cancel" : "Add Task"}
        </button>
      </div>

      <TaskStats tasks={tasks} />

      {/* Add Task Form */}
      {isFormOpen && (
        <TaskForm
          submitLabel="Confirm"
          onCancel={() => setIsFormOpen(false)}
          onSubmit={(title, priority, date) => {
            onAddTask(title, priority, date);
            setIsFormOpen(false);
          }}
        />
      )}

      {/* Task List */}
      <div className="space-y-4">
        {tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onToggle={onToggleTask}
            onDelete={onDeleteTask}
            onEdit={onUpdateTask}
          />
        ))}
      </div>
    </div>
  );
};

export default TaskView;