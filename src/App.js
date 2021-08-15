import './App.css';
import React, { useState } from 'react';


class App extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="help">
          Pick 1 or more numbers that sum 
          to the number of stars
        </div>
        <div className="body">
          <div className="stars">
            <div className="star" />
            <div className="star" />
            <div className="star" />
            <div className="star" />
            <div className="star" />
            <div className="star" />
            <div className="star" />
            <div className="star" />
            <div className="star" />
          </div>
          <div className="play-numbers">
            <button className="number">1</button>
            <button className="number">2</button>
            <button className="number">3</button>
            <button className="number">4</button>
            <button className="number">5</button>
            <button className="number">6</button>
            <button className="number">7</button>
            <button className="number">8</button>
            <button className="number">9</button>
          </div>
        </div>
      </div>
    );
  }
}


export default App;
