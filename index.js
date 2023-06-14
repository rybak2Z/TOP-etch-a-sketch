const SKETCH_SIZE = 10;
const SQUARE_SIZE = 50; // in px

const board = document.getElementById("board");
const edgeLength = SQUARE_SIZE * SKETCH_SIZE;
board.style.width = edgeLength + "px";
board.style.height = edgeLength + "px";

let square;
let inDrawMode = false;
for (let i = 0; i < SKETCH_SIZE * SKETCH_SIZE; i++) {
  square = document.createElement("div");
  square.classList.add("square");

  square.addEventListener("mousedown", (event) => {
    inDrawMode = true;
    event.target.style.backgroundColor = "black";
  });
  square.addEventListener("mouseenter", (event) => {
    if (inDrawMode) {
      event.target.style.backgroundColor = "black";
    }
  });

  board.appendChild(square);
}

document.addEventListener("mouseup", (event) => {
  inDrawMode = false;
});
