
///////////////////////////////////////////////////////////////////////////////////////////////
//Game Board Object
const GameBoard = (() => {

    const gameArray = [];
    const maxSquaresPerRow = 3;

    //sets up a new board of empty elements
    const newBoard = () => {
        //checks if the array is empty
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
        if(document.querySelector(".game-container") === null) createBoardElement();
        displayBoard();
    };

    //makes sure board is still empty
    const checkBoardIsEmpty = () => {
        let isEmpty = false;
        const gameSpot = document.querySelectorAll(".ttt-spot");
        for(let it = 0; it < gameSpot.length; it++){
            //checks each element's text content
            let text = gameSpot[it].textContent;
            if(text === " "){
                isEmpty = true;
                break;
            }
        }
        return isEmpty;
    };

    //display the array on the DOM board
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

    //attempts to change the game board and returns true if successful
    const updateBoard = (row, col, character) => {

        //check if array is not empty
        if(!gameArray.length) return false;

        //make sure game row/col has no playing piece already inside it
        if(gameArray[row-1][col-1] !== " ") return false;

        gameArray[row - 1][col - 1 ] = character;

        return true;

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
        //row dividers
        const rowdivOne = document.createElement("div");
        rowdivOne.classList.add("row-divider","row1");
        const rowdivTwo = document.createElement("div");
        rowdivTwo.classList.add("row-divider","row2");

        //col dividers
        const coldivOne = document.createElement("div");
        coldivOne.classList.add("col-divider","col1");
        const coldivTwo = document.createElement("div");
        coldivTwo.classList.add("col-divider","col2");

        //move elements into their respective containers
        gameContainer.appendChild(rowdivOne);
        gameContainer.appendChild(rowdivTwo);
        gameContainer.appendChild(coldivOne);
        gameContainer.appendChild(coldivTwo);

        containerBody.appendChild(gameContainer);
    };




return {newBoard, displayBoard, updateBoard, checkBoardIsEmpty};


})();



///////////////////////////////////////////////////////////////////////////////////////////////
//Player Object

const Player = (sym, nam = "default") => {
    let name = nam;
    let symbol = sym;
    let wins = 0;
    const getWins = () => { return wins; };
    const incrementWins = () => { wins++;};
    const resetWins = () => { wins = 0;};
    const makeMove =  () => { return true;};
    const getName = () => {return name;};
    const getSymbol = () => {return symbol;};

    return {getWins,incrementWins,resetWins,makeMove, getName, getSymbol};
};

//human player object
const HumanPlayer = symbol =>{
    const proto = Player(symbol, "human");
    return Object.assign({}, proto );
};

//computer ai player object
const AIPlayer = symbol =>{
    const proto = Player(symbol, "ai");
    const makeMove = () => {
        let turnOver = false;
        while(!turnOver){
            let row = Math.floor(Math.random()*3 + 1);
            let col = Math.floor(Math.random()*3 + 1);
            turnOver = GameBoard.updateBoard(row, col, proto.getSymbol());
        }
        
        
    };
    return Object.assign({}, proto, {makeMove} );
};

///////////////////////////////////////////////////////////////////////////////////////////////
//Gameplay Object

const GameState = (() => {
    const players = [];
    let currentPlayer = 0;

    const setUpGame = () => {
        const humanP = HumanPlayer("x");
        const aiP = AIPlayer("o");
        players.push(humanP);
        players.push(aiP);
        
        createHumanInput();
        players[currentPlayer].makeMove();
    };

    const chooseFirstPlayer = () => {

    };

    const nextTurn = () => {
        //refresh board
        toggleCurrentPlayer();
        GameBoard.displayBoard();
        //stop game if no spaces left
        if(!GameBoard.checkBoardIsEmpty()) return;
        players[currentPlayer].makeMove();
        //iterate ai turns
        if(players[currentPlayer].getName() === "ai") nextTurn();
    };






    //inverses the current player index and converts the result back into a number
    const toggleCurrentPlayer = () => {
        currentPlayer = !currentPlayer;
        currentPlayer = currentPlayer ? 1 : 0;
    };

    const createHumanInput = () => {
        
        const spots = document.querySelectorAll(".ttt-spot");
        for(let it = 0; it < spots.length; it++){
            spots[it].addEventListener("click", e => {
                
                if(players[currentPlayer].getName() === "human"){
                    const turnOver = GameBoard.updateBoard(e.target.getAttribute("data-row"), e.target.getAttribute("data-col"), players[currentPlayer].getSymbol());
                    if(turnOver){
                        nextTurn();
                    }   
                }
            }, 0);
        }
    };



    
return {setUpGame};
})();


//temp function calls
GameBoard.newBoard();
GameState.setUpGame();
GameBoard.displayBoard();
