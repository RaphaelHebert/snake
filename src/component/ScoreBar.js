import '../App.css'

const ScoreBar = ({ score }) => {
    return(
        <div className="scoreBar flexColCenter">
            <p>Score: {score}</p>
        </div>
    )
}

export default ScoreBar;
