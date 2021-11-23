   // Import stylesheets
import './style.css';
// Using npm i installed Tone.JS
// https://tonejs.github.io/ heres the link to the documentation
import * as Tone from 'tone';

// Write Javascript code!
const appDiv = document.getElementById('app');

// This is the scale for the notes that will be played with the synth, the letters in array represent notes
const GMajorScale = ['G', 'A', 'B', 'C', 'D', 'E', 'F#'];


// In order for music to sound good, once the scale has been defined, there are up to 7 octaves in a key in which the notes should align with the same octave or else they will sound out of sync. 

// "addOctaveNumbers" takes in a scale which is an array of notes, and an octave number, before using Array.map to spit out an array with the note & octave number
// example: [G,A.B], octaveNumber = 3 -> [G3,A3,B3]

// The code first retrieves the first note in an octave which is always "C" or "C#", then, updates the octave number based on where the notes in the scale are from the first note. Octave stays the same if note in the scale is after the first note, and octave declines when the note in the scale is before the first note.
// example: 

const addOctaveNumbers = (scale, octaveNumber) =>
  scale.map((note) => {
    const firstOctaveNoteIndex = scale.indexOf(
      'C' !== -1 ? scale.indexOf('C') : scale.indexOf('C#')
    );
    const noteOctaveNumber =
      scale.indexOf(note) < firstOctaveNoteIndex
        ? octaveNumber - 1
        : octaveNumber;
    return `${note}${noteOctaveNumber}`;
  });

const constructMajorChord = (scale, octave, rootNote) => {
  const scaleWithOctave = addOctaveNumbers(scale, octave);

  const getNextChordNote = (note, nextNoteNumber) => {
    const nextNoteInScaleIndex =
      scaleWithOctave.indexOf(note) + nextNoteNumber - 1;
    let nextNote;
    if (typeof scaleWithOctave[nextNoteInScaleIndex] !== 'undefined') {
      nextNote = scaleWithOctave[nextNoteInScaleIndex];
    } else {
      nextNote = scaleWithOctave[nextNoteInScaleIndex - 7];
      const updatedOctave = parseInt(nextNote.slice(1)) + 1;
      nextNote = `${nextNote.slice(0, 1)}${updatedOctave}`;
    }

    return nextNote;
  };

  const thirdNote = getNextChordNote(rootNote, 3);
  const fifthNote = getNextChordNote(rootNote, 5);
  const chord = [rootNote, thirdNote, fifthNote];

  return chord;
};

Tone.Transport.bpm.value = 120;

// this is where i start coding the synth functionality
const IChord = constructMajorChord(GMajorScale, 4, 'G4');

const IVChord = constructMajorChord(GMajorScale, 4, 'C4');

const VChord = constructMajorChord(GMajorScale, 4, 'D4');


// This is where developer creates a synth instrument with a few customizations using Tone.js filter class and properties found here: https://tonejs.github.io/docs/14.7.77/index.html

const synth = new Tone.PolySynth({
  oscillator: {
    type: 'sine',
  },
  envelope: {
    attack: '0.05'
  }
});
synth.toDestination();

const mainChords = [
  { time: 0, note: IChord, duration: '2n.' },
  { time: '0:3', note: VChord, duration: '4n' },
  { time: '1:0', note: IVChord, duration: '2n.' },
  { time: '1:3', note: VChord, duration: '4n' },
  { time: '2:0', note: IChord, duration: '2n.' },
  { time: '2:3', note: VChord, duration: '4n' },
  { time: '3:0', note: IVChord, duration: '2n' },
  { time: '3:2', note: VChord, duration: '4n' },
  { time: '3:3', note: IChord, duration: '4n' },
  { time: '4:0', note: VChord, duration: '2n.' },
  { time: '4:3', note: IVChord, duration: '4n' },
  { time: '5:0', note: VChord, duration: '2n.' },
  { time: '5:3', note: IChord, duration: '4n' },
  { time: '6:0', note: VChord, duration: '2n.' },
  { time: '6:3', note: IVChord, duration: '4n' },
  { time: '7:0', note: VChord, duration: '2n' },
  { time: '7:2', note: IChord, duration: '4n' },
  { time: '7:3', note: VChord, duration: '4n' },
];

const playSynthPart = (synthClicked) => {
  const synthPart = new Tone.Part((time, note) => {
    synth.triggerAttackRelease(note.note, note.duration, time);
  }, mainChords)
  if (synthClicked) {
    synthPart.start(0);
    console.log(synthClicked);
    Tone.Transport.start();
  } else if (!synthClicked) {
    console.log(synthClicked)
    Tone.Transport.stop()
    synthPart.start(0)
    Tone.Transport.start()
  }
};

let synthClicked = false;

document.getElementById('synth').addEventListener('click', () => {
  console.log('synth');
  synthClicked = !synthClicked;
  playSynthPart(synthClicked);
});


// This is where developer creates a kick instrument with a few customizations using Tone.js filter class and properties found here: https://tonejs.github.io/docs/14.7.77/index.html

const kickLowPass = new Tone.Filter({
  frequency: 3000,
});

const kick = new Tone.MembraneSynth({
  envelope: {
    sustain: '0',
  },
}).connect(kickLowPass);
kick.toDestination();

const kickPattern = [
  { time: '0:0' },
  { time: '0:3:2' },
  { time: '1:1' },
  { time: '2:0' },
  { time: '2:1:2' },
  { time: '2:3:2' },
  { time: '3:0:2' },
  { time: '3:1:' },
  { time: '4:0' },
  { time: '4:3:2' },
  { time: '5:1' },
  { time: '6:0' },
  { time: '6:1:2' },
  { time: '6:3:2' },
  { time: '7:0:2' },
  { time: '7:1:' },
];
 
const playKickPart = (kickClicked) => {
  const kickPart = new Tone.Part((time) => {
    kick.triggerAttackRelease('C1', time);
  }, kickPattern)
  if (kickClicked) {
    kickPart.start(0);
    console.log(kickClicked);
    Tone.Transport.start();
  } else if (!kickClicked) {
    console.log(!kickClicked)
    Tone.Transport.stop()
    kickPart.start(0)
    Tone.Transport.start()
  }
};

let kickClicked = false;

document.getElementById('kick').addEventListener('click', () => {
  console.log('kick');
  kickClicked = !kickClicked;
  playKickPart(kickClicked);
});


const snareLowPass = new Tone.Filter({
  frequency: 8000,
});

const snare = new Tone.NoiseSynth({
  noise: {
    type: 'white',
  },
  envelope: {
    attack: 0.01,
    decay: 0.1,
    sustain: 0,
  },
}).connect(snareLowPass);
snare.toDestination();

const snarePattern = [
  { time: '0:1' },
  { time: '1:2' },
  { time: '2:3' },
  { time: '3:4' },
  { time: '4:5' },
  { time: '5:6' },
  { time: '6:7' },
  { time: '7:8' },
];



const playSnarePart = (snareClicked) => {
  const snarePart = new Tone.Part((time) => {
    snare.triggerAttackRelease('8n', time);
  }, snarePattern)
  if (snareClicked) {
    snarePart.start(0);
    console.log(snareClicked);
    Tone.Transport.start();
  } else if (!snareClicked) {
    console.log(!snareClicked)
    Tone.Transport.stop()
    snarePart.start(0)
    Tone.Transport.start()
  }
};

let snareClicked = false;

document.getElementById('snare').addEventListener('click', () => {
  console.log('snare');
  snareClicked = !snareClicked;
  playSnarePart(snareClicked);
});

const bass = new Tone.MonoSynth({
  oscillator: {
    type: 'triangle',
  },
  envelope: {
    attack: 0.05,
  },
}).toDestination();

const bassline = [
  { time: 0, note: 'A0', duration: '2n' },
  { time: '0:1', note: 'F0', duration: '2n.' },
  { time: '1:2', note: 'D0', duration: '2n.' },
  { time: '2:3', note: 'F0', duration: '1:1' },
  { time: '3:4', note: 'F0', duration: '1:1' },
  { time: '4:5', note: 'F0', duration: '1:1' },
  { time: '5:6', note: 'F0', duration: '1:1' },
  { time: '6:7', note: 'F0', duration: '1:1' },
];

const playBassPart = (bassClicked )=> {
  const bassPart = new Tone.Part((time) => {
    bass.triggerAttackRelease('C1', '8n', time)
  }, bassline)
  if (bassClicked) {
    bassPart.start(0)
    Tone.Transport.start();
    console.log(bassClicked);
  }else if (!bassClicked) {
    console.log(!bassClicked);
    Tone.Transport.stop();
    bassPart.start(0)
    Tone.Transport.start();
  }
}

let bassClicked = 0;

document.getElementById('808').addEventListener('click', () => {
  console.log('808');
  bassClicked = !bassClicked;
  playBassPart(bassClicked);
});


const hihat = new Tone.MetalSynth({
  frequency: 200,
  envelope: {
    attack: 0.008,
    decay: 0.052,
    release: 0.002
  },
  harmonicity: 5.1,
  modulationIndex: 32,
  resonance: 3000,
  octaves: 1.5
}).toDestination();

const hihatPattern = [
  {time: '0:1'},
  {time: '0:2'},
  {time: '0:3'},
  {time: '0:5'},
  {time: '0:6'},
  {time: '0:7'},
  {time: '0:9'},
  {time: '1:0'},
];

const playHihatPart = (hihatClicked) => {
  const hihatPart = new Tone.Part((time) => {
    hihat.triggerAttackRelease('C1', time);
  }, hihatPattern)
  if (hihatClicked) {
    hihatPart.start(0);
    console.log(hihatClicked);
    Tone.Transport.start();
  } else if (!hihatClicked) {
    console.log(!hihatClicked)
    Tone.Transport.stop()
    hihatPart.start(0)
    Tone.Transport.start()
  }
};

let hihatClicked = false;

document.getElementById('Hi-Hat').addEventListener('click', () => {
  console.log('Hi-Hst');
  hihatClicked = !hihatClicked;
  playHihatPart(hihatClicked);
});
