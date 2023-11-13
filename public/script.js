window.addEventListener('DOMContentLoaded', () => {
    //Get Elements from the HTML
    const box = Array.from(document.querySelectorAll('.box'));
    const playerDisplay = document.querySelector('.current-player');
    const resetButton = document.querySelector('#reset');
    const winner = document.querySelector('.winner');

    //Declare Variables for the game i.e. empty array and Player
    let board = ['', '', '', '', '', '', '', '', ''];
    let currentPlayer = 'X';
    let gameActive = true;

    //Declare constants for the game state;

    const playerXWon = 'playerXWon';
    const playerOWon = 'playerOWon';
    const TIE = 'TIE';

    /*The Board
    [0] [1] [2]
    [3] [4] [5]
    [6] [7] [8]*/

    const conditionsToWin = [
        [0,1,2],//Horizontal
        [3,4,5],//Horizontal
        [6,7,8],//Horizontal
        [0,3,6],//Vertical
        [1,4,7],//Vertical
        [2,5,8],//Vertical
        [0,4,8],//Diagonal
        [2,4,6],//Diagonal


        
    ];

    //Check who has won the game
    function handleResultValidation(){
        let roundWon = false;
        for(let i=0; i<=7; i++){
            const winCondition = conditionsToWin[i];
            const a = board[winCondition[0]];
            const b = board[winCondition[1]];
            const c = board[winCondition[2]];
            if(a === '' || b=== '' || c === ''){
                continue;
            }
            if(a === b && b === c){
                roundWon = true;
                break;
            }
        }
        if (roundWon){
            announce(currentPlayer === 'X' ? playerXWon : playerOWon);
            gameActive = false;
            return;
        }
        if (!board.includes('')){
            announce(TIE);
        }
    }

    //Announce the winner of the game
    const announce = (type) => {
        switch(type){
            case playerOWon:
                winner.innerHTML = 'Player <span class="playerO">O</span> Won!';
                break;
            case playerXWon:
                winner.innerHTML = 'Player <span class = "playerX">X</span> Won!';
                break;
            case TIE:
                winner.innerText = "Tie!";
        }
        winner.classList.remove('hide');
    }

    //Ensure players click an empty box
    const isValidAction = (box) => {
        if(box.innerText === 'X' || box.innerText === 'O'){
            return false;
        }
        return true;
    }

    
    const updateBoard = (index) => {
        board[index] = currentPlayer;
    };

    //To change between whose turn it is to play
    const changePlayer = () =>{
        playerDisplay.classList.remove(`player${currentPlayer}`);
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        playerDisplay.innerText = currentPlayer;
        playerDisplay.classList.add(`player${currentPlayer}`);
    }
    
    //Check what the user clicked and find out if they can win or the game continues
    const userClicked = (box, index) => {
        if(isValidAction(box) && gameActive){
            box.innerText = currentPlayer;
            box.classList.add(`player${currentPlayer}`);
            updateBoard(index);
            handleResultValidation();
            changePlayer();
        }
    }

    //Reset the board when the game comes to an end

    const resetBoard = () => {
        board = ['', '', '', '', '', '', '', '', ''];
        gameActive = true;
        winner.classList.add('hide');

        if (currentPlayer === 'O') {
            changePlayer();
        }

        box.forEach(box => {
            box.innerText = '';
            box.classList.remove('playerX');
            box.classList.remove('playerO');
        });
    }


    box.forEach( (box, index) => {
        box.addEventListener('click', () => userClicked (box,index));
    });

    
    resetButton.addEventListener('click', resetBoard);
})