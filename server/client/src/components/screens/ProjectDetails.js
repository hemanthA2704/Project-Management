import { useContext, useEffect, useState } from "react";
import { renderMatches, useParams } from "react-router-dom";
// import { Scrollbars } from 'react-custom-scrollbars';
import { userContext } from "../../App";
import { Link, useNavigate} from "react-router-dom";
import M from "materialize-css";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileLines } from '@fortawesome/free-solid-svg-icons'

const ProjectDetails = () => {
    const {loginedUser, userDispatch, role, roleDispatch} = useContext(userContext);

    const navigate = useNavigate();
    const {id} = useParams();
    let url = '';
    if(role){
        url = `/${role}/projectdetails/${id}`;        
    }


    const [project, setProject] = useState('');    
    const [comment,setComment] = useState('');
    const [answerFilename, setAnswerfilename] = useState('');
    const [answerFileurl, setAnswerfileurl] = useState('');
    const [questionFilename, setQuestionfilename] = useState('');
    const [questionFileurl, setQuestionfileurl] = useState('');

    const addAnswerfile = () => {
        if(!answerFileurl||!answerFilename){
            M.toast({html: "Fill both file name and file url", displayLength: '800', classes: '#e53935 red darken-1'});
        }
        fetch(`/addanswerfile/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+localStorage.getItem('jwt')
            },
            body: JSON.stringify({
                filename: answerFilename,
                fileurl: answerFileurl,
            })
        }).then(res => res.json())
        .then(result => {
            setProject(result.project);
            M.toast({html: result.success, displayLength: '800', classes: '#64dd17 light-green accent-4'});
        });
        setAnswerfileurl('');
        setAnswerfilename('');
    }

    const deleteAnswerfile = (fileid) => {
        fetch(`/deleteanswerfile/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+localStorage.getItem('jwt')
            },
            body: JSON.stringify({
                fileid
            })
        }).then(res => res.json())
        .then(result => {
            setProject(result.project);
            M.toast({html: result.success, displayLength: '800', classes: '#64dd17 light-green accent-4'});
        });
    }
    
    const addQuestionfile = () => {
        if(!questionFileurl||!questionFilename){
            M.toast({html: "Fill both file name and file url", displayLength: '800', classes: '#e53935 red darken-1'});
        }
        fetch(`/addquestionfile/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+localStorage.getItem('jwt')
            },
            body: JSON.stringify({
                filename: questionFilename,
                fileurl: questionFileurl,
            })
        }).then(res => res.json())
        .then(result => {
            setProject(result.project);
            console.log(result.project);
            M.toast({html: result.success, displayLength: '800', classes: '#64dd17 light-green accent-4'});
        });
        setQuestionfilename('');
        setQuestionfileurl('');
    }

    const deleteQuestionfile = (fileid) => {
        fetch(`/deletequestionfile/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+localStorage.getItem('jwt')
            },
            body: JSON.stringify({
                fileid
            })
        }).then(res => res.json())
        .then(result => {
            setProject(result.project);
            M.toast({html: result.success, displayLength: '800', classes: '#64dd17 light-green accent-4'});
        });
    }

    const makeComment = () => {        
        fetch(`/${role}comment`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+localStorage.getItem('jwt')
            },
            body: JSON.stringify({
                text: comment,
                projectId: id,
            })
        }).then(res => res.json())
        .then(result => setProject(result));
        setComment('');
    } 


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
    }, [url]) 

    let answerFile = [];
    let status = 'Not Submitted';
    let score;
    project&&project.students.forEach((student) => { 
        if(student.studentID._id.toString()==loginedUser._id.toString()){
            answerFile = student.solutionfile;            
            if(student.status=='Submitted')status = 'Submitted';
            score = student.score;
        }
    })

    const studentSubmit = () => {
        fetch(`/submit/${id}`, {
            method: 'PUT',
            headers: {
                'Authorization': 'Bearer '+localStorage.getItem('jwt')
            }
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

    const studentUnsubmit = () => {
        fetch(`/unsubmit/${id}`, {
            method: 'PUT',
            headers: {
                'Authorization': 'Bearer '+localStorage.getItem('jwt')
            }
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

    let fileBox;

    if(role=='teacher'){
        fileBox =
        <div className="File_box" style={{width: "80%", height: "auto", padding:"20px 20px", margin: "20px auto", boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)", borderRadius: '10px'}}>
            <p style={{fontSize: "30px", margin: "0px 0px"}}>Add Files</p>            
            <div class="file-field input-field">
                <input type="text" placeholder="File name" value={questionFilename} onChange={(e)=>setQuestionfilename(e.target.value)}/>
                <input type="text" placeholder="Drive link" value={questionFileurl} onChange={(e)=>setQuestionfileurl(e.target.value)}/>
            </div>
            <a class="waves-effect waves-light btn" style={{backgroundColor: "white", borderRadius: "10px", width: "100%", marginBottom: "10px"}} onClick = {() => addQuestionfile()}><span style={{color: "#26a69a"}}>Add File</span></a>
        </div>
    }else{
        fileBox = 
        <div className="File_box" style={{width: "80%", height: "auto", padding:"20px 20px", margin: "20px auto", boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)", borderRadius: '10px'}}>
            <p style={{fontSize: "30px", margin: "0px 0px"}}>Your work</p>            
            {
                answerFile&&answerFile.map((file) => {
                    return(                            
                        <div className="File_widget" style={{ width: "auto" , height: "auto", padding:"20px 20px", margin: "20px 0px", boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)", borderRadius: '10px'}}>
                            <FontAwesomeIcon icon = { faFileLines } style={{ fontSize: "25px"}}/>
                            <a href={file.fileurl}><span style={{ fontSize: "15px", paddingLeft: "10px" }}>{file.filename}</span></a>
                            {
                                status=="Not Submitted"?(
                                    <span style={{float: 'right', cursor: 'pointer'}} onClick={() => deleteAnswerfile(file._id)}><i class="material-icons">delete</i></span>
                                )
                                :<></>
                            }
                        </div>
                    )
                })
                    
            }            
            {
                (() => {
                    if(status=='Not Submitted'){
                        return(
                        <>
                            <div class="file-field input-field">
                                <input type="text" placeholder="File name" value={answerFilename} onChange={(e)=>setAnswerfilename(e.target.value)}/>
                                <input type="text" placeholder="Drive link" value={answerFileurl} onChange={(e)=>setAnswerfileurl(e.target.value)}/>
                            </div>
                            <a class="waves-effect waves-light btn" style={{backgroundColor: "white", borderRadius: "10px", width: "100%"}} onClick = {() => addAnswerfile()}><span style={{color: "#26a69a"}}>Add File</span></a>
                            <a class="waves-effect waves-light btn" style={{borderRadius: "10px", width: "100%", marginTop: "10px"}}><span style={{color: "white"}} onClick = {() => studentSubmit()}>Submit</span></a>
                        </>
                        )
                    }else{
                        return(
                            <>
                                <a class="waves-effect waves-light btn" style={{borderRadius: "10px", width: "100%", marginTop: "10px"}}><span style={{color: "white"}} onClick = {() => studentUnsubmit()}>Unsubmit</span></a>
                            </>
                        )
                    }
                })()
            }
        </div>
    }


    return (
        <>
        <div className="project_detail left" style={{ width: "70%", height: "auto", position: 'relative' }}>
            <div className="Icon_container left" style={{ width: "7%", height: "auto"}}>
                <i class="material-icons" style={{ color: "#26a69a", margin: "20px 10px", fontSize: "35px"}}>assignment</i>
            </div>
            <div className="Project_Info right" style={{ width: "93%", height: "auto"}}>
                <div className="Header" style={{marginTop: "10px", borderBottom: "solid #26a69a 2px", paddingBottom: "20px"}}>
                    <div style={{display: "flex", justifyContent: "space-between"}}>
                        <p style={{fontSize: "35px", marginTop: "0px", marginBottom: "5px"}}>{project?project.name:'loading'}</p>
                        {
                            role&&role=='student'?(
                                <p style={{fontSize: "20px", marginTop: "0px", marginBottom: "0px"}}>Score: {score}</p>
                            ):<></>
                        }
                    </div>
                    <div style={{display: "inline-flex", gap: "15px", marginBottom: "5px"}}>
                        <p style={{fontSize: "15px", marginTop: "0px", marginBottom: "0px"}}>{project?project.postedBy.name:'loading'}</p>                    
                        <p style={{fontSize: "15px", marginTop: "0px", marginBottom: "0px"}}>Date</p>
                    </div>
                    <div style={{display: "flex", justifyContent: "space-between"}}>
                        <p style={{fontSize: "18px", marginTop: "0px", marginBottom: "0px"}}>Points {project?project.point:'loading'}</p>
                        <p style={{fontSize: "18px", marginTop: "0px", marginBottom: "0px"}}>Due {project&&project.duedate?project.duedate.substr(0,10):'null'}</p>
                    </div>
                </div>
                <div className="Content" style={{marginTop: "10px", borderBottom: "solid black 0.8px", paddingBottom: "15px"}}>
                    <p style={{fontSize: "18px", marginTop: "0px", marginBottom: "0px"}}>{project?project.description:'loading'}</p>
                </div>
                {
                    project&&project.files.map((file) => {
                        return(
                            <div className="File_widget" style={{ width: "300px" , height: "auto", padding:"20px 20px", margin: "20px 0px", boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)", borderRadius: '10px'}}>
                                <FontAwesomeIcon icon = { faFileLines } style={{ fontSize: "25px"}}/>
                                <a href={file.fileurl}><span style={{ fontSize: "15px", paddingLeft: "10px" }}>{file.filename}</span></a>
                                {role&&role=='teacher'?<span style={{float: 'right', cursor: 'pointer'}} onClick={() => deleteQuestionfile(file._id)}><i class="material-icons">delete</i></span>:<></>}
                            </div>
                        )
                    })
                }                
            </div>
            
        </div>
        <div className="project_detail right" style={{ width: "30%", height: "auto", position: 'relative' }}>
            {
                role&&role=='teacher'?
                    (
                        <div className="students_box" style={{width: "80%", height: "auto", padding:"20px 20px", margin: "20px auto", boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)", borderRadius: '10px'}}>
                            <span style={{float: 'right', cursor: 'pointer'}}><a href={`/studentsassigneddetails/${id}`}><i class="material-icons">visibility</i></a></span>
                            <p style={{fontSize: "20px", margin: "0px 0px"}}>Students Assigned: {project?project.students.length:''}</p>                 
                        </div>
                    )
                :<></>
            }
            {fileBox}
            <div className="comment_box" style={{width: "80%", height: "auto", padding:"20px 20px", margin: "20px auto", boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)", borderRadius: '10px'}}>
                <p style={{fontSize: "30px", margin: "auto", marginBottom: "10px"}}>Comments</p>
                {/* <Scrollbars style={{ width: "100%",height: "auto"}} onUpdate={{}}> */}
                    <div className="commentContainer" style={{height: "auto", width: "auto"}}>
                        {
                            project&&project.comments.map(record => {
                                return(
                                    <p><span style={{fontWeight:"500"}}>{record.postedBy}: </span>{record.text}</p>
                                )
                            })
                        }
                    </div>                    
                {/* </Scrollbars> */}
                <div className="commentInput">
                    <div className="input-field col s12" style={{margin:"0px 10px"}}>
                        <i className="material-icons prefix">mode_edit</i>
                        <textarea id="icon_prefix2" className="materialize-textarea" value={comment} onChange={(e)=>setComment(e.target.value)}></textarea>
                        <label for="icon_prefix2">Add Comment</label>
                    </div>
                    <button className="btn waves-effect waves-light" style={{borderRadius:"20px", margin:"0px 10px"}} onClick={() => makeComment()}>Submit</button>
                </div>
            </div>
        </div>
        </>
    );
}
 
export default ProjectDetails;