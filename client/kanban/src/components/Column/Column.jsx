
import React, { useState } from 'react'
import Card from '../Card/Card'

const Column = ({ 
  title, 
  status, 
  tasks, 
  onAddTask, 
  onEditTask, 
  onDeleteTask,
  onDragStart,
  onDragOver,
  onDrop 
}) => {
  const [isAdding, setIsAdding] = useState(false);
  const [newTaskText, setNewTaskText] = useState('');

  const handleAddTask = () => {
    if (newTaskText.trim()) {
      onAddTask(newTaskText.trim(), status);
      setNewTaskText('');
      setIsAdding(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleAddTask();
    } else if (e.key === 'Escape') {
      setIsAdding(false);
      setNewTaskText('');
    }
  };

  return (
    <div 
      className='bg-white rounded-lg shadow-lg p-4 min-h-[500px]'
      onDragOver={onDragOver}
      onDrop={() => onDrop(status)}
    >
      <div className='flex justify-between items-center mb-4'>
        <h2 className='text-xl font-bold text-gray-700'>{title}</h2>
        <span className='bg-gray-200 text-gray-700 rounded-full px-3 py-1 text-sm font-semibold'>
          {tasks.length}
        </span>
      </div>
      
      <div className='space-y-3'>
        {tasks.map((task) => (
          <Card 
            key={task.id} 
            task={task}
            onEdit={onEditTask}
            onDelete={onDeleteTask}
            onDragStart={onDragStart}
          />
        ))}
      </div>

      {isAdding ? (
        <div className='mt-3'>
          <textarea
            autoFocus
            value={newTaskText}
            onChange={(e) => setNewTaskText(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder='Enter task description...'
            className='w-full p-3 border-2 border-blue-300 rounded-lg focus:outline-none focus:border-blue-500 resize-none'
            rows='3'
          />
          <div className='flex gap-2 mt-2'>
            <button
              onClick={handleAddTask}
              className='bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-medium transition-colors'
            >
              Add
            </button>
            <button
              onClick={() => {
                setIsAdding(false);
                setNewTaskText('');
              }}
              className='bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded-lg font-medium transition-colors'
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setIsAdding(true)}
          className='w-full mt-3 p-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-blue-400 hover:text-blue-500 transition-colors font-medium'
        >
          + Add Task
        </button>
      )}
    </div>
  )
}

export default Column