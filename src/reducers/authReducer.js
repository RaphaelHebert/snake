import { LOGIN } from "../actions/authActions"
import { LOGOUT } from "../actions/authActions"


const initialState = {
    loggedIn: false
}

export const authReducer = (state=initialState, action) => {
    const { type, payload } = action

    switch(type){
        case LOGIN: 
            return {
                ...state,
                loggedIn: payload
            }
        case LOGOUT:
            return {
                ...state,
                loggedIn: false
            }
        default:
            return state
    }

    

}