import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import jwt_decode from "jwt-decode";

import { axiosWithAuth } from './auth/axiosAuth.js';

import Snake from './component/snake'
import Lost from './component/Lost'
import RegisterForm from './component/RegisterForm';
import SignIn from './component/SignIn';
import Navbar from './component/Navbar';
import Option from './component/Option';
import Scores from './component/Scores';


import API_URL from './config'

import './App.css';


function App() {
  
  // const [lost, setLost] = useState(false)
  const [loggedIn, setLoggedIn] = useState(false)

  // const loose = () => {
  //   //const finalScore = {userId: id, score: score}
  //   if(loggedIn){
  //     const payload = {score: score, gameId: 1}
  //     axiosWithAuth().post(API_URL + "scores", payload)
  //       .then(res => {
  //         console.log(`score ${score} saved!`)
  //       })
  //       .catch(err => 
  //         console.log(`An error occurred: \n ${err.message}`)
  //       )
  //   }
  //   setLost(true)
  // }



  useEffect(() => {
    let token = localStorage.getItem("token")
    if(token){
      //token = jwt_decode(token)
      setLoggedIn(true)
    }
  }, [])

  return (
    <>
    <Navbar loggedIn={loggedIn} setLoggedIn={setLoggedIn}/>
    <Routes>
      <Route path="/" element={
        <>
        {/* //   {lost && <Lost score={score} />} */}
          <Snake />
        </>
      }/>
      <Route path="/Option" element={<Option/>} />
      <Route path="/register" element={<RegisterForm />} />
      <Route path="/SignIn" element={<SignIn setLoggedIn={setLoggedIn}/>} />
      <Route path="/Scores" element={<Scores loggedIn={loggedIn} />} />
    </Routes>
    </>
  );
}

export default App;
