import logo from "./logo.svg";
import React from 'react';
import "./App.css";
import Home from "./components/Home";
import PlayGame from "./components/PlayGame";
import EndGame from "./components/EndGame";
import { useEffect, useState } from "react";



function App() {

    const [statusGame, setStatusGame] = useState(null);
    const [score, setScore] = useState(null);

    useEffect(() => {
        if (statusGame === "playGame") {
            setScore({
                correct: 0,
                incorrect: 0,
            });
        }
    }, [statusGame]);

    const handleChangeStatusGame = (status) => {
        setStatusGame(status);
    };

    const handleChangeScore = (type) => {
        if (type === "correct") {
            setScore({
                ...score,
                correct: score.correct + 1,
            });
        } else {
            setScore({
                ...score,
                incorrect: score.incorrect + 1,
            });
        }
    };

    let layout;
    switch (statusGame) {
        case "playGame":
            layout = <PlayGame onChangeScore={handleChangeScore} onChangeStatusGame={handleChangeStatusGame} />;
            console.log(score);
            break;
        case "endGame":
            layout = <EndGame score={score} onGame={handleChangeStatusGame} />;
            break;
        default:
            layout = <Home onGame={handleChangeStatusGame} />;
            break;
    }

    return <div className="App">{layout}</div>;
}

export default App;
