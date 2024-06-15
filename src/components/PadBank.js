import React from 'react';
import DrumPad from './DrumPad';

const PadBank = ({ power, currentPadBank, updateDisplay }) => {
  const padBank = currentPadBank.map((drumObj, i, padBankArr) => {
    return (
      <DrumPad
        clip={padBankArr[i].url}
        clipId={padBankArr[i].id}
        key={padBankArr[i].id}
        keyCode={padBankArr[i].keyCode}
        keyTrigger={padBankArr[i].keyTrigger}
        power={power}
        updateDisplay={updateDisplay}
      />
    );
  });

  return <div className="pad-bank">{padBank}</div>;
};

export default PadBank;
