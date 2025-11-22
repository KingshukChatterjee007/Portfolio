// Loading Screen
window.addEventListener('load', function() {
    setTimeout(function() {
        const loadingScreen = document.getElementById('loading-screen');
        if(loadingScreen) {
            loadingScreen.classList.add('hidden');
        }
        // Trigger reveal for sections already in view on load
        checkScrollReveal();
    }, 1800);
});

// ==========================================
//  1. ROBUST MUSIC LOGIC
// ==========================================
let musicPlaying = false;

function toggleMusic() {
    const audioTrack = document.getElementById('bg-music');
    const musicLabel = document.getElementById('music-label');
    const musicBtn = document.querySelector('.music-toggle');
    
    musicPlaying = !musicPlaying;
    
    if (musicPlaying) {
        musicLabel.textContent = 'AUDIO ON';
        musicBtn.classList.add('active');
        
        if(audioTrack) {
            audioTrack.volume = 0.3;
            var playPromise = audioTrack.play();
            
            if (playPromise !== undefined) {
                playPromise.then(_ => { console.log("Audio started"); })
                .catch(error => {
                    console.log("Audio error:", error);
                    alert("⚠ Audio Error: Ensure 'cyberpunk_music.mp3' is uploaded.");
                });
            }
        } else {
            alert("Error: <audio> tag not found");
        }
    } else {
        musicLabel.textContent = 'AUDIO OFF';
        musicBtn.classList.remove('active');
        if(audioTrack) audioTrack.pause();
    }
}

// ==========================================
//  2. SCROLL REVEAL ANIMATION
// ==========================================
const revealElements = document.querySelectorAll('section');

function checkScrollReveal() {
    const triggerBottom = window.innerHeight * 0.85; // Trigger when 85% down the viewport
    
    revealElements.forEach(box => {
        const boxTop = box.getBoundingClientRect().top;
        if(boxTop < triggerBottom) {
            box.classList.add('visible-section');
        }
    });
}

window.addEventListener('scroll', checkScrollReveal);


// ==========================================
//  3. "HACKER" TEXT DECODE EFFECT
// ==========================================
const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*()_+-=[]{}|;':,./<>?";

function hackerEffect(event) {
    let iterations = 0;
    const target = event.target;
    const originalText = target.dataset.value || target.innerText;
    
    // Store original text in data-attribute if not present, so we don't lose it
    if (!target.dataset.value) target.dataset.value = originalText;
    
    const interval = setInterval(() => {
        target.innerText = originalText.split("")
            .map((letter, index) => {
                if(index < iterations) {
                    return originalText[index];
                }
                return letters[Math.floor(Math.random() * letters.length)];
            })
            .join("");
        
        if(iterations >= originalText.length) {
            clearInterval(interval);
        }
        
        iterations += 1 / 3;
    }, 30);
}

// Attach effect to Main Title and Section Headers
document.querySelector('h1').onmouseover = hackerEffect;
document.querySelectorAll('h2').forEach(header => {
    header.onmouseover = hackerEffect;
});


// ==========================================
//  4. STANDARD FUNCTIONALITY (Form, Scroll)
// ==========================================

// Contact Form
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
                headers: { 'Accept': 'application/json' }
            });
            if (response.ok) {
                if(formStatus) {
                    formStatus.textContent = '✓ MESSAGE TRANSMITTED!';
                    formStatus.className = 'form-status success';
                    formStatus.style.display = 'block';
                }
                form.reset();
            } else throw new Error('Failed');
        } catch (error) {
            if(formStatus) {
                formStatus.textContent = '⚠ TRANSMISSION ERROR';
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

// Konami Code
let konamiCode = [];
const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', function(e) {
    konamiCode.push(e.key);
    konamiCode = konamiCode.slice(-10);
    if (konamiCode.join(',') === konamiSequence.join(',')) {
        alert('🎮 KONAMI CODE ACTIVATED! NEON OVERDRIVE!');
        document.documentElement.style.setProperty('--neon-cyan', '#ff00ff');
        document.documentElement.style.setProperty('--neon-pink', '#00ff00');
    }
});

// Glitch Effect (Interval)
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

console.log('%c✓ SYSTEM UPGRADE COMPLETE.', 'color: #00f3ff; font-weight: bold; font-family: monospace;');