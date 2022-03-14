import { useNavigate } from "react-router-dom";

const Navbar = ({ loggedIn }) => {
    const nav = useNavigate()

    return(
        <div className="navbar">
            <div className="subNavBar">
                <button className="startButton" onClick={()=> nav('./Option')}>Options</button>
                <button className="startButton" onClick={()=> nav('./Scores')}>Scores</button>
            </div>
            {!loggedIn && <button className="startButton" onClick={()=> nav('./SignIn')}>Login</button>}
        </div>
    )
}

export default Navbar;