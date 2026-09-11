import { canvas, CELL_SIZE } from './draw';
import { fromEvent } from 'rxjs';
import { map, withLatestFrom, filter } from 'rxjs/operators';
import { gameState$ } from './game-state';

const click$ = fromEvent(canvas, 'click').pipe(
    map(event => {
        return {
            y: Math.floor(event.offsetY / CELL_SIZE),
            x: Math.floor(event.offsetX / CELL_SIZE)
        };
    })
);


export const userMove$ = click$.pipe(
    withLatestFrom(gameState$),
    filter(([click, gameState]) => gameState.nextPlayer === 1),
    filter(([click, gameState]) => gameState.board[click.y][click.x] === 0),
    map(([click, gameState]) => click)
);

