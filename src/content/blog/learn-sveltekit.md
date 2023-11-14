---
title: Master SvelteKit from zero to hero
description: Learn SvelteKit in the easiest way from scratch.
image:
  credit: Image from Pexels by Nguyễn Văn Minh Vương
  link: https://pexels.com
  src: $assets/pexels-nguyen-van-minh-vuong.jpg
category: SvelteKit
date: "2023-11-14 7:23"
---

### What is Svelte?
Svelte is a all purpose web framework

### Setup
You can start your SvelteKit project in the following steps

**Install**
```bash
npm create svelte@latest
```

Now go to the folder and open a text editor.

### Understanding the file and folder structure

SvelteKit is a folder based routing framework.

**A simple date formatting with DayJS**
```ts
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

function $(date: string | Date | undefined):
  | {
      date: string;
      isRelativeTime: boolean;
    }
  | undefined {
  if (typeof date === "undefined") return;

  dayjs.extend(relativeTime);
  const givenDate = dayjs(date);
  const today = dayjs();

  if (givenDate.isBefore(today.subtract(1, "M")))
    return { date: givenDate.format("MMM DD, YYYY"), isRelativeTime: false };

  return { date: givenDate.fromNow(), isRelativeTime: true };
}
```
