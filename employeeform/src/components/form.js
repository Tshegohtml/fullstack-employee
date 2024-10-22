import React, { useState, useEffect } from 'react';
import axios from "axios";
// import { db } from '../../config/firebase';
// import { db } from "../config/firebase"; // Firebase config
import { collection, addDoc, deleteDoc, doc, getDocs } from "firebase/firestore";





function Form() {
  const [employees, setEmployees] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [newEmployee, setNewEmployee] = useState({
    name: '',
    gender: '',
    email: '',
    phone: '',
    image: '',
    position: '',
    id: ''
  });
  const [isEditing, setIsEditing] = useState(false);
  const [currentEmployeeId, setCurrentEmployeeId] = useState('');
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(true);
  const [showList, setShowList] = useState(false);
  const [activeButton, setActiveButton] = useState('form'); 

  const validateInputs = () => {
    if (!newEmployee.name) return 'Name is required.';
    if (!newEmployee.email || !/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(newEmployee.email)) return 'Invalid email address.';
    if (!newEmployee.phone || !/^\d+$/.test(newEmployee.phone)) return 'Phone number should contain only digits.';
    if (!newEmployee.gender) return 'Gender is required.';
    if (!newEmployee.position) return 'Position is required.';
    if (!newEmployee.id || !/^\d{13}$/.test(newEmployee.id)) return 'ID should be exactly 13 digits.';
    return '';
  };

  const fetchEmployees = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/getEmployee");
      setEmployees(response.data);
    } catch (error) {
      console.error("Error fetching employees from the server", error);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  // Reset Form
  const resetForm = () => {
    setNewEmployee({
      name: '',
      gender: '',
      email: '',
      phone: '',
      image: '',
      position: '',
      id: ''
    });
    setIsEditing(false);
    setCurrentEmployeeId('');
    setError('');
  };

  // Add Employee
  const addEmployee = async () => {
    const errorMsg = validateInputs();
    if (errorMsg) {
      setError(errorMsg);
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/api/addEmployee", newEmployee);
      setEmployees([...employees, { ...newEmployee, id: response.data.id }]);
      resetForm();
      alert("Employee successfully added");
    } catch (error) {
      console.error("Error adding employee", error);
      alert("Error adding employee.");
    }
  };

  // Delete Employee
  const deleteEmployee = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/deleteEmployee/${id}`);
      setEmployees(employees.filter(employee => employee.id !== id));
      alert("Employee deleted successfully");
    } catch (error) {
      console.error("Error deleting employee", error);
      alert("Error deleting employee.");
    }
  };

  // Edit Employee
  const editEmployee = (employee) => {
    setNewEmployee({
      name: employee.name,
      email: employee.email,
      phone: employee.phone,
      gender: employee.gender,
      position: employee.position,
      id: employee.id,
    });
    setIsEditing(true);
    setCurrentEmployeeId(employee.id);
  };

  // Update Employee
  const updateEmployee = async () => {
    const errorMsg = validateInputs();
    if (errorMsg) {
      setError(errorMsg);
      return;
    }

    try {
      await axios.put(`http://localhost:5000/api/updateEmployee/${currentEmployeeId}`, newEmployee);
      setEmployees(employees.map(employee => (employee.id === currentEmployeeId ? newEmployee : employee)));
      resetForm();
      alert("Employee updated successfully");
    } catch (error) {
      console.error("Error updating employee", error);
      alert("Error updating employee.");
    }
  };

  // Handle Submit
  const handleSubmit = () => {
    if (isEditing) {
      updateEmployee();
    } else {
      addEmployee();
    }
  };

  const handleShowForm = () => {
    setShowForm(true);
    setShowList(false);
    setActiveButton('form'); 
  };

  const handleShowList = () => {
    setShowForm(false);
    setShowList(true);
    setActiveButton('list'); 
  };

  return (
    <div className="App">
      <h1>EMPLOYEE FORM</h1>

      <div>
        <button
          className={`navButton ${activeButton === 'form' ? 'active' : ''}`}
          onClick={handleShowForm}
        >
          Show Employee Form
        </button>
        <button
          className={`navButton ${activeButton === 'list' ? 'active' : ''}`}
          onClick={handleShowList}
        >
          Show Employee List
        </button>
      </div>

      {showForm && (
        <div className="formContainer">
          <input
            type="text"
            placeholder="Name"
            value={newEmployee.name}
            onChange={(e) => setNewEmployee({ ...newEmployee, name: e.target.value })}
          />
          <input
            type="email"
            placeholder="Email"
            value={newEmployee.email}
            onChange={(e) => setNewEmployee({ ...newEmployee, email: e.target.value })}
          />
          <input
            type="text"
            placeholder="Phone number"
            value={newEmployee.phone}
            onChange={(e) => setNewEmployee({ ...newEmployee, phone: e.target.value })}
          />
          <input
            type="text"
            placeholder="Nationality"
            value={newEmployee.nationality}
            onChange={(e) => setNewEmployee({ ...newEmployee, nationality: e.target.value })}
          />
          <select
            value={newEmployee.gender}
            onChange={(e) => setNewEmployee({ ...newEmployee, gender: e.target.value })}
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
          <input
            type="text"
            placeholder="Position"
            value={newEmployee.position}
            onChange={(e) => setNewEmployee({ ...newEmployee, position: e.target.value })}
          />
          <input
            type="text"
            placeholder="ID"
            value={newEmployee.id}
            onChange={(e) => setNewEmployee({ ...newEmployee, id: e.target.value })}
          />
          {error && <p className="error">{error}</p>}
          <button className="formButton" onClick={handleSubmit}>
            {isEditing ? 'Update Employee' : 'Add Employee'}
          </button>
          {isEditing && <button className="formButton" onClick={resetForm}>Cancel</button>}
        </div>
      )}

      {showList && (
        <DisplayEmployees employees={employees} searchQuery={searchQuery} handleDelete={deleteEmployee} handleEdit={editEmployee} />
      )}
    </div>
  );
}

function DisplayEmployees({ employees, searchQuery, handleDelete, handleEdit }) {
  return (
    <div className="employeeContainer">
      {employees.length === 0 ? (
        <p>No employees have been added.</p>
      ) : (
        <table className="employeeTable">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Gender</th>
              <th>Phone</th>
              <th>Position</th>
              <th>ID</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees
              .filter(employee => employee.name.includes(searchQuery) || employee.id.includes(searchQuery))
              .map(employee => (
                <tr key={employee.id}>
                  <td>{employee.name}</td>
                  <td>{employee.email}</td>
                  <td>{employee.gender}</td>
                  <td>{employee.phone}</td>
                  <td>{employee.position}</td>
                  <td>{employee.id}</td>
                  <td>
                    <button className="listButton" onClick={() => handleDelete(employee.id)}>Delete</button>
                    <button className="listButton" onClick={() => handleEdit(employee)}>Edit</button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Form;
