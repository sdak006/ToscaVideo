import React from 'react';
import './App.css';
import ReactPlayer from 'react-player'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <ReactPlayer url='https://toscavideo.s3.us-east-2.amazonaws.com/outputtest.m3u8'/>
      </header>
    </div>
  );
}

export default App;
