// src/components/TodoList.js
import { useCallback, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleTodo, removeTodo, clearCompleted, toggleAll } from '../redux/todoSlice';
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Tabs,
  Tab,
  Input,
  Chip,
  Checkbox,
} from "@nextui-org/react";
import UpdateTodo from './UpdateTodo';

const ToDoList = () => {
  const todos = useSelector((state) => state.todos.todos);
  const dispatch = useDispatch();

  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');

  const handleToggleTodo = useCallback(
    (id) => {
      dispatch(toggleTodo(id));
    },
    [dispatch],
  );

  const handleRemoveTodo = useCallback(
    (id) => {
      dispatch(removeTodo(id));
    },
    [dispatch],
  );

  const handleClearCompleted = useCallback(() => {
    dispatch(clearCompleted());
  }, [dispatch]);

  const handleToggleAll = useCallback(() => {
    dispatch(toggleAll());
  }, [dispatch]);

  const filteredTodos = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();
    return todos.filter((todo) => {
      const matchesFilter =
        filter === 'all'
          ? true
          : filter === 'active'
          ? !todo.completed
          : todo.completed;
      const matchesSearch = todo.text.toLowerCase().includes(normalizedSearch);
      return matchesFilter && matchesSearch;
    });
  }, [todos, filter, search]);

  const remainingCount = useMemo(
    () => todos.filter((todo) => !todo.completed).length,
    [todos],
  );

  const completedCount = useMemo(
    () => todos.filter((todo) => todo.completed).length,
    [todos],
  );

  const allCompleted = useMemo(
    () => todos.length > 0 && todos.every((todo) => todo.completed),
    [todos],
  );

  const hasTodos = todos.length > 0;

  return (
    <div className="flex justify-center items-start p-4">
      <Card className="w-full max-w-3xl bg-white/95 shadow-2xl border border-white/40 backdrop-blur-sm">
        <CardHeader className="flex items-center justify-between gap-3">
          <div>
            <h2 className="text-xl font-semibold text-slate-900">Your tasks</h2>
            <p className="text-xs text-slate-500">
              Organize, filter, and update todos in one place.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Chip
              size="sm"
              color={remainingCount > 0 ? 'primary' : 'success'}
              variant="flat"
            >
              {remainingCount} left
            </Chip>
            <Chip size="sm" color="success" variant="flat">
              {completedCount} done
            </Chip>
          </div>
        </CardHeader>
        <CardBody>
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between mb-4">
            <Tabs
              size="sm"
              aria-label="Filter todos"
              selectedKey={filter}
              onSelectionChange={(key) => setFilter(String(key))}
              color="primary"
              variant="bordered"
            >
              <Tab key="all" title="All" />
              <Tab key="active" title="Active" />
              <Tab key="completed" title="Completed" />
            </Tabs>
            <Input
              isClearable
              size="sm"
              variant="bordered"
              placeholder="Search tasks..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onClear={() => setSearch('')}
              className="md:w-72"
              aria-label="Search tasks"
            />
          </div>

          {!hasTodos && (
            <div className="flex flex-col items-center justify-center py-10 text-center text-slate-400">
              <p className="text-sm font-medium">No tasks yet</p>
              <p className="text-xs">
                Add your first task to start organizing your day.
              </p>
            </div>
          )}

          {hasTodos && filteredTodos.length === 0 && (
            <div className="flex flex-col items-center justify-center py-10 text-center text-slate-400">
              <p className="text-sm font-medium">No tasks match your filters</p>
              <p className="text-xs">
                Try changing the filter or clearing the search text.
              </p>
            </div>
          )}

          {hasTodos && filteredTodos.length > 0 && (
            <div className="max-h-80 overflow-y-auto rounded-lg border border-slate-100">
              <Table
                aria-label="To-Do List"
                removeWrapper
                className="min-w-full"
              >
                <TableHeader>
                  <TableColumn className="text-left">Task</TableColumn>
                  <TableColumn className="text-center w-40">
                    Actions
                  </TableColumn>
                </TableHeader>
                <TableBody>
                  {filteredTodos.map((todo) => (
                    <TableRow key={todo.id}>
                      <TableCell>
                        <button
                          type="button"
                          onClick={() => handleToggleTodo(todo.id)}
                          className={`w-full text-left text-sm transition-colors ${
                            todo.completed
                              ? 'line-through text-slate-400'
                              : 'text-slate-800 hover:text-slate-950'
                          }`}
                          aria-pressed={todo.completed}
                        >
                          {todo.text}
                        </button>
                      </TableCell>
                      <TableCell>
                        <div className="flex justify-center gap-2">
                          <UpdateTodo todo={todo} />
                          <Button
                            onClick={() => handleRemoveTodo(todo.id)}
                            color="danger"
                            size="sm"
                            variant="light"
                            aria-label="Delete task"
                          >
                            Delete
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardBody>
        <CardFooter className="flex flex-col gap-3 border-t border-slate-100 pt-3 md:flex-row md:items-center md:justify-between">
          <div className="flex gap-2">
            <Checkbox
              size="sm"
              color="secondary"
              isSelected={allCompleted}
              onValueChange={handleToggleAll}
              isDisabled={!hasTodos}
              aria-label="Toggle all tasks"
            >
              Toggle all
            </Checkbox>
            <Button
              size="sm"
              variant="flat"
              color="danger"
              onClick={handleClearCompleted}
              isDisabled={completedCount === 0}
              aria-label="Clear completed tasks"
            >
              Clear completed
            </Button>
          </div>
          <p className="text-xs text-slate-500">
            Click a task to mark it as complete or reopen it.
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ToDoList;
