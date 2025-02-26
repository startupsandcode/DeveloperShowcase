import React, { useState, useEffect } from 'react';
import { Check, Clock, Plus, Trash2, Edit, Tag, Calendar, Filter, ArrowUpDown, X } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';

// Initialize with sample tasks data
const initialTasks = [
  {
    id: 1,
    title: 'Complete project proposal',
    description: 'Finish the Q1 marketing campaign proposal',
    category: 'Work',
    priority: 'High',
    dueDate: '2025-03-03',
    completed: false,
    createdAt: '2025-02-23',
  },
  {
    id: 2,
    title: 'Schedule team meeting',
    description: 'Organize weekly progress review',
    category: 'Work',
    priority: 'Medium',
    dueDate: '2025-02-28',
    completed: false,
    createdAt: '2025-02-24',
  },
  {
    id: 3,
    title: 'Pay electricity bill',
    description: 'Online payment due by end of month',
    category: 'Personal',
    priority: 'High',
    dueDate: '2025-02-28',
    completed: true,
    createdAt: '2025-02-22',
  },
  {
    id: 4,
    title: 'Gym session',
    description: 'Cardio and strength training',
    category: 'Health',
    priority: 'Medium',
    dueDate: '2025-02-27',
    completed: false,
    createdAt: '2025-02-25',
  },
  {
    id: 5,
    title: 'Book flight tickets',
    description: 'For the conference next month',
    category: 'Travel',
    priority: 'Medium',
    dueDate: '2025-03-10',
    completed: false,
    createdAt: '2025-02-26',
  },
];

export function TaskGrid(){
  // State management
  const [tasks, setTasks] = useState(initialTasks);
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    category: 'Work',
    priority: 'Medium',
    dueDate: '',
  });
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [filterCategory, setFilterCategory] = useState('All');
  const [filterPriority, setFilterPriority] = useState('All');
  const [sortBy, setSortBy] = useState('dueDate');
  const [sortDirection, setSortDirection] = useState('asc');
  const [notification, setNotification] = useState(null);

  // Categories and priorities
  const categories = ['Work', 'Personal', 'Health', 'Travel', 'Study', 'Other'];
  const priorities = ['High', 'Medium', 'Low'];

  // Filter and sort tasks
  const filteredAndSortedTasks = tasks
    .filter(task => {
      const categoryMatch = filterCategory === 'All' || task.category === filterCategory;
      const priorityMatch = filterPriority === 'All' || task.priority === filterPriority;
      return categoryMatch && priorityMatch;
    })
    .sort((a, b) => {
      let comparison = 0;
      
      if (sortBy === 'dueDate') {
        comparison = new Date(a.dueDate) - new Date(b.dueDate);
      } else if (sortBy === 'priority') {
        const priorityValues = { 'High': 3, 'Medium': 2, 'Low': 1 };
        comparison = priorityValues[b.priority] - priorityValues[a.priority];
      } else if (sortBy === 'title') {
        comparison = a.title.localeCompare(b.title);
      } else if (sortBy === 'createdAt') {
        comparison = new Date(b.createdAt) - new Date(a.createdAt);
      }
      
      return sortDirection === 'asc' ? comparison : -comparison;
    });

  // Task management functions
  const addTask = () => {
    if (!newTask.title.trim()) {
      showNotification('Please enter a task title', 'error');
      return;
    }

    if (!newTask.dueDate) {
      showNotification('Please set a due date', 'error');
      return;
    }

    const currentDate = new Date().toISOString().split('T')[0];
    const task = {
      id: Date.now(),
      ...newTask,
      completed: false,
      createdAt: currentDate,
    };

    setTasks([...tasks, task]);
    setNewTask({
      title: '',
      description: '',
      category: 'Work',
      priority: 'Medium',
      dueDate: '',
    });
    showNotification('Task added successfully', 'success');
  };

  const updateTask = () => {
    if (!editingTaskId) return;

    if (!newTask.title.trim()) {
      showNotification('Please enter a task title', 'error');
      return;
    }

    if (!newTask.dueDate) {
      showNotification('Please set a due date', 'error');
      return;
    }

    setTasks(
      tasks.map(task =>
        task.id === editingTaskId ? { ...task, ...newTask } : task
      )
    );
    
    setNewTask({
      title: '',
      description: '',
      category: 'Work',
      priority: 'Medium',
      dueDate: '',
    });
    setEditingTaskId(null);
    showNotification('Task updated successfully', 'success');
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
    showNotification('Task deleted', 'info');
  };

  const toggleTaskCompletion = (id) => {
    setTasks(
      tasks.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const startEditing = (task) => {
    setNewTask({
      title: task.title,
      description: task.description,
      category: task.category,
      priority: task.priority,
      dueDate: task.dueDate,
    });
    setEditingTaskId(task.id);
  };

  const cancelEditing = () => {
    setNewTask({
      title: '',
      description: '',
      category: 'Work',
      priority: 'Medium',
      dueDate: '',
    });
    setEditingTaskId(null);
  };

  const toggleSort = (field) => {
    if (sortBy === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortDirection('asc');
    }
  };

  // Notification management
  const showNotification = (message, type) => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };

  // Due date highlighting
  const getDueDateStatus = (dueDate) => {
    const today = new Date().toISOString().split('T')[0];
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const tomorrowStr = tomorrow.toISOString().split('T')[0];
    
    if (dueDate < today) return 'overdue';
    if (dueDate === today) return 'today';
    if (dueDate === tomorrowStr) return 'tomorrow';
    return 'upcoming';
  };

  // Task counts for dashboard
  const getTaskCounts = () => {
    const overdue = tasks.filter(task => !task.completed && getDueDateStatus(task.dueDate) === 'overdue').length;
    const dueToday = tasks.filter(task => !task.completed && getDueDateStatus(task.dueDate) === 'today').length;
    const completed = tasks.filter(task => task.completed).length;
    const total = tasks.length;
    
    return { overdue, dueToday, completed, total };
  };

  const taskCounts = getTaskCounts();

  return (
    <div className="mt-10">
    <div className="flex flex-col w-full h-full p-6 bg-gray-50">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Task Manager</h1>
      </div>

      {notification && (
        <Alert className={`mb-4 ${notification.type === 'error' ? 'bg-red-50 border-red-200' : notification.type === 'success' ? 'bg-green-50 border-green-200' : 'bg-blue-50 border-blue-200'}`}>
          <AlertDescription className={notification.type === 'error' ? 'text-red-600' : notification.type === 'success' ? 'text-green-600' : 'text-blue-600'}>
            {notification.message}
          </AlertDescription>
        </Alert>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-6">
        <Card className="bg-blue-50 border-blue-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-blue-600">Total Tasks</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-blue-700">{taskCounts.total}</p>
          </CardContent>
        </Card>
        
        <Card className="bg-red-50 border-red-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-red-600">Overdue</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-red-700">{taskCounts.overdue}</p>
          </CardContent>
        </Card>
        
        <Card className="bg-amber-50 border-amber-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-amber-600">Due Today</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-amber-700">{taskCounts.dueToday}</p>
          </CardContent>
        </Card>
        
        <Card className="bg-green-50 border-green-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-green-600">Completed</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-green-700">{taskCounts.completed}</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="all">All Tasks</TabsTrigger>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger value="add">Add New Task</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>All Tasks</CardTitle>
                <div className="flex gap-2">
                  <div className="relative">
                    <select 
                      className="pl-8 pr-2 py-1 border rounded-md text-sm bg-white"
                      value={filterCategory} 
                      onChange={(e) => setFilterCategory(e.target.value)}
                    >
                      <option value="All">All Categories</option>
                      {categories.map(category => (
                        <option key={category} value={category}>{category}</option>
                      ))}
                    </select>
                    <Filter size={16} className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500" />
                  </div>
                  <div className="relative">
                    <select 
                      className="pl-8 pr-2 py-1 border rounded-md text-sm bg-white"
                      value={filterPriority} 
                      onChange={(e) => setFilterPriority(e.target.value)}
                    >
                      <option value="All">All Priorities</option>
                      {priorities.map(priority => (
                        <option key={priority} value={priority}>{priority}</option>
                      ))}
                    </select>
                    <Filter size={16} className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500" />
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b">
                      <th className="px-4 py-2 text-left">
                        <button 
                          className="flex items-center text-sm font-medium" 
                          onClick={() => toggleSort('title')}
                        >
                          Title
                          <ArrowUpDown size={14} className="ml-1" />
                        </button>
                      </th>
                      <th className="px-4 py-2 text-left">Category</th>
                      <th className="px-4 py-2 text-left">
                        <button 
                          className="flex items-center text-sm font-medium" 
                          onClick={() => toggleSort('priority')}
                        >
                          Priority
                          <ArrowUpDown size={14} className="ml-1" />
                        </button>
                      </th>
                      <th className="px-4 py-2 text-left">
                        <button 
                          className="flex items-center text-sm font-medium" 
                          onClick={() => toggleSort('dueDate')}
                        >
                          Due Date
                          <ArrowUpDown size={14} className="ml-1" />
                        </button>
                      </th>
                      <th className="px-4 py-2 text-left">Status</th>
                      <th className="px-4 py-2 text-left">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredAndSortedTasks.map(task => (
                      <tr key={task.id} className={`border-b ${task.completed ? 'bg-gray-50' : ''}`}>
                        <td className="px-4 py-3">
                          <div className={`font-medium ${task.completed ? 'line-through text-gray-500' : ''}`}>
                            {task.title}
                          </div>
                          <div className="text-sm text-gray-500 truncate max-w-xs">
                            {task.description}
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <span className="px-2 py-1 text-xs rounded-full bg-gray-100">
                            {task.category}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            task.priority === 'High' ? 'bg-red-100 text-red-800' : 
                            task.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' : 
                            'bg-green-100 text-green-800'
                          }`}>
                            {task.priority}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <span className={`flex items-center ${
                            task.completed ? 'text-gray-500' :
                            getDueDateStatus(task.dueDate) === 'overdue' ? 'text-red-600' :
                            getDueDateStatus(task.dueDate) === 'today' ? 'text-amber-600' :
                            getDueDateStatus(task.dueDate) === 'tomorrow' ? 'text-blue-600' :
                            'text-gray-600'
                          }`}>
                            <Calendar size={14} className="mr-1" />
                            {task.dueDate}
                            {!task.completed && getDueDateStatus(task.dueDate) === 'overdue' && 
                              <span className="ml-1 text-xs font-medium text-red-600">(Overdue)</span>
                            }
                            {!task.completed && getDueDateStatus(task.dueDate) === 'today' && 
                              <span className="ml-1 text-xs font-medium text-amber-600">(Today)</span>
                            }
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            task.completed ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                          }`}>
                            {task.completed ? 'Completed' : 'Active'}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex gap-2">
                            <button
                              onClick={() => toggleTaskCompletion(task.id)}
                              className={`p-1 rounded-full ${task.completed ? 'text-gray-500 hover:text-green-600' : 'text-green-500 hover:text-green-700'}`}
                              title={task.completed ? 'Mark as incomplete' : 'Mark as complete'}
                            >
                              <Check size={16} />
                            </button>
                            <button
                              onClick={() => startEditing(task)}
                              className="p-1 text-blue-500 hover:text-blue-700 rounded-full"
                              title="Edit task"
                            >
                              <Edit size={16} />
                            </button>
                            <button
                              onClick={() => deleteTask(task.id)}
                              className="p-1 text-red-500 hover:text-red-700 rounded-full"
                              title="Delete task"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                    {filteredAndSortedTasks.length === 0 && (
                      <tr>
                        <td colSpan="6" className="px-4 py-8 text-center text-gray-500">
                          No tasks found matching the current filters
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="active">
          <Card>
            <CardHeader>
              <CardTitle>Active Tasks</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b">
                      <th className="px-4 py-2 text-left">Title</th>
                      <th className="px-4 py-2 text-left">Category</th>
                      <th className="px-4 py-2 text-left">Priority</th>
                      <th className="px-4 py-2 text-left">Due Date</th>
                      <th className="px-4 py-2 text-left">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredAndSortedTasks.filter(task => !task.completed).map(task => (
                      <tr key={task.id} className="border-b">
                        <td className="px-4 py-3">
                          <div className="font-medium">{task.title}</div>
                          <div className="text-sm text-gray-500 truncate max-w-xs">{task.description}</div>
                        </td>
                        <td className="px-4 py-3">
                          <span className="px-2 py-1 text-xs rounded-full bg-gray-100">{task.category}</span>
                        </td>
                        <td className="px-4 py-3">
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            task.priority === 'High' ? 'bg-red-100 text-red-800' : 
                            task.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' : 
                            'bg-green-100 text-green-800'
                          }`}>
                            {task.priority}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <span className={`flex items-center ${
                            getDueDateStatus(task.dueDate) === 'overdue' ? 'text-red-600' :
                            getDueDateStatus(task.dueDate) === 'today' ? 'text-amber-600' :
                            getDueDateStatus(task.dueDate) === 'tomorrow' ? 'text-blue-600' :
                            'text-gray-600'
                          }`}>
                            <Calendar size={14} className="mr-1" />
                            {task.dueDate}
                            {getDueDateStatus(task.dueDate) === 'overdue' && 
                              <span className="ml-1 text-xs font-medium text-red-600">(Overdue)</span>
                            }
                            {getDueDateStatus(task.dueDate) === 'today' && 
                              <span className="ml-1 text-xs font-medium text-amber-600">(Today)</span>
                            }
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex gap-2">
                            <button
                              onClick={() => toggleTaskCompletion(task.id)}
                              className="p-1 text-green-500 hover:text-green-700 rounded-full"
                              title="Mark as complete"
                            >
                              <Check size={16} />
                            </button>
                            <button
                              onClick={() => startEditing(task)}
                              className="p-1 text-blue-500 hover:text-blue-700 rounded-full"
                              title="Edit task"
                            >
                              <Edit size={16} />
                            </button>
                            <button
                              onClick={() => deleteTask(task.id)}
                              className="p-1 text-red-500 hover:text-red-700 rounded-full"
                              title="Delete task"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                    {filteredAndSortedTasks.filter(task => !task.completed).length === 0 && (
                      <tr>
                        <td colSpan="5" className="px-4 py-8 text-center text-gray-500">
                          No active tasks found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="completed">
          <Card>
            <CardHeader>
              <CardTitle>Completed Tasks</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b">
                      <th className="px-4 py-2 text-left">Title</th>
                      <th className="px-4 py-2 text-left">Category</th>
                      <th className="px-4 py-2 text-left">Due Date</th>
                      <th className="px-4 py-2 text-left">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredAndSortedTasks.filter(task => task.completed).map(task => (
                      <tr key={task.id} className="border-b bg-gray-50">
                        <td className="px-4 py-3">
                          <div className="font-medium line-through text-gray-500">{task.title}</div>
                          <div className="text-sm text-gray-400 truncate max-w-xs">{task.description}</div>
                        </td>
                        <td className="px-4 py-3">
                          <span className="px-2 py-1 text-xs rounded-full bg-gray-100">{task.category}</span>
                        </td>
                        <td className="px-4 py-3">
                          <span className="flex items-center text-gray-500">
                            <Calendar size={14} className="mr-1" />
                            {task.dueDate}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex gap-2">
                            <button
                              onClick={() => toggleTaskCompletion(task.id)}
                              className="p-1 text-gray-500 hover:text-green-700 rounded-full"
                              title="Mark as incomplete"
                            >
                              <Check size={16} />
                            </button>
                            <button
                              onClick={() => deleteTask(task.id)}
                              className="p-1 text-red-500 hover:text-red-700 rounded-full"
                              title="Delete task"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                    {filteredAndSortedTasks.filter(task => task.completed).length === 0 && (
                      <tr>
                        <td colSpan="4" className="px-4 py-8 text-center text-gray-500">
                          No completed tasks found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="add">
          <Card>
            <CardHeader>
              <CardTitle>{editingTaskId ? 'Edit Task' : 'Add New Task'}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
                  <input
                    type="text"
                    value={newTask.title}
                    onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                    className="w-full p-2 border rounded-md"
                    placeholder="Enter task title"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea
                    value={newTask.description}
                    onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                    className="w-full p-2 border rounded-md"
                    placeholder="Enter task description"
                    rows="3"
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                    <select
                      value={newTask.category}
                      onChange={(e) => setNewTask({ ...newTask, category: e.target.value })}
                      className="w-full p-2 border rounded-md"
                    >
                      {categories.map(category => (
                        <option key={category} value={category}>{category}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                    <select
                      value={newTask.priority}
                      onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}
                      className="w-full p-2 border rounded-md"
                    >
                      {priorities.map(priority => (
                        <option key={priority} value={priority}>{priority}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Due Date *</label>
                    <input
                      type="date"
                      value={newTask.dueDate}
                      onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
                      className="w-full p-2 border rounded-md"
                      min={new Date().toISOString().split('T')[0]}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              {editingTaskId ? (
                <>
                  <button
                    onClick={cancelEditing}
                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={updateTask}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  >
                    Update Task
                  </button>
                </>
              ) : (
                <button
                  onClick={addTask}
                  className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 ml-auto"
                >
                  <Plus size={16} className="inline mr-1" />
                  Add Task
                </button>
              )}
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
    </div>
  );
};
