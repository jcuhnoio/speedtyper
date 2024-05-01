const EndGame = ({score, onGame}) => {
  console.log(score)
  
  return (
    <div className="endGame">
      <div className="result">
        <div className="WPM">
          <div className="title">
            WPM
          </div>
          <div className="number">
            {Number(((score.correct+score.incorrect)*2).toFixed(1))}
          </div>
        </div>
        <div className="accuracy">
          <div className="title">
            Accuracy
          </div>
          <div className="number">
            {Number((score.correct/(score.incorrect+score.correct)*100).toFixed(2))}%
          </div>
        </div>
        <div className="playBtn" onClick={() => onGame("playGame")}>Replay</div>
      </div>
    </div>
  );
};

export default EndGame;
