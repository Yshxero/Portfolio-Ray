export function scrollToId(id: string): void {
  const el = document.getElementById(id);
  if (!el) return;

  const offset = 80;
  const y = el.getBoundingClientRect().top + window.scrollY - offset;

  window.scrollTo({ top: y, behavior: "smooth" });
}
