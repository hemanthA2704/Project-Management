import { useState, useContext, useEffect } from "react";
import { Link, useNavigate} from "react-router-dom";
import M from "materialize-css";
import {userContext} from '../../App'
 
const Signin = () => {
    const { loginedUser, userDispatch, role, roleDispatch } = useContext(userContext);
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [myRole,setmyRole] = useState('');
    const navigate = useNavigate();
    const clearAttributes = () => {
        setmyRole('');
        setEmail('');
        setPassword('');
    }

    const isEmail = (email) => {
        var regexp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return regexp.test(String(email).toLowerCase());
    }
    
    const postData = () => {        

        if(!myRole){
            M.toast({html: 'Enter Role', displayLength: '800', classes: '#e53935 red darken-1'});
            return;
        }

        if(!isEmail(email)){
            M.toast({html: 'Invalid Email', displayLength: '800', classes: '#e53935 red darken-1'});
            clearAttributes();
            return;
        }

        fetch(`/${myRole}signin`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email,
                password
            })
        }).then(res => res.json())
        .then(data => {
            if(data.error){
                M.toast({html: data.error, displayLength: '800', classes: '#e53935 red darken-1'});
                clearAttributes();
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
                <h4 style={{padding: "15px"}}>Project_Management</h4>
                <select className="browser-default" onChange={(e)=>setmyRole(e.target.value)}>
                    <option value="" >Choose your Role</option>
                    <option value="teacher">Teacher</option>
                    <option value="student">Student</option>
                </select>  
                <input type="email" placeholder="Email" value={email} onChange={(e)=>setEmail((e.target.value).toLowerCase())}/>
                <input type="password" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
                <button className="btn waves-effect waves-light" onClick={() => postData()}>Login</button>
                <h5>
                    <Link to="/signup">Don't have an account?</Link>
                </h5>
            </div>
    );
}
 
export default Signin;