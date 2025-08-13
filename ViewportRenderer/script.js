document.body.style.margin = "0";
document.body.style.overflow = "hidden";

const canvas = document.createElement("canvas");
document.body.appendChild(canvas);
const ctx = canvas.getContext("2d");

function drawGrid(time) {
  const t = time * 0.002;

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const cellSize = Math.max(canvas.width, canvas.height) / 100;
  const marginCells = 1;

  const cols = Math.floor(canvas.width / cellSize) + marginCells * 2;
  const rows = Math.floor(canvas.height / cellSize) + marginCells * 2;

  const startX = -marginCells * cellSize;
  const startY = -marginCells * cellSize;

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const v = (Math.sin((col - marginCells) * 0.2 + t) +
                 Math.sin((row - marginCells) * 0.2 + t)) / 2 * 0.5 + 0.5;

      const r = Math.floor(100 + 155 * v);
      const g = Math.floor(50 * (1 - v));
      const b = Math.floor(150 + 105 * v);

      ctx.fillStyle = `rgb(${r},${g},${b})`;
      ctx.fillRect(
        Math.round(startX + col * cellSize),
        Math.round(startY + row * cellSize),
        Math.ceil(cellSize),
        Math.ceil(cellSize));
    }
  }

  requestAnimationFrame(drawGrid);
}

requestAnimationFrame(drawGrid);
