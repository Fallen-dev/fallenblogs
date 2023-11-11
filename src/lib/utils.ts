import { getCollection } from "astro:content";
import dayjs from "dayjs"
import relativeTime from 'dayjs/plugin/relativeTime'
import { animate, stagger } from "motion";
import type {
  ElementOrSelector,
  MotionKeyframesDefinition,
  AnimationOptionsWithOverrides,
} from "motion";

export const blogs = await getCollection("blog");

export function formatDate(date: Date | string | undefined) {
  if (typeof date === 'undefined') return

  dayjs.extend(relativeTime)
  const givenDate = dayjs(date)
  const today = dayjs()

  if (givenDate.isBefore(today.subtract(1, 'M')))
    return { date: givenDate.format('MMM DD, YYYY'), isRelativeTime: false }

  return { date: givenDate.fromNow(), isRelativeTime: true }
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
  const metaThemeTag = document.querySelector('meta[name=theme-color]') as HTMLMetaElement

  theme === 'light'
    ? metaThemeTag.content = '#fffbff'
    : metaThemeTag.content = '#201a19'

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