// Loading Screen
window.addEventListener('load', function() {
    setTimeout(function() {
        const loadingScreen = document.getElementById('loading-screen');
        if(loadingScreen) {
            loadingScreen.classList.add('hidden');
        }
        checkScrollReveal();
    }, 1800);
});

// ==========================================
//  1. AUDIO VISUALIZER LOGIC
// ==========================================
let musicPlaying = false;
let audioContext;
let analyser;
let source;
let visualizerCanvas, vCtx;

function setupAudioContext() {
    if (audioContext) return;

    const AudioContext = window.AudioContext || window.webkitAudioContext;
    audioContext = new AudioContext();
    
    const audioTrack = document.getElementById('bg-music');
    
    source = audioContext.createMediaElementSource(audioTrack);
    analyser = audioContext.createAnalyser();
    
    source.connect(analyser);
    analyser.connect(audioContext.destination);
    
    analyser.fftSize = 256;
    
    visualizerCanvas = document.getElementById('audio-visualizer');
    vCtx = visualizerCanvas.getContext('2d');
    
    window.addEventListener('resize', resizeVisualizer);
    resizeVisualizer();
    
    renderVisualizerFrame();
}

function resizeVisualizer() {
    if(visualizerCanvas) {
        visualizerCanvas.width = window.innerWidth;
        visualizerCanvas.height = 200;
    }
}

function renderVisualizerFrame() {
    requestAnimationFrame(renderVisualizerFrame);
    if (!analyser) return;
    
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    
    analyser.getByteFrequencyData(dataArray);
    
    vCtx.clearRect(0, 0, visualizerCanvas.width, visualizerCanvas.height);
    
    const barWidth = (visualizerCanvas.width / bufferLength) * 2.5;
    let barHeight;
    let x = 0;
    
    for (let i = 0; i < bufferLength; i++) {
        barHeight = dataArray[i] / 1.5;
        
        const gradient = vCtx.createLinearGradient(0, visualizerCanvas.height - barHeight, 0, visualizerCanvas.height);
        gradient.addColorStop(0, '#00f3ff');
        gradient.addColorStop(1, '#bc13fe');
        
        vCtx.fillStyle = gradient;
        vCtx.fillRect(x, visualizerCanvas.height - barHeight, barWidth, barHeight);
        
        x += barWidth + 1;
    }
}

function toggleMusic() {
    const audioTrack = document.getElementById('bg-music');
    const musicLabel = document.getElementById('music-label');
    const musicBtn = document.querySelector('.music-toggle');
    
    setupAudioContext();
    
    if (audioContext.state === 'suspended') {
        audioContext.resume();
    }
    
    musicPlaying = !musicPlaying;
    
    if (musicPlaying) {
        musicLabel.textContent = 'AUDIO ON';
        musicBtn.classList.add('active');
        if(audioTrack) {
            audioTrack.volume = 0.3;
            audioTrack.play().catch(e => console.log("Play error:", e));
        }
    } else {
        musicLabel.textContent = 'AUDIO OFF';
        musicBtn.classList.remove('active');
        if(audioTrack) audioTrack.pause();
    }
}

// ==========================================
//  2. SCROLL REVEAL
// ==========================================
const revealElements = document.querySelectorAll('section');

function checkScrollReveal() {
    const triggerBottom = window.innerHeight * 0.85;
    revealElements.forEach(box => {
        const boxTop = box.getBoundingClientRect().top;
        if(boxTop < triggerBottom) {
            box.classList.add('visible-section');
        }
    });
}
window.addEventListener('scroll', checkScrollReveal);

// ==========================================
//  3. HACKER TEXT EFFECT (Only for Headers now)
// ==========================================
const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*()_+-=[]{}|;':,./<>?";

function hackerEffect(event) {
    let iterations = 0;
    const target = event.target;
    
    // Only apply to headers, not skill items anymore
    let textElement = target;
    if (target.tagName !== 'H1' && target.tagName !== 'H2') return; 

    const originalText = textElement.dataset.value || textElement.innerText;
    
    if (!textElement.dataset.value) textElement.dataset.value = originalText;
    
    const interval = setInterval(() => {
        textElement.innerText = originalText.split("")
            .map((letter, index) => {
                if(index < iterations) return originalText[index];
                return letters[Math.floor(Math.random() * letters.length)];
            })
            .join("");
        
        if(iterations >= originalText.length) clearInterval(interval);
        iterations += 1 / 3;
    }, 30);
}

// Attach to Main Title and Headers ONLY
document.querySelector('h1').onmouseover = hackerEffect;
document.querySelectorAll('h2').forEach(header => header.onmouseover = hackerEffect);

// REMOVED: The listener for .skill-item is gone.

// ==========================================
//  4. STANDARD UTILS
// ==========================================
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

document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

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

console.log('%c✓ SYSTEM ONLINE.', 'color: #00f3ff; font-weight: bold; font-family: monospace;');