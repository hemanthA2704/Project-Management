import { useEffect, useState, useContext } from "react";
import {userContext} from '../../App'
import Modal from "../Modal";


const Home = () => {

    const [data,setData] = useState('');

    const { loginedUser, userDispatch, role, roleDispatch } = useContext(userContext);

    useEffect(()=>{
        role&&fetch(`/${role}myprojects`, {
            method: 'get',
            headers: {
                'Authorization': 'Bearer '+localStorage.getItem('jwt')
            },
        }).then(res => res.json())
        .then(result => {
            setData(result);
        });
    },[role])
          

    return (
        <div className="container-fluid">
        
        {
            role=='teacher'?<Modal/>:<></>
        }

        <div className="grid-container">                
            {
                data&&data.projects.map(item => { 
                    return(
                        <>                        
                        <div className="card" >
                            <div className="card-content" style={{ height: "20%", borderBottom: "solid gray 0.5px", display: "flex", justifyContent: "space-between"}}>
                                <p>{item.name}</p>
                                <p>{item.duedate?item.duedate.substr(0,10):'null'}</p>
                            </div>
                            <div className="card-content" style={{ height: "60%", borderBottom: "solid gray 0.5px"}}>
                                <p>{item.description}</p>
                            </div>
                            <div className="card-action">
                                <a href={`/projectdetails/${item._id}`}>Open</a>
                            </div>
                        </div>
                        </>
                    )
                })
            }
        </div>
        </div>
    );
}
 
export default Home;