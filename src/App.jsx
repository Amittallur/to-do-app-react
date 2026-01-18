import ToDoList from './components/ToDoList'
import AddTodo from './components/AddTodo'


const App = () => {
  return (
    <div className="min-h-screen w-full bg-slate-950 bg-gradient-to-b from-slate-900 via-slate-950 to-black text-white">
      <div className="max-w-5xl mx-auto px-4 py-8">
        <AddTodo />
        <ToDoList />
      </div>
    </div>
  )
}

export default App
