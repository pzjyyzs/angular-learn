import {interval} from 'rxjs';
import '../styles/index.css';
import {map, take} from "rxjs/operators";
window.addEventListener('DOMContentLoaded', function () {
  const count = document.querySelector('.count') as HTMLSpanElement;
  interval(500).pipe(map(i => 9 - i), take(10)).subscribe(num => {
    count.innerText = `${num}`;
  });
});
