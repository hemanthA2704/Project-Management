import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import {userContext} from '../App'

const Navbar = () => {
    const {loginedUser,userDispatch,role,setRole} = useContext(userContext);

    const navigate = useNavigate();

    const userLogout = () => {
        localStorage.clear();
        userDispatch({type:"CLEAR"});
        navigate('/signin');
    }

    const renderlist = () => {
        if(loginedUser){
            return [
                <li><Link to="/profile">Profile</Link></li>,
                <li><button className="btn #ff1744 red accent-3 " style={{borderRadius: '20px'}} onClick={() => userLogout()}>Logout</button></li>
            ];
        }else{
            return [
                <li><Link to="/signin">Login</Link></li>,
                <li><Link to="/signup">Register</Link></li>,
            ];
        }
    }

    return(
        <nav>
            <div className="nav-wrapper white">
            <a href="/" className="brand-logo left">Pro-Man</a>
            <ul id="nav-mobile" className="right">
                {renderlist()}                
            </ul>
            </div>
        </nav>
    )
}

export default Navbar;