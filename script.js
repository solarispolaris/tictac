const gameBoard = (() => {

    const gameArray = [];
    const maxSquaresPerRow = 3;

    const newBoard = () => {
        //sets up a new board of empty elements
        if(gameArray.length){
            for(let it = 0; it < maxSquaresPerRow; it++){
                for(let jt = 0; jt < maxSquaresPerRow; jt++){
                    gameArray[it][jt] = " ";
                }
            }
        }
        else{
            for(let it = 0; it < maxSquaresPerRow; it++){
                gameArray.push([]);
                for(let jt = 0; jt < maxSquaresPerRow; jt++){
                    gameArray[it].push(" ");
                }
            }
        }
        console.log(gameArray);
    };
return {newBoard};


})();

gameBoard.newBoard();

