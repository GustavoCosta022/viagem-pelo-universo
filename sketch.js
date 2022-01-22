
let stars = [];
let maxDist;

function setup() {
	createCanvas(windowWidth, windowHeight);
	noStroke();
	
	maxDist = 300;
	
	for (let i = 0; i < 1500; i++) {
		stars.push(new Star());
	}
	
	background(255);
}

function draw() {
	fill(5, 15);
	circle(width/2, height/2, maxDist*2);
	translate(width/2, height/2);
	
	for (let s of stars) {
		s.drawAndMove();
	}
}

function Star() {
	this.theta = random(TWO_PI);
	this.speed = random(1.5);
	this.vel = p5.Vector.fromAngle(this.theta, this.speed);
	this.pos = p5.Vector.fromAngle(this.theta, random(maxDist));
	
	if (random(1) < 0.5) {
		this.vel.mult(-1);
	}
	
	this.drawAndMove = function() {
		let d = dist(this.pos.x, this.pos.y, 0, 0);
		
		// draw
		let size = sqrt(this.speed) * d/80;
		let alpha = map(d, 0, maxDist/2, 0, 255);
		fill(alpha * 255, alpha);
		circle(this.pos.x, this.pos.y, size);
		
		// move
		this.pos.add(p5.Vector.mult(this.vel, sqrt(d)/20));
		
		if (d < 1.5) {
			this.pos = p5.Vector.fromAngle(this.theta, maxDist);
		} else if (d > maxDist + 10) {
			this.pos = p5.Vector.fromAngle(this.theta, 10);
		}
	}
}