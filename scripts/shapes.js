function drawCirle(x, y, d, stroke, fill) {
  
    ctx.lineWidth = 3;
    ctx.strokeStyle = stroke;
    ctx.fillStyle = fill;
    ctx.beginPath();
    ctx.arc(x, y, d/2, 0, 2 * Math.PI, true);
    ctx.stroke();
    ctx.fill();
}

const background = (color) => {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.fillRect(0,0,width,height)
}