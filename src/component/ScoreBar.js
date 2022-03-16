import '../App.css'

const ScoreBar = ({ score }) => {
    return(
        <div className="scoreBar">
            <p>Score: {score}</p>
        </div>
    )
}

export default ScoreBar;
