export function drawLines ({
  context,
  points,
  strokeStyle = "black",
  fillStyle
}) {
  points.forEach((p, i) => {
    const [x, y] = p;
    if (i === 0) {
      context.moveTo(x, y);
    } else {
      context.lineTo(x, y);
    }
  });

  context.strokeStyle = strokeStyle;
  context.stroke();

  if (fillStyle) {
    context.fillStyle = fillStyle;
    context.fill();
  }
}

export function drawRect({
  context,
  x = 0,
  y = 0,
  width = 256,
  height = 256,
  strokeStyle = "black",
  fillStyle
}) {
  if (fillStyle) {
    context.fillStyle = fillStyle;
    context.fillRect(x, y, width, height);
  }

  context.strokeStyle = strokeStyle;
  context.strokeRect(x, y, width, height);
}

export function drawRects({
  context,
  x = 0,
  y = 0,
  width = 256,
  height = 256,
  numOfRow = 1,
  numOfCol = 1,
  overlapped = true,
  strokeStyle,
  fillStyle
}) {
  const rowSide = (height - y) / numOfRow;
  const colSide = (width - x) / numOfCol;
  const halfColSide = colSide / 2;
  for (let row = 0; row < numOfRow; row++) {
    for (let col = 0; col < numOfCol; col++) {
      let x = colSide * col;
      const y = rowSide * row;
      if (overlapped && row % 2 == 0) {
        x = x - halfColSide;
        if (col === numOfCol - 1) {
          drawRect({
            context,
            x: x + colSide,
            y,
            width: colSide,
            height: rowSide,
            strokeStyle,
            fillStyle
          });
        }
      }

      drawRect({
        context,
        x,
        y,
        width: colSide,
        height: rowSide,
        strokeStyle,
        fillStyle
      });
    }
  }
}

export const DEG_180 = Math.PI;
export const DEG_360 = 2 * Math.PI;

export function drawCircle ({
  context,
  x = 0,
  y = 0,
  radius = 128,
  xRadius,
  yRadius,
  rotation = 0,
  strokeStyle = "black",
  fillStyle,
  startAngle = 0,
  endAngle = DEG_360
}) {
  const xR = xRadius || radius;
  const yR = yRadius || radius;
  context.beginPath()
  context.ellipse(x, y, xR, yR, rotation, startAngle, endAngle, true);
  if (fillStyle) {
    context.fillStyle = fillStyle;
    context.fill();
  }

  context.strokeStyle = strokeStyle;
  context.stroke();
  context.closePath()
}
