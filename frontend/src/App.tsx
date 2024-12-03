import React from "react";
import { Route, Routes } from "react-router-dom";
import UserRoute from './routes/UserRoute';
import AdminRoute from "./routes/AdminRoute";
import './index.css';
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import DoctorRoute from "./routes/DoctorRoute";

const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/*" element={<UserRoute />} />
        <Route path="/admin/*" element={<AdminRoute />} />
        <Route path="/doctor/*" element={<DoctorRoute />} />

      </Routes>
      <ToastContainer />
    </div>
  );
};

export default App;


