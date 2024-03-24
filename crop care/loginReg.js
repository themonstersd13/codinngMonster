// Import required modules
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');

// Initialize Express app
const app = express();

// Connect to MongoDB
mongoose.connect('mongodb://localhost/userDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Define User schema
const userSchema = new mongoose.Schema({
  name: String,
  address: String,
  area: String,
  cropname: String,
  username: String,
  password: String
});

// Create User model
const User = mongoose.model('User', userSchema);

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));

// Register Route
app.post('/register', async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = new User({
      name: req.body.name,
      address: req.body.address,
      area: req.body.area,
      cropname: req.body.cropname,
      username: req.body.username,
      password: hashedPassword
    });
    await user.save();
    res.send('Registration successful');
  } catch (error) {
    console.error(error);
    res.status(500).send('Registration failed');
  }
});

// Login Route
app.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) {
      return res.status(404).send('User not found');
    }
    if (await bcrypt.compare(req.body.password, user.password)) {
      res.send(`Login successful. Welcome, ${user.name}!`);
    } else {
      res.status(401).send('Invalid username or password');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Login failed');
  }
});

// Start server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
