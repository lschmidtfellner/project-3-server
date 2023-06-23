import bcrypt from 'bcrypt'
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
import User from '../models/User.js'
//import verifyAuth from '../middlewares/verifyAuth.js';

dotenv.config()

const SECRET_KEY = process.env.SECRET_KEY

async function signup(req, res) {
  console.log(req.body)
  try {
    const { username, password, email } = req.body

    console.log('Received signup request:', { username, email })

    // Validate that the password field is not empty or undefined
    if (!password) {
      console.log('Invalid password:', password)
      return res.status(400).json({ error: 'Password is required' })
    }

    let user = await User.findOne({ email })
    if (user) {
      console.log('Email already exists:', email)
      return res.status(400).json({ error: 'Email already exists' })
    }

    const saltRounds = 10 // Set the desired number of salt rounds
    const hash = await bcrypt.hash(password, saltRounds)

    console.log('Creating user:', { username, email })

    user = await User.create({
      username,
      password: hash,
      email
    })

    console.log('User created:', user)

    return res.status(200).json({
      status: 200,
      message: `Successfully created user: ${user.username}`,
      success: true
    })
  } catch (error) {
    console.error('Error during signup:', error)
    res.status(400).json({
      status: 400,
      error: 'Unable to create user',
      database_message: error.message
    })
  }
}

async function signin(req, res) {
  try {
    const { username, password } = req.body
    const user = await User.findOne({ username })
    const hash = user ? user.password : ''

    const result = await bcrypt.compare(password, hash)
    if (!result) {
      return res.status(401).json({
        message: 'Incorrect password'
      })
    }

    const data = {
      id: user._id,
      username: user.username
    }

    const token = jwt.sign(data, SECRET_KEY)

    res.cookie('token', token, { httpOnly: true })

    return res.status(200).json({
      status: 200,
      message: `Successfully signed in ${user.username}`,
      token: token,
      user: user
    })
  } catch (error) {
    res.status(404).json({
      status: 404,
      error: `User not found`,
      database_message: error.message
    })
  }
}

// Backend implementation

export const isTokenValid = async (token) => {
    try {
        const response = await axios.get('/auth/isTokenValid', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data.success;
    } catch (error) {
        console.log("Error during token validation:", error);
        return false;
    }
};



async function updateUsername(req, res) {
  try {
    const { newUsername } = req.body
    const user = await User.findOne({ username: newUsername })

    if (user) {
      return res.status(400).json({ error: 'Username already exists' })
    }

    await User.findByIdAndUpdate(req.user._id, { username: newUsername })

    return res.status(200).json({
      status: 200,
      message: `Successfully updated username to: ${newUsername}`
    })
  } catch (error) {
    res.status(400).json({
      status: 400,
      error: `Unable to update username`,
      database_message: error.message
    })
  }
}

async function deleteUsername(req, res) {
  try {
    await User.findByIdAndUpdate(req.user._id, { username: null })

    return res.status(200).json({
      status: 200,
      message: `Successfully deleted username`
    })
  } catch (error) {
    res.status(400).json({
      status: 400,
      error: `Unable to delete username`,
      database_message: error.message
    })
  }
}

export { isTokenValid, signup, signin, updateUsername, deleteUsername }
