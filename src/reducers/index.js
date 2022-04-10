import { combineReducers } from "redux";

import { snakeReducer } from "./snakeReducer"
import { authReducer } from "./authReducer"


export default combineReducers({
    snake: snakeReducer,
    auth: authReducer,
})