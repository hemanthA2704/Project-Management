import { useState, useContext } from "react";
import {Link , useNavigate} from "react-router-dom";
import M from "materialize-css";
import {userContext} from '../../App'
 
const Guest = () => {
    const {userDispatch, roleDispatch } = useContext(userContext);
    const [myRole,setmyRole] = useState('');
    const navigate = useNavigate();

    const postData = () => {        

        if(!myRole){
            M.toast({html: 'Enter Role', displayLength: '800', classes: '#e53935 red darken-1'});
            return;
        }

        fetch(`/${myRole}guest`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
        .then(data => {
            if(data.error){
                M.toast({html: data.error, displayLength: '800', classes: '#e53935 red darken-1'});
            }else{
                localStorage.setItem('jwt',data.token);
                localStorage.setItem('user',JSON.stringify(data.user));
                localStorage.setItem('role',JSON.stringify(myRole));

                userDispatch({type:'USER', payload:data.user});
                roleDispatch({type:'USER', payload:myRole});
                M.toast({html: data.success, displayLength: '800', classes: '#64dd17 light-green accent-4'});
                navigate('/');
            }
        })
        
    }

    return (
            <div className="card auth-card" style={{margin: "50px auto"}}>
                <h4 style={{padding: "15px"}}>ClassProjex</h4>
                <select className="browser-default" onChange={(e)=>setmyRole(e.target.value)}>
                    <option value="" >Choose your Role</option>
                    <option value="teacher">Teacher</option>
                    <option value="student">Student</option>
                </select>  
                <button className="btn waves-effect waves-light" onClick={() => postData()}>Login</button>
            </div>
    );
}
 
export default Guest;
