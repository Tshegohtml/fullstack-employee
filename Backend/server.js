const express = require('express');
const app = express();
const dbRoutes = require("./routes/db"); // Import the routes

// Middleware to parse JSON request body
app.use(express.json());

// Set up the routes, using /api as the base URL
app.use('/api', dbRoutes);

// Start the server
app.listen(5000, () => {
  console.log('Server is running on http://localhost:5000');
});
