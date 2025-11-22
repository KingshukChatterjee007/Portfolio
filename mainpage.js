// Loading Screen
window.addEventListener('load', function() {
    setTimeout(function() {
        const loadingScreen = document.getElementById('loading-screen');
        if(loadingScreen) {
            loadingScreen.classList.add('hidden');
        }
        checkScrollReveal();
        initGlitchText();
        initMatrixRain(); // Start Data Rain
    }, 650);
});

// ==========================================
//  1. DATA RAIN EFFECT (NEW)
// ==========================================
function initMatrixRain() {
    const canvas = document.getElementById('matrix-rain');
    if(!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let width, height;
    
    // Resize handling
    function resize() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resize);
    resize();
    
    // Configuration
    const columns = Math.floor(width / 20); // 20px char width
    const drops = [];
    const chars = "0101012345789ABCDEFGHIJKLMNOPQRSTUVWXYZ<>/\\@#$%^&*";
    
    // Initialize drops
    for(let i = 0; i < columns; i++) {
        drops[i] = Math.random() * -100; // Start above screen randomly
    }
    
    function draw() {
        // Transparent black overlay to create "trail" effect
        // Lower opacity = longer trails
        ctx.fillStyle = "rgba(5, 5, 5, 0.05)"; 
        ctx.fillRect(0, 0, width, height);
        
        ctx.font = "14px 'IBM Plex Mono'";
        
        for(let i = 0; i < drops.length; i++) {
            const text = chars.charAt(Math.floor(Math.random() * chars.length));
            
            // Alternate between theme colors for characters
            if(Math.random() > 0.95) {
                ctx.fillStyle = "#ff0055"; // Pink Accents
            } else {
                ctx.fillStyle = "#00f3ff"; // Cyan Main
            }
            
            ctx.fillText(text, i * 20, drops[i] * 20);
            
            // Reset drop if it goes off screen
            if(drops[i] * 20 > height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            
            drops[i]++;
        }
        requestAnimationFrame(draw);
    }
    
    draw();
}

// ==========================================
//  2. AUDIO VISUALIZER LOGIC
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
//  3. GRANULAR SCROLL REVEAL
// ==========================================
const revealElements = document.querySelectorAll('section, .project-card, .skill-item, .timeline-item');

function checkScrollReveal() {
    const triggerBottom = window.innerHeight * 0.9; 
    
    revealElements.forEach(box => {
        const boxTop = box.getBoundingClientRect().top;
        
        if(boxTop < triggerBottom) {
            box.classList.add('reveal-visible');
        }
    });
}
window.addEventListener('scroll', checkScrollReveal);

// ==========================================
//  4. SETUP FOR CSS GLITCH
// ==========================================
function initGlitchText() {
    const headers = document.querySelectorAll('h1, h2');
    headers.forEach(header => {
        header.setAttribute('data-text', header.innerText);
        header.classList.add('glitch-text');
    });
}

// ==========================================
//  5. STANDARD UTILS
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

console.log('%c✓ SYSTEM ONLINE.', 'color: #00f3ff; font-weight: bold; font-family: monospace;');