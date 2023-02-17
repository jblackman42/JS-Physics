// animatin loop
var fps, fpsInterval, startTime, now, then, elapsed;

function animate() {
    requestAnimationFrame(animate);
    
    now = Date.now();
    elapsed = now - then;

    if (elapsed > fpsInterval) {
        then = now - (elapsed % fpsInterval);
        draw();
    }
}

function startAnimating(fps) {
    fpsInterval = 1000 / fps;
    then = Date.now();
    startTime = then;
    animate();
}
if (typeof setup !== 'undefined' && typeof setup === 'function') {
    setup()
    if (typeof draw !== 'undefined' && typeof draw === 'function') {
        startAnimating(framerate);
    }
}