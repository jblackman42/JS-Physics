const particleSize = 10;
let isMouseOnCanvas;

let particles = [];
function setup() {
    const cnv = createCanvas(1920, 1080);
    cnv.mouseOver(() => isMouseOnCanvas = true);
    cnv.mouseOut(() => isMouseOnCanvas = false);


    background('#ecf0f1');

    const particleCount = 500;
    
    const horizontalForce = 70;
    createParticles(100,100, createVector(-horizontalForce,25), particleCount);
    createParticles(width - 100,100, createVector(horizontalForce,25), particleCount);

    // createParticles(-100,height+100, createVector(50,0), particleCount);
    // createParticles(width + 100,height+100, createVector(-50,0), particleCount);
}

const createParticles = async (x,y,initialForce,length) => {
    for (let i = 0; i < length; i ++) {
        const newParticle = new Particle(x,y,particleSize, uniqueId());
        newParticle.applyForce(initialForce)

        particles.push(newParticle)

        await sleep(100);
    }
}

const mouseForce = () => {
    const forceSize = 500;
    const forceStrength = 5;
    const mousePos = createVector(mouseX, mouseY)
    stroke('#789ABC');
    fill('#00000000')
    // ellipse(mouseX, mouseY, forceSize)
    
    particles.forEach(particle => {
        const distBetween = p5.Vector.sub(particle.pos, mousePos)
        const isColliding = distBetween.mag() < particle.radius + (forceSize / 2);

        if (isColliding) {
            const pushForce = p5.Vector.sub(particle.pos, mousePos);
            pushForce.normalize().mult(-forceStrength * particle.mass);

            particle.applyForce(pushForce)
        }
    })
}

function draw() {
    background('#ecf0f1');

    // particles[0].pos.x = mouseX;
    // particles[0].pos.y = mouseY;
    if (isMouseOnCanvas) mouseForce();

    particles.forEach(particle => {
        // const gravity = p5.Vector.sub(createVector(width/2,height/2), particle.pos);
        // gravity.normalize().mult(1);
        const gravity = createVector(0,particle.mass * 1)
        particle.applyForce(gravity)
        particle.update();
    })

    // checkCollision(particles[0], particles[1])
}


const checkCollision = (p1,p2) => { //p1 = particle 1 | p2 = particle 2
    const distBetween = p5.Vector.sub(p1.pos, p2.pos)
    return distBetween.mag() < p1.radius + p2.radius;
}

const collisionResponse = (p1, p2) => {
    const dist = p5.Vector.sub(p1.pos, p2.pos); //distance between two particles

    const distNormal = dist.copy();
    const overlap = (p1.radius + p2.radius) - distNormal.mag();//how much they are overlapping
    distNormal.normalize().mult(overlap/2) //set length of vector to how much they are overlapping
    p1.pos.add(distNormal)
    p2.pos.add(distNormal.mult(-1))

    // if collision is too great destroy particle 1
    if (dist.mag() < ((p1.radius + p2.radius) * .6)) {
        particles = particles.filter(particle => particle.id !== p1.id);
        p1.stroke = '#FF0000'
        p2.targetMass += p1.mass;
        // console.log(`particle ${p2.id} ate ${p1.id}`)
        return;
    }
    
    const restitution = .8;
    // calc new velocity
    const normal = dist.normalize();
    const relVel = p1.velocity.copy().sub(p2.velocity);
    const sepVel = relVel.dot(normal);
    const newSepVel1 = -sepVel;
    const sepVelVec = normal.mult(newSepVel1).mult(restitution);
    p1.velocity.add(sepVelVec)
    p2.velocity.add(sepVelVec.mult(-1))
}

function drawArrow(base, vec, myColor = '#FF0000') {
    push();
    stroke(myColor);
    strokeWeight(3);
    fill(myColor);
    translate(base.x, base.y);
    line(0, 0, vec.x, vec.y);
    rotate(vec.heading());
    let arrowSize = 7;
    translate(vec.mag() - arrowSize, 0);
    triangle(0, arrowSize / 2, 0, -arrowSize / 2, arrowSize, 0);
    pop();
}
// a custom 'sleep' or wait' function, that returns a Promise that resolves only after a timeout
function sleep(millisecondsDuration)
{
  return new Promise((resolve) => {
    setTimeout(resolve, millisecondsDuration);
  })
}

const uniqueId = () => {
    const dateString = Date.now().toString(36);
    const randomness = Math.random().toString(36).substr(2);
    return dateString + randomness;
};