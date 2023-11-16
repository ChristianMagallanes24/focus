// TodoList.js
import "./List.css";
import { FcCancel } from "react-icons/fc";
import React, { useState } from 'react';

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');

  const addTodo = () => {
    if (newTodo.trim() !== '') {
      setTodos([...todos, newTodo]);
      setNewTodo('');
    }
  };

  const removeTodo = (index) => {
    const updatedTodos = [...todos];
    updatedTodos.splice(index, 1);
    setTodos(updatedTodos);
  };

  return (
    <div className='list'>
      <h2>Tareas 😊</h2>
      <div>
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="New Todo"
        />
        <button onClick={addTodo}>Add</button>
      </div>
      <div>
      <ul>
        {todos.map((todo, index) => (
          <p className="p" key={index}>
            {todo}
            <button className="bton-add" onClick={() => removeTodo(index)}> <FcCancel /></button>
          </p>
        ))}
      </ul>
      </div>
    </div>
  );
};

export default TodoList;
