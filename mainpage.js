// Loading Screen
window.addEventListener('load', function() {
    setTimeout(function() {
        document.getElementById('loading-screen').classList.add('hidden');
    }, 1800);
});

// Music Toggle
let musicPlaying = false;
function toggleMusic() {
    musicPlaying = !musicPlaying;
    document.getElementById('music-status').textContent = musicPlaying ? 'ON' : 'OFF';
    if (musicPlaying) {
        console.log('🎵 Retro synth music would play here');
    }
}

// Contact Form
function sendMessage() {
    const name = document.getElementById('contact-name').value;
    const email = document.getElementById('contact-email').value;
    const message = document.getElementById('contact-message').value;
    
    if (name && email && message) {
        alert('✓ MESSAGE TRANSMITTED SUCCESSFULLY\n\nThank you for reaching out! I will respond soon.');
        document.getElementById('contact-name').value = '';
        document.getElementById('contact-email').value = '';
        document.getElementById('contact-message').value = '';
    } else {
        alert('⚠ ERROR: All fields required for transmission');
    }
}

// Smooth Scroll
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// Easter Egg Console Commands
document.addEventListener('keydown', function(e) {
    if (e.ctrlKey && e.key === '`') {
        const command = prompt('SYSTEM TERMINAL\n\nType "help" for commands:');
        if (command) {
            processCommand(command.toLowerCase());
        }
    }
});

function processCommand(cmd) {
    switch(cmd) {
        case 'help':
            console.log(`
╔══════════════════════════════════════╗
║  AVAILABLE COMMANDS                  ║
╠══════════════════════════════════════╣
║  help     - Show this message        ║
║  about    - Display bio              ║
║  stats    - Show statistics          ║
║  skills   - List all skills          ║
║  ascii    - Display ASCII art        ║
║  clear    - Clear console            ║
╚══════════════════════════════════════╝
            `);
            break;
        case 'about':
            console.log('Kingshuk Chatterjee | Designer • Developer • Creator\nMumbai, India | IBM Certified | Open Source Enthusiast');
            break;
        case 'stats':
            console.log('LeetCode: 566+ problems solved\nProjects: 20+\nCertifications: IBM Python AI\nDesign Rank: Top 3');
            break;
        case 'skills':
            console.log('UX/UI • Machine Learning • Data Analytics • Web Dev • 3D Design • Video Editing • Cloud Tech');
            break;
        case 'ascii':
            console.log(`
    ██╗  ██╗ ██████╗
    ██║ ██╔╝██╔════╝
    █████╔╝ ██║     
    ██╔═██╗ ██║     
    ██║  ██╗╚██████╗
    ╚═╝  ╚═╝ ╚═════╝
    KINGSHUK CHATTERJEE
            `);
            break;
        case 'clear':
            console.clear();
            console.log('Console cleared. Type Ctrl+` for terminal access.');
            break;
        default:
            console.log('⚠ Command not recognized. Type "help" for available commands.');
    }
}

// Project Card Interactions
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('click', function() {
        const title = this.querySelector('h3').textContent;
        console.log(`📂 Opening project: ${title}`);
    });
});

// Konami Code Easter Egg
let konamiCode = [];
const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', function(e) {
    konamiCode.push(e.key);
    konamiCode = konamiCode.slice(-10);
    
    if (konamiCode.join(',') === konamiSequence.join(',')) {
        activateEasterEgg();
    }
});

function activateEasterEgg() {
    const root = document.documentElement;
    
    // Rainbow mode
    let hue = 0;
    const interval = setInterval(() => {
        hue = (hue + 1) % 360;
        root.style.setProperty('--amber', `hsl(${hue}, 70%, 60%)`);
        root.style.setProperty('--teal', `hsl(${(hue + 120) % 360}, 70%, 60%)`);
        root.style.setProperty('--neon-red', `hsl(${(hue + 240) % 360}, 70%, 60%)`);
    }, 50);

    alert('🎮 KONAMI CODE ACTIVATED!\n\nRAINBOW MODE ENABLED!\n\nRefresh page to restore normal colors.');
}

// Initialize console message
console.log('%c╔═══════════════════════════════════════════════════╗', 'color: #ffb347; font-family: monospace;');
console.log('%c║  WELCOME TO KINGSHUK CHATTERJEE\'S PORTFOLIO      ║', 'color: #5ab9b4; font-family: monospace;');
console.log('%c║  Press Ctrl + ` to access the terminal           ║', 'color: #f4e8d8; font-family: monospace;');
console.log('%c║  Try the Konami Code for a surprise! ↑↑↓↓←→←→BA  ║', 'color: #ff6b6b; font-family: monospace;');
console.log('%c╚═══════════════════════════════════════════════════╝', 'color: #ffb347; font-family: monospace;');

// Parallax Effect on Scroll
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('section');
    
    parallaxElements.forEach((element, index) => {
        const speed = 0.5 + (index * 0.1);
        const yPos = -(scrolled * speed / 10);
        element.style.transform = `translateY(${yPos}px)`;
    });
});

// Random Glitch Effect
setInterval(() => {
    const elements = document.querySelectorAll('h2, h3');
    const randomElement = elements[Math.floor(Math.random() * elements.length)];
    
    if (Math.random() > 0.95) {
        randomElement.style.textShadow = '3px 3px 0 rgba(255,107,107,0.8), -3px -3px 0 rgba(90,185,180,0.8)';
        setTimeout(() => {
            randomElement.style.textShadow = '';
        }, 100);
    }
}, 2000);

// Cursor Trail Effect
const cursor = document.createElement('div');
cursor.style.cssText = `
    position: fixed;
    width: 10px;
    height: 10px;
    border: 2px solid var(--amber);
    border-radius: 50%;
    pointer-events: none;
    z-index: 9999;
    opacity: 0.6;
    transition: all 0.15s ease;
`;
document.body.appendChild(cursor);

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX - 5 + 'px';
    cursor.style.top = e.clientY - 5 + 'px';
});

// Interactive Stats Counter
const stats = document.querySelectorAll('.stat-item span:last-child');
const observerOptions = {
    threshold: 0.5
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const target = entry.target;
            const text = target.textContent;
            if (text.includes('+')) {
                const number = parseInt(text);
                animateCounter(target, 0, number, 1500);
            }
        }
    });
}, observerOptions);

function animateCounter(element, start, end, duration) {
    const range = end - start;
    const increment = range / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= end) {
            element.textContent = end + '+';
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current) + '+';
        }
    }, 16);
}

stats.forEach(stat => observer.observe(stat));

// Log initialization complete
console.log('%c✓ All systems initialized. Portfolio ready.', 'color: #5ab9b4; font-weight: bold; font-family: monospace;');