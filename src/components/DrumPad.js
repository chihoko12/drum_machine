import React, { Component } from 'react';

const activeStyle = {
  backgroundColor: 'orange',
  boxShadow: '0 3px orange',
  height: 77,
  marginTop: 13
};

const inactiveStyle = {
  backgroundColor: 'grey',
  marginTop: 10,
  boxShadow: '3px 3px 5px black'
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
      ? this.state.padStyle.backgroundColor === 'orange'
        ? this.setState({ padStyle: inactiveStyle })
        : this.setState({ padStyle: activeStyle })
      : this.state.padStyle.marginTop === 13
        ? this.setState({ padStyle: inactiveStyle })
        : this.setState({
          padStyle: {
            height: 77,
            marginTop: 13,
            backgroundColor: 'grey',
            boxShadow: '0 3px grey'
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
