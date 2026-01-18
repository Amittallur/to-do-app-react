// src/components/AddTodo.js
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTodo } from '../redux/todoSlice';
import { Button, Input } from "@nextui-org/react";

const AddTodo = () => {
  const [todoText, setTodoText] = useState('');
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const dispatch = useDispatch();

  const handleSubmit = () => {
    if (!todoText.trim()) {
      setHasSubmitted(true);
      return;
    }
    const newTodo = {
      id: Date.now(),
      text: todoText,
      completed: false,
    };
    dispatch(addTodo(newTodo));
    setTodoText('');
    setHasSubmitted(false);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleSubmit();
    }
  };

  const isInvalid = hasSubmitted && !todoText.trim();

  return (
    <div className="flex flex-col items-center gap-4 py-10">
      <h1 className="text-3xl font-extrabold tracking-tight text-white drop-shadow-md">
        Your Smart To-Do
      </h1>
      <p className="text-sm text-white/80">
        Capture tasks quickly, stay focused, and track what matters.
      </p>
      <div className="w-full max-w-3xl flex flex-col gap-2 md:flex-row">
        <Input
          type="text"
          value={todoText}
          onChange={(e) => setTodoText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Add a task and press Enter"
          aria-label="Add a new task"
          autoFocus
          isInvalid={isInvalid}
          errorMessage={isInvalid ? 'Please enter a task before adding.' : ''}
          className="flex-1"
        />
        <Button
          color="primary"
          variant="shadow"
          onPress={handleSubmit}
          className="md:w-auto w-full"
        >
          Add task
        </Button>
      </div>
    </div>
  );
};

export default AddTodo;
