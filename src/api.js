import { timer, throwError, of } from 'rxjs';
import { mapTo, mergeMap } from 'rxjs/operators';

export class api{
    static getComment(id){
        return timer(Math.random()*1000).pipe(
            mergeMap(evt => {
                const isErr = Math.random() > 0.6;

                if(isErr){
                    return throwError(new Error('Failed to fetch comment'));
                }

                return of({id:id, comment:`comment number ${id}`});
            }),
        );
    }

    static getCommentsList(page){
        const buildCommentsList = (page) =>{
            let comments = [];
            const offset = (page-1)*10;
            for(let i=offset; i < offset+10; i++){
                comments.push({id:i, comment:`comment number ${i}`})
            }
            return comments;
        }
        return timer(Math.random()*1000).pipe(
            mapTo(buildCommentsList(page))
        );
    }    
}