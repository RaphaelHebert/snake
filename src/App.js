import { useEffect, useState } from 'react'

import './App.css';

import Snake from './component/snake'
import ScoreBar from './component/ScoreBar';
import Lost from './component/Lost'


function App() {
  const [apple, setApple] = useState([0,0])
  const [score, setScore] = useState(-1)
  const [lost, setLost] = useState(false)

  const loose = () => {
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

  useEffect(() => applePos(), [])

  return (
    <div className="window" >
      {lost && <Lost score={score}/>}
      <ScoreBar score={score >= 0? score: 0} />
      <Snake apple={apple} applePos={applePos} score={score >= 0? score: 0} loose={loose} lost={lost}/>
    </div>
  );
}

export default App;
