import { useEffect, useState } from 'react'
import { Routes, Route } from 'react-router-dom'

import { axiosWithAuth } from './auth/axiosAuth.js';

import Snake from './component/snake'
import Lost from './component/Lost'
import RegisterForm from './component/RegisterForm';
import SignIn from './component/SignIn';
import Navbar from './component/Navbar';
import Option from './component/Option'

import './App.css';


function App() {
  const [apple, setApple] = useState([0,0])
  const [score, setScore] = useState(-1)
  const [lost, setLost] = useState(false)
  const [loggedIn, setLoggedIN] = useState(false)
  const [speed, setSpeed] = useState(200)

  const loose = () => {
    //const finalScore = {userId: id, score: score}
    setLost(true)
    // etc
    //get the user id
    //axiosWithAuth().put(`endpoint/path/here/${id}`, finalScore).then(data => /* do something with the data */);
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

  useEffect(() => applePos(), [])

  return (
    <>
    <Routes>
      <Route path="/" element={
        <>
          <Navbar loggedIn={loggedIn}/>
          {lost && <Lost score={score}/>}
          <Snake apple={apple} applePos={applePos} score={score >= 0? score: 0} loose={loose} lost={lost} score={score} speed={speed}/>
        </>
      }/>
        <Route path="/Option" element={<Option setSpeed={setSpeed} speed={speed}/>} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/SignIn" element={<SignIn />} />
    </Routes>
    </>
  );
}

export default App;
