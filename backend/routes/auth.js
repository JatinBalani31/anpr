const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors());


// MongoDB Connection
mongoose.connect('mongodb+srv://maurya001aman:IRf63nPt3QgRhwct@cluster0.pigzv5k.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.once('open', () => console.log('Connected to MongoDB'));

// User Schema
const userSchema = new mongoose.Schema({
  email: String,
  username: String,
  password: String,
  role: String,
});
const User = mongoose.model('User', userSchema);

// Routes
app.post('/signup', async (req, res) => {
  try {
    // const { email, username, role, password } = req.body;
    console.log(req.body);
    const hashedPassword = await bcrypt.hash(req.body.password, 10); // Use bcrypt to hash the password before

    const user = new User({
      email: req.body.email,
      username: req.body.username,
      role: req.body.role,
      password: hashedPassword,
      isAdmin: false
    });

    await user.save();
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Compare the provided password with the hashed password stored in the database
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Password is correct, proceed with login
    res.status(200).json({ message: 'Login successful' });
  } catch (error) {
    console.error('Login failed:', error);
    res.status(500).json({ message: 'Server error' });
  }
});


// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
