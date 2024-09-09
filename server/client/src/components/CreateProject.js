import { useEffect, useState } from "react";
import { Link, useNavigate} from "react-router-dom";
import M from "materialize-css";

const CreateProject = () => {
    const [name,setName] = useState('');
    const [description,setDescription] = useState('');
    const [point,setPoint] = useState(100);
    const [due,setDue] = useState('');
    const clearAttributes = () => {
        setName('');
        setDescription('');
        setPoint('');
    }

    const navigate = useNavigate();
    
    const postData = () => {  
        console.log(due);
        fetch('/createproject',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+localStorage.getItem('jwt')
            },
            body: JSON.stringify({
                name,
                description,
                point,
                due
            })
        }).then(res => res.json())
        .then(data => {
            if(data.error){
                M.toast({html: data.error, displayLength: '800', classes: '#e53935 red darken-1'});
                if(data.type=='1'){
                    navigate('/signin');
                }
            }else{
                console.log(data);
                M.toast({html: data.success, displayLength: '800', classes: '#64dd17 light-green accent-4'});
                clearAttributes();
                navigate('/');
            }
        })   
    }

    return (
        <div className="card create-blog" style={{
            margin: "30px auto",
            maxWidth: "500px",
            padding: "20px"
        }}>
            <h4 style={{padding: "15px"}}>Create Project</h4>
            <input type="text" placeholder="Title" value={name} onChange={(e)=>setName(e.target.value)}/>
            <input type="text" placeholder="Description" value={description} onChange={(e)=>setDescription(e.target.value)}/>
            <input type="number" placeholder="point" value={point} onChange={(e)=>setPoint(e.target.value)}/>
            <label htmlFor="due">due date</label>
            <input type="date" id="due" value={due} onChange={(e)=>setDue(e.target.value)} />
            <button className="btn modal-close" style={{margin:"0px auto"}} onClick={() => postData()}>Create Project</button>
        </div>
    );
}
 
export default CreateProject;