import React, { useState, useRef, useEffect } from 'react';
import TodoList from './TodoList'
import { v4 as uuidv4 } from 'uuid';
import './App.css';
import { MdAdd, MdClear } from "react-icons/md";

const LOCAL_STORAGE_KEY = 'todoApp.todos'

function App() {
  const [todos, setTodos] = useState([])
  const todoNameRef = useRef()

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    if (storedTodos) setTodos(storedTodos)
  }, [])

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
  }, [todos])

  function toggleTodo(id) {
    const newTodos = [...todos]
    const todo = newTodos.find(todo => todo.id === id)
    todo.complete = !todo.complete
    setTodos(newTodos)
  }

  function handleAddTodo(e) {
    const name = todoNameRef.current.value
    if (name === '') return
    setTodos(prevTodos => {
      return [...prevTodos, { id: uuidv4(), name: name, complete: false}]
    })
    todoNameRef.current.value = null
  }

  function handleClearTodos() {
    const newTodos = todos.filter(todo => !todo.complete)
    setTodos(newTodos)
  }

  return (
    <div className='todo-container'>
      <div className='todos-count'>{todos.filter(todo => !todo.complete).length} To Dos</div>
      <div className='form'>
        <input className='form-input' ref={todoNameRef} placeholder='What would you like to get done today?' type="text" />
        <div className='form-btns'>
        <button className='form-add-btn' onClick={handleAddTodo}><MdAdd className='add-btn' /></button>
        <button className='form-clear-btn' onClick={handleClearTodos}><MdClear className='clear-btn' /></button>
        </div>
      </div>      
      <TodoList todos={todos} toggleTodo={toggleTodo} />
    </div>
  )
}

export default App;
