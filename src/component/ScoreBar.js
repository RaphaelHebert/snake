import '../App.css'

const ScoreBar = ({ score }) => {
    return(
        <div className="scoreBar flexColCenter">
            <p>Score: <span>{score}</span></p>
        </div>
    )
}

export default ScoreBar;
