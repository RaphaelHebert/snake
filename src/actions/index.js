//action types
export const RELOAD = "RELOAD"
export const CHANGE_APPLE = "CHANGE_APPLE"
export const CHANGE_DIRECTION = "CHANGE_DIRECTION"
export const PLAY = "PLAY"


//actions creators

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