import { useState } from 'react';
import { TaskDto, Priority } from '@/types'; 
import { IconPlus, IconTrash, IconCheckCircle, IconCircle, IconCalendar } from './Icons';

interface TaskViewProps {
  listName: string;
  tasks: TaskDto[]; 
  onAddTask: (title: string, priority: Priority, date: string) => void;
  onToggleTask: (id: string) => void;
  onDeleteTask: (id: string) => void;
}

const  TaskView = ({ listName, tasks, onAddTask, onToggleTask, onDeleteTask }: TaskViewProps) => {
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

  const getPriorityColor = (p: Priority) => {
    switch (p) {
      case 'HIGH': return 'text-red-400 bg-red-400/10 border-red-400/20';
      case 'MEDIUM': return 'text-amber-400 bg-amber-400/10 border-amber-400/20';
      case 'LOW': return 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20';
    }
  };


  const formatDate = (isoDate?: string) => {
    if (!isoDate) return null;
    return isoDate.split('T')[0];
  };

  return (
    <div className="max-w-4xl mx-auto w-full">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">{listName}</h1>
          <p className="text-slate-400 text-sm">
            {tasks.filter(t => t.status === 'OPEN').length} incomplete tasks
          </p>
        </div>
        <button 
          onClick={() => setIsFormOpen(!isFormOpen)}
          className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors font-medium shadow-lg shadow-indigo-900/20"
        >
          <IconPlus /> <span>New Task</span>
        </button>
      </div>

      {isFormOpen && (
        <form onSubmit={handleSubmit} className="mb-8 bg-slate-900 border border-slate-800 p-4 rounded-xl shadow-xl">
          <div className="flex flex-col gap-4">
            <input 
              type="text" 
              placeholder="What needs to be done?" 
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 text-white placeholder:text-slate-600"
              autoFocus
            />
            <div className="flex flex-wrap gap-3">
              <select 
                value={priority}
                onChange={(e) => setPriority(e.target.value as Priority)}
                className="bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-300 focus:outline-none focus:border-indigo-500"
              >
                <option value="LOW">Low Priority</option>
                <option value="MEDIUM">Medium Priority</option>
                <option value="HIGH">High Priority</option>
              </select>
              <input 
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-300 focus:outline-none focus:border-indigo-500 [color-scheme:dark]" 
              />
              <div className="flex-1" />
              <button type="button" onClick={() => setIsFormOpen(false)} className="text-slate-400 hover:text-white px-4 py-2 text-sm">Cancel</button>
              <button type="submit" className="bg-indigo-600 text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-indigo-500">Add Task</button>
            </div>
          </div>
        </form>
      )}

      <div className="space-y-3">
        {tasks.length === 0 ? (
            <div className="text-center py-20 bg-slate-900/50 rounded-xl border border-dashed border-slate-800">
                <p className="text-slate-500">No tasks found.</p>
            </div>
        ) : (
            tasks.map((task) => {
              const isCompleted = task.status === 'CLOSED';
              return (
                <div 
                    key={task.id} 
                    className={`group flex items-center gap-4 p-4 rounded-xl border transition-all duration-200 
                    ${isCompleted ? 'bg-slate-900/30 border-slate-800/50 opacity-60' : 'bg-slate-900 border-slate-800 hover:border-slate-700 hover:shadow-lg hover:shadow-black/20'}`}
                >
                    <button 
                      onClick={() => task.id && onToggleTask(task.id)}
                      className={`flex-shrink-0 transition-colors ${isCompleted ? 'text-indigo-500' : 'text-slate-600 hover:text-indigo-400'}`}
                    >
                      {isCompleted ? <IconCheckCircle /> : <IconCircle />}
                    </button>

                    <div className="flex-1 min-w-0">
                      <p className={`font-medium truncate ${isCompleted ? 'line-through text-slate-500' : 'text-slate-200'}`}>
                          {task.title}
                      </p>
                      <div className="flex items-center gap-3 mt-1.5">
                          <span className={`text-xs px-2 py-0.5 rounded border ${getPriorityColor(task.priority)}`}>
                          {task.priority}
                          </span>
                          {task.dueDate && (
                          <span className="flex items-center gap-1 text-xs text-slate-500">
                              <IconCalendar />
                              {formatDate(task.dueDate)}
                          </span>
                          )}
                      </div>
                    </div>

                    <button 
                      onClick={() => task.id && onDeleteTask(task.id)}
                      className="p-2 text-slate-600 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                    >
                      <IconTrash />
                    </button>
                </div>
              );
            })
        )}
      </div>
    </div>
  );
}

export default TaskView