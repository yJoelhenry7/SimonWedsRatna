import { wedding } from './data.js'
import { DATE_LOCALES } from './i18n.js'

const locale = (lng) => DATE_LOCALES[lng] || 'en-GB'

/** "Tuesday, 20 October 2026" in the current language */
export function formatWeddingDate(lng) {
  return new Date(wedding.date).toLocaleDateString(locale(lng), {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: wedding.timeZone,
  })
}

/** "Wednesday, 21 October" — used on each event card */
export function formatEventDay(iso, lng) {
  return new Date(iso).toLocaleDateString(locale(lng), {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    timeZone: wedding.timeZone,
  })
}

const stamp = (d) => d.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '')
const hoursAfter = (d, h) => new Date(d.getTime() + h * 3600 * 1000)
const siteUrl = () => window.location.origin + window.location.pathname

/** Google Calendar link for the wedding day (ceremony through luncheon); the reception is in the description */
export function googleCalendarUrl({ title, details }) {
  const start = new Date(wedding.date)
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: title,
    dates: `${stamp(start)}/${stamp(hoursAfter(start, wedding.calendar.durationHours))}`,
    details: `${details}\n\n${siteUrl()}`,
    location: wedding.calendar.location,
    ctz: wedding.timeZone,
  })
  return `https://calendar.google.com/calendar/render?${params}`
}

// RFC 5545 text escaping
const esc = (s) => s.replace(/\\/g, '\\\\').replace(/;/g, '\\;').replace(/,/g, '\\,').replace(/\n/g, '\\n')

function vevent({ uid, start, end, title, details, location }) {
  return [
    'BEGIN:VEVENT',
    `UID:${uid}`,
    `DTSTAMP:${stamp(new Date())}`,
    `DTSTART:${stamp(start)}`,
    `DTEND:${stamp(end)}`,
    `SUMMARY:${esc(title)}`,
    `DESCRIPTION:${esc(`${details}\n\n${siteUrl()}`)}`,
    `LOCATION:${esc(location)}`,
    `URL:${siteUrl()}`,
    'BEGIN:VALARM',
    'TRIGGER:-P1D',
    'ACTION:DISPLAY',
    `DESCRIPTION:${esc(title)}`,
    'END:VALARM',
    'END:VEVENT',
  ]
}

/**
 * Downloads an .ics file (Apple Calendar, Outlook…) with two entries —
 * the wedding day and the reception the next day — each with a reminder the day before.
 */
export function downloadIcs({ title, details, receptionTitle }) {
  const start = new Date(wedding.date)
  const reception = wedding.events.find((e) => e.id === 'reception')
  const receptionStart = new Date(reception.date)
  const ics = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Simon & Ratna//Wedding//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    ...vevent({
      uid: `${stamp(start)}-simon-ratna-wedding`,
      start,
      end: hoursAfter(start, wedding.calendar.durationHours),
      title,
      details,
      location: wedding.calendar.location,
    }),
    ...vevent({
      uid: `${stamp(receptionStart)}-simon-ratna-reception`,
      start: receptionStart,
      end: hoursAfter(receptionStart, reception.hours),
      title: receptionTitle,
      details,
      location: reception.location,
    }),
    'END:VCALENDAR',
  ].join('\r\n')

  const url = URL.createObjectURL(new Blob([ics], { type: 'text/calendar;charset=utf-8' }))
  const a = document.createElement('a')
  a.href = url
  a.download = 'simon-ratna-wedding.ics'
  document.body.appendChild(a)
  a.click()
  a.remove()
  setTimeout(() => URL.revokeObjectURL(url), 1000)
}
