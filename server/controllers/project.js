const Project = require('../models/project');
const Student = require('../models/student')
const projectdetail = async (req,res) => {    
    const project = await Project.findById(req.params.id).populate("postedBy").populate({path: 'students', populate: { path: 'studentID' }});
    res.json(project);
}

const addstudent = async (req,res) => {
    const student = await Student.findOne({email: req.body.studentEmail});
    if(student){        
        const project = await Project.findByIdAndUpdate(
            req.params.id,
            { "$push": { "students": {studentID: student._id} } },
            { "new": true, "upsert": true }
        )
        .populate({
            "path": "postedBy"            
        })
        .populate({
            "path": "students",
            "populate": {
                "path": "studentID"
            }
        })
        .exec();
                
        student.projects.push(project._id);
        student.save();
        
        return res.json({success: "Student added successfully", project})
    }else{
        return res.status(422).json({error: "No student Found for given Email"})
    }
}

const addPoints = async (req,res) => {
    const project = await Project.findById(req.params.id).populate("postedBy").populate({path: 'students', populate: { path: 'studentID' }});
            
    project.students.forEach((student) => {
        if(student._id.toString()==req.body.student._id.toString()){
            student.score = req.body.points;
            project.save();
        }
    })                  
        
    return res.json({success: "points added successfully", project})
    
}

const deletestudent = async (req, res) => {
    const student = await Student.findById(req.body.studentID);
    const project = await Project.findByIdAndUpdate(
        req.params.id,
        { "$pull": { "students": {studentID: req.body.studentID} } },
        { "new": true, "upsert": true }
    )
    .populate({
        "path": "postedBy"            
    })
    .populate({
        "path": "students",
        "populate": {
            "path": "studentID"
        }
    })
    .exec();
            
    student.projects.pull(project._id);
    student.save();
    
    return res.json({success: "Student deleted successfully", project})
}

const addAnswerfile = async (req, res) => {
    const newfile = {
        filename: req.body.filename,
        fileurl: req.body.fileurl

    }
    const project = await Project.findById(req.params.id).populate("postedBy").populate({path: 'students', populate: { path: 'studentID' }});
    project.students.forEach((student) => {
        if(student.studentID._id.toString()==req.student._id.toString()){
            student.solutionfile.push(newfile);
            project.save();
        }
    })
    return res.json({success: "file added successfully", project})
}

const deleteAnswerfile = async (req, res) => {
    const project = await Project.findById(req.params.id).populate("postedBy").populate({path: 'students', populate: { path: 'studentID' }});
    project.students.forEach((student) => {
        if(student.studentID._id.toString()==req.student._id.toString()){
            student.solutionfile.forEach((file) => {
                if(file._id==req.body.fileid){
                    student.solutionfile.pull(file);
                    project.save();
                }
            })
        }
    })
    return res.json({success: "file deleted successfully", project})
}

const addQuestionfile = async (req, res) => {
    const newfile = {
        filename: req.body.filename,
        fileurl: req.body.fileurl

    }
    const project = await Project.findById(req.params.id).populate("postedBy").populate({path: 'students', populate: { path: 'studentID' }});
    project.files.push(newfile);
    project.save();
    return res.json({success: "file added successfully", project})
}

const deleteQuestionfile = async (req, res) => {
    const project = await Project.findById(req.params.id).populate("postedBy").populate({path: 'students', populate: { path: 'studentID' }});
    project.files.forEach((file) => {
        if(file._id.toString()==req.body.fileid.toString()){
            project.files.pull(file);
            project.save();
            return res.json({success: "file deleted successfully", project})
        }
    })
}

const submit = async (req,res) => {
    const project = await Project.findById(req.params.id).populate("postedBy").populate({path: 'students', populate: { path: 'studentID' }});
            
    project.students.forEach((student) => {
        if(student.studentID._id.toString()==req.student._id.toString()){
            student.status = "Submitted";
            project.save();
        }
    })                  
        
    return res.json({success: "Submitted successfully", project})
}

const unSubmit = async (req,res) => {
    const project = await Project.findById(req.params.id).populate("postedBy").populate({path: 'students', populate: { path: 'studentID' }});
            
    project.students.forEach((student) => {
        if(student.studentID._id.toString()==req.student._id.toString()){
            student.status = "Not Submitted";
            project.save();
        }
    })                  
        
    return res.json({success: "Unsubmitted successfully", project})
}

module.exports = {
    projectdetail,
    addstudent,
    deletestudent,
    addAnswerfile,
    deleteAnswerfile,
    addQuestionfile,
    deleteQuestionfile,
    addPoints,
    submit,
    unSubmit
}