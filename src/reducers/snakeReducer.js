import { axiosWithAuth } from '../auth/axiosAuth.js';
import API_URL from '../config.js';

import { RELOAD } from '../actions/snakeActions'
import { CHANGE_APPLE } from '../actions/snakeActions'
import { CHANGE_DIRECTION } from '../actions/snakeActions'
import { PLAY } from '../actions/snakeActions'
import { SCORE } from '../actions/snakeActions'
import { SPEED } from '../actions/snakeActions'
import { LOST } from '../actions/snakeActions'


const initialState = {
    head: [48, 48],
    play: false,
    lost: false,
    body: [],
    direction: 'ArrowRight',
    apple: [0,0],
    score: 0,
    speed: 200,
}

export const snakeReducer = (state=initialState, action) => {
    const { type, payload } = action 
    
    switch(type){
        case LOST:
            return {
                ...state,
                lost: !state.lost
            }

        case SPEED:
            return {
                ...state,
                speed: payload - 0
            }

        case SCORE:
            return {
                ...state,
                score: state.score + payload
            }

        case RELOAD:
            let head;
            let body;
            //change the position of the head
            switch(state.direction){
                case "ArrowRight":
                    head = [state.head[0], (state.head[1] + 2) % 100]
                    break
                case "ArrowLeft":
                    head = [state.head[0], (100 + (state.head[1] - 2)) % 100]
                    break
                case "ArrowDown":
                    head = [(state.head[0] + 2) % 100, state.head[1]]
                    break
                case "ArrowUp":
                    head = [(100 + (state.head[0] - 2)) % 100, state.head[1]]
                    break
                default:
                    head = state.head
            }

            //if the head eats the apple or not
            if( head[0] === state.apple[0] && head[1] === state.apple[1] ){
                body = [state.head, ...state.body]
            } else {
                if( state.body.length > 0 ){
                    body = state.body.slice(0, state.body.length - 1)
                    body.unshift([state.head[0], state.head[1]])
                } else {
                    body = [...state.body]
                }
                
            }

            //check if the head touches the body
            let play = true
            if(state.body.filter(bodyPart => bodyPart[0] === head[0] &&  bodyPart[1] === head[1]).length > 0){
                play = false;
                const payload = {score: state.score, gameId: 1}
                axiosWithAuth().post(API_URL + "scores", payload)
                    .then(res => {
                    console.log(`score ${state.score} saved!`)
                    })
                    .catch(err => 
                    console.log(`An error occurred: \n ${err.message}`)
                    ) 
            }

            return {
                ...state,
                body: body,
                head: [head[0], head[1]],
                play: play,
                lost: !play
            }
            // play && loose()
        
        case CHANGE_APPLE:
            
            let appleTop = Math.floor( Math.random() * 100 );
            appleTop = appleTop - (appleTop % 2);
            let appleLeft = Math.floor( Math.random() * 100 );
            appleLeft = appleLeft - (appleLeft % 2);
            
            return {
                ...state,
                apple: [appleTop, appleLeft],
            }             

        case CHANGE_DIRECTION:
            let newDirection = state.direction
            if(payload !== state.direction){
                const bodyLength = state.body.length > 0
                switch(payload){
                    case "ArrowRight":
                        newDirection = (state.direction === "ArrowLeft" && bodyLength)?
                            state.direction:
                            "ArrowRight";
                            break
                    case "ArrowLeft":
                        newDirection = (state.direction === "ArrowRight" && bodyLength)?
                            state.direction:
                            "ArrowLeft";
                            break
                    case "ArrowDown":
                        newDirection = (state.direction === "ArrowUp" && bodyLength)?
                            state.direction:
                            "ArrowDown";
                            break
                    case "ArrowUp":
                        newDirection = (state.direction === "ArrowDown" && bodyLength)?
                            state.direction:
                            "ArrowUp"
                            break
                    default:
                        newDirection = state.direction
                }
                    
            } 
            return {
                ...state,
                direction: newDirection
            }
        
        case PLAY:
            if(!state.play){
                return {
                    ...state,
                    play: !state.play,
                    head: [state.head[0], state.head[1] + 2]
            }} else {
                return state
            }

        default:
            return state
    }
}