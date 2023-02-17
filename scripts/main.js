const canvas = document.getElementById('physics-canvas');
const ctx = canvas.getContext('2d');
const framerate = 24;
const width = 1280, height = 720;

const setup = () => {
    ctx.canvas.width  = width;
    ctx.canvas.height = height;
}

let x = width/2, y = height/2;

let xVel = 1;
let yVel = 1;
const speed = 10;

const draw = () => {
    // background('#ecf0f1')

    const diameter = 100;
    drawCirle(x,y, diameter, '#34495e', '#2980b9')

    if (x + (diameter / 2) > width || x - (diameter / 2) < 0) {
        xVel *= -1;
    }

    if (y + (diameter / 2) > height || y - (diameter / 2) < 0) {
        yVel *= -1;
    }
    
    x += xVel * speed;
    y += yVel * speed;
}