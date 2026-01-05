import { useState } from "react";
import { TaskListDto } from "@/types"; 
import { IconPlus, IconTrash, IconList } from "./Icons";

interface SidebarProps {
  lists: TaskListDto[]; 
  activeListId: string;
  onSelect: (id: string) => void;
  onAdd: (name: string) => void;
  onDelete: (id: string) => void;
  isOpen: boolean;
  setIsOpen: (val: boolean) => void;
}

const Sidebar = ({
  lists,
  activeListId,
  onSelect,
  onAdd,
  onDelete,
  isOpen,
  setIsOpen,
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
    <aside
      className={`
      fixed inset-y-0 left-0 z-40 w-64 bg-slate-900 border-r border-slate-800 transform transition-transform duration-300 ease-in-out
      ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } md:relative md:translate-x-0
    `}
    >
      <div className="p-6 h-full flex flex-col">
        <h2 className="text-xl font-bold text-indigo-400 mb-6 flex items-center gap-2">
          <IconList /> TaskLists
        </h2>

        <div className="flex-1 overflow-y-auto space-y-1">
          {lists.map((list) => (
            <div
              key={list.id}
              onClick={() => {
                onSelect(list.id);
                setIsOpen(false);
              }}
              className={`
                group flex items-center justify-between p-3 rounded-lg cursor-pointer transition-colors
                ${
                  activeListId === list.id
                    ? "bg-indigo-600 text-white"
                    : "hover:bg-slate-800 text-slate-400"
                }
              `}
            >
              <div className="min-w-0">
                <span className="truncate font-medium block">{list.title}</span>
          
                <span className="text-xs opacity-60">
                  {list.count || 0} tasks
                </span>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(list.id);
                }}
                className={`p-1 rounded hover:bg-red-500/20 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity ${
                  activeListId === list.id
                    ? "text-indigo-200"
                    : "text-slate-500"
                }`}
              >
                <IconTrash />
              </button>
            </div>
          ))}
        </div>

        <form
          onSubmit={handleAdd}
          className="mt-4 pt-4 border-t border-slate-800"
        >
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="New List..."
              value={newListName}
              onChange={(e) => setNewListName(e.target.value)}
              className="flex-1 bg-slate-950 border border-slate-700 rounded px-3 py-2 text-sm focus:outline-none focus:border-indigo-500 text-slate-200 placeholder:text-slate-600"
            />
            <button
              type="submit"
              className="bg-indigo-600 hover:bg-indigo-700 text-white p-2 rounded transition-colors"
            >
              <IconPlus />
            </button>
          </div>
        </form>
      </div>
    </aside>
  );
};

export default Sidebar;
