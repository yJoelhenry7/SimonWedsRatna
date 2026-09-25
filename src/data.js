// ─────────────────────────────────────────────────────────────
//  Edit everything about the wedding here.
//  Photos: drop files into /public/photos with the names below
//  (or change the paths). Missing photos show an elegant placeholder.
// ─────────────────────────────────────────────────────────────

// Google Maps search for the town — swap for exact venue pins once you have them
const VENUE_MAP = 'https://maps.google.com/?q=' + encodeURIComponent('Srungavruksham, West Godavari, Andhra Pradesh')

export const wedding = {
  bride: {
    name: 'Ratna',
    first: 'Ratna',
    parents: 'Beloved daughter of Mr. & Mrs. ______',
    photo: '/photos/bride.jpg',
  },
  groom: {
    name: 'Simon',
    first: 'Simon',
    parents: 'Beloved son of Mr. & Mrs. ______',
    photo: '/photos/groom.jpg',
  },

  // Wedding date & time (ISO format, with timezone) — drives the countdown and all date labels
  date: '2026-10-20T10:30:00+05:30',
  city: 'Srungavruksham, West Godavari',
  hashtag: '#SimonWedsRatna',

  verse: {
    text: 'Love is patient, love is kind. It always protects, always trusts, always hopes, always perseveres. Love never fails.',
    ref: '1 Corinthians 13 : 4–8',
  },

  events: [
    {
      title: 'Holy Matrimony',
      time: '10:30 AM',
      venue: "St. ______ Church",
      address: 'Srungavruksham, West Godavari',
      map: VENUE_MAP,
      note: 'Kindly be seated by 10:15 AM',
    },
    {
      title: 'Wedding Luncheon',
      time: '1:00 PM',
      venue: 'Church Parish Hall',
      address: 'Srungavruksham, West Godavari',
      map: VENUE_MAP,
      note: 'Fellowship & blessings',
    },
    {
      title: 'Reception',
      time: '7:00 PM',
      venue: '______ Convention Centre',
      address: 'Srungavruksham, West Godavari',
      map: VENUE_MAP,
      note: 'Dinner, music & celebration',
    },
  ],

  gallery: [
    { src: '/photos/1.jpg', caption: 'Where it began' },
    { src: '/photos/2.jpg', caption: 'Sunday smiles' },
    { src: '/photos/3.jpg', caption: 'Just us' },
    { src: '/photos/4.jpg', caption: 'The promise' },
    { src: '/photos/5.jpg', caption: 'Blessed' },
    { src: '/photos/6.jpg', caption: 'Adventures' },
    { src: '/photos/7.jpg', caption: 'Family' },
    { src: '/photos/8.jpg', caption: 'Forever' },
    { src: '/photos/9.jpg', caption: 'Two become one' },
  ],

  // Background music starts when guests open the church doors (toggle bottom-right).
  // Leave `music` empty to play the built-in synthesized "Amazing Grace",
  // or drop an audio file in /public/music and set e.g. music: '/music/hymn.mp3'
  music: '',
  musicTitle: 'Amazing Grace',

  rsvp: {
    // WhatsApp number in international format without "+" — or use a mailto: link
    link: 'https://wa.me/910000000000?text=' + encodeURIComponent('We will joyfully attend the wedding of Ratna & Simon!'),
  },
}
