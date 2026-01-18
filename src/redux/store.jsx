// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import todosReducer from './todoSlice';

const saveTodosToStorage = (todos) => {
  try {
    localStorage.setItem('todos', JSON.stringify(todos));
  } catch {
    return;
  }
};

const store = configureStore({
  reducer: {
    todos: todosReducer,
  },
});

store.subscribe(() => {
  const state = store.getState();
  saveTodosToStorage(state.todos.todos);
});

export default store;
