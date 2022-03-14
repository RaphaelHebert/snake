import { useNavigate} from 'react-router-dom'

import SnakeForm from "../SnakeForm"

const Option = ({setSpeed, speed}) => {
    const nav = useNavigate()

    const handleChange = e => {
        setSpeed(parseInt(e.target.value))
    }

    return(
        <>
        <SnakeForm handleChange={handleChange} speed={speed}/>
        <button onClick={() => nav("/")}> play </button>
        </>

    )
}

export default Option
