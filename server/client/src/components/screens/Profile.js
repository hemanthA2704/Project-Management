import { useContext } from "react";
import { userContext } from "../../App";

const Profile = () => {

    const { loginedUser, role } = useContext(userContext);
    

    return (
        <>
        <div className="container" style={{ margin: "80px auto", width: "700px", height: "400px", backgroundColor: "#d8f5ea", borderRadius: "20px"}}>
            <div className="left" style={{ width: "50%", height: "100%", borderRight: "solid white 2px"}}>
                <div className="profilephoto" style={{ width: "200px", height: "200px", margin: "30px auto", borderRadius: "50%"}}>
                    <img src={loginedUser?loginedUser.photo:""}/>
                </div>
                <p style={{fontSize: "30px", margin: "20px", textAlign: "center"}}>{role&&role=='teacher'?"Teacher":"Student"}</p>
            </div>
            <div className="right"style={{ width: "50%", height: "100%", padding: "10px"}}>
                <span><span style={{float: 'right', cursor: 'pointer'}}><a href="#"><i class="material-icons">edit</i></a></span></span>
                <p style={{fontSize: "20px", paddingTop: "80px", paddingLeft: "20px", textAlign: "left"}}>Name: {loginedUser?loginedUser.name:"loading"}</p>
                <p style={{fontSize: "20px", paddingLeft: "20px", textAlign: "left"}}>Email: {loginedUser?loginedUser.email:"loading"}</p>  

            </div>
        </div>
        </>
    );
}
 
export default Profile;