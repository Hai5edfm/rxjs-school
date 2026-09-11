import { BehaviorSubject } from 'rxjs';

const initialGame = {
    board: new Array(3).fill().map(() => new Array(3).fill(0)),
    nextPlayer: 1,
    finished: false,
    winner: null
}

export const gameState$ = new BehaviorSubject(initialGame);

