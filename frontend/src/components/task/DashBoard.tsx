"use client";

import { useState, useEffect } from "react";
import Sidebar from "@/components/Sidebar";
import { TaskView } from "@/components/task";
import { Menu as MenuIcon, AssignmentLate } from "@mui/icons-material"; 
import { TaskDto, TaskStatus, TaskListDto, Priority } from "@/types/task";
import { taskService } from "@/services/task.service";
import { authService } from "@/services/auth.service";


const DashBoard = () => {
 const [lists, setLists] = useState<TaskListDto[]>([]);
  const [tasks, setTasks] = useState<TaskDto[]>([]);
  const [activeListId, setActiveListId] = useState<string | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [firstname, setFirstname] = useState("Guest"); // State for user name

  useEffect(() => {
    fetchLists();
    // Retrieve the name stored during sign-in
    setFirstname(authService.getUserName());
  }, );

  useEffect(() => {
    if (activeListId) {
      fetchTasks(activeListId);
    } else {
      setTasks([]);
    }
  }, [activeListId]);

  const fetchLists = async () => {
    try {
      const data = await taskService.getLists();
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
      const data = await taskService.getTasks(listId);
      setTasks(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddList = async (title: string) => {
    try {
      const newList = await taskService.createList(title);
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
      await taskService.deleteList(id);
      const updatedLists = lists.filter((l) => l.id !== id);
      setLists(updatedLists);
      if (activeListId === id) {
        setActiveListId(updatedLists.length > 0 ? updatedLists[0].id : null);
      }
    } catch (err) {
      alert("Failed to delete list");
    }
  };

  const handleAddTask = async (title: string, priority: Priority, date: string) => {
    if (!activeListId) return;
    try {
      const newTask: TaskDto = {
        title,
        priority,
        dueDate: date ? `${date}T00:00:00` : undefined,
        status: "OPEN",
      };
      const created = await taskService.createTask(activeListId, newTask);
      setTasks([...tasks, created]);
      refreshListCounts();
    } catch (err) {
      alert("Failed to create task");
    }
  };

  const handleUpdateTask = async (taskId: string, title: string, priority: Priority, date: string) => {
    if (!activeListId) return;
    try {
      const existingTask = tasks.find((t) => t.id === taskId);
      if (!existingTask) return;

      const updatedTask: TaskDto = {
        ...existingTask,
        title,
        priority,
        dueDate: date ? `${date}T00:00:00` : undefined,
      };

      setTasks(tasks.map((t) => (t.id === taskId ? updatedTask : t)));
      await taskService.updateTask(activeListId, taskId, updatedTask);
    } catch (err) {
      alert("Failed to update task");
      fetchTasks(activeListId);
    }
  };

  const handleToggleTask = async (taskId: string) => {
    if (!activeListId) return;
    const task = tasks.find((t) => t.id === taskId);
    if (!task) return;

    try {
      const updatedStatus: TaskStatus = task.status === "OPEN" ? "CLOSED" : "OPEN";
      const updatedTask = { ...task, status: updatedStatus };
      setTasks(tasks.map((t) => (t.id === taskId ? updatedTask : t)));
      await taskService.updateTask(activeListId, taskId, updatedTask);
    } catch (err) {
      fetchTasks(activeListId);
    }
  };

  const handleDeleteTask = async (taskId: string) => {
    if (!activeListId) return;
    try {
      await taskService.deleteTask(activeListId, taskId);
      setTasks(tasks.filter((t) => t.id !== taskId));
      refreshListCounts();
    } catch (err) {
      alert("Failed to delete task");
    }
  };

  const handleLogout = () => {
    authService.logout();
    window.location.href = "/login";
  };

  const refreshListCounts = () => fetchLists();

  const activeList = lists.find((l) => l.id === activeListId);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 flex overflow-hidden font-sans">
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
        <div className="absolute top-[-10%] right-[-5%] w-[40%] h-[40%] bg-indigo-900/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[30%] h-[30%] bg-indigo-950/20 rounded-full blur-[100px]" />
      </div>

      {!isSidebarOpen && (
        <button
          className="md:hidden fixed top-5 left-5 z-50 p-3 bg-slate-900 border border-slate-800 rounded-2xl text-indigo-400 shadow-2xl transition-all active:scale-95"
          onClick={() => setIsSidebarOpen(true)}
        >
          <MenuIcon />
        </button>
      )}

      <Sidebar
        lists={lists}
        activeListId={activeListId || ""}
        onSelect={setActiveListId}
        onAdd={handleAddList}
        onDelete={handleDeleteList}
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
        firstname={firstname} // Dynamically passed firstname
        onLogout={handleLogout}
      />

      <main className="flex-1 relative overflow-y-auto px-4 md:px-8 lg:px-12 py-8 md:py-10 transition-all duration-300">
        <div className="max-w-5xl mx-auto h-full">
          {loading ? (
            <div className="flex flex-col justify-center items-center h-[60vh] gap-4">
              <div className="w-12 h-12 border-4 border-slate-800 border-t-indigo-500 rounded-full animate-spin" />
              <p className="text-slate-500 font-black text-xs uppercase tracking-widest">
                Syncing your workflow...
              </p>
            </div>
          ) : activeList ? (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <TaskView
                listName={activeList.title}
                tasks={tasks}
                onAddTask={handleAddTask}
                onToggleTask={handleToggleTask}
                onDeleteTask={handleDeleteTask}
                onUpdateTask={handleUpdateTask}
              />
            </div>
          ) : (
            <div className="flex h-[70vh] flex-col items-center justify-center text-center px-6">
              <div className="bg-slate-900 border border-slate-800 p-6 rounded-full mb-6 text-indigo-500/50">
                <AssignmentLate />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2 uppercase tracking-tighter">
                Ready to be productive?
              </h3>
              <p className="text-slate-500 max-w-xs mx-auto text-sm font-medium">
                Select a collection from the sidebar to start managing your daily objectives.
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default DashBoard