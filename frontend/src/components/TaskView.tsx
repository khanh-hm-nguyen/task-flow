import { useState } from 'react';
import { TaskDto, Priority } from '@/types/task'; 
import { IconPlus, IconTrash, IconCheckCircle, IconCircle, IconCalendar } from './Icons';

interface TaskViewProps {
  listName: string;
  tasks: TaskDto[]; 
  onAddTask: (title: string, priority: Priority, date: string) => void;
  onToggleTask: (id: string) => void;
  onDeleteTask: (id: string) => void;
}

const TaskView = ({ listName, tasks, onAddTask, onToggleTask, onDeleteTask }: TaskViewProps) => {
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState<Priority>('MEDIUM');
  const [date, setDate] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    onAddTask(title, priority, date);
    setTitle('');
    setIsFormOpen(false);
  };

  const getPriorityStyles = (p: Priority) => {
    switch (p) {
      case 'HIGH': return 'text-red-700 bg-red-50 border-red-100';
      case 'MEDIUM': return 'text-amber-700 bg-amber-50 border-amber-100';
      case 'LOW': return 'text-emerald-700 bg-emerald-50 border-emerald-100';
    }
  };

  const formatDate = (isoDate?: string) => {
    if (!isoDate) return null;
    const d = new Date(isoDate);
    return d.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
  };

  return (
    <div className="max-w-4xl mx-auto w-full">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{listName}</h1>
          <p className="text-gray-500 mt-1 text-sm">
            {tasks.filter(t => t.status === 'OPEN').length} tasks pending
          </p>
        </div>
        <button 
          onClick={() => setIsFormOpen(!isFormOpen)}
          className={`
            flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all shadow-sm
            ${isFormOpen 
                ? 'bg-gray-200 text-gray-700 hover:bg-gray-300' 
                : 'bg-blue-600 text-white hover:bg-blue-700 hover:shadow-md'
            }
          `}
        >
          <IconPlus /> <span className="hidden sm:inline">{isFormOpen ? 'Cancel' : 'New Task'}</span>
        </button>
      </div>

      {isFormOpen && (
        <form onSubmit={handleSubmit} className="mb-8 bg-white border border-gray-200 p-5 rounded-xl shadow-sm animate-in slide-in-from-top-2 duration-200">
          <div className="flex flex-col gap-4">
            <input 
              type="text" 
              placeholder="What needs to be done?" 
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 
              focus:outline-none focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 
              text-gray-900 placeholder:text-gray-400 transition-all"
              autoFocus
            />
            <div className="flex flex-wrap gap-3 items-center">
              <select 
                value={priority}
                onChange={(e) => setPriority(e.target.value as Priority)}
                className="bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 cursor-pointer"
              >
                <option value="LOW">Low Priority</option>
                <option value="MEDIUM">Medium Priority</option>
                <option value="HIGH">High Priority</option>
              </select>
              
              <input 
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100" 
              />
              
              <div className="flex-1" />
              <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 shadow-sm transition-colors w-full sm:w-auto">
                Add Task
              </button>
            </div>
          </div>
        </form>
      )}

      <div className="space-y-3">
        {tasks.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-xl border border-dashed border-gray-300">
                <div className="text-gray-400 mb-2">
                    <IconCheckCircle size={40} className="mx-auto opacity-20" />
                </div>
                <p className="text-gray-500 font-medium">No tasks found</p>
                <p className="text-gray-400 text-sm">Sit back and relax.</p>
            </div>
        ) : (
            tasks.map((task) => {
              const isCompleted = task.status === 'CLOSED';
              return (
                <div 
                    key={task.id} 
                    className={`
                        group flex items-center gap-4 p-4 rounded-xl border transition-all duration-200
                        ${isCompleted 
                            ? 'bg-gray-50 border-gray-100' 
                            : 'bg-white border-gray-200 shadow-sm hover:shadow-md hover:border-blue-200'
                        }
                    `}
                >
                    <button 
                      onClick={() => task.id && onToggleTask(task.id)}
                      className={`
                        flex-shrink-0 transition-colors duration-200
                        ${isCompleted ? 'text-blue-500' : 'text-gray-300 hover:text-blue-500'}
                      `}
                    >
                      {isCompleted ? <IconCheckCircle size={22} /> : <IconCircle size={22} />}
                    </button>

                    <div className="flex-1 min-w-0">
                      <p className={`font-medium text-base truncate transition-all ${isCompleted ? 'line-through text-gray-400' : 'text-gray-800'}`}>
                          {task.title}
                      </p>
                      
                      <div className="flex items-center gap-3 mt-1">
                          <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded border ${getPriorityStyles(task.priority)} opacity-80`}>
                            {task.priority}
                          </span>
                          
                          {task.dueDate && (
                          <span className={`flex items-center gap-1 text-xs ${isCompleted ? 'text-gray-300' : 'text-gray-400'}`}>
                              <IconCalendar size={12} />
                              {formatDate(task.dueDate)}
                          </span>
                          )}
                      </div>
                    </div>

                    <button 
                      onClick={() => task.id && onDeleteTask(task.id)}
                      className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all opacity-0 group-hover:opacity-100 focus:opacity-100"
                    >
                      <IconTrash size={18} />
                    </button>
                </div>
              );
            })
        )}
      </div>
    </div>
  );
}

export default TaskView;