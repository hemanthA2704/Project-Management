const Teacher = require('../models/teacher');
const jwt = require('jsonwebtoken');
const {JWT_KEY} = require('../config/keys');



module.exports = (req, res, next) => {
    const {authorization} = req.headers;
    //authorization === Bearer embjhbzjcb
    if(!authorization){
        return res.status(401).json({
            error: "You must be logged in :(",
        })
    }
    const token = authorization.replace("Bearer ", "");
    jwt.verify(token,JWT_KEY,(err, payload) => {
        if(err){
            return res.status(401).json({
                error:"you must be logged in :(",
                type: '1'
            });
        }
        const {_id} = payload;
        Teacher.findById(_id).then(user => {
            req.teacher = user;
            next();
        })
    })
}