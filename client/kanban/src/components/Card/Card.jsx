import React, { useState } from 'react'

const Card = ({ task, onEdit, onDelete, onDragStart }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(task.text);

  const handleEdit = () => {
    if (editText.trim() && editText !== task.text) {
      onEdit(task.id, editText.trim());
    }
    setIsEditing(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleEdit();
    } else if (e.key === 'Escape') {
      setIsEditing(false);
      setEditText(task.text);
    }
  };

  return (
    <div
      draggable={!isEditing}
      onDragStart={() => onDragStart(task)}
      className='bg-white border-2 border-gray-200 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-move group'
    >
      {isEditing ? (
        <div>
          <textarea
            autoFocus
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onKeyDown={handleKeyPress}
            className='w-full p-2 border-2 border-blue-300 rounded focus:outline-none focus:border-blue-500 resize-none'
            rows='2'
          />
          <div className='flex gap-2 mt-2'>
            <button
              onClick={handleEdit}
              className='bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-sm font-medium transition-colors'
            >
              Save
            </button>
            <button
              onClick={() => {
                setIsEditing(false);
                setEditText(task.text);
              }}
              className='bg-gray-300 hover:bg-gray-400 text-gray-700 px-3 py-1 rounded text-sm font-medium transition-colors'
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div>
          <p className='text-gray-800 mb-2'>{task.text}</p>
          <div className='flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity'>
            <button
              onClick={() => setIsEditing(true)}
              className='bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm font-medium transition-colors'
            >
              Edit
            </button>
            <button
              onClick={() => onDelete(task.id)}
              className='bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm font-medium transition-colors'
            >
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Card