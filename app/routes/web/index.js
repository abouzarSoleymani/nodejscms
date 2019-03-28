const express = require('express');
const router = express.Router();


//Admin Router 
const adminRouter = require('./admin');
router.use('/admin', adminRouter);

//Home Router
const homeRouter = require('./home');
router.use('/', homeRouter);

//Middlewares
const redirectIfAuthenicated = require('app/http/middleware/redirectIfAuthenticated');

//Auth Router
const authRouter = require('./auth');
router.use('/auth',redirectIfAuthenicated.handle, authRouter);

module.exports = router;