import { BrowserRouter as Router,Route,Routes } from "react-router-dom"
import UserRoute from './routes/UserRoute'
import './index.css'

const App = () => {
  return (
  
      <div className="App">
        <UserRoute/>
      </div>
  )
}

export default App
