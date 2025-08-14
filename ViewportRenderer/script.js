class SimplexNoise {
  constructor() {
    this.grad3 = [
      [1,1,0],[-1,1,0],[1,-1,0],[-1,-1,0],
      [1,0,1],[-1,0,1],[1,0,-1],[-1,0,-1],
      [0,1,1],[0,-1,1],[0,1,-1],[0,-1,-1],
    ];
    this.p = [];
    for (let i = 0; i < 256; i++) {
      this.p[i] = Math.floor(Math.random()*256);
    }
    this.perm = [];
    for (let i = 0; i < 512; i++) {
      this.perm[i] = this.p[i & 255];
    }
    this.simplex = [
      [0,1,2,3],[0,1,3,2],[0,0,0,0],[0,2,3,1],
      [0,0,0,0],[0,0,0,0],[0,3,1,2],[0,3,2,1],
      [0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],
      [1,2,3,0],[1,3,0,2],[1,0,2,3],[1,0,3,2],
      [0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],
      [0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],
      [2,3,0,1],[2,0,1,3],[2,1,3,0],[2,1,0,3],
      [0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],
      [3,0,1,2],[3,0,2,1],[3,1,2,0],[3,1,0,2],
    ];
  }
  dot(g, x, y, z) {
    return g[0]*x + g[1]*y + g[2]*z;
  }
  noise(xin, yin, zin) {
    let F3 = 1.0/3.0;
    let G3 = 1.0/6.0;
    let n0, n1, n2, n3;
    let s = (xin+yin+zin)*F3;
    let i = Math.floor(xin+s);
    let j = Math.floor(yin+s);
    let k = Math.floor(zin+s);
    let t = (i+j+k)*G3;
    let X0 = i-t;
    let Y0 = j-t;
    let Z0 = k-t;
    let x0 = xin-X0;
    let y0 = yin-Y0;
    let z0 = zin-Z0;
    let i1, j1, k1;
    let i2, j2, k2;
    if (x0>=y0) {
      if (y0>=z0) {i1=1; j1=0; k1=0; i2=1; j2=1; k2=0;}
      else if (x0>=z0) {i1=1; j1=0; k1=0; i2=1; j2=0; k2=1;}
      else {i1=0; j1=0; k1=1; i2=1; j2=0; k2=1;}
    } else {
      if (y0<z0) {i1=0; j1=0; k1=1; i2=0; j2=1; k2=1;}
      else if (x0<z0) {i1=0; j1=1; k1=0; i2=0; j2=1; k2=1;}
      else {i1=0; j1=1; k1=0; i2=1; j2=1; k2=0;}
    }
    let x1 = x0 - i1 + G3;
    let y1 = y0 - j1 + G3;
    let z1 = z0 - k1 + G3;
    let x2 = x0 - i2 + 2.0*G3;
    let y2 = y0 - j2 + 2.0*G3;
    let z2 = z0 - k2 + 2.0*G3;
    let x3 = x0 - 1.0 + 3.0*G3;
    let y3 = y0 - 1.0 + 3.0*G3;
    let z3 = z0 - 1.0 + 3.0*G3;
    let ii = i & 255;
    let jj = j & 255;
    let kk = k & 255;
    let gi0 = this.perm[ii+this.perm[jj+this.perm[kk]]] % 12;
    let gi1 = this.perm[ii+i1+this.perm[jj+j1+this.perm[kk+k1]]] % 12;
    let gi2 = this.perm[ii+i2+this.perm[jj+j2+this.perm[kk+k2]]] % 12;
    let gi3 = this.perm[ii+1+this.perm[jj+1+this.perm[kk+1]]] % 12;
    let t0 = 0.6 - x0*x0 - y0*y0 - z0*z0;
    if (t0<0) n0 = 0.0;
    else { t0 *= t0; n0 = t0 * t0 * this.dot(this.grad3[gi0], x0, y0, z0); }
    let t1 = 0.6 - x1*x1 - y1*y1 - z1*z1;
    if (t1<0) n1 = 0.0;
    else { t1 *= t1; n1 = t1 * t1 * this.dot(this.grad3[gi1], x1, y1, z1); }
    let t2 = 0.6 - x2*x2 - y2*y2 - z2*z2;
    if (t2<0) n2 = 0.0;
    else { t2 *= t2; n2 = t2 * t2 * this.dot(this.grad3[gi2], x2, y2, z2); }
    let t3 = 0.6 - x3*x3 - y3*y3 - z3*z3;
    if (t3<0) n3 = 0.0;
    else { t3 *= t3; n3 = t3 * t3 * this.dot(this.grad3[gi3], x3, y3, z3); }
    return 32.0*(n0 + n1 + n2 + n3);
  }
}

function heatMapColor(value) {
  const r = Math.floor(255 * Math.min(1, value * 2));
  const g = Math.floor(255 * Math.min(1, Math.max(0, value * 2 - 0.5)));
  const b = Math.floor(255 * Math.max(0, 1 - value * 2));
  return `rgb(${r},${g},${b})`;
}

let size = 1;
let speed = 1;
const params = new URLSearchParams(window.location.search);
const paramSize = parseFloat(params.get("size"));
size = !isNaN(paramSize) ? paramSize : size;
const paramSpeed = parseFloat(params.get("speed"));
speed = !isNaN(paramSpeed) ? paramSpeed : speed;

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const noiseGen = new SimplexNoise();
let cols, rows, cellSize;

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  cellSize = Math.min(canvas.width, canvas.height) / 100;
  cols = Math.ceil(canvas.width / cellSize);
  rows = Math.ceil(canvas.height / cellSize);
}
window.addEventListener('resize', resize);
resize();

function draw(t) {
  const time = t * 0.0003 * speed;
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      const n = noiseGen.noise(x * 0.04 / size, y * 0.04 / size, time) * 0.5 + 0.5;
      ctx.fillStyle = heatMapColor(n);
      ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);
    }
  }
  requestAnimationFrame(draw);
}
requestAnimationFrame(draw);
