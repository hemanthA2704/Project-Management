const Teacher = require('../models/teacher');
const Student = require('../models/student');
const bycrpt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {JWT_KEY} = require('../config/keys');

const teachersignup = async (req,res) => {
    const {name,email,password} = req.body;
    if(!name || !email || !password){
        return res.status(422).json({
            error: "Please fill all fields"
        })
    }
    let teacher = await Teacher.findOne({email:email});
    if(!teacher){
        let hashedPassword = await bycrpt.hash(password,10);
        let newTeacher = await Teacher.create({
            name: name,
            email: email,
            password: hashedPassword
        });
        return res.json({
            success: "Successfully Registered",
            user: newTeacher
        });
    }else{
        return res.json({error: "Email already Exists"});
        
    }
    
}

const teachersignin = async (req, res) => {
    const {email, password} = req.body;
    if(!email || !password){
        return res.status(422).json({
            error: "Incorrect Credentials!"
        })
    }
    let teacher = await Teacher.findOne({email:email});
    if(!teacher){
        return res.status(422).json({
            error: "Incorrect Credentials!"
        })
    }
    let passCheck = await bycrpt.compare(password,teacher.password);
    if(passCheck){
        const token = jwt.sign({_id:teacher._id}, JWT_KEY);
        res.json({
            success: "Successfully LoggedIn",
            token,
            user: teacher
        });
    }else{
        return res.status(422).json({
            error: "Incorrect Credentials!"
        })
    }

}

const studentsignup = async (req,res) => {
    const {name,email,password} = req.body;
    if(!name || !email || !password){
        return res.status(422).json({
            error: "Please fill all fields"
        })
    }
    let student = await Student.findOne({email:email});
    if(!student){
        let hashedPassword = await bycrpt.hash(password,10);
        let newStudent = await Student.create({
            name: name,
            email: email,
            password: hashedPassword
        });
        return res.json({
            success: "Successfully Registered",
            user: newStudent
        });
    }else{
        return res.json({error: "Email already Exists"});
        
    }
    
}

const studentsignin = async (req, res) => {
    const {email, password} = req.body;
    if(!email || !password){
        return res.status(422).json({
            error: "Incorrect Credentials!"
        })
    }
    let student = await Student.findOne({email:email});
    if(!student){
        return res.status(422).json({
            error: "Incorrect Credentials!"
        })
    }
    let passCheck = await bycrpt.compare(password,student.password);
    if(passCheck){
        const token = jwt.sign({_id:student._id}, JWT_KEY);
        res.json({
            success: "Successfully LoggedIn",
            token,
            user: student
        });
    }else{
        return res.status(422).json({
            error: "Incorrect Credentials!"
        })
    }

}

module.exports = {
    teachersignup,
    teachersignin,
    studentsignup,
    studentsignin
}
