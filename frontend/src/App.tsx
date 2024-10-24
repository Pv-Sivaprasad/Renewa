import { BrowserRouter as Router,Route,Routes } from "react-router-dom"
import UserRoute from './routes/UserRoute'
import './index.css'
import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'


const App = () => {
  return (
  
      <div className="App">
        
        <UserRoute/>
        <ToastContainer/>
        
      </div>
  )
}

export default App
