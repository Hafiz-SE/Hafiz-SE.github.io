// Spider Web Effect with Mouse Hover Reactivity
const canvas = document.getElementById('webEffect');
const ctx = canvas.getContext('2d');
let particles = [];
let mouse = { x: undefined, y: undefined, radius: 100 };

// Particle Object
function Particle(x, y, size, speedX, speedY) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.speedX = speedX;
    this.speedY = speedY;
}

// Create and animate particles
function createParticles() {
    particles = [];
    for (let i = 0; i < 100; i++) {
        let size = Math.random() * 2 + 1;
        let x = Math.random() * canvas.width;
        let y = Math.random() * canvas.height;
        let speedX = (Math.random() * 0.5) - 0.25;
        let speedY = (Math.random() * 0.5) - 0.25;
        particles.push(new Particle(x, y, size, speedX, speedY));
    }
}

function drawParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#00aaff';
    ctx.lineWidth = 0.5;

    for (let i = 0; i < particles.length; i++) {
        let p = particles[i];
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();

        p.x += p.speedX;
        p.y += p.speedY;

        // Reset position if out of bounds
        if (p.x < 0 || p.x > canvas.width || p.y < 0 || p.y > canvas.height) {
            p.x = Math.random() * canvas.width;
            p.y = Math.random() * canvas.height;
        }

        // React to mouse hover
        let distance = Math.sqrt((mouse.x - p.x) ** 2 + (mouse.y - p.y) ** 2);
        if (distance < mouse.radius) {
            ctx.strokeStyle = `rgba(0, 170, 255, ${1 - distance / 150})`;
            ctx.beginPath();
            ctx.moveTo(mouse.x, mouse.y);
            ctx.lineTo(p.x, p.y);
            ctx.stroke();
        }

        // Connect particles with lines
        for (let j = i + 1; j < particles.length; j++) {
            let p2 = particles[j];
            let dist = Math.sqrt((p.x - p2.x) ** 2 + (p.y - p2.y) ** 2);
            if (dist < 150) {
                ctx.strokeStyle = `rgba(0, 170, 255, ${1 - dist / 150})`;
                ctx.beginPath();
                ctx.moveTo(p.x, p.y);
                ctx.lineTo(p2.x, p2.y);
                ctx.stroke();
            }
        }
    }
}

function animateParticles() {
    drawParticles();
    requestAnimationFrame(animateParticles);
}

// Resize the canvas and reinitialize particles
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    createParticles();
});

// Track mouse movement
window.addEventListener('mousemove', (e) => {
    mouse.x = e.x;
    mouse.y = e.y;
});

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
createParticles();
animateParticles();
