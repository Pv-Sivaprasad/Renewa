import React from "react";
import { Route, Routes } from "react-router-dom";
import UserRoute from './routes/UserRoute';
import AdminRoute from "./routes/AdminRoute";
import './index.css';
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/*" element={<UserRoute />} />
        <Route path="/admin/*" element={<AdminRoute />} />
      </Routes>
      <ToastContainer />
    </div>
  );
};

export default App;


