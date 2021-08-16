import './App.css';
import React, { useEffect, useState } from 'react';


function PlayNumber(props)
{
  const handleClick = ()=>{
    props.onClick(props.number,props.status);
  }
  return(
    <button 
        className ="number" 
       style={{backgroundColor: colors[props.status]}}
      onClick={handleClick}
    > 
      {props.number}
    </button>
  )  
}

const PlayAgain= (props) => {
  return(
    <div className = "game-done">

      <div 
        className = "message"
        style={{
          color: (props.gameStatus==='won' ? 'green' : 'red') 
        }}
      > 
        {props.gameStatus === 'won' ?
          <p>Won!</p> :
          <p>Lost!</p>
        }
      </div>

      <button
        onClick={props.onClick}
        className="game-done">
        Play Again
      </button>

  </div>
  );
}

function StarsDisplay(props){
  return(
    utils.range(1,props.numStars).map(starId => 
      <div key={starId} className="star"/>
    )
  );
}


const Game = (props) => {
  const [stars,setStars] = useState( utils.random(1,9) );
  const [availableNums,setAvailableNums] = useState (utils.range(1,9));
  const [candidateNums,setCandidateNums] = useState ([]);
  const [secondsLeft,setSecondsLeft] = useState(10);
  
   useEffect( () =>{
    if (secondsLeft>0 && gameStatus === 'active')
    {
      const timerId = setTimeout( ()=> {setSecondsLeft(secondsLeft-1)} ,1000);
      return () => clearTimeout(timerId); 
    };
  });

  const candidatesAreWrong = utils.sum(candidateNums) > stars;
  const gameStatus = availableNums.length === 0 ? 'won':
    (secondsLeft === 0 ? 'lost' :  'active');
  
  const numberStatus = (number) =>{
    if (!availableNums.includes(number)) return 'used';
    if (candidateNums.includes(number))
      return (candidatesAreWrong ? 'wrong' : 'candidate');
    return 'available'
  }

  const onNumberClick = (number,currentStatus) =>
  {
    if (currentStatus === 'used' || gameStatus !== 'active') return;
    const newCandidateNums =
      (currentStatus === 'candidate') ?
      candidateNums.filter(n=>n!==number) :
      candidateNums.concat(number)
    

    const sumCandidates = utils.sum(newCandidateNums);
    if (sumCandidates!== stars ) 
    {
      setCandidateNums(newCandidateNums);
    }
    else 
    {
        const newAvailableNums=availableNums.filter(n=> !newCandidateNums.includes(n));
        setStars(utils.randomSumIn(newAvailableNums,9)) 
        setAvailableNums(newAvailableNums)
        setCandidateNums([]);
    }
  }
  
  return (
    <div className="game">
      <div className="help">
        Pick 1 or more numbers that sum to the number of stars
      </div>
      <div className="body">
        <div className="left">
          {
            gameStatus !== 'active'?
            (<PlayAgain onClick={props.resetCB} gameStatus={gameStatus}/>) :
            (<StarsDisplay numStars={stars}/>)

          }
        </div>
        <div className="right">
          {
            utils.range(1,9).map(number=>
              <PlayNumber 
                key={number}
                number={number}
                status={numberStatus(number)}
                onClick={onNumberClick}
                />
            )
          }
        </div>
      </div>
      <div className="timer">Time Remaining: {secondsLeft}</div>
    </div>
  );
};

const App = () =>
{
  const [gameId,setGameId] = useState(1);
  const resetCB = () => setGameId(gameId === 1? 2 :1)

  return(
    <Game key={gameId}  resetCB = {resetCB}/>
  );
}

// Color Theme
const colors = {
  available: 'lightgray',
  used: 'lightgreen',
  wrong: 'lightcoral',
  candidate: 'deepskyblue',
};

// Math science
const utils = {
  // Sum an array
  sum: arr => arr.reduce((acc, curr) => acc + curr, 0),

  // create an array of numbers between min and max (edges included)
  range: (min, max) => Array.from({ length: max - min + 1 }, (_, i) => min + i),

  // pick a random number between min and max (edges included)
  random: (min, max) => min + Math.floor(Math.random() * (max - min + 1)),

  // Given an array of numbers and a max...
  // Pick a random sum (< max) from the set of all available sums in arr
  randomSumIn: (arr, max) => {
    const sets = [[]];
    const sums = [];
    for (let i = 0; i < arr.length; i++) {
      for (let j = 0, len = sets.length; j < len; j++) {
        const candidateSet = sets[j].concat(arr[i]);
        const candidateSum = utils.sum(candidateSet);
        if (candidateSum <= max) {
          sets.push(candidateSet);
          sums.push(candidateSum);
        }
      }
    }
    return sums[utils.random(0, sums.length - 1)];
  },
};

export default App;
