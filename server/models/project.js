const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    description:{
        type:String
    },
    files:[
        {
            filename:{
                type: String
            },
            fileurl:{
                type: String
            }             
        }
    ],
    point:{
        type: Number,
        default: 100
    },
    comments :[
        {
            text:String,
            postedBy:{
                type: String
            }
            // postedBy:{
            //     type: mongoose.Schema.Types.ObjectId,
            //     refPath: 'docModel'
            // },
            // docModel: {
            //     type: String,
            //     required: true,
            //     enum: ['teacher', 'student']
            // }

        }
    ],
    students: [
        {
            studentID: {                
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Student',
            },
            solutionfile:[
                {
                    filename:{
                        type: String
                    },
                    fileurl:{
                        type: String
                    }
                } 
            ],
            status:{
                type: String,
                default: "Not Submitted"
            },
            score:{
                type:Number,
                default: null
            }
        }
    ],
    duedate: {
        type: Date,
        default: null
    },
    postedBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Teacher"
    }
})

module.exports = mongoose.model("Project", projectSchema);