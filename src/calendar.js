import { wedding } from './data.js'
import { DATE_LOCALES } from './i18n.js'

/** "Tuesday, 20 October 2026" in the current language */
export function formatWeddingDate(lng) {
  return new Date(wedding.date).toLocaleDateString(DATE_LOCALES[lng] || 'en-GB', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: wedding.timeZone,
  })
}

const stamp = (d) => d.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '')

function range() {
  const start = new Date(wedding.date)
  const end = new Date(start.getTime() + wedding.calendar.durationHours * 3600 * 1000)
  return { start, end }
}

const siteUrl = () => window.location.origin + window.location.pathname

export function googleCalendarUrl({ title, details }) {
  const { start, end } = range()
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: title,
    dates: `${stamp(start)}/${stamp(end)}`,
    details: `${details}\n\n${siteUrl()}`,
    location: wedding.calendar.location,
    ctz: wedding.timeZone,
  })
  return `https://calendar.google.com/calendar/render?${params}`
}

// RFC 5545 text escaping
const esc = (s) => s.replace(/\\/g, '\\\\').replace(/;/g, '\\;').replace(/,/g, '\\,').replace(/\n/g, '\\n')

/** Downloads an .ics invite (opens in Apple Calendar, Outlook, etc.) with a reminder the day before */
export function downloadIcs({ title, details }) {
  const { start, end } = range()
  const ics = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Simon & Ratna//Wedding//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:${stamp(start)}-simon-ratna-wedding`,
    `DTSTAMP:${stamp(new Date())}`,
    `DTSTART:${stamp(start)}`,
    `DTEND:${stamp(end)}`,
    `SUMMARY:${esc(title)}`,
    `DESCRIPTION:${esc(`${details}\n\n${siteUrl()}`)}`,
    `LOCATION:${esc(wedding.calendar.location)}`,
    `URL:${siteUrl()}`,
    'BEGIN:VALARM',
    'TRIGGER:-P1D',
    'ACTION:DISPLAY',
    `DESCRIPTION:${esc(title)}`,
    'END:VALARM',
    'END:VEVENT',
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
