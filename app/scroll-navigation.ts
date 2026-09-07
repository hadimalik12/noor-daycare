import type { MouseEvent } from "react";

export function goToPageTop(event: MouseEvent<HTMLAnchorElement>) {
  if (
    event.button !== 0 ||
    event.metaKey ||
    event.ctrlKey ||
    event.shiftKey ||
    event.altKey
  )
    return false;
  event.preventDefault();
  window.history.replaceState(
    window.history.state,
    "",
    window.location.pathname + window.location.search,
  );
  document.getElementById("top")?.focus({ preventScroll: true });
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ? "instant"
      : "smooth",
  });
  return true;
}

export function resetInitialScroll() {
  const { hash } = window.location;
  if (hash && hash !== "#top") return;
  const navigation = performance.getEntriesByType("navigation")[0] as
    PerformanceNavigationTiming | undefined;
  if (!hash && navigation?.type === "back_forward") return;

  if (hash === "#top")
    window.history.replaceState(
      window.history.state,
      "",
      window.location.pathname + window.location.search,
    );

  const previousRestoration = window.history.scrollRestoration;
  window.history.scrollRestoration = "manual";
  let interacted = false;
  const stopResetting = () => {
    interacted = true;
  };
  const reset = () => {
    if (!interacted) window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  };
  const restore = () => {
    window.history.scrollRestoration = previousRestoration;
  };
  const onPageShow = () => {
    reset();
    restore();
  };
  const events = ["pointerdown", "touchstart", "wheel", "keydown"] as const;
  for (const event of events)
    window.addEventListener(event, stopResetting, { passive: true });
  window.addEventListener("pageshow", onPageShow, { once: true });
  window.addEventListener("pagehide", restore, { once: true });
  reset();
  // Finish after layout, without overriding a visitor who has already interacted.
  const frame = requestAnimationFrame(() => {
    reset();
    if (document.readyState === "complete") restore();
  });

  return () => {
    cancelAnimationFrame(frame);
    window.removeEventListener("pageshow", onPageShow);
    window.removeEventListener("pagehide", restore);
    for (const event of events)
      window.removeEventListener(event, stopResetting);
    restore();
  };
}
