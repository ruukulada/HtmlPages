document.body.style.margin = "0";
document.body.style.overflow = "hidden";

const canvas = document.createElement("canvas");
document.body.appendChild(canvas);
const ctx = canvas.getContext("2d");

const noise = (() => {
  const perm = new Uint8Array(512);
  for (let i = 0; i < 256; i++) perm[i] = i;
  for (let i = 0; i < 256; i++) {
    const j = Math.floor(Math.random() * 256);
    [perm[i], perm[j]] = [perm[j], perm[i]];
    perm[i + 256] = perm[i];
  }
  const fade = t => t * t * t * (t * (t * 6 - 15) + 10);
  const lerp = (t, a, b) => a + t * (b - a);
  const grad = (hash, x, y) => {
    const h = hash & 3;
    const u = h < 2 ? x : y;
    const v = h < 2 ? y : x;
    return ((h & 1) === 0 ? u : -u) + ((h & 2) === 0 ? v : -v);
  };
  return (x, y) => {
    const X = Math.floor(x) & 255;
    const Y = Math.floor(y) & 255;
    const xf = x - Math.floor(x);
    const yf = y - Math.floor(y);
    const u = fade(xf);
    const v = fade(yf);
    const aa = perm[X + perm[Y]];
    const ab = perm[X + perm[Y + 1]];
    const ba = perm[X + 1 + perm[Y]];
    const bb = perm[X + 1 + perm[Y + 1]];
    const x1 = lerp(u, grad(aa, xf, yf), grad(ba, xf - 1, yf));
    const x2 = lerp(u, grad(ab, xf, yf - 1), grad(bb, xf - 1, yf - 1));
    return lerp(v, x1, x2);
  };
})();

const heatmap = [
  [  0,  0,100],
  [  0,  0,200],
  [200,  0,  0],
  [255,165,  0],
  [255,220,255]
];

function getColorFromPalette(t) {
  t = Math.min(Math.max(t, 0), 1);
  const n = heatmap.length - 1;
  const idx = Math.floor(t * n);
  const frac = t * n - idx;
  const c0 = heatmap[idx];
  const c1 = heatmap[Math.min(idx + 1, n)];
  return [
    Math.floor(c0[0] + (c1[0] - c0[0]) * frac),
    Math.floor(c0[1] + (c1[1] - c0[1]) * frac),
    Math.floor(c0[2] + (c1[2] - c0[2]) * frac)
  ];
}

function drawHeatmap(time) {
  const t = time * 0.001;
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const cellSize = Math.max(canvas.width, canvas.height) / 100;
  const cols = Math.floor(canvas.width / cellSize);
  const rows = Math.floor(canvas.height / cellSize);

  ctx.imageSmoothingEnabled = false;

  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      const n = noise(x * 0.1 + t, y * 0.1 + t);
      const vNoise = (n + 1) / 2; // 0..1

      const gradient = x / cols * 0.5 + y / rows * 0.5;

      const value = Math.min(Math.max(vNoise + gradient * 0.5, 0), 1);

      const [r, g, b] = getColorFromPalette(value);

      ctx.fillStyle = `rgb(${r},${g},${b})`;
      ctx.fillRect(Math.round(x * cellSize), Math.round(y * cellSize), Math.ceil(cellSize), Math.ceil(cellSize));
    }
  }

  requestAnimationFrame(drawHeatmap);
}

requestAnimationFrame(drawHeatmap);
