let rows = 3;
let columns = 3;
let currTile;
let blankTile;
let turns = 0;
let imgOrder = ["4", "2", "8", "1", "9", "6", "7", "5", "3"];

window.onload = function () {
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < columns; c++) {
      let tile = document.createElement("img");
      tile.id = r.toString() + "-" + c.toString();
      tile.src = imgOrder.shift() + ".jpg";
      tile.addEventListener("click", () => moveTile(tile, r, c));
      document.getElementById("board").append(tile);
    }
  }
};

function moveTile(tile, row, col) {
  // Get the blank tile's position
  const blankPosition = document.getElementById("board").querySelector('img[src*="3.jpg"]').id.split("-");

  const blankRow = parseInt(blankPosition[0], 10);
  const blankCol = parseInt(blankPosition[1], 10);

  // Check if the clicked tile is adjacent to the blank tile
  if (
    (row === blankRow && Math.abs(col - blankCol) === 1) ||
    (col === blankCol && Math.abs(row - blankRow) === 1)
  ) {
    // Swap the positions of the clicked tile and the blank tile
    const tempSrc = tile.src;
    tile.src = document.getElementById(blankPosition.join("-")).src;
    document.getElementById(blankPosition.join("-")).src = tempSrc;

    // Swap the values in the imageOrder array
    const clickedIndex = row * columns + col;
    const blankIndex = blankRow * columns + blankCol;
    [imgOrder[clickedIndex], imgOrder[blankIndex]] = [imgOrder[blankIndex], imgOrder[clickedIndex]];

    // Update the turn counter
    turns++;
    document.getElementById("turns").innerText = turns.toString();

    
    
  }
}


