import { useNavigate, useLocation } from "react-router-dom";
import { connect } from "react-redux"

import { login, logout } from '../../actions/authActions'

const Navbar = ({ loggedIn, logout }) => {
    const nav = useNavigate()

    const { pathname } = useLocation()

    return(
        <div className="flexRowNoWrap navbar">
            <div className="flexRowNoWrap subNavBar">
            {pathname !== "/"?
                <button className="startButton" onClick={()=> nav('/')}>Home</button>:
                <>
                    <button className="startButton" onClick={()=> nav('./Option')}>Options</button>
                    <button className="startButton" onClick={()=> nav('./Scores')}>Scores</button>
                </>
            }
            </div>
            {loggedIn? 
                <button className="startButton" onClick={() => logout()}>Logout</button>:
                <button className="startButton" onClick={()=> nav('./SignIn')}>Login</button> 
            }
        </div>
    )
}

const mapStateToProps = state => {
    return {
        loggedIn: state.loggedIn
    }
}
export default connect(mapStateToProps,  { login, logout })(Navbar);