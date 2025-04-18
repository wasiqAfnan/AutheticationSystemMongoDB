const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');

const app = express();

// middlewares
app.use(express.json());
app.use(cors());


// Mongodb connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => console.error('DB Connection Error:', err));

// routes for testing
app.get('/', (req, res) => {
    res.status(200).json({
        status: 200,
        message: "Go to '/api/auth/test' to test the API"
    })
});

// routes for auth
app.use('/api/auth', authRoutes);

// Catch-all route for unmatched routes
// latest version of express (5.1.0) have issue with '*' route
app.all('/:splat', (req, res) => {
    res.status(404).json({
      status: 404,
      message: 'Route not found'
    });
  });




const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server is up and running`);
});