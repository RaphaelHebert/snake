export const LOGIN = "LOGIN"
export const LOGOUT = "LOGOUT"

export const login = () => {
    let token = localStorage.getItem("token")
    if(token){
        return{
            type: LOGIN,
            payload: true
        }
    } else {
        return{
            type: LOGIN,
            payload: false
        }
    }
    
}

export const logout = () => {
    localStorage.removeItem('token');
    return{
        type: LOGOUT,
        payload: ''
    }
}