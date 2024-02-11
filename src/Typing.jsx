import React from "react";
import { useState, useEffect, useRef } from "react";
import { topWords, basicWords } from "./words";
import { useDispatch, useSelector } from 'react-redux';
import { updateWordsCorrect } from './action';

const TypingTest = () => {
  const [wordNo, setWordNo] = useState(0);
  // const [wordsSubmitted, setWordsSubmitted] = useState(0);
  // const [wordsCorrect, setWordsCorrect] = useState(0);
  const [timer, setTimer] = useState(30);
  const [timeFlag, setTimeflag] = useState(0);
  const [flag, setFlag] = useState(0);
  const [disable, setDisable] = useState(0);
  const [difficulty, setDifficulty] = useState(0);
  const [testWords, setTestWords] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [intervalId, setIntervalId] = useState(null);
  const [correctFlag, setCorrectFlag] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [wpmvalue, setWpmvalue] = useState(0);
 
  const dispatch = useDispatch();
  const wordsCorrect = useSelector((state) => state.typing.wordsCorrect);

  const inputRef = useRef(null);

  useEffect(() => {
    displayTest(difficulty);
    console.log(topWords.length,basicWords.length);
    // console.log(wordsCorrect+1,"wordsCorrect");
  }, [difficulty]);

  useEffect(() => {
    if (completed) {
      const time = timeFlag === 0 ? 30 : 60;
      const wpm = Math.round((wordsCorrect / time) * 60);
      setWpmvalue(wpm);
    }
  }, [completed, wordsCorrect, timeFlag]);

  useEffect(() => {
    function getCookie(name) {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop().split(';').shift();
    }

    var viewMode = getCookie("view-mode");
    var viewport = document.querySelector("meta[name=viewport]");

    if(viewMode === "desktop"){ 
      viewport.setAttribute('content', 'width=1024'); 
    } else if (viewMode === "mobile"){ 
      viewport.setAttribute('content', 'width=device-width,initial-scale=1.0,maximum-scale=1.0,user-scalable=no'); 
    }
  }, []);


  
  

  const displayTest = (diff) => {
    setTestWords(randomWords(diff));
  };

  const randomWords = (diff) => {
    if (diff === 0) {
      return Array(40)
        .fill()
        .map(() => basicWords[Math.floor(Math.random() * basicWords.length)]);
    } else {
      return Array(40)
        .fill()
        .map(() => topWords[Math.floor(Math.random() * topWords.length)]);
    }
  };

  const onInputChange = (event) => {
    if (flag === 0) {
      setFlag(1);
      setDisable(1);
      startTimer();
      
    }
    const value = event.target.value;
    setInputValue(event.target.value);
    if (/\s/g.test(value)) {
      checkWord(value);
    }
  };

  const checkWord = (value) => {
    const wordEntered = value.trim();
    if (wordEntered === testWords[wordNo]) {
      setWordNo(wordNo + 1);
      dispatch(updateWordsCorrect(wordsCorrect + 1));
      
      // setWordsSubmitted(wordsSubmitted + 1);
      setCorrectFlag(0);
    } else {
      setCorrectFlag(1);
    }

    setInputValue("");
  };

  const startTimer = () => {
    const id = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 0) {
          stopTimer();
          clearInterval(id);
          return 0;
        } else {
          
          return prev - 1;
          
        }
      });
    }, 1000);
    setIntervalId(id);
  };

  const stopTimer = () => {
    // setWordsSubmitted(0);
    displayScore();
    setDisable(0);
    
    setInputValue("");
   
  };
  const displayScore = () => {
    setCompleted(true);
    const time = timeFlag === 0 ? 30 : 60;
   
    
    setWpmvalue( Math.round((wordsCorrect / time) * 60));
    // dispatch(updateWordsCorrect(0));
  };
  


  const restart = () => {
    dispatch(updateWordsCorrect(0));
    displayTest(difficulty);
    setWordNo(0);
    setCorrectFlag(0);
    timeFlag === 0 ? setTimer(30) : setTimer(60);
    setFlag(0);
    setCompleted(false);
  };

  return (
    <div className="container mx-auto px-6 py-8 min-h-screen min-w-screen bg-black text-gray-400">
      <h1 className="text-4xl font-mono text-yellow-400 text-left w-2/4 mx-auto mt-5">
        Typing Speed Test
      </h1>
      <div className="flex justify-end space-x-4 mt-4 flex-col items-end w-2/4 mx-auto">
        <div className="gap-2">
          <button
            onClick={() => {
              setTimeflag(0);
              setTimer(30);
            }}
            className={`${
              timeFlag === 0 ? "text-yellow-400" : "text-white"
            } m-1 hover:text-yellow-400 ${completed ? "hidden" : ""}`}
            disabled={disable}
          >
            30s
          </button>
          <button
            onClick={() => {
              setTimeflag(1);
              setTimer(60);
            }}
            className={`${
              timeFlag === 1 ? "text-yellow-400" : "text-white"
            } m-1 hover:text-yellow-400 ${completed ? "hidden" : ""} `}
            disabled={disable}
          >
            60s
          </button>
        </div>
        <div>
          <button
            onClick={() => {
              setDifficulty(0);
            }}
            className={`${
              difficulty === 0 ? "text-yellow-400" : "text-white"
            } m-1 hover:text-yellow-400 ${completed ? "hidden" : ""}`}
            disabled={disable}
          >
            beginner
          </button>
          <button
            onClick={() => {
              setDifficulty(1);
            }}
            className={`${
              difficulty === 1 ? "text-yellow-400" : "text-white"
            } m-1 hover:text-yellow-400 ${completed ? "hidden" : ""}`}
            disabled={disable}
          >
            pro
          </button>
        </div>
      </div>

      <div
        className={`flex justify-center space-x-4 mt-4 gap-4  ${completed ? "hidden" : ""}`}
      >
        <div className="flex  items-start gap-1">
          <div className="text-yellow-400 mt-3 ">Time</div>
          <div className="text-8xl ">{timer}</div>
        </div>
        <div className="flex  items-start gap-1">
          <div className="text-yellow-400 mt-3 ">CW</div>
          <div className="text-8xl ">{wordsCorrect}</div>
        </div>
      </div>

      <div className={`flex  items-start justify-center my-10 gap-1 mx-auto ${!completed ? "hidden" : ""}`}>
        <div className="text-yellow-400 mt-3 ">WPM</div>
        <div className="text-8xl ">{wpmvalue}</div>
      </div>

      <div
        id="textDisplay"
        className="mt-8 p-5 w-2/4 mx-auto text-left text-2xl"
      >
        {testWords.map((word, index) => (
          <span
            key={index}
            className={
              wordNo === index
                ? correctFlag === 1
                  ? "text-red-400"
                  : "text-white"
                : wordNo > index
                ? "text-green-400"
                : "text-gray-400"
            }
          >
            {word}{" "}
          </span>
        ))}
      </div>

      <div className="flex justify-center mt-10">
    <textarea
        rows="1"
        className="text-input bg-gray-800 border-2 border-gray-400 rounded p-2 text-center text-white"
        id="textInput"
        autoFocus
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        spellCheck="false"
        ref={inputRef}
        value={inputValue}
        onChange={onInputChange}
        disabled={completed}
        style={{ width: '300px', height: '50px', resize: 'none' }}
    ></textarea>
</div>

      <div className="flex justify-center mt-4">
        <a id="restartBtn" className="text-white" href="#">
          <i className="fas fa-redo"></i>
        </a>
      </div>
      <button
        className="text-yellow-400"
        disabled={disable}
        onClick={() => {
          restart();
        }}
      >
        restart
      </button>


      <div className=" flex justify-center items-end min-h-20"><footer className="text-yellow-400 ">©2021 <a  href="https://github.com/omkar-107/typingspeedtest.git">Omkar Salunkhe</a></footer></div>
    </div>
  );
};

export default TypingTest;
