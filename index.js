// Import stylesheets
import './style.css';
import * as Tone from 'tone';

// Write Javascript code!
const appDiv = document.getElementById('app');


const synth = new Tone.DuoSynth({
  oscillator: {
    type: 'sine',
  },
});
synth.toDestination();

document.getElementById('synth').addEventListener('click', function () {
  const now = Tone.now();
  synth.triggerAttackRelease('C4', '8n', now);
});


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


document.getElementById('kick').addEventListener('click', function () {
  const kickPart = new Tone.Part((time) => {
    console.log(time);
    kick.triggerAttackRelease('C1', '16n', time)
  }, kickPattern).start(0);
  Tone.Transport.start();
});


const snare = new Tone.NoiseSynth({
  noise: {
    type: 'white',
  },
  envelope: {
    attack: 0.005,
    decay: 0.1,
    sustain: 0,
  },
});
snare.toDestination();

const snarePattern = [
  { time: 0 },
  { time: '1:1' },
  { time: '2:2' },
  { time: '3:3' },
  { time: '4:4' },
  { time: '5:5' },
  { time: '6:6' },
  { time: '7:7' },
]

document.getElementById('snare').addEventListener('click', function () {
  const snarePart = new Tone.Part((time) => {
    console.log(time);
    snare.triggerAttackRelease('32n', time);
  }, snarePattern).start(0);
  Tone.Transport.start();
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
  {'time': 0, 'note': 'A0', 'duration': '2n'},
  {'time': '0:3', 'note': 'F0', 'duration': '2n.'},
  {'time': '1:3', 'note': 'D0', 'duration': '2n.'},
  {'time': '2:3', 'note': 'F0', 'duration': '1:1'},
  {'time': '3:4', 'note': 'F0', 'duration': '1:1'},
  {'time': '4:5', 'note': 'F0', 'duration': '1:1'},
  {'time': '5:6', 'note': 'F0', 'duration': '1:1'},
  {'time': '6:7', 'note': 'F0', 'duration': '1:1'},
];

document.getElementById('808').addEventListener('click', function () {
  const bassPart = new Tone.Part((time)=> {
    bass.triggerAttackRelease('C1', '8n', time);
}, bassline).start(0);
Tone.Transport.start();
  });

