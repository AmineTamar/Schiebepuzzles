let rows = 3;
let columns = 3;
let turns = 0;
/*let imgOrder = ["1", "2", "6", "4", "5", "3", "7", "8", "9"];   (to test the game fast) */
let imgOrder = ["4", "2", "8", "1", "9", "6", "7", "5", "3"];
let winMessage = "Du hast Gewonnen!";
let gameIsWon = false;
document.getElementById("full-img").style.display = "none";

window.onload = function () {
  createGameBoard();
};

function createGameBoard() {
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < columns; c++) {
      let tile = document.createElement("img");
      tile.id = r.toString() + "-" + c.toString();
      tile.src = imgOrder.shift() + ".jpg";
      tile.addEventListener("click", tileClickHandler);
      document.getElementById("board").append(tile);
    }
  }
}

function tileClickHandler() {
  if (gameIsWon) {
    return; // Stop tile movement if the game is already won
  }

  const tile = this;
  const row = parseInt(tile.id.charAt(0), 10);
  const col = parseInt(tile.id.charAt(2), 10);

  const blankPosition = document.getElementById("board").querySelector('img[src*="3.jpg"]').id.split("-");
  const blankRow = parseInt(blankPosition[0], 10);
  const blankCol = parseInt(blankPosition[1], 10);

  if (
    (row === blankRow && Math.abs(col - blankCol) === 1) ||
    (col === blankCol && Math.abs(row - blankRow) === 1)
  ) {
    const tempSrc = tile.src;
    tile.src = document.getElementById(blankPosition.join("-")).src;
    document.getElementById(blankPosition.join("-")).src = tempSrc;

    const clickedIndex = row * columns + col;
    const blankIndex = blankRow * columns + blankCol;
    [imgOrder[clickedIndex], imgOrder[blankIndex]] = [imgOrder[blankIndex], imgOrder[clickedIndex]];

    turns++;
    document.getElementById("turns").innerText = turns.toString();

    checkWin();
  }
}

function checkWin() {
  const orderedImgSrc = ["1.jpg", "2.jpg", "3.jpg", "4.jpg", "5.jpg", "6.jpg", "7.jpg", "8.jpg", "9.jpg"];
  let boardTiles = document.getElementById("board").getElementsByTagName("img");

  for (let i = 0; i < boardTiles.length; i++) {
    if (boardTiles[i].src.endsWith(orderedImgSrc[i])) {
      continue;
    } else {
      return;
    }
  }

  gameIsWon = true;


  //display whole img when the game is won
  document.getElementById("full-img").style.display = "block";
  let img = document.createElement("img");
  img.src="10.jpg"
  img.id="main-img"
  document.getElementById("full-img").append(img);
  document.getElementById("board").style.display = "none";


// add wining message
  let message = document.getElementById("message-el");
  message.innerHTML = winMessage;
  document.getElementById("play-again-btn").style.display = "block";
}

function playAgain() {
  // Clear the board and reset game state
  document.getElementById("board").innerHTML = "";
  imgOrder = ["4", "2", "8", "1", "9", "6", "7", "5", "3"];
  turns = 0;
  gameIsWon = false;

  

  // Reset turns and victory message display
  document.getElementById("turns").innerText = turns.toString();
  document.getElementById("message-el").innerHTML = "Viel Glück!";

  // Create a new game board
  createGameBoard();

  // Hide the "Play Again" button after clicking it
  document.getElementById("play-again-btn").style.display = "none";
}
