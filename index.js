const SKETCH_SIZE = 10;
const SQUARE_SIZE = 50; // in px

const div = document.getElementById("sketch");
const edgeLength = SQUARE_SIZE * SKETCH_SIZE;
div.style.width = edgeLength + "px";
div.style.height = edgeLength + "px";

let square;
let color;
for (let i = 0; i < SKETCH_SIZE * SKETCH_SIZE; i++) {
  square = document.createElement("div");
  square.classList.add("square");
  color = `hsl(${Math.random() * 360}, 100%, 50%)`;
  square.style.backgroundColor = color;
  div.appendChild(square);
}
