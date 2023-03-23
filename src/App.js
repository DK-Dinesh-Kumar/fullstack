import logo from "./logo.svg";
import "./App.css";
import Login from "./Component/login";
import Register from "./Component/Register";
import ForgotPassword from "./Component/ForgotPassword";
import DashboardTable from "./Component/Table";
// import ChatLog from "./Component/ChatLog";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import React from "react";
function App() {


  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/forgotpassowrd"
            element={ <ForgotPassword />  }
          />
          <Route
            path="/dashboard-table"
            element={<DashboardTable /> }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
