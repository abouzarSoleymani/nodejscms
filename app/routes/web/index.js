const express = require('express');
const router = express.Router();

//Middlewares
const redirectIfAuthenicated = require('app/http/middleware/redirectIfAuthenticated');
const redirectIfNotAdmin = require('app/http/middleware/redirectIfNotAdmin');

//Admin Router 
const adminRouter = require('./admin');
router.use('/admin',redirectIfNotAdmin.handle, adminRouter);

//Home Router
const homeRouter = require('./home');
router.use('/', homeRouter);

//Auth Router
const authRouter = require('./auth');
router.use('/auth',redirectIfAuthenicated.handle, authRouter);

module.exports = router;