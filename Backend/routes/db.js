const express = require("express");
const { addUser, getUsers, deleteUser } = require("../controllers/db");
const router = express.Router();

// POST: Add a new employee
router.post("/addUser", addUser);

// GET: Retrieve all employees
router.get("/getUsers", getUsers);

// DELETE: Delete an employee by ID
router.delete("/deleteUser/:id", deleteUser);

module.exports = router;
