const validator = require('./validator');
const {check} = require('express-validator/check');


class ResetPasswordValidator extends validator {
    handle(){
        return [
            check('email')
            .isEmail()
            .withMessage('فیلد ایمیل معتبر نیست'),       
       
            check('token')
            .not().isEmpty()
            .withMessage('فیلد توکن الزامی است'),         

            check('password')
            .isLength({min: 8})
            .withMessage('فیلد پسورد نمی تواند کمتر از 8 کاراکتر باشد'),
            
        ]
    }

}
module.exports = new ResetPasswordValidator();