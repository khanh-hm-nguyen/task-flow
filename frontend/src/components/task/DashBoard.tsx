"use client";

import { useState, useEffect } from "react";
import Sidebar from "@/components/task/Sidebar";
import { TaskView } from "@/components/task";
import { TaskDto, TaskStatus, TaskListDto, Priority } from "@/types/task";
import { taskService } from "@/services/task.service";
import { authService } from "@/services/auth.service";
import {
  DashboardBackground,
  MobileMenuToggle,
  LoadingState,
  EmptyState,
} from ".";

const DashBoard = () => {
  const [lists, setLists] = useState<TaskListDto[]>([]);
  const [tasks, setTasks] = useState<TaskDto[]>([]);
  const [activeListId, setActiveListId] = useState<string | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [firstname, setFirstname] = useState<string>("");

  // return username
  useEffect(() => {
    setFirstname(authService.getUserName());
  }, []);

  // return tasklist
  useEffect(() => {
    fetchLists();
  }, []); // Added missing dependency array to prevent infinite loops

  // return task by listid
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

  // create task list
  const handleAddList = async (title: string) => {
    try {
      const newList = await taskService.createList(title);
      setLists([...lists, newList]);
      setActiveListId(newList.id);
    } catch (err) {
      alert("Failed to create list");
    }
  };

  // delete task list
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

  // create task
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
      const created = await taskService.createTask(activeListId, newTask);
      setTasks([...tasks, created]);
      refreshListCounts();
    } catch (err) {
      alert("Failed to create task");
    }
  };

  // update task
  const handleUpdateTask = async (
    taskId: string,
    title: string,
    priority: Priority,
    date: string
  ) => {
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

  // update task status
  const handleToggleTask = async (taskId: string) => {
    if (!activeListId) return;
    const task = tasks.find((t) => t.id === taskId);
    if (!task) return;

    try {
      const updatedStatus: TaskStatus =
        task.status === "OPEN" ? "CLOSED" : "OPEN";
      const updatedTask = { ...task, status: updatedStatus };
      setTasks(tasks.map((t) => (t.id === taskId ? updatedTask : t)));
      await taskService.updateTask(activeListId, taskId, updatedTask);
    } catch (err) {
      fetchTasks(activeListId);
    }
  };

  // delete task
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

  // loggout
  const handleLogout = () => {
    authService.logout();
    window.location.href = "/login";
  };

  const refreshListCounts = () => fetchLists();

  const activeList = lists.find((l) => l.id === activeListId);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 flex overflow-hidden font-sans">
      <DashboardBackground />

      <MobileMenuToggle
        isOpen={isSidebarOpen}
        onOpen={() => setIsSidebarOpen(true)}
      />

      <Sidebar
        lists={lists}
        activeListId={activeListId || ""}
        onSelect={setActiveListId}
        onAdd={handleAddList}
        onDelete={handleDeleteList}
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
        firstname={firstname}
        onLogout={handleLogout}
      />

      <main className="flex-1 relative overflow-y-auto px-4 md:px-8 lg:px-12 py-8 md:py-10 transition-all duration-300">
        <div className="max-w-5xl mx-auto h-full">
          {loading ? (
            <LoadingState />
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
            <EmptyState />
          )}
        </div>
      </main>
    </div>
  );
};

export default DashBoard;
