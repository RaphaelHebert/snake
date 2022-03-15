const Lost = ({ score }) => {
    
    const handleClick = () => {
        window.location.reload();
    }   

    return (
        <div className="lost flexColCenter">
            <p>G A M E  O V E R ! !</p>
            <p>your score: {score}</p>
            <button onClick={handleClick}> Play Again</button>
        </div>
    )
}

export default Lost;