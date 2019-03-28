const autoBind = require('auto-bind');
const Recaptcha = require('express-recaptcha').Recaptcha;
const {validationResult} = require('express-validator/check');

module.exports = class controller{
    constructor(){
        autoBind(this);
        this.recaptchaConfig();
        }

    recaptchaConfig(){
        this.recaptcha = new Recaptcha(
            config.service.recaptcha.client_key,
            config.service.recaptcha.secret_key,
            {...config.service.recaptcha.options});
    }  
    recaptchaValidation(req, res){
        return new Promise((resolve, reject) => {
            this.recaptcha.verify(req, (err, data) => {
                console.log(err);
                if(err){
                    req.flash('errors', 'لطفا کد امنیتی را تاییدنمایید');
                    res.redirect(req.originalUrl);
                } else resolve(true);
            })
        })
    } 
    
    async  (req){

        const result = validationResult(req);
        if(!result.isEmpty()){
            const errors = result.array();
            const messages = [];

            errors.forEach( err => messages.push(err.msg))

            req.flash('errors', messages);   
            return false;
        }
        return true;
    }  
}