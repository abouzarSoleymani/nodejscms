const controller = require('app/http/controllers/controller');
const passport = require('passport');
const PasswordReset = require('app/models/password-reset');
const User = require('app/models/user');
const uniqueString = require('unique-string');


class forgotPasswordController extends controller {
    showResetPasswordForm(req, res){
        const title = 'بازیابی رمز عبور';
        res.render('home/auth/passwords/reset',
        {
            recaptcha: this.recaptcha.render(),
            title,
            token: req.params.token});
    }
 
    async resetPasswordProcess(req, res, next){
        await this.recaptchaValidation(req, res);
        let result = await this.validationData(req); 
        if(result){
            return this.resetPassword(req, res)
        }  
        this.back(req, res);
    }
 

    async resetPassword(req, res){
        let field = await PasswordReset.findOne({$and:[ {email:req.body.email}, {token: req.body.token}]})
         if(!field){
            req.flash('errors', 'اطلاعات وارد شده صحیح نیست لطفا دقت کنید');
            return this.back(req, res);
         }

         if(field.use){
             req.flash('errors', 'از این لینک برای بازیابی رمز عبور قبلا استفاده شده است');
            return this.back(req, res);
            }
         let user = await User.findOneAndUpdate({email: field.email}, {$set: {password: req.body.password}})
         if(!user){
            req.flash('errors', 'آپدیت انجام نشد');
            return this.back(req, res);
         }

        await field.update({use: true});
        return res.redirect('/auth/login');
        }
     
}

module.exports = new forgotPasswordController();