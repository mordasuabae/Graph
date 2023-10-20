import { useState,useContext, createContext, Provider} from "react";
import {ReportsPage} from './pages/reports/reports_page.jsx'
import {TasksPage} from './pages/tasks/tasks_page.jsx'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import {Context} from './context/context.js'
import { Navbar } from "./pages/navbar/navbar.jsx";

const App = () => {

  //use use context to store the array of objects
  const [tasks,setTasks] = useState([{name: 'task 1', status: 'complete'}])

  return (
      <Context.Provider value={{tasks: tasks ,setTasks : setTasks}}>
        <BrowserRouter>
        <Navbar/>
          <Routes>
            <Route path="/" element={<TasksPage />} />
            <Route path="/reports" element={<ReportsPage />} />
            <Route path="*" element={<div>not found</div>} />
          </Routes>
        </BrowserRouter>
      </Context.Provider>
      )

}
 
export default App;