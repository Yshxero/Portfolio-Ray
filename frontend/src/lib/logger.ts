export function logSystemEvent(message: string): void {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("system-log", { detail: message }));
  }
}
