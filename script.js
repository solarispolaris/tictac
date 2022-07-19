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
        createBoardElement();
    };

    const displayBoard = () => {

        const container = document.querySelector(".game-container");

        for(let row = 0; row < gameArray.length; row++){
            //get current row as a nodelist
            const gameSpotRow = container.querySelectorAll(`.ttt-spot[data-row='${row+1}']`);
            for(let col = 0; col < gameSpotRow.length; col++){
                //update nodes with the repective row/col of the game board array
                gameSpotRow[col].textContent = gameArray[row][col];
            }
        }
        
        

    };

    //attempts to change the game board and returns true if sucessful
    const updateBoard = (row, col, character) => {

        //check if array is not empty
        if(!gameArray.length) return false;

        //make sure game row/col has no playing piece already inside it
        if(gameArray[row-1][col-1] !== " ") return false;

        gameArray[row - 1][col - 1 ] = character;

    };


    const createBoardElement = () => {
        const containerBody = document.querySelector("body");
        //game container
        const gameContainer = document.createElement("div");
        gameContainer.classList.add("game-container");
        //game elements
        for(let row = 0; row < maxSquaresPerRow; row++){
            for(let col = 0; col < maxSquaresPerRow; col++){
                const gameSpot = document.createElement("div");
                gameSpot.classList.add("ttt-spot");
                gameSpot.setAttribute("data-row", `${row+1}`);
                gameSpot.setAttribute("data-col", `${col+1}`);
                gameContainer.appendChild(gameSpot);
            }
        }
        //row divider
        const rowdivOne = document.createElement("div");
        rowdivOne.classList.add("row-divider","row1");
        const rowdivTwo = document.createElement("div");
        rowdivTwo.classList.add("row-divider","row2");

        //col divider
        const coldivOne = document.createElement("div");
        coldivOne.classList.add("col-divider","col1");
        const coldivTwo = document.createElement("div");
        coldivTwo.classList.add("col-divider","col2");


        gameContainer.appendChild(rowdivOne);
        gameContainer.appendChild(rowdivTwo);
        gameContainer.appendChild(coldivOne);
        gameContainer.appendChild(coldivTwo);


        containerBody.appendChild(gameContainer);
    };




return {newBoard, displayBoard, updateBoard};


})();

gameBoard.newBoard();
gameBoard.updateBoard(1, 1, "x");
gameBoard.updateBoard(2, 3, "o");
gameBoard.updateBoard(3, 2, "x");

gameBoard.displayBoard();