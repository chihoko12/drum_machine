import React, { Component } from 'react';

const activeStyle = {
  backgroundColor: '#666',
  borderRadius: 10,
  padding: 20,
  textAlign: 'center',
  boxShadow: 'inset 5px 5px 10px #1b1b1b, inset - 5px -5px 10px #3d3d3d'
};

const inactiveStyle = {
  backgroundColor: '#444',
  borderRadius: 10,
  padding: 20,
  fontSize: 30,
  textAlign: 'center',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  boxShadow: '5px 5px 10px #1b1b1b, -5px - 5px 10px #3d3d3d'
};

class DrumPad extends Component {
  constructor(props) {
    super(props);
    this.state = {
      padStyle: inactiveStyle
    };
    this.playSound = this.playSound.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.activatePad = this.activatePad.bind(this);
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyPress);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyPress);
  }

  handleKeyPress(e) {
    if (e.keyCode === this.props.keyCode) {
      this.playSound();
    }
  }

  activatePad() {
    this.props.power
      ? this.state.padStyle.backgroundColor === '#666'
        ? this.setState({ padStyle: inactiveStyle })
        : this.setState({ padStyle: activeStyle })
      : this.state.padStyle.backgroundColor === '#444'
        ? this.setState({ padStyle: inactiveStyle })
        : this.setState({
          padStyle: {
            backgroundColor: '#444',
            boxShadow: '5px 5px 10px #1b1b1b, -5px - 5px 10px #3d3d3d'
          }
        });
  }

  playSound() {
    const audio = document.getElementById(this.props.keyTrigger);
    const audioPromise = audio.play();

    if (audioPromise !== undefined) {
      audio.currentTime = 0;
      audio.play();
      this.activatePad();
      setTimeout(() => this.activatePad(), 100);
      this.props.updateDisplay(this.props.clipId.replace(/-/g, ' '));
    }
  }

  render() {
    return (
      <div
        className="drum-pad"
        id={this.props.clipId}
        onClick={this.playSound}
        style={this.state.padStyle}
      >
        <audio
          className="clip"
          id={this.props.keyTrigger}
          src={this.props.clip}
        ></audio>
        {this.props.keyTrigger}
      </div>
    );
  }
}

export default DrumPad;
