import React, { Component } from 'react';
import './App.css';
import ResultList from './Components/Results/ResultList.js';
import ReactPlayer from 'react-player';

class Body extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      playedSeconds: 0,
      timeStamp: 0,
      playerReady: false,
      hasSeeked: false
    };
  }

  playerRef = player => {
    this.player = player
  }

  componentDidMount() {
    const query = new URLSearchParams(this.props.location.search);
    const id = query.get("id");

    if (id === null) {
      throw new Error("Id Cannot be null");
    }
    this.setState({ id });
    const timeStamp = query.get("t");
    if (timeStamp !== null) {
      this.setState({ timeStamp });
    }

    fetch(`https://d2vmuhnaso62pi.cloudfront.net/${id}/results.json`)
      .then(response => response.json())
      .then(data => this.setState({ data }));
  }

  handleOnReady = player => {
    if (this.state.hasSeeked) {
      return;
    }
    if (this.state.playerReady) {
      this.setState({ hasSeeked: true });
      player.seekTo(this.state.timeStamp, 'seconds');
    }
    this.setState({ playerReady: true });
  }

  handleProgress = state => {
    this.setState(state)
  }

  render() {
    const config = {
      xhrSetup: function (xhr, url) {
        xhr.setRequestHeader('Access-Control-Allow-Origin', '*');
      }
    };
    const { playedSeconds } = this.state
    return (
      <div className='app-body'>
        <div className='results-pane'>
          <ResultList
            listItems={this.state.data}
            isItemSelected={(startTime, endTime) => playedSeconds >= startTime && playedSeconds < endTime}
            onItemClick={(time) => this.player.seekTo(time, 'seconds')}
          />
        </div>
        <div className='player-pane'>
          <ReactPlayer
            width='90%'
            height='100%'
            ref={this.playerRef}
            onReady={this.handleOnReady}
            controls={true}
            config={{
              file: {
                hlsOptions: config
              }
            }}
            onProgress={this.handleProgress}
            url={`https://d2vmuhnaso62pi.cloudfront.net/${this.state.id}/hls/${this.state.id}.m3u8`}
          />
        </div>
      </div>
    );
  }
}

export default Body;
