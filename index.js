const DRAW_MODE_DEFAULT = 0;
const DRAW_MODE_PENCIL = 1;
const DRAW_MODE_RAINBOW = 2;

const MOUSE_LEFT = 0;
const MOUSE_RIGHT = 2;

const board = document.getElementById("board");
const sizeSlider = document.getElementById("sketch-size-slider");
const sketchSize = document.getElementById("sketch-size-number");
const fieldset = document.getElementById("drawing-mode-options");
const radios = fieldset.querySelectorAll('input[type="radio"]');

const edgeLength = board.clientWidth;

let square;
let isDrawing = false;
let isErasing = false;
let drawMode = DRAW_MODE_DEFAULT;
let hue = 0;
let squareLightnessValues = []; // for pencil mode

createSquares(sizeSlider.value);
sketchSize.innerText = sizeSlider.value;

document.addEventListener("mouseup", (event) => {
  isDrawing = false;
  isErasing = false;
});

sizeSlider.addEventListener("change", (event) => {
  updateSketchSize(event.target.value);
});

sizeSlider.addEventListener("input", (event) => {
  sketchSize.innerText = event.target.value;
});

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

function updateSketchSize(size) {
  deleteSquares();
  createSquares(size);
}

function createSquares(size) {
  const squareSize = edgeLength / size;

  for (let i = 0; i < size * size; i++) {
    square = document.createElement("div");
    square.classList.add("square");
    square.id = i;
    squareLightnessValues.push(100);
    square.style.width = squareSize + "px";
    square.style.height = squareSize + "px";
    square.style.backgroundColor = "white";
    addDrawingEventListeners(square);
    board.appendChild(square);
  }
}

function addDrawingEventListeners(squareElement) {
  squareElement.addEventListener("mousedown", (event) => {
    if (event.button === MOUSE_LEFT) {
      isDrawing = true;
      event.target.style.backgroundColor = getDrawColor(event.target);
    } else if (event.button === MOUSE_RIGHT) {
      isErasing = true;
      event.target.style.backgroundColor = "white";
    }
  });
  squareElement.addEventListener("mouseenter", (event) => {
    if (isDrawing) {
      event.target.style.backgroundColor = getDrawColor(event.target);
    } else if (isErasing) {
      event.target.style.backgroundColor = "white";
    }
  });
  squareElement.addEventListener("contextmenu", (event) => {
    event.preventDefault();
  });
}

function getDrawColor(square) {
  if (drawMode === DRAW_MODE_DEFAULT) {
    return "black";
  } else if (drawMode === DRAW_MODE_PENCIL) {
    const index = +square.id;
    let lightness = squareLightnessValues[index];
    lightness -= 10;
    squareLightnessValues[index] = lightness;
    return `hsl(0 0% ${lightness}%)`;
  } else {
    hue = (hue + 5) % 360;
    return `hsl(${hue} 100% 50%)`;
  }
}

function deleteSquares() {
  const squares = document.querySelectorAll(".square");
  for (const square of squares) {
    board.removeChild(square);
  }
}
