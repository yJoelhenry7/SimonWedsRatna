// Soft background music.
// By default this synthesizes "Amazing Grace" (public domain hymn) with the Web Audio API:
// a celesta-like melody over warm organ pads in a church-hall reverb — no audio file needed.
// To use your own recording instead, set `music` in data.js to e.g. '/music/hymn.mp3'.

const F = {
  C3: 130.81, D3: 146.83, E3: 164.81, F3: 174.61, 'F#3': 185.0, G3: 196.0, A3: 220.0, B3: 246.94,
  C4: 261.63, D4: 293.66, E4: 329.63, 'F#4': 369.99, G4: 392.0, A4: 440.0, B4: 493.88, D5: 587.33,
}

// [note, beats] in 3/4 — first note is the pickup
const MELODY = [
  ['D4', 1],
  ['G4', 2], ['B4', 0.5], ['G4', 0.5], ['B4', 2], ['A4', 1], ['G4', 2], ['E4', 1], ['D4', 2], ['D4', 1],
  ['G4', 2], ['B4', 0.5], ['G4', 0.5], ['B4', 2], ['A4', 1], ['D5', 5], ['B4', 1],
  ['D5', 2], ['B4', 0.5], ['D5', 0.5], ['B4', 2], ['G4', 1], ['D4', 2], ['E4', 1], ['G4', 2], ['E4', 0.5], ['D4', 0.5],
  ['G4', 2], ['B4', 0.5], ['G4', 0.5], ['B4', 2], ['A4', 1], ['G4', 5], [null, 1],
]

const G = ['G3', 'B3', 'D4']
const G7 = ['F3', 'B3', 'D4']
const C = ['C3', 'E3', 'G3', 'C4']
const D = ['D3', 'F#3', 'A3', 'D4']
const D7 = ['D3', 'F#3', 'A3', 'C4']
// one chord per 3-beat bar after the pickup
const CHORDS = [G, G7, C, G, G, G, D, D7, G, G7, C, G, G, D7, G, G]
const BASS = { G: 'G3', G7: 'G3', C: 'C3', D: 'D3', D7: 'D3' }
const BASS_OF = new Map([[G, 'G'], [G7, 'G7'], [C, 'C'], [D, 'D'], [D7, 'D7']])

const BEAT = 60 / 66 // 66 bpm
const LOOP_BEATS = 1 + CHORDS.length * 3 + 3 // pickup + bars + a breath before repeating

function impulse(ctx, seconds) {
  const len = ctx.sampleRate * seconds
  const buf = ctx.createBuffer(2, len, ctx.sampleRate)
  for (let ch = 0; ch < 2; ch++) {
    const data = buf.getChannelData(ch)
    for (let i = 0; i < len; i++) data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, 3.2)
  }
  return buf
}

function createHymn() {
  let ctx, master, dry, timer
  let nextLoop = 0
  let loopCount = 0

  function init() {
    ctx = new (window.AudioContext || window.webkitAudioContext)()
    master = ctx.createGain()
    master.gain.value = 0
    const comp = ctx.createDynamicsCompressor()
    master.connect(comp).connect(ctx.destination)

    const reverb = ctx.createConvolver()
    reverb.buffer = impulse(ctx, 4.5)
    const wet = ctx.createGain()
    wet.gain.value = 0.7
    reverb.connect(wet).connect(master)

    dry = ctx.createGain()
    dry.gain.value = 0.5
    dry.connect(master)
    dry.connect(reverb)

    nextLoop = ctx.currentTime + 0.4
    scheduleLoop()
    timer = setInterval(() => {
      if (ctx.currentTime > nextLoop - 4) scheduleLoop()
    }, 500)
  }

  function bell(freq, t, dur, vol) {
    const env = ctx.createGain()
    env.gain.setValueAtTime(0, t)
    env.gain.linearRampToValueAtTime(vol, t + 0.015)
    env.gain.exponentialRampToValueAtTime(0.0008, t + dur + 2.2)
    env.connect(dry)
    ;[
      [1, 1],
      [2, 0.22],
      [3.01, 0.06],
    ].forEach(([mult, g]) => {
      const o = ctx.createOscillator()
      const og = ctx.createGain()
      o.type = 'sine'
      o.frequency.value = freq * mult
      og.gain.value = g
      o.connect(og).connect(env)
      o.start(t)
      o.stop(t + dur + 2.4)
    })
  }

  function flute(freq, t, dur, vol) {
    const o = ctx.createOscillator()
    o.type = 'triangle'
    o.frequency.value = freq
    const vib = ctx.createOscillator()
    const vibGain = ctx.createGain()
    vib.frequency.value = 5
    vibGain.gain.value = freq * 0.004
    vib.connect(vibGain).connect(o.frequency)
    const env = ctx.createGain()
    env.gain.setValueAtTime(0, t)
    env.gain.linearRampToValueAtTime(vol, t + 0.12)
    env.gain.setValueAtTime(vol, t + dur * 0.8)
    env.gain.linearRampToValueAtTime(0, t + dur + 0.35)
    o.connect(env).connect(dry)
    o.start(t)
    vib.start(t)
    o.stop(t + dur + 0.4)
    vib.stop(t + dur + 0.4)
  }

  function pad(notes, t, dur, vol) {
    const filter = ctx.createBiquadFilter()
    filter.type = 'lowpass'
    filter.frequency.value = 900
    const env = ctx.createGain()
    env.gain.setValueAtTime(0, t)
    env.gain.linearRampToValueAtTime(vol, t + 0.9)
    env.gain.setValueAtTime(vol, t + dur - 0.2)
    env.gain.linearRampToValueAtTime(0, t + dur + 1.2)
    filter.connect(env).connect(dry)
    notes.forEach((n) => {
      ;[-4, 4].forEach((detune) => {
        const o = ctx.createOscillator()
        o.type = 'sine'
        o.frequency.value = F[n]
        o.detune.value = detune
        o.connect(filter)
        o.start(t)
        o.stop(t + dur + 1.3)
      })
    })
  }

  function scheduleLoop() {
    const t0 = nextLoop
    const variation = loopCount % 2 // every other verse: flute leads, bells an octave up
    let beat = 0
    MELODY.forEach(([note, beats]) => {
      if (note) {
        const t = t0 + beat * BEAT
        const dur = beats * BEAT
        if (variation) {
          flute(F[note], t, dur, 0.07)
          bell(F[note] * 2, t, dur, 0.035)
        } else {
          bell(F[note], t, dur, 0.11)
          flute(F[note], t, dur, 0.025)
        }
      }
      beat += beats
    })
    CHORDS.forEach((chord, bar) => {
      const t = t0 + (1 + bar * 3) * BEAT
      pad(chord, t, 3 * BEAT, 0.028)
      pad([BASS[BASS_OF.get(chord)]], t, 3 * BEAT, 0.035)
      // gentle arpeggio on beats 2 & 3
      bell(F[chord[1]], t + BEAT, BEAT, 0.018)
      bell(F[chord[2]], t + 2 * BEAT, BEAT, 0.018)
    })
    nextLoop = t0 + LOOP_BEATS * BEAT
    loopCount++
  }

  return {
    play() {
      if (!ctx) init()
      ctx.resume()
      const now = ctx.currentTime
      master.gain.cancelScheduledValues(now)
      master.gain.setValueAtTime(master.gain.value, now)
      master.gain.linearRampToValueAtTime(0.9, now + 2.5)
    },
    pause() {
      if (!ctx) return
      const now = ctx.currentTime
      master.gain.cancelScheduledValues(now)
      master.gain.setValueAtTime(master.gain.value, now)
      master.gain.linearRampToValueAtTime(0, now + 0.8)
      setTimeout(() => master.gain.value < 0.01 && ctx.suspend(), 900)
    },
    destroy() {
      clearInterval(timer)
      ctx?.close()
    },
  }
}

function createFileMusic(src) {
  const audio = new Audio(src)
  audio.loop = true
  audio.volume = 0
  let fade
  const fadeTo = (target, done) => {
    clearInterval(fade)
    fade = setInterval(() => {
      const next = audio.volume + (target > audio.volume ? 0.05 : -0.05)
      audio.volume = Math.min(1, Math.max(0, next))
      if (Math.abs(audio.volume - target) < 0.05) {
        audio.volume = target
        clearInterval(fade)
        done?.()
      }
    }, 80)
  }
  return {
    play() {
      audio.play().catch(() => {})
      fadeTo(0.7)
    },
    pause() {
      fadeTo(0, () => audio.pause())
    },
    destroy() {
      audio.pause()
    },
  }
}

/** Two soft wooden knocks on the church door (synthesized, no file) */
export function playKnock() {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)()
    const knock = (t) => {
      // body thump
      const o = ctx.createOscillator()
      const g = ctx.createGain()
      o.type = 'sine'
      o.frequency.setValueAtTime(140, t)
      o.frequency.exponentialRampToValueAtTime(55, t + 0.12)
      g.gain.setValueAtTime(0.0001, t)
      g.gain.exponentialRampToValueAtTime(0.55, t + 0.005)
      g.gain.exponentialRampToValueAtTime(0.0001, t + 0.22)
      o.connect(g).connect(ctx.destination)
      o.start(t)
      o.stop(t + 0.25)
      // woody click
      const len = Math.floor(ctx.sampleRate * 0.05)
      const buf = ctx.createBuffer(1, len, ctx.sampleRate)
      const d = buf.getChannelData(0)
      for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, 4)
      const n = ctx.createBufferSource()
      n.buffer = buf
      const f = ctx.createBiquadFilter()
      f.type = 'bandpass'
      f.frequency.value = 900
      f.Q.value = 1.2
      const ng = ctx.createGain()
      ng.gain.value = 0.35
      n.connect(f).connect(ng).connect(ctx.destination)
      n.start(t)
    }
    const now = ctx.currentTime + 0.02
    knock(now)
    knock(now + 0.3)
    setTimeout(() => ctx.close(), 1200)
  } catch {
    // audio unavailable — the visual knock still plays
  }
}

export function createMusic(src) {
  return src ? createFileMusic(src) : createHymn()
}
