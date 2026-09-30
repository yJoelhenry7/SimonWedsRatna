// ─────────────────────────────────────────────────────────────
//  Wedding facts: date, links, photos.
//  All visible TEXT (names, venues, verses, captions…) lives in
//  src/locales/en.js and src/locales/te.js — edit both languages there.
//  Photos: drop files into /public/photos with the names below.
// ─────────────────────────────────────────────────────────────

// Google Maps searches for each venue — swap for exact pins (maps.app.goo.gl links) if you have them
const mapSearch = (q) => 'https://maps.google.com/?q=' + encodeURIComponent(q)
const CHURCH = 'Srungara Lutheran Devalayam, Srungavruksham, West Godavari, Andhra Pradesh'
const RECEPTION_HALL = "St. Peter's Lutheran Convention Hall, Gunipudi, Bhimavaram, Andhra Pradesh"

export const wedding = {
  // `first` gives the English initials for the S & R monogram in every language.
  // Portraits cross-fade in the Groom & Bride arch frames; `focus` keeps the face in view.
  groom: {
    first: 'Simon',
    photos: [
      { src: '/photos/groom-2.jpg', focus: '50% 28%' },
      { src: '/photos/groom-1.jpg', focus: '50% 36%' },
    ],
  },
  bride: {
    first: 'Ratna',
    photos: [
      { src: '/photos/bride-2.jpg', focus: '50% 30%' },
      { src: '/photos/bride-1.jpg', focus: '50% 36%' },
    ],
  },

  // Wedding date & time (ISO format, with timezone) — drives the countdown, date labels and calendar invite
  date: '2026-10-20T10:30:00+05:30',
  timeZone: 'Asia/Kolkata',
  hashtag: '#SimonWedsRatna',

  // Calendar invite ("Add to Calendar" button)
  calendar: {
    durationHours: 3.5,
    location: CHURCH,
  },

  // Event ids match the text in the locale files (events.<id>.title etc.).
  // date shows on each card and goes into the calendar invite; hours = length in the invite.
  events: [
    { id: 'matrimony', date: '2026-10-20T10:30:00+05:30', hours: 2.5, location: CHURCH, map: mapSearch(CHURCH) },
    { id: 'luncheon', date: '2026-10-20T13:00:00+05:30', hours: 1.5, location: CHURCH, map: mapSearch(CHURCH) },
    { id: 'reception', date: '2026-10-21T10:00:00+05:30', hours: 3, location: RECEPTION_HALL, map: mapSearch(RECEPTION_HALL) },
  ],

  // Memories section (hanging frames) — set to true to show it again, with its menu link
  showGallery: false,

  // Captions are in the locale files (gallery.captions), in the same order
  gallery: ['/photos/1.jpg', '/photos/2.jpg', '/photos/3.jpg', '/photos/4.jpg', '/photos/5.jpg', '/photos/6.jpg', '/photos/7.jpg', '/photos/8.jpg', '/photos/9.jpg'],

  // Background music starts when guests open the church doors (toggle bottom-right).
  // Leave `music` empty to play the built-in synthesized "Amazing Grace",
  // or drop an audio file in /public/music and set e.g. music: '/music/hymn.mp3'
  music: '',
  musicTitle: 'Amazing Grace',

  // RSVP button opens this Google Form
  rsvpUrl: 'https://forms.gle/hoPuse91TSNSH4fT6',
}
