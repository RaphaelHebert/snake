import { useNavigate} from 'react-router-dom'

import SnakeForm from "../SnakeForm"

const Option = ({setSpeed, speed}) => {
    const nav = useNavigate()

    const handleChange = e => {
        setSpeed(parseInt(e.target.value))
    }

    return(
        <div className="flexColCenter tableBox">
            <SnakeForm handleChange={handleChange} speed={speed}/>
        </div>

    )
}

export default Option
