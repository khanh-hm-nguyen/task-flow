"use client";

import { useState } from "react";
import { TaskListDto } from "@/types/task";
import {
  Delete,
  Add,
  FormatListBulleted,
  Logout,
  Layers,
} from "@mui/icons-material";

interface SidebarProps {
  lists: TaskListDto[];
  activeListId: string;
  onSelect: (id: string) => void;
  onAdd: (name: string) => void;
  onDelete: (id: string) => void;
  isOpen: boolean;
  setIsOpen: (val: boolean) => void;
  firstname: string;
  onLogout: () => void;
}

const Sidebar = ({
  lists,
  activeListId,
  onSelect,
  onAdd,
  onDelete,
  isOpen,
  setIsOpen,
  firstname,
  onLogout,
}: SidebarProps) => {
  const [newListName, setNewListName] = useState("");

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (newListName.trim()) {
      onAdd(newListName);
      setNewListName("");
    }
  };

  return (
    <>
      {/* Mobile Backdrop with Blur */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-30 md:hidden backdrop-blur-md transition-opacity"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside
        className={`
        fixed inset-y-0 left-0 z-40 w-72 bg-slate-950 border-r border-slate-900 
        transform transition-transform duration-300 ease-out 
        ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:relative md:translate-x-0
      `}
      >
        <div className="p-6 h-full flex flex-col text-slate-300">
          <div className="flex-shrink-0 space-y-6 mb-8">
            {/* Logo Section */}
            <div className="flex items-center gap-3 px-1">
              <div className="bg-indigo-600 text-white p-2 rounded-2xl shadow-lg shadow-indigo-500/20">
                <Layers fontSize="medium" />
              </div>
              <h2 className="text-2xl font-black tracking-tighter text-white">
                TaskFlow
              </h2>
            </div>

            {/* Profile Section - Dynamically displays firstname */}
            <div className="bg-slate-900 border border-slate-800 p-4 rounded-3xl flex items-center justify-between">
              <div className="flex items-center gap-3 min-w-0">
                <div className="bg-indigo-600/10 p-2 rounded-full text-indigo-400 border border-indigo-500/20 text-[10px] font-black uppercase flex items-center justify-center w-8 h-8">
                  {firstname?.charAt(0) || "G"}
                </div>
                <div className="flex flex-col min-w-0">
                  <span
                    className="text-sm font-bold text-slate-200 truncate"
                    title={firstname}
                  >
                    Hello {firstname || "Guest"} 👋
                  </span>
                </div>
              </div>
              <button
                onClick={onLogout}
                className="p-2 text-slate-500 hover:text-rose-400 hover:bg-slate-800 rounded-xl transition-all"
                title="Logout"
              >
                <Logout fontSize="small" />
              </button>
            </div>

            {/* Minimal Input for New Collections */}
            <form onSubmit={handleAdd} className="relative group px-1">
              <input
                type="text"
                placeholder="New collection..."
                value={newListName}
                onChange={(e) => setNewListName(e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 focus:border-indigo-500 rounded-2xl pl-4 pr-12 py-3.5 text-sm font-bold focus:outline-none focus:ring-1 focus:ring-indigo-500 text-slate-200 placeholder:text-slate-600 transition-all"
              />
              <button
                type="submit"
                disabled={!newListName.trim()}
                className={`absolute right-2 top-2 p-1.5 rounded-xl transition-all ${
                  newListName.trim()
                    ? "bg-indigo-600 text-white hover:bg-indigo-500 shadow-lg shadow-indigo-600/20"
                    : "bg-slate-800 text-slate-600 cursor-not-allowed"
                }`}
              >
                <Add fontSize="small" />
              </button>
            </form>
          </div>

          {/* Section Divider */}
          <div className="flex items-center gap-3 mb-4 px-2">
            <span className="text-[10px] font-black text-slate-600 uppercase tracking-[0.2em]">
              Collections
            </span>
            <div className="h-px bg-slate-900 flex-1"></div>
          </div>

          {/* Scrollable Navigation List */}
          <div className="flex-1 overflow-y-auto space-y-1 px-1 custom-scrollbar scrollbar-hide">
            {lists.map((list) => {
              const isActive = activeListId === list.id;
              return (
                <div
                  key={list.id}
                  onClick={() => {
                    onSelect(list.id);
                    setIsOpen(false);
                  }}
                  className={`
                    group flex items-center justify-between p-3.5 rounded-2xl cursor-pointer transition-all 
                    ${
                      isActive
                        ? "bg-indigo-500 text-white shadow-xl shadow-indigo-600/20 scale-[1.02]"
                        : "hover:bg-slate-900 text-slate-400 hover:text-slate-200"
                    }
                  `}
                >
                  <div className="min-w-0 flex items-center gap-4">
                    <FormatListBulleted
                      style={{ fontSize: "1rem", opacity: isActive ? 1 : 0.4 }}
                      className={
                        isActive ? "text-indigo-200" : "text-indigo-500"
                      }
                    />
                    <span
                      className={`truncate text-sm tracking-tight ${
                        isActive ? "font-black" : "font-bold"
                      }`}
                    >
                      {list.title}
                    </span>
                  </div>
                  <div className="flex items-center">
            

                    {/* Delete Button for Lists */}

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onDelete(list.id);
                      }}
                      className="opacity-0 group-hover:opacity-100 p-1 text-slate-500 hover:text-rose-300 transition-opacity cursor-pointer"
                    >
                      <Delete
                        fontSize="small"
                        style={{ fontSize: "1.2rem" }}
                      />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
