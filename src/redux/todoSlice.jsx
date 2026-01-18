// src/redux/todosSlice.js
import { createSlice } from '@reduxjs/toolkit';

const loadTodosFromStorage = () => {
  try {
    const stored = localStorage.getItem('todos');
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

const initialState = {
  todos: loadTodosFromStorage(),
};

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo: (state, action) => {
      state.todos.push(action.payload);
    },
    toggleTodo: (state, action) => {
      const todo = state.todos.find((todo) => todo.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },
    removeTodo: (state, action) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
    },
    updateTodo: (state, action) => {
      const index = state.todos.findIndex((todo) => todo.id === action.payload.id);
      if (index !== -1) {
        state.todos[index] = action.payload;
      }
    },
    clearCompleted: (state) => {
      state.todos = state.todos.filter((todo) => !todo.completed);
    },
    toggleAll: (state) => {
      if (state.todos.length === 0) return;
      const allCompleted = state.todos.every((todo) => todo.completed);
      state.todos.forEach((todo) => {
        todo.completed = !allCompleted;
      });
    },
  },
});

export const { addTodo, toggleTodo, removeTodo, updateTodo, clearCompleted, toggleAll } = todosSlice.actions;
export default todosSlice.reducer;
