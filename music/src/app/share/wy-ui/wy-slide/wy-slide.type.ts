import { Observable } from "rxjs";

export type SlideValue = number | null;

export type SlideDirection = 'horizontal' | 'vertical';

export interface SliderEventObserverConfig {
  start: string;
  move: string;
  end: string;
  filter: (e: MouseEvent) => boolean;
  pluckKey: string[];
  startPlucked$?: Observable<number>;
  moveResolved$?: Observable<number>;
  end$?: Observable<Event>;
}

