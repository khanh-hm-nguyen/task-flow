"use client";

import { useState, useEffect } from "react";
import Sidebar from "@/components/Sidebar";
import TaskView from "@/components/TaskView";
import { IconMenu } from "@/components/Icons";
import { TaskDto, TaskStatus, TaskListDto, Priority } from "@/types";
import { api } from "@/services/api";

export default function Dashboard() {
  const [lists, setLists] = useState<TaskListDto[]>([]);
  const [tasks, setTasks] = useState<TaskDto[]>([]);
  const [activeListId, setActiveListId] = useState<string | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    fetchLists();
  }, []);

  useEffect(() => {
    if (activeListId) {
      fetchTasks(activeListId);
    } else {
      setTasks([]);
    }
  }, [activeListId]);

  const fetchLists = async () => {
    try {
      const data = await api.getLists();
      setLists(data);
      if (data.length > 0 && !activeListId) {
        setActiveListId(data[0].id);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchTasks = async (listId: string) => {
    try {
      const data = await api.getTasks(listId);
      setTasks(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddList = async (title: string) => {
    try {
      const newList = await api.createList(title);
      setLists([...lists, newList]);
      setActiveListId(newList.id);
    } catch (err) {
      alert("Failed to create list");
    }
  };

  const handleDeleteList = async (id: string) => {
    if (!confirm("Are you sure? This will delete all tasks in the list."))
      return;
    try {
      await api.deleteList(id);
      const updatedLists = lists.filter((l) => l.id !== id);
      setLists(updatedLists);
      if (activeListId === id) {
        setActiveListId(updatedLists.length > 0 ? updatedLists[0].id : null);
      }
    } catch (err) {
      alert("Failed to delete list");
    }
  };

  const handleAddTask = async (
    title: string,
    priority: Priority,
    date: string
  ) => {
    if (!activeListId) return;
    try {
      const newTask: TaskDto = {
        title,
        priority,

        dueDate: date ? `${date}T00:00:00` : undefined,
        status: "OPEN",
      };

      const created = await api.createTask(activeListId, newTask);
      setTasks([...tasks, created]);
      refreshListCounts();
    } catch (err) {
      console.error(err);
      alert("Failed to create task");
    }
  };

  const handleToggleTask = async (taskId: string) => {
    if (!activeListId) return;
    const task = tasks.find((t) => t.id === taskId);
    if (!task) return;

    try {
    
      const updatedStatus: TaskStatus =
        task.status === "OPEN" ? "CLOSED" : "OPEN";

      const updatedTask = { ...task, status: updatedStatus };


      setTasks(tasks.map((t) => (t.id === taskId ? updatedTask : t)));

      await api.updateTask(activeListId, taskId, updatedTask);
    } catch (err) {
      fetchTasks(activeListId);
    }
  };

  const handleDeleteTask = async (taskId: string) => {
    if (!activeListId) return;
    try {
      await api.deleteTask(activeListId, taskId);
      setTasks(tasks.filter((t) => t.id !== taskId));
    } catch (err) {
      alert("Failed to delete task");
    }
  };

  const refreshListCounts = () => {
    fetchLists();
  };

  const activeList = lists.find((l) => l.id === activeListId);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 flex overflow-hidden">
      <button
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-slate-800 rounded-md text-white border border-slate-700"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        <IconMenu />
      </button>

      <Sidebar
        lists={lists}
        activeListId={activeListId || ""}
        onSelect={setActiveListId}
        onAdd={handleAddList}
        onDelete={handleDeleteList}
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
      />

      <main className="flex-1 overflow-y-auto p-4 md:p-8 pt-16 md:pt-8 transition-all duration-300">
        {loading ? (
          <div className="flex justify-center items-center h-full text-slate-500">
            Loading...
          </div>
        ) : activeList ? (
          <TaskView
            listName={activeList.title}
            tasks={tasks}
            onAddTask={handleAddTask}
            onToggleTask={handleToggleTask}
            onDeleteTask={handleDeleteTask}
          />
        ) : (
          <div className="flex h-full flex-col items-center justify-center text-slate-500">
            <p className="text-lg">No list selected.</p>
          </div>
        )}
      </main>
    </div>
  );
}
