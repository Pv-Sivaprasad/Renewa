import { BrowserRouter as Router,Route,Routes } from "react-router-dom"
import UserRoute from './routes/UserRoute'
import './index.css'

const App = () => {
  return (
    <Router>
      <div className="App">
        <UserRoute/>
      </div>
    </Router>
  )
}

export default App
