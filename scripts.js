// Add smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Adjust header background color on scroll
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Spider Web Effect with Connected Circles
const canvas = document.getElementById('webEffect');
const ctx = canvas.getContext('2d');
let particles = [];
let mouse = {
    x: undefined,
    y: undefined
};

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

        if (p.x < 0 || p.x > canvas.width || p.y < 0 || p.y > canvas.height) {
            p.x = Math.random() * canvas.width;
            p.y = Math.random() * canvas.height;
        }

        // Connect particles with lines
        for (let j = i + 1; j < particles.length; j++) {
            let p2 = particles[j];
            let distance = Math.sqrt((p.x - p2.x) ** 2 + (p.y - p2.y) ** 2);
            if (distance < 150) {
                ctx.strokeStyle = `rgba(0, 170, 255, ${1 - distance / 150})`;
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

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    createParticles();
});

window.addEventListener('mousemove', (e) => {
    mouse.x = e.x;
    mouse.y = e.y;
});

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
createParticles();
animateParticles();

// Scroll reveal animation for sections
const sections = document.querySelectorAll('.about-section, .experience-section, .projects-section');

window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY + window.innerHeight;

    sections.forEach(section => {
        if (scrollPosition > section.offsetTop + 100) {
            section.classList.add('reveal'); // Trigger animation when section comes into view
        }
    });
});
