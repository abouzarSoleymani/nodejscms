const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const uniqueString = require('unique-string');

const userSchema = mongoose.Schema({
    name: {type: String, required: true},
    admin: {type: Boolean, default: 0},
    email: {type: String ,unique: true, required: true},
    password: {type: String, required: true },
    rememberToken: {type: String, default: null}
    },
    {timestamps: true}
    );

    userSchema.pre('save', function(next){
        let salt = bcrypt.genSaltSync(15);
        let hash = bcrypt.hashSync(this.password, salt);
        this.password = hash;
        next();
    })

    userSchema.pre('findOneAndUpdate', function(next){
        let salt = bcrypt.genSaltSync(15);
        let password = this.getUpdate().$set.password;
        let hash = bcrypt.hashSync(password, salt);
        password = hash;
        next();
    })


    userSchema.methods.comparePassword = function(password){
       return bcrypt.compareSync(password, this.password); 
    }

    userSchema.methods.setRememberToken = function(res){
        const token = uniqueString();
        res.cookie('remember_token', token, {maxAge: 1000 * 60 * 60 * 24 * 90 , httpOnly: true, signd: true})
        this.update({rememberToken: token}, err => {
            if(err)
            console.log(err)
        });
    }

 module.exports = mongoose.model('User', userSchema);   