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

export function drawRects({
  context,
  x = 0,
  y = 0,
  width = 256,
  height = 256,
  numOfRow = 1,
  numOfCol = 1,
  overlapped = true
}) {
  const rowSide = (height - y) / numOfRow;
  const colSide = (width - x) / numOfCol;
  const halfColSide = colSide / 2;
  for (let row = 0; row < numOfRow; row++) {
    for (let col = 0; col < numOfCol; col++) {
      const x = colSide * col;
      const y = rowSide * row;
      if (overlapped && row % 2 == 0) {
        context.strokeRect(x - halfColSide, y, colSide, rowSide);
      } else {
        context.strokeRect(x, y, colSide, rowSide);
      }
    }
  }
}
