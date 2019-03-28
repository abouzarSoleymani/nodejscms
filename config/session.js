const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const mongoose = require('mongoose');

 module.exports = {
    secret: process.env.SESSION_SECRETKEY,
    resave: true,
    saveUninitialized: true,
    cookie:{expire: new Date(Date.now() + 1000 * 60 * 60)},
    store: new MongoStore({mongooseConnection: mongoose.connection})

 }