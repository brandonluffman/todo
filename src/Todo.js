import React from 'react';
import './Todo.css';

export default function Todo({ todo, toggleTodo }) {
  function handleTodoClick() {
    toggleTodo(todo.id)
  }
  
  return (
    <div className='todo'>
        <input className='todo-box' type="checkbox" checked={todo.complete} onChange={handleTodoClick} />
        <p className='todo-name'>{todo.name}</p>
    </div>
  )
}