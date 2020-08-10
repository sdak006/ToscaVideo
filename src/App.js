import React, { Component } from 'react'
import './App.css';
import ReactPlayer from 'react-player'
import Data from './data.json'

class App extends Component {

  state = {
    duration: 0,
    playedSeconds: 0
  }


  ref = player => {
    this.player = player
  }

  handleProgress = state => {
    console.log('onProgress', state)
    // We only want to update time slider if we are not currently seeking
    if (!this.state.seeking) {
      this.setState(state)
    }
  }

  handleDuration = (duration) => {
    console.log('onDuration', duration)
    this.setState({ duration })
  }

  render() {
    const config = {
      xhrSetup: function (xhr, url) {
        xhr.setRequestHeader('Access-Control-Allow-Origin', '*');
      }
    };
    return (
      <div className="App">
        <header className="App-header">
          <div>
            {
              Data.map(
                (d, index) =>
                {
                  var startTime=Math.floor(parseFloat(d.TimeStamp / 1000));
                  var endTime=Math.floor(parseFloat(d.EndTime / 1000));
                  return(
                  <div
                    key={index}
                    onClick={
                      () => {
                        console.log(startTime);
                        this.player.seekTo(startTime, 'seconds')
                      }
                    }
                    style={{
                      backgroundColor: this.state.playedSeconds >= startTime && this.state.playedSeconds < endTime ? 'red':'#282c34',
                      margin: '5px'
                    }}>
                    {d.Name}
                  </div>
                  )
                })
            }
          </div>
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
            url='https://toscavideo-output.s3-us-west-1.amazonaws.com/2cb5c76c-a76e-4aa8-8367-1bef9ef47b36.m3u8'
          />
        </header>
      </div>
    );
  }
}

export default App;
