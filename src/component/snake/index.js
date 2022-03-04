import { useState, useEffect } from 'react'
import '../../App.css'

const Snake = ({ apple, applePos, loose }) => {
    const [head, setHead] = useState([48, 48]) //top, left
    const [play, setPlay] = useState(false)
    const [body, setBody] = useState([])
    const [direction, setDirection] = useState('ArrowRight') //setup for starts and checks snake does go in unauthorized direction

    const appleTop = apple[0] + '%'
    const appleLeft = apple[1] +  '%'

    const headTop = head[0] + '%'
    const headLeft = head[1] + '%'

   

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
            }
        }
        if(["ArrowUp", "ArrowLeft", "ArrowRight", "ArrowDown"].includes(e.key)){
            window.localStorage.setItem("snakeRunner", JSON.stringify({'direction': e.key}))
        } else if(e.key === "Enter"){
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
        }, 200)
    }, [head])

    return(
        <>
        <div className='main' onKeyDown={handleKeyDown} tabIndex="0">
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
        </>
    )
}

export default Snake