
const handleSubmit = e => {
    e.preventDefault()
}

const SnakeForm = ({handleChange, speed, play, clickPlay}) => {
    return(
        <form className="flexColCenter" onSubmit={handleSubmit}>
            <span>Speed :</span>
                <fieldset id="speed" onChange={handleChange} disabled={play}>
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
export default SnakeForm;