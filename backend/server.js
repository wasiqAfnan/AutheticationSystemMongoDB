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
    res.json({
        status: 200,
        message: "Go to '/api/auth/test' to test the API"
    });
});

// routes for auth
app.use('/api/auth', authRoutes);


const port = process.env.PORT;
app.listen(port, () => {
    console.log(`Server is up and running`);
});