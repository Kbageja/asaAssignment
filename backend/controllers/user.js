const bcrypt = require('bcrypt');
const { AsaUser, userWeather } = require('../models/user');
const { sendcookie } = require('../util/feature.js');

 const  getmyprofile = (req,res)=>{
    res.status(200).json({
        success:true,
        user:req.user,

    })}

    const userRegister = async (req, res) => {
      try {
        console.log("Received request body:", req.body);
        const { email, password, username } = req.body;
    
        // Check for duplicate email or username
        const isExist = await AsaUser.findOne({ where: { username } });
        if (isExist) {
          return res.status(400).json({ success: false, message: 'Username already exists.' });
        }
    
        const emailExists = await AsaUser.findOne({ where: { email } });
        if (emailExists) {
          return res.status(400).json({ success: false, message: 'Email already exists.' });
        }
    
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);
    
        // Create new user
        const newUser = await AsaUser.create({
          email,
          password: hashedPassword,
          username,
        });
        console.log(newUser);
    
        // Call the sendcookie function and ensure it doesn't send another response
        sendcookie(newUser, res, `Registered Successfully`);
        // Remove this line if sendcookie already sends a response
        // res.status(201).json({ success: true, message: 'User registered successfully!', data: newUser });
      } catch (error) {
        console.error('Error in User Register:', error);
    
        // Ensure a response is sent only once
        if (!res.headersSent) {
          res.status(500).json({ success: false, message: 'An error occurred during registration.' });
        }
      }
    };
    

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await AsaUser.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password.',
      });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password.',
      });
    }

    // Successful login
    sendcookie(user, res, `Welcome back, ${user.username}`);
  } catch (error) {
    console.error('Error in Login:', error);
    res.status(500).json({ success: false, message: 'An error occurred during login.' });
  }
};

const getUser = async (req, res) => {
  try {
    const users = await AsaUser.findAll({
      attributes: ['id', 'email', 'username'], // Exclude sensitive fields like passwords
    });
    res.status(200).json({ success: true, data: users });
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ success: false, message: 'An error occurred while fetching users.' });
  }
};

const getUserWeather = async (req, res) => {
  try {
    const users = await userWeather.findAll({
      attributes: ['updatedAt', 'searchCity', 'username'], // Exclude sensitive fields like passwords
    });
    res.status(200).json({ success: true, data: users });
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ success: false, message: 'An error occurred while fetching users.' });
  }
};

const postUserWeather = async (req, res) => {
    try {
      const { username, searchCity } = req.body;
      console.log(req.body);
  
      // Validate request body
      if (!username || !searchCity) {
        return res.status(400).json({
          success: false,
          message: 'Both username and searchcity are required.',
        });
      }
  
      // Create a new entry in the userweather table
      const newUserWeather = await userWeather.create({
        username:username,
        searchCity,
      });
  
      res.status(201).json({
        success: true,
        message: 'User weather data saved successfully.',
        data: newUserWeather,
      });
    } catch (error) {
      console.error('Error saving user weather data:', error);
      res.status(500).json({
        success: false,
        message: 'An error occurred while saving user weather data.',
      });
    }
  };

module.exports = { login, userRegister, getUser,getmyprofile,postUserWeather,getUserWeather };
