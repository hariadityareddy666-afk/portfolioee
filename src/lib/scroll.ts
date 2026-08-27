/** Scroll to a section, using the momentum scroller when it's active. */
export function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;

  const lenis = typeof window !== "undefined" ? window.__lenis : undefined;
  if (lenis) {
    lenis.scrollTo(el, { offset: -80, duration: 1.4 });
    return;
  }
  el.scrollIntoView({ behavior: "smooth", block: "start" });
}
