const Project = require('../models/project');

const create = async (req, res) => {
    const {name, description, point, due} = req.body;
    if(!name || !description){
        return res.status(422).json({
            error: "please fill all required fields"
        })
    }
    // req.teacher.password = undefined;
    const project = await Project.create({
        name,
        description,
        point,
        duedate: new Date(due),
        postedBy: req.teacher        
    })
    return res.json({
        success: "Project posted successfully",
        project
    });
};


const comment = async (req,res) => {
    
    const newComment = {
        text: req.body.text,
        postedBy: req.teacher.name,
        // docModel: 'teacher'
    }
    try {
        let project = await Project.findById(req.body.projectId).populate("postedBy").populate({path: 'students', populate: { path: 'studentID' }});        
        project.comments.push(newComment);
        project.save();
        res.json(project);
    } catch (error) {
        console.log(error);
        res.status(422).json({error});
    }   
    
}

const myProjects = async (req, res) => {
    const projects = await Project.find({postedBy:req.teacher._id}).populate({path: "students"});
    return res.json({
        projects
    });
}

module.exports = {
    create,
    myProjects,
    comment
}