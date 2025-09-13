/**
 * Tone.js Music Maniac - Interactive Music Synthesis Portfolio
 * 
 * This application demonstrates various synthesis techniques using Tone.js,
 * showcasing different types of synthesizers, audio effects, and pattern sequencing.
 * 
 * @author Tone.js Music Maniac Portfolio
 * @version 1.0.0
 * @requires Tone.js v14.8.26
 */

/**
 * Application root element reference
 * Note: Currently not used but available for future enhancements
 * @type {HTMLElement}
 */
const appDiv = document.getElementById('app');

// ========================= SYNTHESIZER SETUP =========================

/**
 * DuoSynth - A dual-oscillator synthesizer for rich harmonic content
 * 
 * DuoSynth combines two oscillators with different waveforms to create
 * complex timbres. In this setup, we use sine waves for a pure, clean sound.
 * 
 * @type {Tone.DuoSynth}
 */
const synth = new Tone.DuoSynth({
  oscillator: {
    type: 'sine', // Pure sine wave for clean harmonic content
  },
});
synth.toDestination(); // Connect directly to audio output

/**
 * Synth button event handler
 * Triggers a single note (C4) with an eighth note duration
 * 
 * Uses Tone.now() for precise timing in the audio context
 */
document.getElementById('synth').addEventListener('click', function () {
  const now = Tone.now();
  synth.triggerAttackRelease('C4', '8n', now);
});

// ========================= KICK DRUM SETUP =========================

/**
 * Low-pass filter for kick drum processing
 * Removes high frequencies to create a more natural kick drum sound
 * 
 * @type {Tone.Filter}
 */
const kickLowPass = new Tone.Filter({
  frequency: 3000, // Cutoff frequency at 3kHz
});

/**
 * MembraneSynth - Simulates the sound of a membrane drum
 * 
 * This synthesizer is designed to emulate kick drums and other membrane
 * instruments. The envelope is configured for a quick decay to simulate
 * the natural dampening of a drum membrane.
 * 
 * @type {Tone.MembraneSynth}
 */
const kick = new Tone.MembraneSynth({
  envelope: {
    sustain: '0', // No sustain - drum sound decays immediately
  }, 
}).connect(kickLowPass); // Route through low-pass filter
kick.toDestination(); // Connect to audio output

/**
 * Kick drum pattern using Tone.js transport notation
 * 
 * Transport notation format: "bars:quarters:sixteenths"
 * - 0:0 = Beginning of first bar
 * - 0:3:2 = Third beat, second sixteenth note of first bar
 * 
 * This creates a complex kick pattern with syncopated rhythms
 * typical of electronic music.
 * 
 * @type {Array<{time: string}>}
 */
const kickPattern = [
  { time: '0:0' },     // Downbeat
  { time: '0:3:2' },   // Off-beat accent
  { time: '1:1' },     // Second bar, second beat
  { time: '2:0' },     // Third bar downbeat
  { time: '2:1:2' },   // Syncopated hit
  { time: '2:3:2' },   // Another off-beat
  { time: '3:0:2' },   // Slight timing variation
  { time: '3:1:' },    // Note: Missing sixteenth value (defaults to 0)
  { time: '4:0' },     // Pattern continues...
  { time: '4:3:2' },
  { time: '5:1' },
  { time: '6:0' },
  { time: '6:1:2' },
  { time: '6:3:2' },
  { time: '7:0:2' },
  { time: '7:1:' },
];

/**
 * Kick button event handler
 * Creates and starts a new Tone.Part with the kick pattern
 * 
 * Tone.Part is used for scheduling multiple events in sequence.
 * Each event triggers the kick drum at the specified time.
 */
document.getElementById('kick').addEventListener('click', function () {
  const kickPart = new Tone.Part((time) => {
    console.log('Kick triggered at:', time);
    kick.triggerAttackRelease('C1', '16n', time); // Low C note, sixteenth note duration
  }, kickPattern).start(0); // Start immediately when transport starts
  Tone.Transport.start(); // Begin global transport
});

// ========================= SNARE DRUM SETUP =========================

/**
 * NoiseSynth - White noise synthesizer for snare drum sounds
 * 
 * Snare drums are characterized by white noise bursts with quick envelopes.
 * This synthesizer generates white noise and shapes it with an ADSR envelope
 * to create realistic snare drum sounds.
 * 
 * @type {Tone.NoiseSynth}
 */
const snare = new Tone.NoiseSynth({
  noise: {
    type: 'white', // Full spectrum white noise
  },
  envelope: {
    attack: 0.005,  // Very quick attack (5ms)
    decay: 0.1,     // Fast decay (100ms)
    sustain: 0,     // No sustain - pure percussion
  },
});
snare.toDestination(); // Connect to audio output

/**
 * Snare drum pattern with mathematical progression
 * 
 * This pattern demonstrates a different approach to rhythm programming,
 * using incremental timing that creates a rolling snare effect.
 * The pattern accelerates as it progresses.
 * 
 * @type {Array<{time: number|string}>}
 */
const snarePattern = [
  { time: 0 },       // Start immediately
  { time: '1:1' },   // Bar 1, beat 2
  { time: '2:2' },   // Bar 2, beat 3
  { time: '3:3' },   // Bar 3, beat 4
  { time: '4:4' },   // Note: This creates interesting timing
  { time: '5:5' },   // Pattern continues with mathematical progression
  { time: '6:6' },
  { time: '7:7' },
];

/**
 * Snare button event handler
 * Creates a rolling snare pattern using Tone.Part
 * 
 * The pattern uses a mathematical progression that creates
 * an interesting rhythmic acceleration effect.
 */
document.getElementById('snare').addEventListener('click', function () {
  const snarePart = new Tone.Part((time) => {
    console.log('Snare triggered at:', time);
    snare.triggerAttackRelease('32n', time); // Thirty-second note duration
  }, snarePattern).start(0); // Start immediately
  Tone.Transport.start(); // Begin global transport
});

// ========================= 808 BASS SETUP =========================

/**
 * MonoSynth - Single-oscillator synthesizer for bass sounds
 * 
 * The Roland TR-808 is famous for its distinctive bass drum sound,
 * created using triangle wave synthesis. This MonoSynth emulates
 * that classic 808 sound using a triangle wave oscillator.
 * 
 * @type {Tone.MonoSynth}
 */
const bass = new Tone.MonoSynth({
  oscillator: {
    type: 'triangle', // Triangle wave for classic 808 character
  },
  envelope: {
    attack: 0.05, // Slight attack for punch (50ms)
  },
}).toDestination(); // Connect to audio output

/**
 * 808 bass line pattern with note and duration specifications
 * 
 * This pattern demonstrates more complex sequencing with different
 * note pitches and durations. The pattern creates a classic electronic
 * bass line reminiscent of 1980s drum machine programming.
 * 
 * Each object contains:
 * - time: When to trigger the note (transport notation)
 * - note: Which note to play (scientific pitch notation)
 * - duration: How long the note should sustain
 * 
 * @type {Array<{time: string|number, note: string, duration: string}>}
 */
const bassline = [
  {'time': 0, 'note': 'A0', 'duration': '2n'},        // Low A, half note
  {'time': '0:3', 'note': 'F0', 'duration': '2n.'},   // Low F, dotted half
  {'time': '1:3', 'note': 'D0', 'duration': '2n.'},   // Low D, dotted half
  {'time': '2:3', 'note': 'F0', 'duration': '1:1'},   // Low F, whole note + quarter
  {'time': '3:4', 'note': 'F0', 'duration': '1:1'},   // Sustained bass notes
  {'time': '4:5', 'note': 'F0', 'duration': '1:1'},   // Create a drone effect
  {'time': '5:6', 'note': 'F0', 'duration': '1:1'},
  {'time': '6:7', 'note': 'F0', 'duration': '1:1'},
];

/**
 * 808 button event handler
 * Creates a bass line sequence using the MonoSynth
 * 
 * Note: There's a discrepancy in the current implementation - the bassline
 * array contains detailed note and duration information, but the callback
 * function ignores this data and plays a fixed note (C1) with fixed duration (8n).
 * 
 * For a more accurate implementation, the callback should use the pattern data:
 * bass.triggerAttackRelease(note, duration, time);
 */
document.getElementById('808').addEventListener('click', function () {
  const bassPart = new Tone.Part((time, note) => {
    console.log('808 triggered at:', time, 'Note:', note);
    // Current implementation uses fixed values:
    bass.triggerAttackRelease('C1', '8n', time);
    
    // Improved implementation would be:
    // bass.triggerAttackRelease(note.note, note.duration, time);
  }, bassline).start(0); // Start immediately
  Tone.Transport.start(); // Begin global transport
});

// ========================= UTILITY FUNCTIONS =========================

/**
 * Initialize audio context on user interaction
 * 
 * Modern browsers require user interaction before audio can be played.
 * This function ensures the audio context is started when the user
 * first interacts with the page.
 */
function initializeAudio() {
  if (Tone.context.state !== 'running') {
    Tone.context.resume();
  }
}

// Add event listeners to ensure audio context is started
document.addEventListener('click', initializeAudio);
document.addEventListener('keydown', initializeAudio);

/**
 * Debug information about the current Tone.js setup
 * This information is logged to the console for development purposes
 */
console.log('Tone.js Music Maniac Portfolio Loaded');
console.log('Tone.js Version:', Tone.version);
console.log('Audio Context State:', Tone.context.state);
console.log('Sample Rate:', Tone.context.sampleRate);

// ========================= ERROR HANDLING =========================

/**
 * Global error handler for audio-related errors
 * Provides user-friendly feedback when audio issues occur
 */
window.addEventListener('error', function(event) {
  if (event.error && event.error.message.includes('audio')) {
    console.warn('Audio error detected:', event.error.message);
    console.info('Try refreshing the page or checking your audio permissions');
  }
});

/**
 * Handle browser compatibility issues
 * Some browsers may not support all Web Audio API features
 */
if (!window.AudioContext && !window.webkitAudioContext) {
  console.error('Web Audio API not supported in this browser');
  alert('This browser does not support Web Audio API. Please use a modern browser like Chrome, Firefox, or Safari.');
}

