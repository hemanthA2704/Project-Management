import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Submissions from "./Submissions";
import M from "materialize-css";


const StudentsInfo = () => {
    const navigate = useNavigate();

    const {id} = useParams();
    const url = `/teacher/projectdetails/${id}`;

    const [studentEmail, setEmail] = useState('');    
    const [project, setProject] = useState('');

    const isEmail = (email) => {
        var regexp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return regexp.test(String(email).toLowerCase());
    }

    const deleteStudent = (studentID) => {
        fetch(`/deletestudent/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': 'Bearer '+localStorage.getItem('jwt'),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                studentID
            })
        }).then(res => res.json())
        .then(data => {            
            if(data.error){
                M.toast({html: data.error, displayLength: '800', classes: '#e53935 red darken-1'});
                if(data.type=='1'){
                    navigate('/signin');
                }
            }else{
                setProject(data.project);
                M.toast({html: data.success, displayLength: '800', classes: '#64dd17 light-green accent-4'});
            }
        })
    }

    const addStudent = () => {

        if(!isEmail(studentEmail)){
            M.toast({html: 'Invalid Email', displayLength: '800', classes: '#e53935 red darken-1'});
            setEmail('');
            return;
        }

        let ok = 1;
        project.students.forEach(student => {
            if(student.studentID.email==studentEmail){
                ok = 0;
            }
        })

        if(!ok){            
            M.toast({html: 'Student already added', displayLength: '800', classes: '#e53935 red darken-1'});
            setEmail('');
            return;
        }

        fetch(`/addstudent/${id}`,{
            method: 'PUT',
            headers: {
                'Authorization': 'Bearer '+localStorage.getItem('jwt'),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                studentEmail
            })
        }).then(res => res.json())
        .then(data => {
            if(data.error){
                M.toast({html: data.error, displayLength: '1000', classes: '#e53935 red darken-1'});
                setEmail('');
            }else{
                M.toast({html: data.success, displayLength: '1000', classes: '#64dd17 light-green accent-4'});
                setEmail('');
                setProject(data.project);
            }
        })
    }

    const [Submissionstudent, setSubmissionstudent] = useState('');
    
        

    useEffect(() => {
        fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer '+localStorage.getItem('jwt')
            },
        }).then(res => res.json())
        .then(result => {
            if(result.error){
                M.toast({html: result.error, displayLength: '800', classes: '#e53935 red darken-1'});
                if(result.type=='1'){
                    navigate('/signin');
                }
            }
            setProject(result);         
        });        
    }, [])


    return (
        <>
        <div className="student_detail left" style={{ width: "70%", height: "auto", position: 'relative' }}>
            <div className="addStudent_box row" style={{width: "70%", height: "auto", display:"flex", padding:"20px 20px", margin: "20px auto", boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)", borderRadius: '10px'}}>
                    <i class="material-icons prefix" style={{fontSize: "45px", margin: "auto 10px"}}>account_circle</i>
                    <input id="icon_prefix" type="email" class="validate" placeholder="Student Email" value={studentEmail} onChange={(e)=>setEmail((e.target.value).toLowerCase())}/>
                    <a class="waves-effect waves-light btn" style={{borderRadius: "20px",  margin: "auto 10px", width: "15%"}} onClick= {() => addStudent()}><span style={{color: "#fff"}}>Add</span></a>                
            </div>
            <div className="studentsList" style={{width: "70%", height: "auto", padding:"20px 0px", margin: "20px auto"}}>
                <p style={{fontSize: "30px", margin: "10px 0px"}}>Students List</p>
                {
                    project&&project.students.map(student => {
                        return(
                            <div className="studentDetail" style={{ display:"flex", justifyContent:"space-between", padding:"20px 10px", borderBottom: "solid black 1px", boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)", borderRadius: '10px', marginBottom: "10px" }}>
                                <p style={{fontSize: "20px", margin: "0px 0px"}}>{student? student.studentID.name: "loading"}</p>
                                <p style={{fontSize: "20px", margin: "0px 0px"}}>Status: <span>{student.status}</span></p>
                                <div style={{display:"flex", gap: "20px"}}>
                                    <div style={{cursor: 'pointer'}} onClick={() => {setSubmissionstudent(student.studentID._id);}}><i class="material-icons">visibility</i></div>
                                    <div style={{cursor: 'pointer'}} onClick={() => deleteStudent(student.studentID._id)}><i class="material-icons">delete</i></div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
        
        <div className="submission_detail right" style={{ width: "30%", height: "auto", position: 'relative' }}>
            <Submissions  student = {Submissionstudent} project = {project}/>
        </div>
        </>
    );
}
 
export default StudentsInfo;