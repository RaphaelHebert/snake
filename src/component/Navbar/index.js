import { useNavigate, useLocation } from "react-router-dom";

const Navbar = ({ loggedIn, setLoggedIn }) => {
    const nav = useNavigate()

    const { pathname } = useLocation()

    const logout = () => {
        localStorage.removeItem('token');
        setLoggedIn(false)
    }

    return(
        <div className="navbar">
            <div className="subNavBar">
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

export default Navbar;