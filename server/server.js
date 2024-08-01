const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const formRoutes = require('./routes/formRoutes');
const dotenv = require('dotenv');
// Create Express app
const app = express();
dotenv.config();
const PORT = process.env.PORT ;

// Middleware
app.use(cors());
app.use(bodyParser.json());


// database connection
require('./config/db.js').connect();

// Routes
app.use('/api', formRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
