const board = document.getElementById("board");
const sizeSlider = document.getElementById("sketch-size-slider");

const fieldset = document.getElementById("drawing-mode-options");
const radios = fieldset.querySelectorAll('input[type="radio"]');
fieldset.addEventListener("change", (event) => {
  const selectedMode = Array.from(radios).find((radio) => radio.checked);
  if (selectedMode) {
    const mode = selectedMode.value;
    console.log("selected drawing mode:", mode);
  }
});

const edgeLength = board.clientWidth;

let square;
let inDrawMode = false;

function createSquares(size) {
  const squareSize = edgeLength / size;

  for (let i = 0; i < size * size; i++) {
    square = document.createElement("div");
    square.classList.add("square");
    square.style.width = squareSize + "px";
    square.style.height = squareSize + "px";
    addDrawingEventListeners(square);
    board.appendChild(square);
  }
}

function addDrawingEventListeners(squareElement) {
  squareElement.addEventListener("mousedown", (event) => {
    inDrawMode = true;
    event.target.style.backgroundColor = "black";
  });
  squareElement.addEventListener("mouseenter", (event) => {
    if (inDrawMode) {
      event.target.style.backgroundColor = "black";
    }
  });
}

function deleteSquares() {
  const squares = document.querySelectorAll(".square");
  for (const square of squares) {
    board.removeChild(square);
  }
}

function updateSketchSize(size) {
  deleteSquares();
  createSquares(size);
}

document.addEventListener("mouseup", (event) => {
  inDrawMode = false;
});

sizeSlider.addEventListener("change", (event) => {
  updateSketchSize(event.target.value);
});

const sketchSize = document.getElementById("sketch-size");
sizeSlider.addEventListener("input", (event) => {
  sketchSize.innerText = event.target.value;
});
sketchSize.innerText = sizeSlider.value;

createSquares(sizeSlider.value);
