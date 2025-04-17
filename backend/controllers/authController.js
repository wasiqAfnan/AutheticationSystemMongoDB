const User = require('../models/user');
const bcrypt = require('bcryptjs');

const registerUser = async (req, res) => {
  try {
    const { name, contact, email, password } = req.body;

    // Check for existing user
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const newUser = new User({
      name,
      contact,
      email,
      password: hashedPassword
    });

    await newUser.save(); // saving the Data to DB

    res.status(201).json({ message: 'User registered successfully' });

  } catch (error) {
    console.error('Signup Error:', error.message);
    res.status(500).json({ message: 'Server Error' });
  }
};


// Login controller
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Check if user exists
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(404).json({ message: "User not found" });
    }

    // 2. Compare password
    const isMatch = await bcrypt.compare(password, existingUser.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // 3. If successful
    res.status(200).json({ 
      message: "Login successful", 
      user: {
        name: existingUser.name,
        contact: existingUser.contact,
        email: existingUser.email
      }  
    });

  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  registerUser,
  loginUser
};
