import Header from './components/Header'
import { Tasks } from './components/Tasks'
import { useState, useEffect } from "react"
import { AddTask } from './components/AddTask'
import Login from './components/Login'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [showAddTask, setshowAddTask] = useState(false)
  
  // Check if user is already logged in when app loads
  useEffect(() => {
    const token = localStorage.getItem('jwt_token')
    if(token) {
        setIsAuthenticated(true)
    }
  }, [])

  const [tasks, setTasks] = useState([
    {
        "id": 1,
        "text": "Doctors Appointment",
        "day": "Feb 5th at 2:30pm",
        "reminder": true
    },
    {
        "id": 2,
        "text": "Meeting at School",
        "day": "Feb 6th at 1:30pm",
        "reminder": true
    }
  ])

  // --- LOGIN LOGIC ---
  const loginUser = async (details) => {
    console.log("Attempting login with:", details)

    // TODO: REPLACE THIS BLOCK WITH YOUR REAL BACKEND CALL LATER
    // Example: 
    // const res = await fetch('http://localhost:5000/api/login', { method: 'POST', ... })
    // const data = await res.json()
    
    // MOCK LOGIC:
    if(details.email === "user" && details.password === "123") {
        // Create a fake token
        const fakeToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." 
        
        // Save to local storage so they stay logged in on refresh
        localStorage.setItem('jwt_token', fakeToken)
        
        setIsAuthenticated(true)
    } else {
        alert("Invalid credentials! (Try user/123)")
    }
  }

  // --- LOGOUT LOGIC ---
  const logoutUser = () => {
      localStorage.removeItem('jwt_token')
      setIsAuthenticated(false)
      setshowAddTask(false) // reset UI
      setTasks(null)
  }

  // Delete Task
  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id)) 
  }

  // Toggle Reminder
  const reminder = (id) => {
    setTasks(tasks.map((task) => task.id === id ? {...task, reminder: !task.reminder} : task)) 
  }

  // Add Task
  const addTask = (task) => {
    const id = Math.floor(Math.random() * 10000) + 1
    const newTask = {id, ... task}
    setTasks([...tasks, newTask])
  }

  return (
    <div className='container'>
      {/* CONDITION: If NOT authenticated, show Login. Else, show App */}
      {!isAuthenticated ? (
          <>
            <header className='header'><h1>Task Tracker Login</h1></header>
            <Login onLogin={loginUser} />
          </>
      ) : (
        <>
          <Header 
            title="Jon" 
            onAdd={() => setshowAddTask(!showAddTask)} 
            showAdd={showAddTask}
            onLogout={logoutUser} 
          />
          
          {showAddTask && <AddTask onAdd={addTask}/>}
          
          {tasks.length > 0 ? 
            <Tasks tasks={tasks} 
            onDelete={deleteTask} 
            onToggle={reminder} />
          : 'No Tasks To Show'}
        </>
      )}
    </div>
  )
}

export default App

