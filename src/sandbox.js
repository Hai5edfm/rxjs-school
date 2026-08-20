import { updateDisplay, displayLog } from './utils';
import { fromEvent } from 'rxjs';
import { map, debounceTime } from 'rxjs/operators';

export default () => {
    /** start coding */
    
    const inputBox = document.getElementById('input-box');
    const inputSrc$ = fromEvent(inputBox, 'input').pipe(
        map(event => event.target.value),
        debounceTime(300) // Add debounce to limit the number of events processed
    );

    inputSrc$.subscribe(value => {
        updateDisplay(value);
        displayLog(`Input value: ${value}`);
    });

    /** end coding */
}