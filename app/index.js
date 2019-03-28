const express = require('express');
const app = express();
const http = require('http');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const validator = require('express-validator');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const mongoose = require('mongoose');
const flash = require('connect-flash');
const passport = require('passport');
const helpers = require('./helpers');
const rememberLogin = require('app/http/middleware/rememberLogin');

module.exports = class Application {
    constructor(){
         this.setupExpress();
         this.setMongoConnection();
         this.setConfig();
         this.setRoutes();
    }
   setupExpress(){
       const server = http.createServer(app);
       server.listen(config.port , () => console.log(`server is listen on port ${config.port}`));
       console.log(config.database);
    } 
   setMongoConnection(){
       mongoose.Promise = global.Promise;
       let url = config.database.url; // mydatabase is the name of db 
       mongoose.connect(url)
       .then(db => {
            console.log('DB created')
           })
        .catch( err => {
           console.log(err);
       }

       )
   }
   /*express Config */
   setConfig(){
       require('app/passport/passport-local');
       app.use(express.static(config.layout.public_dir));
       app.set('view engine', config.layout.view_engine);
       app.set('views', config.layout.view_dir);
       app.use(config.layout.ejs.expressLayouts);
       app.set('layout extractScripts', config.layout.ejs.extractScripts);
       app.set('layout extractStyles', config.layout.ejs.extractStyles);
       app.set('layout',  config.layout.ejs.master)
       app.use(bodyParser.json());
       app.use(validator());
       app.use(bodyParser.urlencoded({extended: true}));
       app.use(session({...config.session}));
       app.use(cookieParser(config.cookie_secretKey));
       app.use(flash()); 
       app.use(passport.initialize());
       app.use(passport.session())
       app.use(rememberLogin.handle);
       app.use((req ,res, next) => {
            app.locals = new helpers(req, res).getObjects();
            next();
       })
   }
   setRoutes(){
       app.use(require('app/routes/web'));
       app.use(require('app/routes/api'));
   }
}