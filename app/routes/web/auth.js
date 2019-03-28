const express = require('express');
const router = express.Router();

//controllers
const loginController = require('app/http/controllers/auth/loginController');
const registerController = require('app/http/controllers/auth/registerController');


//ٰValidators
const registerValidator = require('app/http/validators/registerValidator');
const loginValidator = require('app/http/validators/loginValidator');


//Home Routes
router.get('/login', loginController.showLoginForm);
router.post('/login', registerValidator.handle(), loginController.loginProcess); 

router.get('/register', registerController.showRegisterForm); 
router.post('/register', registerValidator.handle(), registerController.registerProcess); 

router.get('/google', )
router.get('/google/callBack', )

module.exports = router;