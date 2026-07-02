export const SECTION_IDS = ["sluzby", "cenik", "reference", "kontakt"] as const
export type SectionId = (typeof SECTION_IDS)[number]

export const STICKY_TOP = (index: number) => 80 + index * 20
const CARD_GAP = 24 // gap-6 mezi kartami

function naturalTop(el: HTMLElement): number {
  let top = 0
  let node: HTMLElement | null = el
  while (node) {
    top += node.offsetTop
    node = node.offsetParent as HTMLElement | null
  }
  return top
}

export function scrollToSection(id: string) {
  const idx = SECTION_IDS.indexOf(id as SectionId)
  const el = document.getElementById(id)
  if (idx < 0 || !el) return

  const container = el.parentElement
  if (!container) return

  // Sticky karty mají v přichyceném stavu posunutý offsetTop, takže je
  // nelze měřit přímo. Cíl proto počítáme od statického kontejneru
  // + výšek předchozích karet (ty jsou stabilní vždy).
  let top = naturalTop(container)
  for (let i = 0; i < idx; i++) {
    const prev = document.getElementById(SECTION_IDS[i])
    top += (prev?.offsetHeight ?? 0) + CARD_GAP
  }

  window.scrollTo({ top: Math.max(0, top - STICKY_TOP(idx)), behavior: "smooth" })
}
