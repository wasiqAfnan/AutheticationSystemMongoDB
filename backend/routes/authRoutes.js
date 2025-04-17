const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../controllers/authController');

// test route
router.get('/test', (req, res) => {
  res.json({
    status: 200,
    message: 'Test API is working. Go to /api/auth/signup to signup or /api/auth/login to login'
  });
});

// signup route
router.post('/signup', registerUser);

// login route
router.post("/login", loginUser);

module.exports = router;
