
import React, { useState } from 'react'
import { useTasks } from '../../hooks/useTasks'
import Column from '../Column/Column';

const Board = () => {
  const { getTasksByStatus, addTask, editTask, deleteTask, moveTask, loading, error } = useTasks();
  const [draggedTask, setDraggedTask] = useState(null);

  const handleDragStart = (task) => {
    setDraggedTask(task);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (newStatus) => {
    if (draggedTask && draggedTask.status !== newStatus) {
      moveTask(draggedTask.id, newStatus);
    }
    setDraggedTask(null);
  };

  if (loading) {
    return (
      <div className='min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center'>
        <div className='text-2xl text-gray-600'>Loading tasks...</div>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8'>
      <div className='max-w-7xl mx-auto'>
        <h1 className='text-4xl font-bold text-gray-800 mb-8 text-center'>Kanban Board</h1>
        
        {error && (
          <div className='bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded mb-4 text-center'>
            {error} - Using offline mode
          </div>
        )}
        
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
          <Column 
            title="To Do" 
            status="todo"
            tasks={getTasksByStatus('todo')}
            onAddTask={addTask}
            onEditTask={editTask}
            onDeleteTask={deleteTask}
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          />
          <Column 
            title="In Progress" 
            status="inProgress"
            tasks={getTasksByStatus('inProgress')}
            onAddTask={addTask}
            onEditTask={editTask}
            onDeleteTask={deleteTask}
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          />
          <Column 
            title="Done" 
            status="done"
            tasks={getTasksByStatus('done')}
            onAddTask={addTask}
            onEditTask={editTask}
            onDeleteTask={deleteTask}
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          />
        </div>
      </div>
    </div>
  )
}

export default Board