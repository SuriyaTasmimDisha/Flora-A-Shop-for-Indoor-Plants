const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt')
const { registerValidation, loginValidation, createUserValidation } = require('../validation');
const jwt = require('jsonwebtoken');
const {verifyUser} = require('../verifyToken');
const {superAdminAccess, currentUser} = require('../controller/userAccessController');
 

//Register a User
router.post('/register', async (req, res) => {
   try {
      //validate before creating new a user
      const { error } = registerValidation(req.body);
      if (error) return res.status(400).send(error.details[0].message);
      
      // Check if user already exist by checking email!
      const emailExist = await User.findOne({email: req.body.email});
      if(emailExist) return res.status(400).send('Email already exist!');
      
      //Hash Password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);
      
      // create a new user
      const user = new User({
         name: req.body.name,
         email: req.body.email,
         password: hashedPassword
      });
      
      const savedUser = await user.save();
      res.send({
         id: savedUser._id,
         name: savedUser.name
      });
   } catch (error) {
      res.status(400).send(error);
   }
});


//Login a User
router.post('/login', async(req, res) => {
   try {
      //Validate User
      const { error } = loginValidation(req.body);
      if (error) return res.status(400).send('Invalid Email or Password');
      
      //Check if the email is valid
      const user = await User.findOne({email: req.body.email});
      if(!user) return res.status(400).send('Email not found!😐');
      
      // Check if the password match
      const validPass = await bcrypt.compare(req.body.password, user.password);
      if(!validPass) return res.status(400).send('Invalid Password 😐');
      
      //Generate and Assign Access Token
      const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET || 'secret', {expiresIn: '4h'}); //Expires after 50mins
      res.cookie('user', token, {httpOnly: true, maxAge: 50 * 60 * 1000});
      
      res.status(200).send({
         _id: user._id,
         name: user.name,
         role: user.role
      });
   } catch (error) {
      res.status(400).send('Sorry! Bad Request.');
   } 
});

//Logout a user
router.get('/logout', (req, res) => {
   try {
      res.cookie('user', '', {maxAge: 1});
      res.status(200).send('You have been logged out!');
   } catch (error) {
      res.status(400).send("Sorry! Couldn't Process Request.");
   }
});

//Get List of Registered Users
router.get('/', verifyUser, superAdminAccess, async(req, res) => {
   try {
      const users = await User.find();
      res.status(200).send(users);
   } catch (error) {
      res.status(404).send('Not found!');
   }
});

//Find a user by ID
router.get('/:userId', verifyUser, async(req, res) => {
   try {
      const user = await User.findById(req.params.userId);
      res.status(200).send(user);
   } catch (error) {
      res.status(404).send('User Info Not Found!')   
   }
});


//User: Update Info 
router.patch('/profile', verifyUser, currentUser, async(req, res) => {
   try {
      const user = await User.findById(req.body.userId);
      if (user) {
         user.name = req.body.name || user.name;
         user.email = req.body.email || user.email;
         if (req.body.password) {
            user.password = bcrypt.hashSync(req.body.password, 8);
         }
         const updatedUser = await user.save();
         res.send({
            _id: updatedUser._id,
            name: updatedUser.name,
         });
      }
   } catch (error) {
      res.status(404).send({ message: 'Info Not Found' });
   }
});

//Super Admin: update info of a current user
router.patch('/:id', verifyUser, superAdminAccess, async(req, res) => {
   try {
      const user = await User.findById(req.params.id);
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      user.role = req.body.role || user.role;
      const updatedUser = await user.save();
      res.send({ message: 'User Updated', user: updatedUser });
   } catch (error) {
      res.status(404).send({ message: 'User Not Found' });
   }
});

//Delete User from Database
router.delete('/:id', verifyUser, superAdminAccess, async(req, res) => {
   try {
      const id = req.params.id;
      const deleteUser = await User.findByIdAndDelete(id);
      res.status(200).send({ message: 'User Deleted', user: deleteUser });   
   } catch (error) {
      res.status(404).send('User not found!')
   }
});

//Super Admin: Create a User
router.post('/create', verifyUser, superAdminAccess, async (req, res) => {
try {
    //validate before creating new a user
    const { error } = createUserValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    console.log('hello');
     
    // Check if user already exist by checking email!
    const emailExist = await User.findOne({email: req.body.email});
    if(emailExist) return res.status(400).send('Email already exist!');

   //Hash Password
   const salt = await bcrypt.genSalt(10);
   const hashedPassword = await bcrypt.hash(req.body.password, salt);
   console.log(hashedPassword);
    // create a new user
    const user = new User({
       name: req.body.name,
       email: req.body.email,
       password: hashedPassword,
       role: req.body.role
    });
       const savedUser = await user.save();
       res.send(savedUser);
    } catch (error) {
       res.status(400).send(error);
       console.log(error);
    }
 });

module.exports = router;