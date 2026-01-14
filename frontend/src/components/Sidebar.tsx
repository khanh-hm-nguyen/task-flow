import { useState } from "react";
import { TaskListDto } from "@/types/task";

import { 
  ListAlt, 
  DeleteOutline, 
  Add, 
  FormatListBulleted 
} from "@mui/icons-material";

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
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-30 md:hidden backdrop-blur-sm transition-opacity"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside
        className={`
          fixed inset-y-0 left-0 z-40 w-72 bg-white border-r border-gray-100 
          transform transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] shadow-2xl md:shadow-none
          ${isOpen ? "translate-x-0" : "-translate-x-full"} md:relative md:translate-x-0
        `}
      >
        <div className="p-6 h-full flex flex-col">
          {/* Header */}
          <div className="flex items-center gap-3 mb-8 px-1">
            <div className="bg-blue-600 text-white p-2 rounded-xl shadow-lg shadow-blue-200">
              <ListAlt fontSize="medium" />
            </div>
            <h2 className="text-xl font-bold tracking-tight text-gray-800">
              TaskFlow
            </h2>
          </div>

          {/* List Items */}
          <div className="flex-1 overflow-y-auto space-y-1.5 px-1 custom-scrollbar">
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
                    group flex items-center justify-between p-3 rounded-xl cursor-pointer transition-all duration-200 border border-transparent
                    ${
                      isActive
                        ? "bg-blue-50 text-blue-700 border-blue-100/50 shadow-sm"
                        : "hover:bg-gray-50 text-gray-600 hover:text-gray-900 hover:border-gray-200/50"
                    }
                  `}
                >
                  <div className="min-w-0 flex items-center gap-3.5">
                    {/* Icon changes based on state */}
                    <span className={`transition-colors ${isActive ? "text-blue-600" : "text-gray-400 group-hover:text-gray-500"}`}>
                       <FormatListBulleted fontSize="small" />
                    </span>

                    <span className={`truncate font-medium text-sm ${isActive ? "font-semibold" : ""}`}>
                      {list.title}
                    </span>
                  </div>

                  <div className="flex items-center gap-1">
                    {/* Count Badge */}
                    <span className={`text-[11px] font-medium px-2 py-0.5 rounded-full ${isActive ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-500'}`}>
                       {list.count || 0}
                    </span>

                    {/* Delete Button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onDelete(list.id);
                      }}
                      className={`
                        p-1.5 rounded-lg ml-1 transition-all duration-200
                        ${
                          isActive
                            ? "text-blue-400 hover:bg-blue-200 hover:text-blue-700"
                            : "text-gray-400 opacity-0 group-hover:opacity-100 hover:bg-red-50 hover:text-red-500"
                        }
                      `}
                    >
                      <DeleteOutline fontSize="small" style={{ fontSize: '1.25rem' }} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Add List Form */}
          <div className="mt-4 pt-4 border-t border-gray-100">
            <form onSubmit={handleAdd} className="relative group">
              <input
                type="text"
                placeholder="Create new list..."
                value={newListName}
                onChange={(e) => setNewListName(e.target.value)}
                // Kept on one line to prevent hydration error
                className="w-full bg-gray-50 hover:bg-white border border-gray-200 focus:border-blue-500 rounded-xl pl-4 pr-10 py-3 text-sm focus:outline-none focus:ring-4 focus:ring-blue-500/10 text-gray-800 placeholder:text-gray-400 transition-all duration-200 shadow-sm"
              />
              <button
                type="submit"
                disabled={!newListName.trim()}
                className={`
                  absolute right-2 top-2 p-1.5 rounded-lg transition-all duration-200
                  ${newListName.trim() 
                    ? "bg-blue-600 text-white shadow-md hover:bg-blue-700 hover:scale-105" 
                    : "bg-gray-200 text-gray-400 cursor-not-allowed"}
                `}
              >
                <Add fontSize="small" />
              </button>
            </form>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;