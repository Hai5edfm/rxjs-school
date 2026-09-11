import { game$ } from './tic-tac-toe/game';
import { drawGame, writeMessage } from './tic-tac-toe/draw'; 
import { timer } from 'rxjs';


export default () => {
    /** start coding */
    
    game$.subscribe(gameState => {
        drawGame(gameState);

        if(gameState.winner) {
            timer(500).subscribe(() => writeMessage(`Player ${gameState.winner} wins!`));
        } else if (gameState.finished) {
            timer(500).subscribe(() => writeMessage(`It's a draw!`));
        }
    }, 
    err => console.log("error: ", err), 
    data => console.log("COMPLETE"));
    /** end coding */
}