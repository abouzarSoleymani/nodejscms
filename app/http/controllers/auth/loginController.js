const controller = require('app/http/controllers/controller');
const passport = require('passport');

class loginController extends controller {
    showLoginForm(req, res){
        const title = 'صفحه ورود';
        res.render('home/auth/login',{errors: req.flash('errors'), recaptcha: this.recaptcha.render(), title});
    }

    loginProcess(req, res, next){
        this.recaptchaValidation(req, res)
        .then(result => this.validationData(req))
        .then(result => {
            if(result) this.login(req, res, next)
            else res.redirect('/auth/login');
        })
        .catch(err => console.log(err));
    }
 

    login(req, res, next){
        passport.authenticate('local.login',(err, user) => {
            if(!user) return res.redirect('/auth/login');
            req.login(user, err => {
                if(req.body.remember){
                     //set Token
                     user.setRememberToken(res);
                }
                return res.redirect('/');
            })
        })(req, res, next)
    }
}

module.exports = new loginController();