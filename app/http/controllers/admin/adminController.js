const controller = require('app/http/controllers/controller');

class indexController extends controller{
    index(req, res){
        res.json('admin pagess');
    }
    course(req, res){
        res.json('course pagess');
    }
}

module.exports = new indexController();