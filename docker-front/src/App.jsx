import Header from './components/Header'
import { Tasks } from './components/Tasks'
import { useState } from "react"

function App() {
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

  //Dele  
  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id)) 
  }

  // reminder
  const reminder = (id) => {
    console.log(id)
  }

  return (
    <div className='container'>
      <Header title="Jon"/>
      {tasks.length > 0 ? <Tasks tasks={tasks} onDelete={deleteTask} onToggle={reminder} />: 'No Tasks To Show'}
    </div>
  )
}

export default App
