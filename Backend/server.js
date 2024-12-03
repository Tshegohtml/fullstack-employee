const express = require('express');
const app = express();
const dbRoutes = require("./routes/db");
const authRoutes = require("./routes/auth")
const admin = require('firebase-admin'); 
const cors = require('cors');

app.use(express.json());
app.use(cors()); 

app.use('/api', dbRoutes);
app.use('/api',authRoutes);


app.listen(5000, () => {
  console.log('Server is running on http://localhost:5000');
});
