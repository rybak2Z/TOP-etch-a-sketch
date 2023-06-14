const SKETCH_SIZE = 10;
const SQUARE_SIZE = 50; // in px

const board = document.getElementById("board");
const edgeLength = SQUARE_SIZE * SKETCH_SIZE;
board.style.width = edgeLength + "px";
board.style.height = edgeLength + "px";

let square;
let color;
for (let i = 0; i < SKETCH_SIZE * SKETCH_SIZE; i++) {
  square = document.createElement("div");
  square.classList.add("square");
  square.style.backgroundColor = color;
  board.appendChild(square);
}
