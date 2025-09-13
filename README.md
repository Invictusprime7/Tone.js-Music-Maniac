# Tone.js Music Maniac Portfolio

A comprehensive music synthesis portfolio showcasing interactive audio programming with Tone.js. This project demonstrates various synthesis techniques, pattern sequencing, and Web Audio API capabilities through an elegant, educational interface.

## 🎵 Live Demo

Experience the interactive music synthesizers by visiting the live portfolio site. Click different instrument buttons to hear:
- **Synth**: Dual oscillator synthesizer with sine waves
- **Kick**: Membrane synthesizer with low-pass filtering
- **Snare**: White noise synthesis with rapid envelope decay
- **808**: Triangle wave bass synthesizer emulating classic drum machine sounds

## 🎯 Features

### Audio Synthesis
- **Multiple Synthesizer Types**: DuoSynth, MembraneSynth, NoiseSynth, MonoSynth
- **Audio Effects**: Low-pass filtering for realistic drum processing
- **Pattern Sequencing**: Complex rhythmic patterns using Tone.js transport notation
- **Real-time Audio**: Instant response to user interactions with precise timing

### Educational Value
- **Comprehensive Documentation**: Every function and concept explained with JSDoc comments
- **Code Examples**: Practical implementations of different synthesis techniques
- **Audio Theory**: Explanations of envelope shaping, oscillator types, and filtering
- **Best Practices**: Modern JavaScript patterns and Web Audio API usage

### Portfolio Presentation
- **Professional UI**: Clean, modern interface with responsive design
- **Interactive Demo**: Live audio examples that visitors can trigger
- **Technical Details**: Detailed breakdown of implementation approaches
- **Code Documentation**: In-depth explanations for educational purposes

## 🛠 Technical Implementation

### Architecture Overview

```
├── Audio Context (Web Audio API)
├── Tone.js Framework (v14.8.26)
├── Synthesizers
│   ├── DuoSynth (harmonic content)
│   ├── MembraneSynth (kick drums)
│   ├── NoiseSynth (snare drums)
│   └── MonoSynth (bass sounds)
├── Effects Processing
│   └── Low-pass Filter (kick processing)
└── Pattern Sequencing
    └── Tone.Part (rhythmic patterns)
```

### Synthesizer Breakdown

#### 1. DuoSynth - Harmonic Synthesizer
```javascript
const synth = new Tone.DuoSynth({
  oscillator: { type: 'sine' }
});
```
- Uses dual oscillators for rich harmonic content
- Sine wave configuration for pure, clean tones
- Perfect for melodic elements and chord progressions

#### 2. MembraneSynth - Drum Synthesizer
```javascript
const kick = new Tone.MembraneSynth({
  envelope: { sustain: '0' }
}).connect(kickLowPass);
```
- Simulates membrane instruments like kick drums
- Zero sustain for realistic percussion decay
- Low-pass filtered for authentic drum timbre

#### 3. NoiseSynth - Percussion Synthesizer
```javascript
const snare = new Tone.NoiseSynth({
  noise: { type: 'white' },
  envelope: { attack: 0.005, decay: 0.1, sustain: 0 }
});
```
- White noise generation for realistic snare sounds
- Fast attack and decay for sharp percussion hits
- Envelope shaping for natural sound characteristics

#### 4. MonoSynth - Bass Synthesizer
```javascript
const bass = new Tone.MonoSynth({
  oscillator: { type: 'triangle' },
  envelope: { attack: 0.05 }
});
```
- Triangle wave for classic 808-style bass sounds
- Monophonic operation prevents voice stealing
- Quick attack for punchy bass response

### Pattern Sequencing

The application uses Tone.js transport notation for precise rhythmic programming:

```javascript
const kickPattern = [
  { time: '0:0' },     // Bar:Quarter:Sixteenth
  { time: '0:3:2' },   // Complex syncopated rhythms
  { time: '1:1' },     // Mathematical precision
];
```

**Transport Notation Format:**
- `0:0` = Bar 0, Beat 0 (downbeat)
- `0:3:2` = Bar 0, Beat 3, Sixteenth note 2
- Allows for complex polyrhythmic patterns

## 🚀 Getting Started

### Prerequisites
- Modern web browser with Web Audio API support
- No build tools required - runs directly in browser
- Internet connection for Tone.js CDN (or local installation)

### Installation

1. **Clone the repository:**
```bash
git clone https://github.com/Invictusprime7/Tone.js-Music-Maniac.git
cd Tone.js-Music-Maniac
```

2. **Start a local server:**
```bash
# Using Python
python3 -m http.server 8000

# Using Node.js
npx http-server

# Using PHP
php -S localhost:8000
```

3. **Open in browser:**
Navigate to `http://localhost:8000` to experience the portfolio

### Optional: Install Dependencies Locally

```bash
npm install
```

This will install Tone.js locally for development purposes.

## 📚 Learning Resources

### Understanding the Code

The codebase is extensively documented with JSDoc comments explaining:
- **Audio Theory**: How different synthesis types work
- **Implementation Details**: Why specific parameters were chosen
- **Web Audio Concepts**: How the browser's audio engine operates
- **Best Practices**: Modern JavaScript and audio programming patterns

### Key Concepts Demonstrated

1. **Synthesis Types**
   - Subtractive synthesis (filtering)
   - Additive synthesis (multiple oscillators)
   - Noise synthesis (percussion)

2. **Audio Effects**
   - Low-pass filtering
   - Envelope shaping (ADSR)
   - Signal routing and mixing

3. **Timing and Sequencing**
   - Transport-based scheduling
   - Pattern programming
   - Synchronization techniques

4. **Web Audio API**
   - Audio context management
   - Node-based audio routing
   - Real-time audio processing

## 🎛 Usage Examples

### Triggering Individual Instruments

```javascript
// Trigger synth note
synth.triggerAttackRelease('C4', '8n', Tone.now());

// Start kick pattern
const kickPart = new Tone.Part((time) => {
  kick.triggerAttackRelease('C1', '16n', time);
}, kickPattern).start(0);
Tone.Transport.start();
```

### Creating Custom Patterns

```javascript
// Define new rhythm pattern
const customPattern = [
  { time: '0:0' },
  { time: '0:2' },
  { time: '1:1' },
  { time: '1:3:2' }
];

// Apply to any synthesizer
const customPart = new Tone.Part((time) => {
  synth.triggerAttackRelease('E4', '16n', time);
}, customPattern);
```

## 🔧 Customization

### Adding New Instruments

```javascript
// Create new synthesizer
const newInstrument = new Tone.AMSynth({
  harmonicity: 2,
  oscillator: { type: 'sine' }
}).toDestination();

// Add to interface
document.getElementById('newButton').addEventListener('click', () => {
  newInstrument.triggerAttackRelease('A4', '4n');
});
```

### Modifying Existing Sounds

```javascript
// Customize kick drum
kick.set({
  pitchDecay: 0.08,
  octaves: 4,
  oscillator: { type: 'sine' }
});

// Adjust filter settings
kickLowPass.frequency.value = 2500;
```

## 🌐 Browser Compatibility

- **Chrome**: Full support (recommended)
- **Firefox**: Full support
- **Safari**: Full support (iOS 11+)
- **Edge**: Full support
- **Opera**: Full support

**Note**: Web Audio API requires HTTPS in production environments.

## 📖 Educational Goals

This portfolio serves as:

1. **Learning Tool**: Comprehensive examples of Web Audio programming
2. **Reference Implementation**: Best practices for Tone.js development
3. **Interactive Experience**: Engaging way to understand audio synthesis
4. **Documentation Example**: How to properly document audio code

## 🤝 Contributing

Contributions are welcome! Please consider:

- **Bug Reports**: Issues with audio playback or compatibility
- **Feature Suggestions**: New synthesis techniques or UI improvements
- **Documentation**: Additional explanations or examples
- **Code Quality**: Optimizations or better practices

## 📄 License

This project is open source and available under the MIT License.

## 🙏 Acknowledgments

- **Tone.js**: Powerful Web Audio framework by Yotam Mann
- **Web Audio API**: Browser-native audio processing
- **Community**: Open source audio programming community

---

**Built with ❤️ and lots of ☕ using Tone.js and modern Web Audio API**
