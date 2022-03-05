import { useState, useEffect } from 'react'


import ScoreBar from '../ScoreBar'
import SnakeForm from '../SnakeForm'
import '../../App.css'



const Snake = ({ apple, applePos, loose, score }) => {
    const [head, setHead] = useState([48, 48]) //top, left
    const [play, setPlay] = useState(false)
    const [body, setBody] = useState([])
    const [direction, setDirection] = useState('ArrowRight') //setup for starts and checks snake does go in unauthorized direction
    const [speed, setSpeed] = useState(200)

    const appleTop = apple[0] + '%'
    const appleLeft = apple[1] +  '%'

    const headTop = head[0] + '%'
    const headLeft = head[1] + '%'

    //handle options form
    const handleChange = e => {
        setSpeed(parseInt(e.target.value))
    }

    const headPos = (direction) => {
        switch(direction){
          case "ArrowRight":
            setHead([head[0], (head[1] + 2) % 100])
            break
          case "ArrowLeft":
            setHead([head[0], (100 + (head[1] - 2)) % 100])
            break
          case "ArrowDown":
            setHead([ (head[0] + 2) % 100, head[1]])
            break
          case "ArrowUp":
            setHead([(100 + (head[0] - 2)) % 100, head[1]]);
            break
          default:
            break;
        }
    }
    
    const handleKeyDown = e => {
        e.preventDefault();
        if(body.length > 0){
            switch(e.key){
                case "ArrowUp":
                    if(direction === "ArrowDown" || direction === "ArrowUp"){
                        return
                    } 
                    break;
                case "ArrowDown":
                    if(direction === "ArrowUp" || direction === "ArrowDown"){
                        return
                    }
                    break;
                case "ArrowRight":
                    if(direction === "ArrowLeft" || direction === "ArrowRight"){
                        return
                    }
                    break;
                case "ArrowLeft":
                    if(direction === "ArrowLeft" || direction === "ArrowRight"){
                        return
                    }
                    break;
                default:
                    break;
            }
        }
        if(["ArrowUp", "ArrowLeft", "ArrowRight", "ArrowDown"].includes(e.key)){
            window.localStorage.setItem("snakeRunner", JSON.stringify({'direction': e.key}))
        }
        // else if(e.key === "Enter"){
        //     if(!play){
        //         setPlay(!play);
        //         setHead([head[0], head[1]])
        //     }
        // }
    }

    const clickPlay = () => {
        if(!play){
            setPlay(!play);
            setHead([head[0], head[1]])
        }
    }

    useEffect(() => {
        const bodySearch = 'o' + body.join('o').toString() + 'o'
        console.log(bodySearch)
        const headCheck = "o" + [head[0] + '%', head[1] + '%'].toString() + "o"
        console.log(headCheck)
        if(bodySearch.includes(headCheck)){
            setPlay(false)
            loose();
        }
        setTimeout(() => {
            const storage = window.localStorage.getItem("snakeRunner")
            const newDirection = JSON.parse(storage)
            if(play && ["ArrowUp", "ArrowLeft", "ArrowRight", "ArrowDown"].includes(newDirection.direction)){
                if(head[0] === apple[0] && head[1] === apple[1]){
                    setBody([[headTop, headLeft], ...body])
                    applePos()
                } else {
                    if(body.length > 0){
                        const newBody = body.slice(0, body.length - 1)
                        newBody.unshift([headTop, headLeft])
                        setBody(newBody)
                    }
                }
                setDirection(newDirection.direction);
                headPos(newDirection.direction);
            }   
        }, speed)
    }, [head])

    return(
        <div className='main' onKeyDown={handleKeyDown} tabIndex="0">
            <div className="flexColCenter sideDiv">
                <h1>The Snake</h1>
                <p>This is the snake, you know the rules...</p>
                <p>Press <b>Play !</b> to start playing and use the <b>arrow keys</b> on your keyboard to change the snake's direction.</p>
                <SnakeForm handleChange={handleChange} speed={speed} play={play} clickPlay={clickPlay}/>
                <ScoreBar score={score >= 0? score: 0} />
            </div>
            <div className='container'>
                <div className='screen'>
                    <div className="apple" style={{top: appleTop, left: appleLeft }} />
                    <div className="head" style={{top: headTop, left: headLeft }}/>
                    { body.length > 0 && body.map(bodyPart => 
                            <div className="bodyPart" style={{top: bodyPart[0], left: bodyPart[1] }}/>

                    )}
                </div>
            </div>
        </div>
    )
}

export default Snake;