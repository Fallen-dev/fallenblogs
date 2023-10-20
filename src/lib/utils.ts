import dayjs from "dayjs"
import relativeTime from 'dayjs/plugin/relativeTime'

export const slugify = (slug: string) => slug.toLowerCase().replaceAll(' ', '-')
export const unslugify = (slug: string) => slug.replaceAll('-', ' ')

export function formatDate(date: string | Date) {
  dayjs.extend(relativeTime)
  const givenDate = dayjs(date)
  const today = dayjs()

  if (givenDate.isBefore(today.subtract(1, 'M')))
    return givenDate.format('MMM DD, YYYY')

  return givenDate.fromNow()
}