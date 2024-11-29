// src/components/TodoList.js
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleTodo, removeTodo } from '../redux/todoSlice';
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell,Button} from "@nextui-org/react";


const ToDoList = () => {
  const todos = useSelector((state) => state.todos.todos);
  const dispatch = useDispatch();

  const handleToggleTodo = (id) => {
    dispatch(toggleTodo(id));
  };

  const handleRemoveTodo = (id) => {
    dispatch(removeTodo(id));
  };

return (
    <div className='flex justify-center items-center p-4'>
        <div className='flex justify-center items-center w-1/3'>
        {todos.length>0 && (
            <Table aria-label="To-Do List">
                <TableHeader>
                    <TableColumn>Task</TableColumn>
                    <TableColumn>Actions</TableColumn>
                </TableHeader>
                <TableBody>
                    {todos.map((todo) => (
                        <TableRow key={todo.id}>
                            <TableCell>
                                <span
                                    style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}
                                    onClick={() => handleToggleTodo(todo.id)}
                                >
                                    {todo.text}
                                </span>
                            </TableCell>
                            <TableCell>
                                <Button onClick={() => handleRemoveTodo(todo.id)} size='sm'>Delete</Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        )}
    </div>
        </div>
);
};

export default ToDoList;
