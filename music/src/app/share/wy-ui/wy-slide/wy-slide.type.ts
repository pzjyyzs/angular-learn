import { Observable } from "rxjs";

export type SlideValue = number | null;

export type SlideDirection = 'horizontal' | 'vertical';

export interface SliderEventObserverConfig {
  start: string;
  move: string;
  end: string;
  filter: (e: Event) => boolean;
  pluckKey: string[];
  startPlucked$?: Observable<number>;
  moveResolved$?: Observable<number>;
  end$?: Observable<Event>;
}

export function sliderEvent(e: Event) {
  e.stopPropagation();
  e.preventDefault();
}
