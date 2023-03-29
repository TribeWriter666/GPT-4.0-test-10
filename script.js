const canvas = document.getElementById('glitchCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let hue = 0;

class Line {
  constructor(angle, radius, centerX, centerY) {
    this.angle = angle;
    this.radius = radius;
    this.centerX = centerX;
    this.centerY = centerY;
    this.x1 = this.centerX + Math.cos(this.angle) * this.radius;
    this.y1 = this.centerY + Math.sin(this.angle) * this.radius;
    this.x2 = this.centerX + Math.cos(this.angle + Math.PI) * this.radius;
    this.y2 = this.centerY + Math.sin(this.angle + Math.PI) * this.radius;
  }

  update() {
    this.angle += 0.01;
    this.x1 = this.centerX + Math.cos(this.angle) * this.radius;
    this.y1 = this.centerY + Math.sin(this.angle) * this.radius;
    this.x2 = this.centerX + Math.cos(this.angle + Math.PI) * this.radius;
    this.y2 = this.centerY + Math.sin(this.angle + Math.PI) * this.radius;
  }

  draw() {
    ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;
    ctx.beginPath();
    ctx.moveTo(this.x1, this.y1);
    ctx.lineTo(this.x2, this.y2);
    ctx.stroke();
  }
}

const lines = [];
const numLines = 150;
const centerX = canvas.width / 2;
const centerY = canvas.height / 2;

for (let i = 0; i < numLines; i++) {
  const angle = (i * (Math.PI * 2)) / numLines;
  const radius = canvas.width / 4;
  lines.push(new Line(angle, radius, centerX, centerY));
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  lines.forEach(line => {
    line.update();
    line.draw();
  });

  hue += 0.5;

  requestAnimationFrame(animate);
}

animate();
