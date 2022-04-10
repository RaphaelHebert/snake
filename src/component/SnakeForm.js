import { connect } from "react-redux";
import { setSpeed } from "../actions/snakeActions"

const handleSubmit = e => {
    e.preventDefault()
}

const SnakeForm = ({ speed, play, setSpeed }) => {

    console.log(speed, play, setSpeed)
    
    return(
        <form className="flexColCenter" onSubmit={handleSubmit}>
            <span>Speed :</span>
                <fieldset id="speed" onChange={e => setSpeed(e.target.value)} disabled={play}>
                    <label > Hard
                        <input type="radio" value="50" name="speed" checked={speed===50}/>
                    </label>
                    <label> Medium
                        <input type="radio" value="200" name="speed" checked={speed===200}/>
                    </label>
                    <label> Easy
                        <input type="radio" value="400" name="speed" checked={speed===400}/>
                    </label>
                </fieldset>
        </form>
    )
}

const MapStateToProps = state => {
    return {
        play: state.play,
        speed: state.speed
    }
}
export default connect(MapStateToProps, { setSpeed })(SnakeForm);