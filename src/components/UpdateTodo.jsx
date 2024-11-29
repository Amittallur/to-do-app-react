// src/components/UpdateTodo.jsx
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateTodo } from '../redux/todoSlice';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Input } from "@nextui-org/react";

const UpdateTodo = ({ todo }) => {
    const [todoText, setTodoText] = useState(todo.text);
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const dispatch = useDispatch();

    const handleUpdateTodo = () => {
        onOpenChange();
        if (todoText.trim()) {
            const updatedTodo = {
                ...todo,
                text: todoText,
            };
            dispatch(updateTodo(updatedTodo));
        }
    };

    return (
        <>
            <Button onPress={onOpen} size='sm' color='secondary'>Update</Button>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Update Todo</ModalHeader>
                            <ModalBody>
                                <div className='w-full'>
                                    <Input
                                        type="text"
                                        value={todoText}
                                        onChange={(e) => setTodoText(e.target.value)}
                                        placeholder="Update to-do"
                                    />
                                </div>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={onClose}>
                                    Close
                                </Button>
                                <Button color="primary" onClick={handleUpdateTodo}>
                                    Update
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
};

export default UpdateTodo;