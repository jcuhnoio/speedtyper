import React from 'react';
import { useEffect, useState } from "react";
import wordSet from "./WordSet";

const PlayGame = ({ onChangeScore, onChangeStatusGame }) => {
    const [dataTyping, setDataTyping] = useState([]);
    const [textTyping, setTextTyping] = useState({
        value: "",
        position: 0,
    });
    const [seconds, setSeconds] = useState(30);
    const [startTimer, setStartTimer] = useState(false);

    useEffect(() => {
        const addWord = (wordCount = 42) => {
            const wordList = wordSet;
            const dataTypingTest = [];
            for (let i = 0; i < wordCount; i++) {
                const position = Math.floor(Math.random() * wordList.length);
                dataTypingTest.push({
                    value: wordList[position],
                    status: [],
                });
            }
            setDataTyping(dataTypingTest);
        };
        if (dataTyping.length === 0 || textTyping.position >= dataTyping.length) {
            addWord();
            setTextTyping({
                ...textTyping,
                position: 0
            })
        }
    }, [textTyping.position]);

    useEffect(() => {
        if (startTimer) {
            const interval = setInterval(() => {
                if (seconds > 0) {
                    setSeconds(prevSeconds => prevSeconds - 1);
                } else {
                    clearInterval(interval);
                }
            }, 1000);

            return () => clearInterval(interval);
        }
    }, [startTimer, seconds]);

    const handleChangeTyping = (e) => {
        setStartTimer(true);
        const timeOutGame = setTimeout(() => {
            onChangeStatusGame('endGame');
        }, 30000);

        const valueInput = e.target.value;
        if (!valueInput.includes(" ")) {
            setTextTyping({
                ...textTyping,
                value: valueInput
            });
            checkResult(valueInput);
        } else {
            setTextTyping({
                value: "",
                position: textTyping.position + 1
            })
        }
        return () => clearTimeout(timeOutGame);
    };

    const checkResult = (valueInput) => {
        const dataCheck = dataTyping;
        const wordCheck = dataCheck[textTyping.position].value;
        dataCheck[textTyping.position].status = []
        for (let i = 0; i < valueInput.length; i++) {
            if (valueInput.at(i) === wordCheck[i]) {
                dataCheck[textTyping.position].status.push('correct');
            } else {
                dataCheck[textTyping.position].status.push('incorrect');
            }
        }
        if (valueInput.length === wordCheck.length) {
            checkScore(dataCheck, wordCheck)
        }
        setDataTyping(dataCheck);
    };

    const checkScore = (dataCheck, wordCheck) => {
        for (let i = 0; i < wordCheck.length; i++) {
            if (dataCheck[textTyping.position].status[i] === 'correct') {
                onChangeScore('correct')
                console.log('correct')
            }
            else if (dataCheck[textTyping.position].status[i] === 'incorrect') {
                onChangeScore('incorrect')
                console.log('incorrect')
            }
        }
    }

    return (
        <div className="playing">
            <div className="timer">{seconds}</div>
            <div className="wordWrapper">
                <div className="words">
                    {dataTyping.map((word, index) => (
                        <div className="word" key={index}>
                            {word.value.split("").map((char, charIndex) => (
                                <letter className={dataTyping[index].status[charIndex]} key={charIndex}>{char}</letter>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
            <div className="inputForm">
                <input
                    type="text"
                    value={textTyping.value}
                    onChange={handleChangeTyping}
                    autoFocus
                />
            </div>
        </div>
    );
};

export default PlayGame;
