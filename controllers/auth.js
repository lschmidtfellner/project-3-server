import bcrypt from 'bcrypt'
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
import User from '../models/User.js'

dotenv.config()

const SECRET_KEY = process.env.SECRET_KEY

// Signup function
async function signup(req, res) {
  // Extract the username, password, and email from the request body
  const { username, password, email } = req.body

  try {
    // Validate that the password field is not empty
    if (!password) {
      return res.status(400).json({ error: 'Password is required' })
    }

    // Check if a user with the provided email already exists
    let user = await User.findOne({ email })
    if (user) {
      return res.status(400).json({ error: 'Email already exists' })
    }

    // Hash the password
    const saltRounds = 10
    const hash = await bcrypt.hash(password, saltRounds)

    // Create a new user
    user = await User.create({
      username,
      password: hash,
      email
    })

    // Return a successful response
    return res.status(200).json({
      status: 200,
      message: `Successfully created user: ${user.username}`,
      success: true
    })
  } catch (error) {
    // Handle any errors
    res.status(400).json({
      status: 400,
      error: 'Unable to create user',
      database_message: error.message
    })
  }
}

// Signin function
async function signin(req, res) {
  // Extract the username and password from the request body
  const { username, password } = req.body

  try {
    // Attempt to find a user with the provided username
    const user = await User.findOne({ username })

    // Check the provided password against the hashed password in the database
    const hash = user ? user.password : ''
    const result = await bcrypt.compare(password, hash)

    if (!result) {
      return res.status(401).json({
        message: 'Incorrect password'
      })
    }

    // If the passwords match, create a JWT
    const data = {
      id: user._id,
      username: user.username
    }
    const token = jwt.sign(data, SECRET_KEY)

    // Set the JWT as a cookie
    res.cookie('token', token, { httpOnly: true })

    // Return a successful response
    return res.status(200).json({
      status: 200,
      message: `Successfully signed in ${user.username}`,
      token: token,
      user: user
    })
  } catch (error) {
    // Handle any errors
    res.status(404).json({
      status: 404,
      error: `User not found`,
      database_message: error.message
    })
  }
}

// Function to verify the JWT
const isTokenValid = (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ error: 'No authentication token provided' });
  }

  try {
    // If the JWT is valid, attach the decoded user information to the request object
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded.user;

    // Call the next middleware or endpoint
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Invalid authentication token' });
  }
};

// Function to update the user's username
async function updateUsername(req, res) {
  const { userId, newUsername } = req.body;

  try {
    // Check if the new username is already taken
    const user = await User.findOne({ username: newUsername });

    if (user) {
      return res.status(400).json({ error: 'Username already exists' });
    }

    // Update the username
    await User.findByIdAndUpdate(userId, { username: newUsername });

    // Return a successful response
    return res.status(200).json({
      status: 200,
      message: `Successfully updated username to: ${newUsername}`,
    });
  } catch (error) {
    // Handle any errors
    res.status(400).json({
      status: 400,
      error: `Unable to update username`,
      database_message: error.message,
    });
  }
}


// Function to delete the user's username
async function deleteUsername(req, res) {
  try {
    // Set the user's username to null
    await User.findByIdAndUpdate(req.user._id, { username: null })

    // Return a successful response
    return res.status(200).json({
      status: 200,
      message: `Successfully deleted username`
    })
  } catch (error) {
    // Handle any errors
    res.status(400).json({
      status: 400,
      error: `Unable to delete username`,
      database_message: error.message
    })
  }
}

export { isTokenValid, signup, signin, updateUsername, deleteUsername }
