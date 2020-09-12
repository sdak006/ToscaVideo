import React, { Component } from 'react'
import './App.css';
import ReactPlayer from 'react-player'
import ResultList from './Components/Results/ResultList.js';


class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      duration: 0,
      playedSeconds: 0
    };
  }

  componentDidMount() {
    fetch('https://d2vmuhnaso62pi.cloudfront.net/19f9123c-9a9f-4f3c-9e62-c9cd7644d9bb/results.json')
      .then(response => response.json())
      .then(data => this.setState({ data }));
  }

  ref = player => {
    this.player = player
  }

  handleProgress = state => {
    console.log('onProgress', state)
    if (!this.state.seeking) {
      this.setState(state)
    }
  }

  handleDuration = (duration) => {
    console.log('onDuration', duration)
    this.setState({ duration })
  }

  render() {
    const { playedSeconds } = this.state
    const config = {
      xhrSetup: function (xhr, url) {
        xhr.setRequestHeader('Access-Control-Allow-Origin', '*');
      }
    };
    return (
      <div className="App">
        <div className="App-header">
          <ResultList
            listItems={this.state.data}
            isItemSelected={(startTime, endTime) => playedSeconds >= startTime && playedSeconds < endTime}
            onItemClick={(time) => this.player.seekTo(time, 'seconds')}
          />
          <ReactPlayer
            ref={this.ref}
            height='600px'
            width='900px'
            controls={true}
            config={{
              file: {
                hlsOptions: config
              }
            }}
            onProgress={this.handleProgress}
            onDuration={this.handleDuration}
            url='https://d2vmuhnaso62pi.cloudfront.net/e1b77d04-54c8-4f2f-ae8e-758e88e27dfa/hls/e1b77d04-54c8-4f2f-ae8e-758e88e27dfa.m3u8'
          />
        </div>
      </div>
    );
  }
}

export default App;
