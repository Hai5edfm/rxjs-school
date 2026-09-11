import { Observable, merge } from 'rxjs';
import { scan, startWith, tap, takeWhile } from 'rxjs/operators';
import { gameState$ } from './game-state';

import { userMove$ } from './user-move';
import { computerMove$, simulateComputerTurn } from './computer-move';

//pure function to find out empty cells
export const getEmptyCells = (board) =>{
    const emptyCells = [];
    //detect empty cells
    for(let x = 0; x < board.length; x++){
        for(let y=0; y < board[0].length; y++){
            if(board[y][x] == 0){
                emptyCells.push({x, y})
            }
        }
    };
    return emptyCells;        
}

//pure function to find out which player have won (if any)
const findOutWinner = board =>{
    //check rows and cols
    for (let i=0;i<3;i++){
        if( (board[i][0] && board[i][0] == board[i][1] && board[i][1] == board[i][2]) ){
            return board[i][0];
        }
        else if ( (board[0][i] && board[0][i] == board[1][i] && board[1][i] == board[2][i]) ){
                return board[0][i];
        }
    }
    //check diagonals
    if( (board[0][0] && board[0][0] == board[1][1] && board[1][1] == board[2][2]) || 
        (board[2][0] && board[2][0] == board[1][1] && board[1][1] == board[0][2]) ){
        return board[1][1];
    }

    return null;  
}

const updateGameState = (gameState, move) => {
    if (!move) {
        return gameState;
    }

    let updatedBoard = [...gameState.board];
    updatedBoard[move.y][move.x] = gameState.nextPlayer;

    const haveEmptyCells = getEmptyCells(updatedBoard).length !== 0;

    let finished = !haveEmptyCells;

    const winner = findOutWinner(updatedBoard);
    if (winner) {
        finished = true;
    }

    return {
        board: updatedBoard,
        nextPlayer: gameState.nextPlayer === 1 ? 2 : 1,
        finished,
        winner
    };
}


//main observable with the game logic. Right now only emiting the board
export const game$ = merge(userMove$, computerMove$).pipe(
    startWith(null),
    scan(updateGameState, gameState$.value),
    tap(gameState => gameState$.next(gameState)),
    tap(gameState => {
        if (gameState.nextPlayer === 2 && !gameState.finished) {
            simulateComputerTurn(getEmptyCells(gameState.board));
        }
    }),
    takeWhile(({ finished }) => !finished, true)
);

