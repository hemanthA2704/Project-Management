const Project = require('../models/project');
const Student = require('../models/student');


const myProjects = async (req, res) => {
    const student = await Student.findById({_id: req.student._id}).populate({path:'projects'});
    
    return res.json({
        projects: student.projects
    });
    
}

const comment = async (req,res) => {
    const newComment = {
        text: req.body.text,
        postedBy: req.student.name,
        // docModel: 'student'
    }
    try {
        let project = await Project.findById(req.body.projectId).populate({path: 'students', populate: { path: 'studentID' }});
        project.comments.push(newComment);
        project.save();
        res.json(project);
    } catch (error) {
        res.status(422).json({error});
    }   
    
}

module.exports = {
    myProjects,
    comment
}