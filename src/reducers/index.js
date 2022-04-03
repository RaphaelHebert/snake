import { RELOAD } from '../actions'
import { CHANGE_APPLE } from '../actions'
import { CHANGE_DIRECTION } from '../actions'
import { PLAY } from '../actions'


const initialState = {
    head: [48, 48],
    play: false,
    body: [],
    direction: 'ArrowRight',
    apple: [0,0]
}

export const snakeReducer = (state=initialState, action) => {
    const { type, payload } = action 

    console.log(`SNAKEREDUCER: \n\tpayload: ${payload}, type: ${type}`)

    switch(type){
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
            const play = !(state.body.filter(bodyPart => bodyPart === head).length > 0)

            return {
                ...state,
                body: body,
                head: [head[0], head[1]],
                play: play
            }
            // play && loose()
        
        case CHANGE_APPLE:
            
            console.log(CHANGE_APPLE)

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
            console.log(PLAY)
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