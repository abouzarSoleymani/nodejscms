const validator = require('./validator');
const {check} = require('express-validator/check');
const Course = require('app/models/course');

class courseValidator extends validator {
    handle(){
        return [
            check('title')
            .isLength({min: 5})
            .withMessage('فیلد عنوان نمی تواند کمتر از 5 کاراکتر باشد')
            .custom(async (value) => {
                let course = await Course.findOne({slug: this.slug(value)});
                if(course){
                    throw new Error('چنین عنوانی قبلا در سایت قرار داده شده است');
                }    
            }),
            check('type')
            .not().isEmpty()
            .withMessage('فیلد نوع دوره نمی تواند خالی بماند'),
           
            check('body')
            .isLength({min: 20})
            .withMessage('فیلد متن نمی تواند کمتر از 20 کاراکتر باشد'),
           
            check('price')
            .not().isEmpty()
            .withMessage('فیلد مبلغ نمی تواند خالی بماند'),
            
            check('tags')
            .not().isEmpty()
            .withMessage('فیلد تگ نمی تواند خالی بماند'),
            
        ]
    }
    slug(title){
        return title.replace(/([^0-9ا-یa-z0-9]|-)+/g, '-')
    }

}
module.exports = new courseValidator();