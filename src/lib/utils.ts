import type { MarkdownHeading } from 'astro'

export function createTOC(headings: MarkdownHeading[]) {
  const toc = [] as any[]

  headings.forEach(item => {
    switch (item.depth) {
      default: toc.push(item); break
      case 3: toc.push([item]); break
      case 4: toc.push([[item]]); break
      case 5: toc.push([[[item]]]); break
      case 6: toc.push([[[[item]]]]); break
    }
  })
  return toc
}