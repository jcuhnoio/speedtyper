import { useEffect, useState } from "react";
import wordSet from "./WordSet";

const PlayGame = ({ onChangeScore }) => {
    const [dataTyping, setDataTyping] = useState([]);
    const [textTyping, setTextTyping] = useState({
        value: "",
        position: 0,
    });
    useEffect(() => {
        const addWord = (wordCount = 150) => {
            const wordList = wordSet;
            const dataTypingTest = [];
            for (let i = 0; i < wordCount; i++) {
                const position = Math.floor(Math.random() * wordList.length);
                dataTypingTest.push({
                    value: wordList[position],
                    status: null,
                });
            }
            setDataTyping(dataTypingTest);
        };
        if (dataTyping.length === 0) {
            addWord();
        }
    }, []);

    const handleChangeTyping = (e) => {
        const valueInput = e.target.value;
        if (!valueInput.includes(" ")) {
            setTextTyping({
                ...textTyping,
                value: valueInput
            });
        } else if (textTyping.value !== "") {
            checkResult();
        }
    };

    const checkResult = () => {
        const dataCheck = dataTyping;
        const wordCheck = dataCheck[textTyping.position].value;
        if (textTyping.value === wordCheck) {
            dataCheck[textTyping.position].status = true;
        } else {
            dataCheck[textTyping.position].status = false;
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
                                <letter key={charIndex}>{char}</letter>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
            <div className="inputForm">
                <input type="text" value={textTyping.value} 
                onChange={handleChangeTyping}/>
            </div>
        </div>
    );
};

export default PlayGame;
