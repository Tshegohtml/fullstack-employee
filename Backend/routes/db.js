const express = require("express");
const { addUser, getUsers, deleteUser } = require("../controllers/db");
const router = express.Router();


router.post("/addUser", addUser);


router.get("/getUsers", getUsers);


router.delete("/deleteUser/:id", deleteUser);

module.exports = router;
