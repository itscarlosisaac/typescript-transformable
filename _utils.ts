function createIdentityMatrix(n: number) {
  const length = n * n;
  const matrix: number[] = [];

  for (let i = 0; i < length; ++i) {
    matrix[i] = i % (n + 1) ? 0 : 1;
  }
  return matrix;
}

export function transpose(
  matrix: number[],
  n: number = Math.sqrt(matrix.length)
) {
  const newMatrix: number[] = [];

  for (let i = 0; i < n; ++i) {
    for (let j = 0; j < n; ++j) {
      newMatrix[j * n + i] = matrix[n * i + j];
    }
  }
  return newMatrix;
}

function createCoordinatePlane(gridSpacing: number): void {
  // Create a canvas element
  const canvas = document.createElement('canvas');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  canvas.style = 'position: absolute; left: 0; top:0; z-index:1; opacity: 0.8';
  document.body.appendChild(canvas);

  const ctx = canvas.getContext('2d');
  if (!ctx) {
    return;
  }

  // Draw the coordinate plane
  drawGrid(ctx, canvas.width, canvas.height, gridSpacing);
}

function drawGrid(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  spacing: number
): void {
  ctx.beginPath();
  for (let x = 0; x <= width; x += spacing) {
    ctx.moveTo(x, 0);
    ctx.lineTo(x, height);
  }
  for (let y = 0; y <= height; y += spacing) {
    ctx.moveTo(0, y);
    ctx.lineTo(width, y);
  }
  ctx.strokeStyle = '#aaa';
  ctx.stroke();
}

createCoordinatePlane(20);
