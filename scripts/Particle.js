class Particle {
    constructor(x,y,mass,id) {
        this.pos = createVector(x, y);
        this.acceleration = createVector(0,0);
        this.velocity = createVector(0,0);
        this.mass = mass;
        this.targetMass = mass;

        //mass = 2r * PI
        //mass / PI = 2r
        //2 = mass / 2PI
        this.radius;
        this.diameter;
        this.id = id;

        this.strokeWeight = 2;
        this.stroke = '#34495e';
        this.fill = '#2980b9'
    }

    handleCollisions() {
        stroke(this.stroke)
        particles.forEach(particle => {
            if (checkCollision(this, particle) && this.id !== particle.id) {
                collisionResponse(this, particle)
            }
        })


        // floor collisions
        if (this.pos.y + this.radius >= height) {
            this.pos.y = height - this.radius;
            this.velocity.mult(createVector(1,-1))
        }

        // wall collision
        if (this.pos.x + this.radius >= width) {
            this.pos.x = width - this.radius;
            this.velocity.mult(createVector(-1,1))
        } else if (this.pos.x - this.radius < 0) {
            this.pos.x = this.radius;
            this.velocity.mult(createVector(-1,1))
        }
    }

    applyForce(force) {
        let f = p5.Vector.div(force, this.mass);
        this.acceleration.add(f);
    }

    update() {
        this.radius = this.mass / (PI * 2) + 10;
        this.diameter = this.radius * 2;

        if (this.targetMass > this.mass) {
            this.mass += 5;
        }


        const steppedAcc = p5.Vector.div(this.acceleration, 8)
        for (let i = 0; i < 2; i ++) {
            this.handleCollisions();
            this.velocity.add(steppedAcc);
            this.velocity.mult(.99)
            this.pos.add(this.velocity);
            this.acceleration.mult(0);
            
        }
        this.show();
    }

    show() {
        strokeWeight(2)
        fill(this.fill)
        ellipse(this.pos.x, this.pos.y, this.diameter - this.strokeWeight, this.diameter - this.strokeWeight)
    }
}