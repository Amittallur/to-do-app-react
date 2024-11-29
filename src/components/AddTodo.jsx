// src/components/AddTodo.js
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTodo } from '../redux/todoSlice';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Checkbox, Input, Link } from "@nextui-org/react";

const AddTodo = () => {
    const [todoText, setTodoText] = useState('');

    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const dispatch = useDispatch();

    const handleAddTodo = () => {
        onOpenChange();
        if (todoText.trim()) {
            const newTodo = {
                id: Date.now(),
                text: todoText,
                completed: false,
            };
            dispatch(addTodo(newTodo));
            setTodoText('');
        }
    };

    return (
        <div>
            <div className='flex justify-center items-center'>
                <h2 className='text-2xl font-bold text-white'>To-Do App</h2>
            </div>




            <div className='flex justify-center items-center p-4'>

                <Button onPress={onOpen} color='primary'>Add Todo</Button>
                <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                    <ModalContent>
                        {(onClose) => (
                            <>
                                <ModalHeader className="flex flex-col gap-1">Todos</ModalHeader>
                                <ModalBody>
                                    <div className='w-full'>
                                        <Input
                                            type="text"
                                            value={todoText}
                                            onChange={(e) => setTodoText(e.target.value)}
                                            placeholder="Add a new to-do"
                                        />
                                       
                                    </div>
                                </ModalBody>
                                <ModalFooter>
                                    <Button color="danger" variant="light" onPress={onClose}>
                                        Close
                                    </Button>
                                    <Button color="primary"  onClick={handleAddTodo} >
                                        Add
                                    </Button>
                                </ModalFooter>
                            </>
                        )}
                    </ModalContent>
                </Modal>
            </div>



        </div>
    );
};

export default AddTodo;
