// Loading Screen
window.addEventListener('load', function() {
    setTimeout(function() {
        const loadingScreen = document.getElementById('loading-screen');
        if(loadingScreen) {
            loadingScreen.classList.add('hidden');
        }
    }, 1800);
});

// Music Toggle Logic
let musicPlaying = false;

function toggleMusic() {
    // We define these INSIDE the function to ensure they exist when you click
    const audioTrack = document.getElementById('bg-music');
    const musicLabel = document.getElementById('music-label');
    const musicBtn = document.querySelector('.music-toggle');
    
    // Toggle state
    musicPlaying = !musicPlaying;
    
    if (musicPlaying) {
        // Case: Turn ON
        musicLabel.textContent = 'AUDIO ON';
        musicBtn.classList.add('active');
        
        if(audioTrack) {
            audioTrack.volume = 0.3; // 30% volume
            var playPromise = audioTrack.play();
            
            if (playPromise !== undefined) {
                playPromise.then(_ => {
                    // Playback started!
                    console.log("Audio started playing");
                })
                .catch(error => {
                    console.log("Audio playback failed:", error);
                    alert("⚠ Audio Error: Check if 'cyberpunk_music.mp3' is in the folder.");
                });
            }
        } else {
            alert("Error: <audio> tag not found in HTML");
        }

    } else {
        // Case: Turn OFF
        musicLabel.textContent = 'AUDIO OFF';
        musicBtn.classList.remove('active');
        
        if(audioTrack) {
            audioTrack.pause();
        }
    }
}

// Contact Form with Formspree
const form = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');

if (form) {
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const submitBtn = form.querySelector('.btn-submit');
        const originalText = submitBtn.textContent;
        
        submitBtn.disabled = true;
        submitBtn.textContent = 'TRANSMITTING...';
        if(formStatus) formStatus.style.display = 'none';
        
        try {
            const response = await fetch(form.action, {
                method: 'POST',
                body: new FormData(form),
                headers: {
                    'Accept': 'application/json'
                }
            });
            
            if (response.ok) {
                if(formStatus) {
                    formStatus.textContent = '✓ MESSAGE TRANSMITTED SUCCESSFULLY!';
                    formStatus.className = 'form-status success';
                    formStatus.style.display = 'block';
                }
                form.reset();
            } else {
                throw new Error('Form submission failed');
            }
        } catch (error) {
            if(formStatus) {
                formStatus.textContent = '⚠ TRANSMISSION ERROR: Please try again.';
                formStatus.className = 'form-status error';
                formStatus.style.display = 'block';
            }
        } finally {
            submitBtn.disabled = false;
            submitBtn.textContent = originalText;
        }
    });
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
            console.log('AVAILABLE COMMANDS: help, about, stats, skills, ascii, clear');
            break;
        case 'about':
            console.log('Kingshuk Chatterjee | Cyberpunk Architect');
            break;
        case 'clear':
            console.clear();
            break;
        default:
            console.log('⚠ Command not recognized.');
    }
}

// Konami Code Easter Egg
let konamiCode = [];
const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', function(e) {
    konamiCode.push(e.key);
    konamiCode = konamiCode.slice(-10);
    
    if (konamiCode.join(',') === konamiSequence.join(',')) {
        alert('🎮 KONAMI CODE ACTIVATED! COLOR OVERRIDE ENGAGED!');
        document.documentElement.style.setProperty('--neon-cyan', '#ff00ff');
        document.documentElement.style.setProperty('--neon-pink', '#00ff00');
    }
});

// OPTIMIZED PARALLAX EFFECT
const parallaxElements = document.querySelectorAll('section');
let ticking = false;

window.addEventListener('scroll', function() {
    if (!ticking) {
        window.requestAnimationFrame(function() {
            const scrolled = window.pageYOffset;
            parallaxElements.forEach((element, index) => {
                const speed = 0.05 + (index * 0.02);
                const yPos = -(scrolled * speed);
                element.style.transform = `translateY(${yPos}px)`;
            });
            ticking = false;
        });
        ticking = true;
    }
});

// OPTIMIZED GLITCH EFFECT
setInterval(() => {
    const elements = document.querySelectorAll('h2, h3');
    if(elements.length > 0) {
        const randomElement = elements[Math.floor(Math.random() * elements.length)];
        if (Math.random() > 0.98) {
            const originalShadow = randomElement.style.textShadow;
            randomElement.style.textShadow = '3px 3px 0 rgba(255,0,85,0.8), -3px -3px 0 rgba(0,243,255,0.8)';
            setTimeout(() => {
                randomElement.style.textShadow = originalShadow;
            }, 100);
        }
    }
}, 3000);

console.log('%c✓ NEURAL LINK ESTABLISHED.', 'color: #00f3ff; font-weight: bold; font-family: monospace;');