export function sliderEvent(e: MouseEvent) {
  e.stopPropagation();
  e.preventDefault();
}

export function getElementOffset(el: HTMLElement): { top: number; left: number; } {
  if (!el.getClientRects().length) {
    return {
      top: 0,
      left: 0
    };
  }

  const rect = el.getBoundingClientRect();
  const win = el.ownerDocument.defaultView;

  return {
    top: win ? rect.top + win.pageYOffset : 0,
    left: win ? rect.left + win.pageXOffset: 0
  };
}
