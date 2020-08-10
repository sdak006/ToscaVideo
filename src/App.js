import React, { Component } from 'react'
import './App.css';
import ReactPlayer from 'react-player'
import Data from './data.json'

class App extends Component {
  ref = player => {
    this.player = player
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
                  <div
                    key={index}
                    onClick={
                      () => {
                        console.log(Math.floor(parseFloat(d.TimeStamp / 1000)));
                        this.player.seekTo(Math.floor(parseFloat(d.TimeStamp / 1000)), 'seconds')
                      }
                    }
                    style={{ borderWidth: 5, borderColor: 'white', margin: '5px' }}>
                    {d.Name}
                  </div>)
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
            url='https://toscavideo-output.s3-us-west-1.amazonaws.com/2cb5c76c-a76e-4aa8-8367-1bef9ef47b36.m3u8'
          />
        </header>
      </div>
    );
  }
}

export default App;
