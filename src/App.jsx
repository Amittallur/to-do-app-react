import React from 'react'
import ToDoList from './components/ToDoList'
import AddTodo from './components/AddTodo'


const App = () => {
  return (
    <div className='bg-gradient-to-r from-blue-900 via-purple-500 to-cyan-400 p-4 w-full min-h-screen'>
      <AddTodo/>
      <ToDoList/>
    </div>
  )
}

export default App