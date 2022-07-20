
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




return {newBoard, displayBoard, updateBoard};


})();



///////////////////////////////////////////////////////////////////////////////////////////////
//Player Object

const Player = () => {
    let name = "default";
    let wins = 0;
    let myTurn = false;
    const getWins = () => { return wins; };
    const incrementWins = () => { wins++;};
    const resetWins = () => { wins = 0;};
    const makeMove =  () => { return true;};
    const getTurn = () => {return myTurn;}
    const toggleTurn = () => {myTurn = !myTurn;};
    const getName = () => {return name;};

    return {getWins,incrementWins,resetWins,makeMove, getTurn, toggleTurn, getName};
};

//human player object
const HumanPlayer = () =>{
    let name = "human";
    const proto = Player();
    //add event listener 
    const makeMove = () => {
        const spots = document.querySelectorAll(".ttt-spot");
        for(let it = 0; it < spots.length; it++){
            spots[it].addEventListener("click", getPlayerInput, 0);
        }
        
    };
    //remove event listener when done with turn;
    const removeListeners = () => {
        console.log("Made Move");
        const spots = document.querySelectorAll(".ttt-spot");
        for(let it = 0; it < spots.length; it++){
            spots[it].removeEventListener("click", getPlayerInput, 0);
        }
        //redisplay the game board
        GameBoard.displayBoard();
        proto.toggleTurn();
    };

    //Player Event Listener
    const getPlayerInput = e => {
        const turnOver = GameBoard.updateBoard(e.target.getAttribute("data-row"), e.target.getAttribute("data-col"), "x");
                if(turnOver) removeListeners();
    };

    return Object.assign({}, proto, {makeMove} );
};

//computer ai player object
const AIPlayer = () =>{
    let name = "ai";
    const proto = Player();
    const makeMove = () => {
        console.log("AI Move");
        proto.toggleTurn();
    };
    return Object.assign({}, proto, {makeMove} );
};

///////////////////////////////////////////////////////////////////////////////////////////////
//Gameplay Object

const GameState = (() => {
    const players = [];
    const currentPlayer = -1;

    const setUpGame = () => {
        const humanP = HumanPlayer();
        const aiP = AIPlayer();
        players.push(humanP);
        players.push(aiP);
        players[0].toggleTurn();
        players[0].makeMove();
        players[1].makeMove();
    };

    const chooseFirstPlayer = () => {

    };

    const currentPlayerMove = () => {
        
    }
    
return {setUpGame};
})();


//temp function calls
GameBoard.newBoard();
GameBoard.updateBoard(1, 1, "x");
GameBoard.updateBoard(2, 3, "o");
GameBoard.updateBoard(3, 2, "x");

GameState.setUpGame();
GameBoard.displayBoard();
