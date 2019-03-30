const controller = require('app/http/controllers/controller');
const Course = require('app/models/course');

class courseController extends controller{
    index(req, res){
        let title = 'دوره ها';
        res.render('admin/courses/index', {title});
    }
    create(req, res){
        res.render('admin/courses/create');
    }
    async store(req, res){
       let status = await this.validationData(req);
       if(!status){
           this.back(req, res);
       }

       try{
           // images
       // create course
       let images = req.body.images;
       let {title, body, type, price , tags} = req.body;
       let newCourse = new Course({
           user: req.user._id,
           title,
           slug: this.slug(title),
           body,
           type,
           price,
           images,
           tags
       })
       await newCourse.save();
       return res.redirect('/admin/courses'); 
       }catch(e){
           throw new Error(e); 
       }
    }
    slug(title){
        return title.replace(/([^0-9ا-یa-z0-9]|-)+/g, '-')
    }
}

module.exports = new courseController();