import Header from './components/Header'
import { Tasks } from './components/Tasks'
import { useState, useEffect } from "react"
import { AddTask } from './components/AddTask'
import Login from './components/Login'
import Register from './components/Register'

const authPort = import.meta.env.VITE_AUTH_BACK_PORT

const AUTH_API_URL = `http://localhost:${authPort}`

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [showAddTask, setshowAddTask] = useState(false)
  const [isLoginView, setIsLoginView] = useState(true)
  const [currentUser, setCurrentUser] = useState('')

  const [tasks, setTasks] = useState([
    { id: 1, text: "Doctors Appointment", day: "Feb 5th at 2:30pm", reminder: true },
    { id: 2, text: "Meeting at School", day: "Feb 6th at 1:30pm", reminder: true }
  ])

  useEffect(() => {
    const token = localStorage.getItem('jwt_token')
    if(token) {
        fetchCurrentUser(token)
    }
  }, [])

  const fetchCurrentUser = async (token) => {
    try {
      const res = await fetch(`${AUTH_API_URL}/me`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      const data = await res.json()

      if (res.ok) {
        setCurrentUser(data.username)
        setIsAuthenticated(true)
      } else {
        logoutUser()
      }
    } catch (error) {
      console.error("Error fetching user:", error)
      logoutUser()
    }
  }

  const loginUser = async (details) => {
    try {
      const res = await fetch(`${AUTH_API_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          login: details.login, 
          password: details.password 
        }),
      })

      const data = await res.json()

      if (res.ok) {
        localStorage.setItem('jwt_token', data.token)
        fetchCurrentUser(data.token)
      } else {
        alert(data.message || "Login failed")
      }
    } catch (error) {
      console.error("Login Error:", error)
      alert("Server error")
    }
  }

  const registerUser = async (details) => {
      try {
        const res = await fetch(`${AUTH_API_URL}/register`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(details),
        })

        const data = await res.json()

        if (res.ok) {
          alert("Registration Successful! Please Login.")
          setIsLoginView(true)
        } else {
          alert(data.message || "Registration failed")
        }
      } catch (error) {
        console.error("Register Error:", error)
        alert("Server error")
      }
  }

  const logoutUser = () => {
      localStorage.removeItem('jwt_token')
      setIsAuthenticated(false)
      setshowAddTask(false) 
      setCurrentUser('')
      setTasks([]) 
  }

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id)) 
  }

  const reminder = (id) => {
    setTasks(tasks.map((task) => task.id === id ? {...task, reminder: !task.reminder} : task)) 
  }

  const addTask = (task) => {
    const id = Math.floor(Math.random() * 10000) + 1
    const newTask = {id, ... task}
    setTasks([...tasks, newTask])
  }

  return (
    <div className='container'>
      {!isAuthenticated ? (
          <>
            <header className='header'>
                <h1>{isLoginView ? 'Login' : 'Register'}</h1>
                <button 
                    className='btn' 
                    style={{ backgroundColor: isLoginView ? 'green' : 'black' }}
                    onClick={() => setIsLoginView(!isLoginView)}
                >
                    {isLoginView ? 'Sign Up' : 'Login'}
                </button>
            </header>

            {isLoginView ? (
                <Login onLogin={loginUser} />
            ) : (
                <Register 
                    onRegister={registerUser} 
                    onSwitchToLogin={() => setIsLoginView(true)} 
                />
            )}
          </>
      ) : (
        <>
          <Header 
            title={`Hello, ${currentUser}`} 
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