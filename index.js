const SKETCH_SIZE = 10;
const SQUARE_SIZE = 50; // in px

const board = document.getElementById("board");
const edgeLength = SQUARE_SIZE * SKETCH_SIZE;
board.style.width = edgeLength + "px";
board.style.height = edgeLength + "px";

let square;
let inDrawMode = false;

function createSquares(size) {
  const squareSize = edgeLength / size;

  for (let i = 0; i < size * size; i++) {
    square = document.createElement("div");
    square.classList.add("square");
    square.style.width = squareSize + "px";
    square.style.height = squareSize + "px";

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
}

function deleteSquares() {
  const squares = document.querySelectorAll(".square");
  for (const square of squares) {
    board.removeChild(square);
  }
}

document.addEventListener("mouseup", (event) => {
  inDrawMode = false;
});

const sizeSlider = document.getElementById("sketch-size-slider");
sizeSlider.addEventListener("change", (event) => {
  deleteSquares();
  createSquares(event.target.value);
});
const sketchSize = document.getElementById("sketch-size");
sizeSlider.addEventListener("input", (event) => {
  sketchSize.innerText = event.target.value;
});
sketchSize.innerText = sizeSlider.value;

createSquares(sizeSlider.value);
