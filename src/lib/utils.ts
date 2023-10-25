import dayjs from "dayjs"
import relativeTime from 'dayjs/plugin/relativeTime'
import { animate, stagger } from "motion";
import type {
  ElementOrSelector,
  MotionKeyframesDefinition,
  AnimationOptionsWithOverrides,
} from "motion";


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

class Cookies {
  get(name: string) {
    const cookie = document.cookie.split(";").map((cookie) => {
      const _ = cookie.split("=");
      const key = _[0]!;
      const value = _[1]!;

      if (key === name) return value;

      return undefined;
    });

    return cookie[0];
  }
  set(name: string, value: string) {
    return (document.cookie = `${name}=${value}; max-age=315360000; path=/; SameSite`);
  }
}

export const cookies = new Cookies()

export function setTheme(theme: string) {
  document.querySelector("html")!.setAttribute("data-theme", theme);
  cookies.set("theme", theme);
}

export function reveal(
  element: ElementOrSelector,
  keyframes: MotionKeyframesDefinition,
  options?: AnimationOptionsWithOverrides | null,
  stag?: number,
) {
  options = {
    delay: options?.delay || stag ? stagger(stag) : 0.4,
    duration: options?.duration || 0.4,
    easing: options?.easing || "ease-out",
  };

  return animate(element, keyframes, options);
}