const DRAW_MODE_DEFAULT = 0;
const DRAW_MODE_PENCIL = 1;
const DRAW_MODE_RAINBOW = 2;

const board = document.getElementById("board");
const sizeSlider = document.getElementById("sketch-size-slider");

const fieldset = document.getElementById("drawing-mode-options");
const radios = fieldset.querySelectorAll('input[type="radio"]');
fieldset.addEventListener("change", (event) => {
  const selectedMode = Array.from(radios).find((radio) => radio.checked);
  if (selectedMode) {
    updateDrawMode(selectedMode.value);
  }
});

function updateDrawMode(drawModeString) {
  if (drawModeString === "default") {
    drawMode = DRAW_MODE_DEFAULT;
  } else if (drawModeString === "pencil") {
    drawMode = DRAW_MODE_PENCIL;
  } else if (drawModeString === "rainbow") {
    drawMode = DRAW_MODE_RAINBOW;
  } else {
    console.warn("Unrecognized draw mode:", drawModeString);
  }

  updateSketchSize(sizeSlider.value);
}

const edgeLength = board.clientWidth;

let square;
let isDrawing = false;
let drawMode = DRAW_MODE_DEFAULT;
let hue = 0;

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

function getDrawColor() {
  if (drawMode === DRAW_MODE_DEFAULT) {
    return "black";
  } else if (drawMode === DRAW_MODE_PENCIL) {
    return "black"; // todo
  } else {
    hue = (hue + 5) % 360;
    return `hsl(${hue} 100% 50%)`;
  }
}

function addDrawingEventListeners(squareElement) {
  squareElement.addEventListener("mousedown", (event) => {
    isDrawing = true;
    event.target.style.backgroundColor = getDrawColor();
  });
  squareElement.addEventListener("mouseenter", (event) => {
    if (isDrawing) {
      event.target.style.backgroundColor = getDrawColor();
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
  isDrawing = false;
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
