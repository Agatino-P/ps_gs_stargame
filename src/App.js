import './App.css';
import React, { useState } from 'react';


function NumberButton(props)
{
  const handleClick = ()=>console.log('Num',props.number );
  return(
    <button className="number" onClick={handleClick}> 
      {props.number}
    </button>
  )  
}

function StarsDisplay(props){
  return(
    utils.range(1,props.numStars).map(starId => 
      <div key={starId} className="star"/>
    )
  );
}

function ButtonsDisplay(props){
  return(
    utils.range(1,9).map(number=>
      <NumberButton key={number} number={number}/>
    )
  );
}

const App = () => {
  const [stars,setStars] = useState( utils.random(1,9) );
  return (
    <div className="game">
      <div className="help">
        Pick 1 or more numbers that sum to the number of stars
      </div>
      <div className="body">
        <div className="left">
          <StarsDisplay numStars={stars}/>
        </div>
        <div className="right">
          <ButtonsDisplay/>
        </div>
      </div>
      <div className="timer">Time Remaining: 10</div>
    </div>
  );
};


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
