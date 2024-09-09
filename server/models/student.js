const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    photo:{
        type: String,
        default: 'https://res.cloudinary.com/hari03cloud/image/upload/v1656234037/R_lelvbn.png'
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    projects:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Project'
        }
    ]
})

module.exports = mongoose.model("Student", studentSchema);