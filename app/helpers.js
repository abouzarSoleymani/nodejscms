const path = require('path');
const autoBind = require('auto-bind');

module.exports = class Helpers{

    constructor(req, res){
        autoBind(this);
        this.req = req;
        this.res = res;
        this.formData = req.flash('formData')[0];

    }

    getObjects(){
        return{
            auth: this.auth(),
            viewPath: this.viewPath,
            ...this.getGlobalVariables(),
            old: this.old
        }
    }

    auth(){
        return {
             user: this.req.user,
             check: this.req.isAuthenticated()
            } 
    }
    
    viewPath(dir){
        return path.resolve(config.layout.view_dir+ '/' + dir);
    }

    getGlobalVariables(){
        return {
            errors: this.req.flash('errors')
        }
    }
    old(field, defaultValue = ''){
        console.log(this.formData, field)
        return this.formData && this.formData.hasOwnProperty(field) ? this.formData[field] : defaultValue;
    }
}