import Navbar from './components/Navbar';
import './App.css'
import {BrowserRouter, Routes, Route, useNavigate, Switch} from "react-router-dom";
import Signin from './components/screens/Signin';
import Signup from './components/screens/Signup';
import Home from './components/screens/Home';
import ProjectDetails from './components/screens/ProjectDetails';
import StudentsInfo from './components/screens/Studentsassigneddetails';
import Profile from './components/screens/Profile';
import { createContext, useContext, useEffect, useReducer, useState } from 'react';
const {userReducer, initialUser} = require('./reducers/userReducer');
const {roleReducer, intitalRole} = require('./reducers/roleReducer');

export const userContext = createContext();


const Routing = () => {
  const navigate = useNavigate();
  const {loginedUser,userDispatch,role, roleDispatch} = useContext(userContext);
  const user = JSON.parse(localStorage.getItem('user'));
  const myRole = JSON.parse(localStorage.getItem('role'))
  useEffect(() => {
    if(user){      
      userDispatch({type: 'USER',payload: user});
      roleDispatch({type: 'USER',payload: myRole});
    }else{
      navigate('/signin');
    }
  }, []);

  return(
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/projectdetails/:id" element={<ProjectDetails />} />
        <Route path="/studentsassigneddetails/:id" element={<StudentsInfo />} />
    </Routes>
  );
}

function App() {
  
  const [role, roleDispatch] = useReducer(roleReducer, intitalRole);
  const [loginedUser, userDispatch] = useReducer(userReducer, initialUser);

  return (
    <userContext.Provider value={{loginedUser, userDispatch, role, roleDispatch}}>
      <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route path="/signup" element={<Signup />} />          
          <Route path="/signin" element={<Signin />} />         
        </Routes>        
        <Routing/>
      </BrowserRouter>
    </userContext.Provider>
  );
}

export default App;
