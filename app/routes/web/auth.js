const express = require('express');
const router = express.Router();
const passport = require('passport');

//controllers
const loginController = require('app/http/controllers/auth/loginController');
const registerController = require('app/http/controllers/auth/registerController');
const forgotPasswordController = require('app/http/controllers/auth/forgotPasswordController');
const resetPasswordController = require('app/http/controllers/auth/resetPasswordController');


//ٰValidators
const registerValidator = require('app/http/validators/registerValidator');
const loginValidator = require('app/http/validators/loginValidator');
const forgotPasswordValidator = require('app/http/validators/forgotPasswordValidator');
const resetPasswordValidator = require('app/http/validators/resetPasswordValidator');

//Home Routes
router.get('/login', loginController.showLoginForm);
router.post('/login', registerValidator.handle(), loginController.loginProcess); 

router.get('/register', registerController.showRegisterForm); 
router.post('/register', registerValidator.handle(), registerController.registerProcess); 

router.get('/password/reset', forgotPasswordController.showForgotPasswordForm); 
router.post('/password/email', forgotPasswordValidator.handle(), forgotPasswordController.sendPasswordResetLink); 

router.get('/password/reset/:token', resetPasswordController.showResetPasswordForm); 
router.post('/password/reset',resetPasswordValidator.handle(), resetPasswordController.resetPasswordProcess); 


router.get('/google', passport.authenticate('google',{
    scope: ['profile', 'email']}))
router.get('/google/callback', passport.authenticate('google',{
    successRedirect: '/',
    failureRedirect: '/register'
}))
 
module.exports = router;