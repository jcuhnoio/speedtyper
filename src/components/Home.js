import React from 'react';

const Home = ({ onGame }) => {
  return (
    <div className="home">
      <div className="title">speedtyper</div>
      <div className="about">a game where you type as fast as possible</div>
      <button className="playBtn" onClick={() => onGame("playGame")}>
        Play Game
      </button>
    </div>
  );
};

export default Home;
