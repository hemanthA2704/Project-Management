import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import M from "materialize-css";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileLines } from '@fortawesome/free-solid-svg-icons'

const Submissions = (props) => {
    const navigate = useNavigate();

    const [points, setPoints] = useState('')

    let answerFile = [];
    let studentsInfo;
    let status;
    props.project&&props.project.students.forEach((student) => { 
        if(student.studentID._id.toString()==props.student.toString()){
            answerFile = student.solutionfile;
            studentsInfo = student; 
            status = student.status;         
        }
    })

    const addPoints = () => {
        fetch(`/addPoints/${props.project._id}`, {
            method: 'PUT',
            headers: {
                'Authorization': 'Bearer '+localStorage.getItem('jwt'),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                student: studentsInfo,
                points
            })
        }).then(res => res.json())
        .then(data => {            
            if(data.error){
                M.toast({html: data.error, displayLength: '800', classes: '#e53935 red darken-1'});
                if(data.type=='1'){
                    navigate('/signin');
                }
            }else{
                M.toast({html: data.success, displayLength: '800', classes: '#64dd17 light-green accent-4'});
            }
        })
        setPoints('');
    }
    return (
        <>
            <div className="submission_container" style={{ width: "90%", height: "auto", position: 'relative', margin: "auto", padding:"20px 20px", margin: "50px auto", boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)", borderRadius: '10px' }}>
            {
                (() => {
                    if(status=="Submitted"){
                        return (
                            <>
                                <p style={{fontSize: "20px", margin: "10px 0px"}}>{studentsInfo? studentsInfo.studentID.name+'  submissions': ''}</p>
                                {
                                    answerFile.map((file) => {                                    
                                        return(      
                                                        
                                            <div className="File_widget" style={{ width: "auto" , height: "auto", padding:"20px 20px", margin: "20px 20px", boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)", borderRadius: '10px'}}>
                                                <FontAwesomeIcon icon = { faFileLines } style={{ fontSize: "25px"}}/>
                                                <a href={file.fileurl}><span style={{ fontSize: "15px", paddingLeft: "10px" }}>{file.filename}</span></a>
                                            </div>
                                            
                                        )
                                    })
                                }
                            </>
                        )                    
                    }else{
                        return(
                            <>
                                <p style={{fontSize: "20px", margin: "10px 0px"}}>{studentsInfo? studentsInfo.studentID.name+'  not yet Submitted': ''}</p>
                            </>
                        )
                    }
                })()
            }            
                <div class="input-field" style={{ display: "flex" }}>
                    <input value={points} style={{margin: "auto 10px", width: "60%"}} id="Point" type="number" class="validate" onChange={(e) => setPoints(e.target.value)}/>
                    <label for="Point">Points/{props.project.point}</label>
                    <a class="waves-effect waves-light btn" style={{borderRadius: "20px",  margin: "auto 10px", width: "30%"}} onClick= {() => addPoints()}><span style={{color: "#fff"}}>Submit</span></a>
                </div> 
            </div>
        </>
    );
}
 
export default Submissions;