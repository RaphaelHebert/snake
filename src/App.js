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
  const [apple, setApple] = useState([0,0])
  const [score, setScore] = useState(-1)
  const [lost, setLost] = useState(false)
  const [loggedIn, setLoggedIn] = useState(false)
  const [speed, setSpeed] = useState(200)

  const loose = () => {
    //const finalScore = {userId: id, score: score}
    if(loggedIn){
      const payload = {score: score, gameId: 1}
      axiosWithAuth().post(API_URL + "scores", payload)
        .then(res => {
          console.log(`score ${score} saved!`)
        })
        .catch(err => 
          console.log(`An error occurred: \n ${err.message}`)
        )
    }
    setLost(true)
  }

  const applePos = () => {
    let top = Math.floor( Math.random() * 100 ).toString()
    let left = Math.floor( Math.random() * 100 ).toString()
  
    top = top - (top % 2)
    left = left - (left % 2)
    console.log(`apple: ${top} ${left}`)
    setApple([top, left])
    setScore(score + 1)
  }

  useEffect(() => {
    applePos()
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
          {lost && <Lost score={score} />}
          <Snake apple={apple} applePos={applePos} score={score >= 0? score: 0} loose={loose} lost={lost} setLost={setLost} score={score} setScore={setScore} speed={speed} setApple={setApple}/>
        </>
      }/>
      <Route path="/Option" element={<Option setSpeed={setSpeed} speed={speed}/>} />
      <Route path="/register" element={<RegisterForm />} />
      <Route path="/SignIn" element={<SignIn setLoggedIn={setLoggedIn}/>} />
      <Route path="/Scores" element={<Scores loggedIn={loggedIn} />} />
    </Routes>
    </>
  );
}

export default App;
