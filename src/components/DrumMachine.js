import React, { Component } from 'react';
import PadBank from './PadBank';
import { bankOne, bankTwo } from '../data/banks';
import '../styles.css';

class DrumMachine extends Component {
  constructor(props) {
    super(props);
    this.state = {
      power: true,
      display: String.fromCharCode(160),
      currentPadBank: bankOne,
      currentPadBankId: 'Heater Kit',
      sliderVal: 0.3
    };
    this.displayClipName = this.displayClipName.bind(this);
    this.selectBank = this.selectBank.bind(this);
    this.adjustVolume = this.adjustVolume.bind(this);
    this.powerControl = this.powerControl.bind(this);
    this.clearDisplay = this.clearDisplay.bind(this);
  }

  powerControl() {
    this.setState({
      power: !this.state.power,
      display: String.fromCharCode(160)
    });
  }

  selectBank() {
    if (this.state.power) {
      this.state.currentPadBankId === 'Heater Kit'
        ? this.setState({
          currentPadBank: bankTwo,
          display: 'Smooth Piano Kit',
          currentPadBankId: 'Smooth Piano Kit'
        })
        : this.setState({
          currentPadBank: bankOne,
          display: 'Heater Kit',
          currentPadBankId: 'Heater Kit'
        });
    }
  }

  displayClipName(name) {
    if (this.state.power) {
      this.setState({
        display: name
      });
    }
  }

  adjustVolume(e) {
    if (this.state.power) {
      this.setState({
        sliderVal: e.target.value,
        display: 'Volume: ' + Math.round(e.target.value * 100)
      });
      setTimeout(() => this.clearDisplay(), 1000);
    }
  }

  clearDisplay() {
    this.setState({
      display: String.fromCharCode(160)
    });
  }

  render() {
    const powerSlider = this.state.power
      ? { float: 'right' }
      : { float: 'left' };
    const bankSlider =
      this.state.currentPadBank === bankOne
        ? { float: 'left' }
        : { float: 'right' };
    const clips = [].slice.call(document.getElementsByClassName('clip'));
    clips.forEach((sound) => {
      sound.volume = this.state.sliderVal;
    });

    return (
      <>
        <PadBank
          clipVolume={this.state.sliderVal}
          currentPadBank={this.state.currentPadBank}
          power={this.state.power}
          updateDisplay={this.displayClipName}
        />
        <div className="logo">
          <div className="inner-logo">FCC&nbsp;</div>
          <i className="inner-logo fa fa-free-code-camp"></i>
        </div>
        <div className="controls-container">
          <div className="control">
            <p>Power</p>
            <div className="select" onClick={this.powerControl}>
              <div className="inner" style={powerSlider}></div>
            </div>
          </div>
          <p id="display">{this.state.display}</p>
          <div className="volume-slider">
            <input
              max="1"
              min="0"
              onChange={this.adjustVolume}
              step="0.01"
              type="range"
              value={this.state.sliderVal}
            />
          </div>
          <div className="control">
            <p>Bank</p>
            <div className="select" onClick={this.selectBank}>
              <div className="inner" style={bankSlider}></div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default DrumMachine;
