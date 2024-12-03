import logo from './logo.svg';
import './App.css';
import Register from './components/register';
import Login from './components/login';  
import EmployeeInformation from './components/form';
import DisplayEmployees from "./components/DisplayEmployees";
import { BrowserRouter, BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useState } from 'react';

function App() {
  const [information, setInformation] = useState([]);

  return (
    <BrowserRouter>
   
      <div className="App">
        <Routes>
          <Route path="/" element={<Register />} />
          <Route path="/login" element={<Login />} /> 
          <Route path="/employee-info" element={<EmployeeInformation />} /> 
          <Route path="/display-employees" element={<DisplayEmployees information={information} />} /> 
          {/* Add more routes as needed */}
        </Routes>
      </div>
    
    </BrowserRouter>
  );
}

export default App;
