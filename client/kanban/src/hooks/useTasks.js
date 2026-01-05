import { useState, useEffect } from "react";
import { fetchTasks, createTask, updateTask, deleteTask } from "../services/api";

const STORAGE_KEY = import.meta.env.VITE_STORAGE_KEY;

export function useTasks() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load tasks from server on mount
  useEffect(() => {
    loadTasks();
  }, []);

  // Save to localStorage whenever tasks change (backup)
  useEffect(() => {
    if (tasks.length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    }
  }, [tasks]);

  // Load tasks from server
  const loadTasks = async () => {
    try {
      setLoading(true);
      const data = await fetchTasks();
      // Transform MongoDB _id to id for consistency
      const transformedTasks = data.map(task => ({
        id: task._id,
        text: task.text,
        status: task.status
      }));
      setTasks(transformedTasks);
      setError(null);
    } catch (err) {
      console.error('Failed to load tasks:', err);
      setError('Failed to load tasks from server');
      // Fallback to localStorage if server is unavailable
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setTasks(JSON.parse(stored));
      }
    } finally {
      setLoading(false);
    }
  };

  const addTask = async (text, status = 'todo') => {
    try {
      const newTaskData = { text, status };
      const createdTask = await createTask(newTaskData);
      const transformedTask = {
        id: createdTask._id,
        text: createdTask.text,
        status: createdTask.status
      };
      setTasks([...tasks, transformedTask]);
    } catch (err) {
      console.error('Failed to add task:', err);
      setError('Failed to add task');
      // Fallback to local state
      const newTask = {
        id: Date.now().toString(),
        text,
        status
      };
      setTasks([...tasks, newTask]);
    }
  };

  const editTask = async (id, newText) => {
    try {
      const updatedTask = await updateTask(id, { text: newText });
      setTasks(tasks.map(task => 
        task.id === id ? { ...task, text: newText } : task
      ));
    } catch (err) {
      console.error('Failed to edit task:', err);
      setError('Failed to edit task');
      // Fallback to local state
      setTasks(tasks.map(task => 
        task.id === id ? { ...task, text: newText } : task
      ));
    }
  };

  const deleteTaskById = async (id) => {
    try {
      await deleteTask(id);
      setTasks(tasks.filter(task => task.id !== id));
    } catch (err) {
      console.error('Failed to delete task:', err);
      setError('Failed to delete task');
      // Fallback to local state
      setTasks(tasks.filter(task => task.id !== id));
    }
  };

  const moveTask = async (id, newStatus) => {
    try {
      await updateTask(id, { status: newStatus });
      setTasks(tasks.map(task =>
        task.id === id ? { ...task, status: newStatus } : task
      ));
    } catch (err) {
      console.error('Failed to move task:', err);
      setError('Failed to move task');
      // Fallback to local state
      setTasks(tasks.map(task =>
        task.id === id ? { ...task, status: newStatus } : task
      ));
    }
  };


  const getTasksByStatus = (status) => {
    return tasks.filter(task => task.status === status);
  };

  return {
    tasks,
    loading,
    error,
    addTask,
    editTask,
    deleteTask: deleteTaskById,
    moveTask,
    getTasksByStatus,
    refreshTasks: loadTasks
  };
}