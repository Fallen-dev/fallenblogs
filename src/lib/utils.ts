import dayjs from "dayjs"
import relativeTime from 'dayjs/plugin/relativeTime'
import { animate } from "motion";

export const slugify = (slug: string) => slug.toLowerCase().replaceAll(' ', '-')
export const unslugify = (slug: string) => slug.replaceAll('-', ' ')

export function formatDate(date: Date | string) {

  dayjs.extend(relativeTime)
  const givenDate = dayjs(date)
  const today = dayjs()

  if (givenDate.isBefore(today.subtract(1, 'M')))
    return givenDate.format('MMM DD, YYYY')

  return givenDate.fromNow()
}

export function fadeIn(selector: string, delay?: number) {
  return animate(
    selector,
    {
      opacity: [0, 1],
      clipPath: [
        "polygon(0 0, 0 0, 0 100%, 0% 100%)",
        "polygon(100% 0, 0 0, 0 100%, 100% 100%)",
      ],
    },
    { duration: 1, easing: "ease-in-out", delay: delay || 0 },
  );
}
