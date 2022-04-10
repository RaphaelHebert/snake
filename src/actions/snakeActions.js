//action types
export const RELOAD = "RELOAD"
export const CHANGE_APPLE = "CHANGE_APPLE"
export const CHANGE_DIRECTION = "CHANGE_DIRECTION"
export const PLAY = "PLAY"
export const SCORE = "SCORE"
export const SPEED = "SPEED"
export const LOST = "LOST"


//actions creators
export const lost = () => {
    return {
        type: LOST,
        payload:''
    }
}

export const setSpeed = millisec => {
    return{
        type: SPEED,
        payload: millisec
    }
    
}

export const scoreUp = () => {
    return {
        type: SCORE,
        payload: 1
    }
}

export const reload = () => {
    return {
        type: RELOAD,
        payload: ""
    }
}

export const changeApple = () => {
    return {
        type: CHANGE_APPLE,
        payload: ""
    }
}

export const changeDirection = ( direction ) => {
    return {
        type: CHANGE_DIRECTION,
        payload: direction
    }
}

export const setPlay = () => {
    return {
        type: PLAY,
        payload: ""
    }
}