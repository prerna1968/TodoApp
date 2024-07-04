import React, { useState } from 'react';
import Footer from '../footer';

const Todo = ({ todo, toggleComplete, deleteTodo, editTodo }) => {
    console.log(todo,"todoooooo");
  const [isEditing, setIsEditing] = useState(false);
  const [newText, setNewText] = useState(todo.text);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    editTodo(todo, newText);
    setIsEditing(false);
  };

  return (
    <>
    <li className="flex justify-between p-2">
      {isEditing ? (
        <input
          value={newText}
          onChange={(e) => setNewText(e.target.value)}
          className="border p-2 w-full"
        />
      ) : (
        <div
          className={`flex-1 p-2 ${todo.completed ? 'line-through' : ''}`}
          onClick={() => toggleComplete(todo)}
        >
          {todo.text}
        </div>
      )}
      <div className="flex space-x-2">
        {isEditing ? (
          <button onClick={handleSave} className="p-2 bg-green-500 text-white">
            Save
          </button>
        ) : (
          <button onClick={handleEdit} className="p-2 bg-yellow-500 text-white">
            Edit
          </button>
        )}
        <button
          onClick={() => deleteTodo(todo.id)}
          className="p-2 bg-red-500 text-white"
        >
          Delete
        </button>
      </div>
      
    </li>
    </>
  );
};

export default Todo;
