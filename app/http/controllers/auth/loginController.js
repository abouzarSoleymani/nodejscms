const controller = require('app/http/controllers/controller');
const passport = require('passport');

class loginController extends controller {
    showLoginForm(req, res){
        const title = 'صفحه ورود';
        res.render('home/auth/login',{recaptcha: this.recaptcha.render(), title});
    }

    async loginProcess(req, res, next){
        await this.recaptchaValidation(req, res);
        let result = await this.validationData(req); 
        if(result){
            return this.login(req, res, next)
        }  
        this.back(req, res);
    
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