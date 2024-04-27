import { useEffect, useState } from "react";
import wordSet from "./WordSet";

const PlayGame = ({ onChangeScore, onChangeStatusGame }) => {
    const [dataTyping, setDataTyping] = useState([]);
    const [textTyping, setTextTyping] = useState({
        value: "",
        position: 0,
    });

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

    const handleChangeTyping = (e) => {
        const timeOutGame = setTimeout(() => {
            onChangeStatusGame('endGame');
        }, 30000);

        const valueInput = e.target.value;
        if (!valueInput.includes(" ")) {
            setTextTyping({
                ...textTyping,
                value: valueInput
            });
        } else {
            setTextTyping({
                value: "",
                position: textTyping.position + 1
            })
        }
        checkResult(valueInput);

        return () => clearTimeout(timeOutGame);
    };

    const checkResult = (valueInput) => {
        const dataCheck = dataTyping;
        const wordCheck = dataCheck[textTyping.position].value;
        if (valueInput.at(-1) === wordCheck[valueInput.length - 1]) {
            dataCheck[textTyping.position].status.push('correct');
            onChangeScore('correct');
        } else {
            dataCheck[textTyping.position].status.push('incorrect');
            onChangeScore('incorrect');
        }
        setDataTyping(dataCheck);
    };

    return (
        <div className="playing">
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
