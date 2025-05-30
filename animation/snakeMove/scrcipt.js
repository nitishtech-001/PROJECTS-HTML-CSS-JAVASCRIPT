const canvas = document.getElementById('snakeCanvas');
    const ctx = canvas.getContext('2d');

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    class Segment {
      constructor(x, y) {
        this.x = x;
        this.y = y;
        this.vx = 0;
        this.vy = 0;
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
      }

      update() {
        const head = this.segments[0];
        const dx = this.mouse.x - head.x;
        const dy = this.mouse.y - head.y;

        const angle = Math.atan2(dy, dx);
        head.x += Math.cos(angle) * 5;
        head.y += Math.sin(angle) * 5;

        for (let i = 1; i < this.segments.length; i++) {
          const prev = this.segments[i - 1];
          const current = this.segments[i];
          const distance = Math.hypot(prev.x - current.x, prev.y - current.y);
          const angle = Math.atan2(prev.y - current.y, prev.x - current.x);

          current.x = prev.x - Math.cos(angle) * this.segmentLength;
          current.y = prev.y - Math.sin(angle) * this.segmentLength;
        }
      }

      draw() {
        ctx.beginPath();
        ctx.lineWidth = 2;
        ctx.strokeStyle = 'white';
        ctx.moveTo(this.segments[0].x, this.segments[0].y);

        for (let i = 1; i < this.segments.length; i++) {
          ctx.lineTo(this.segments[i].x, this.segments[i].y);
        }

        ctx.stroke();
        ctx.closePath();
      }
    }

    const snake = new Snake(50, 10);

    canvas.addEventListener('mousemove', (e) => {
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

    window.addEventListener('resize', () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    });