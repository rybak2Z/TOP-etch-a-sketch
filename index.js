const SKETCH_SIZE = 10;

const div = document.getElementById("sketch");

let square;
let color;
for (let i = 0; i < SKETCH_SIZE; i++) {
  square = document.createElement("div");
  square.classList.add("square");
  color = `hsl(${Math.random() * 360}, 100%, 50%)`;
  square.style.backgroundColor = color;
  div.appendChild(square);
}
