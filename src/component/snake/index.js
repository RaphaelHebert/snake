import { useEffect, useState } from "react";
import { connect } from "react-redux";

import ScoreBar from '../ScoreBar'
import '../../App.css'

import { reload, changeApple, changeDirection, setPlay, scoreUp, lost } from "../../actions/snakeActions"

const Snake = ({ head, play, body, direction, apple, loose, score, speed, lost, reload, changeApple, changeDirection, setPlay, scoreUp}) => {
    
    const [nextDirection, setNextDirection] = useState("ArrowRight")

    console.log(`from state: ${head} ${play} ${body} ${direction} ${apple}`)

    useEffect(() => {
        changeApple()
    }, [])

    useEffect(() => {
        if(play){
            console.log("timing....")
            changeDirection(nextDirection)
            if (apple[0] === head[0] && apple[1] === head[1]){
                changeApple()
                scoreUp()
            }
            let timer = setTimeout(() => {
                reload()
            }, speed);
            return () => clearTimeout(timer);
        } 
    }, [head])
    
   
    return(
        <div className='flexRowNoWrap main' onKeyDown={e => {e.preventDefault(); setNextDirection(e.key)}} tabIndex="0">
            <div className="flexColNoWrap center sideDiv">
                <h1>The Snake</h1>
                <p>Press <span>Play !</span> to start playing and use the <span>arrow keys</span> on your keyboard to change the snake's direction.</p>
                <div className="flexRowNoWrap main">
                    <div className={play? "startDiv startButton disabled": "startDiv startButton"} onClick={() => setPlay()} disabled={play}>Play !</div>
                    <button className="resetButton" onClick={() => window.location.reload()}>Reset</button>
                </div>
                <ScoreBar score={score >= 0? score: 0} />
            </div>
            <div className='container'>
                <div className='screen'>
                    <div className="gameElement apple" style={{top: apple[0] + "%", left: apple[1] + "%" }} />
                    <div className="gameElement head" style={{top: head[0] + "%", left: head[1] + "%"}}/>
                    { body.length > 0 && body.map(bodyPart => 
                            <div className="gameElement bodyPart" style={{top: bodyPart[0] + "%", left: bodyPart[1]  + "%"}}/>
                    )}
                </div>
            </div>
        </div>
    )
}


const mapStateToProps = state => {
    return {
        head: state.snake.head,
        play: state.snake.play,
        body: state.snake.body,
        direction: state.snake.direction, 
        apple: state.snake.apple,
        score: state.snake.score,
        speed: state.snake.speed,
    }
}
export default connect(mapStateToProps, { reload, changeApple, changeDirection, setPlay, scoreUp, lost })(Snake);