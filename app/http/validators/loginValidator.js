const validator = require('./validator');
const {check} = require('express-validator/check');


class LoginValidator extends validator {
    handle(){
        return [
            check('email')
            .isEmail()
            .withMessage('فیلد ایمیل معتبر نیست'),
                     
            check('password')
            .isLength({min: 8})
            .withMessage('فیلد پسورد نمی تواند کمتر از 8 کاراکتر باشد'),
            
        ]
    }

}
module.exports = new LoginValidator();