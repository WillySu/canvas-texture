export function drawLines ({ context, points }) {
  points.forEach((p, i) => {
    const [x, y] = p;
    if (i === 0) {
      context.moveTo(x, y);
    } else {
      context.lineTo(x, y);
    }
  });

  context.stroke();
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
    const previousFillStyle = context.fillStyle;
    context.fillStyle = fillStyle;
    context.fillRect(x, y, width, height);
    context.fillStyle = previousFillStyle;
  }

  const previousStrokeStyle = context.strokeStyle;
  context.strokeStyle = strokeStyle;
  context.strokeRect(x, y, width, height);
  context.strokeStyle = previousStrokeStyle;
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
