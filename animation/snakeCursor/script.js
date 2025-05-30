const canvas = document.getElementById("snakeCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

class Segment {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.vx = 0; // Velocity in x-direction
    this.vy = 0; // Velocity in y-direction
  }
}

class Snake {
  constructor(segmentCount, segmentLength) {
    this.segments = [];
    for (let i = 0; i < segmentCount; i++) {
      this.segments.push(new Segment(canvas.width / 2, canvas.height / 2));
    }
    this.segmentLength = segmentLength;
    this.mouse = { x: canvas.width / 2, y: canvas.height / 2 };
    this.maxSpeed = 5; // Maximum speed of the snake's head
    this.acceleration = 0.2; // Acceleration rate
    this.friction = 0.05; // Friction coefficient
  }

  update() {
    const head = this.segments[0];

    // Calculate desired direction
    const dx = this.mouse.x - head.x;
    const dy = this.mouse.y - head.y;
    const angle = Math.atan2(dy, dx);

    // Calculate desired velocity
    const desiredVx = Math.cos(angle) * this.maxSpeed;
    const desiredVy = Math.sin(angle) * this.maxSpeed;

    // Apply acceleration towards desired velocity
    head.vx += (desiredVx - head.vx) * this.acceleration;
    head.vy += (desiredVy - head.vy) * this.acceleration;

    // Apply friction
    head.vx *= 1 - this.friction;
    head.vy *= 1 - this.friction;

    // Update head position
    head.x += head.vx;
    head.y += head.vy;

    // Update remaining segments with easing
    const ease = 0.1;
    for (let i = 1; i < this.segments.length; i++) {
      const prev = this.segments[i - 1];
      const current = this.segments[i];
      const dx = prev.x - current.x;
      const dy = prev.y - current.y;
      const distance = Math.hypot(dx, dy);

      if (distance > this.segmentLength) {
        const angle = Math.atan2(dy, dx);
        current.x += Math.cos(angle) * ease * (distance - this.segmentLength);
        current.y += Math.sin(angle) * ease * (distance - this.segmentLength);
      }
    }
  }

  draw() {
    ctx.lineWidth = 6;
    ctx.strokeStyle = "rgba(255, 255, 255, 0.8)";

    // Draw skeleton (connected sticks with glowing effect)
    for (let i = 0; i < this.segments.length - 1; i++) {
      const current = this.segments[i];
      const next = this.segments[i + 1];

      ctx.beginPath();
      ctx.moveTo(current.x, current.y);
      ctx.lineTo(next.x, next.y);
      ctx.stroke();
      ctx.closePath();
    }

    // Draw head bone with glow
    const head = this.segments[0];
    ctx.beginPath();
    ctx.arc(head.x, head.y, 12, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
    ctx.shadowColor = "white";
    ctx.shadowBlur = 20;
    ctx.fill();
    ctx.closePath();
    ctx.shadowBlur = 0; // Reset shadow blur

    // Draw segment joints for a dynamic glowing skeleton effect
    for (let i = 1; i < this.segments.length; i += 5) {
      const segment = this.segments[i];
      ctx.beginPath();
      ctx.arc(segment.x, segment.y, 8, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(173, 216, 230, 0.8)";
      ctx.fill();
      ctx.closePath();
    }
  }
}

const snake = new Snake(50, 10);

canvas.addEventListener("mousemove", (e) => {
  const rect = canvas.getBoundingClientRect();
  snake.mouse.x = e.clientX - rect.left;
  snake.mouse.y = e.clientY - rect.top;
});

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  snake.update();
  snake.draw();
  requestAnimationFrame(animate);
}

animate();

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});
