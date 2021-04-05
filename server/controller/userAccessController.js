const jwt = require('jsonwebtoken');
const User = require('../models/User');

//check current user
const currentUser = (req, res, next) => {
  const token = req.cookies.user;

  if(token){
    jwt.verify(token, process.env.TOKEN_SECRET, async(error, decodedToken) => {
      if(error){
        res.status(400);
        next();
      } else{
        const user = await User.findById(decodedToken._id);
        req.body.userId = user._id;
        next();
      }
    });
  }
}

//Super Admin Access 
function superAdminAccess(req, res, next) {
    const token = req.cookies.user;

  if(token){
    jwt.verify(token, process.env.TOKEN_SECRET, async(error, decodedToken) => {
      if(error){
        res.status(400);
        next();
      } else{
        const user = await User.findById(decodedToken._id);
        if( user.role !== 'super admin' ) return res.status(403).send('Restricted Access');
      }
      next();
    });
  }
}

//Admin access
function adminAccess(req, res, next) {
    const token = req.cookies.user;

  if(token){
    jwt.verify(token, process.env.TOKEN_SECRET, async(error, decodedToken) => {
      if(error){
        res.status(400);
        next();
      } else{
        const user = await User.findById(decodedToken._id);
        if( user.role === 'admin') {
          // console.log(user.role);
          next();
        } else {
           res.status(403).send('Restricted Access');
        } 
      }
    });
  }
}

module.exports = {currentUser, superAdminAccess, adminAccess}