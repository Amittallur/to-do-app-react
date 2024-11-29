// src/components/TodoList.js
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleTodo, removeTodo } from '../redux/todoSlice';
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell,Button} from "@nextui-org/react";
import UpdateTodo from './UpdateTodo';


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
    <div className='flex justify-center items-center p-4 '>
        <div className='flex justify-center items-center '>
        {todos.length>0 && (
            <Table aria-label="To-Do List">
                <TableHeader>
                    <TableColumn className='text-center'>Task</TableColumn>
                    <TableColumn className='text-center'>Actions</TableColumn>
                </TableHeader>
                <TableBody>
                    {todos.map((todo) => (
                        <TableRow key={todo.id}>
                            <TableCell className='text-center'>
                                <span
                                    style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}
                                    onClick={() => handleToggleTodo(todo.id)}
                                >
                                    {todo.text}
                                </span>
                            </TableCell>
                            <TableCell className='row-span-4'>
                                <div className='flex space-x-2'>
                                    <Button size='sm' color='secondary'><UpdateTodo todo={todo}/></Button>
                                    <Button onClick={() => handleRemoveTodo(todo.id)} color='primary' size='sm'>Delete</Button>
                                </div>
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
