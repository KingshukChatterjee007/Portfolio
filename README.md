PORTFOLIO: Kingshuk Chatterjee

"The sky above the port was the color of television, tuned to a dead channel."

🚀 SYSTEM OVERVIEW

Welcome to the repository of my personal portfolio website. Designed with a high-fidelity Cyberpunk / Neon-Noir aesthetic, this project serves as a digital terminal to showcase my work as a multidisciplinary designer and developer.

It features a custom-built 3D engine for loading animations, a real-time audio frequency visualizer, and a responsive, holographic interface that feels alive.

🔗 Live Demo: Launch Portfolio.exe

⚡ KEY FEATURES

🖥️ Immersive Interface

3D Tesseract Loader: A custom CSS-only 3D wireframe cube with an internal "4D" lattice structure that rotates infinitely during system initialization.

CRT Scanlines: A subtle, animated scanline overlay that mimics retro-futuristic displays.

Neon Scrollbar: A custom webkit scrollbar that glows with a Cyan-to-Purple gradient.

Glassmorphism: Translucent, frosted-glass panels for project cards and sections to maintain background visibility.

🎵 Audio-Reactive Visualizer

Web Audio API: Real-time frequency analysis of the background track (cyberpunk_music.mp3).

Canvas Rendering: A dynamic HTML5 Canvas visualizer at the bottom of the screen that renders bars reacting to the music's bass and treble in sync.

Smart Toggling: One-click audio toggle with volume management and visual feedback.

🧩 Interactive Elements

Holographic Cards: Project cards that lift, glow, and reveal details on hover using 3D transforms.

Scroll Reveal: A custom Intersection Observer implementation that triggers granular, cascading entry animations for every element as you scroll.

Glitch Text: A CSS-only RGB split glitch effect on headers that triggers on hover, simulating a signal malfunction.

🛠️ TECHNICAL ARSENAL

This project was built using a pure, vanilla tech stack to ensure maximum performance and control over animations.

Core

Technology

Usage

Structure

Semantic markup, Canvas API for visualizer.

Styling

Flexbox/Grid, 3D Transforms, Keyframe Animations, Variables.

Logic

Web Audio API, Intersection Observer, DOM Manipulation.

Assets

Multimedia

Custom GIF backgrounds, MP3 audio, SVG icons.

📂 FILE STRUCTURE

root/
├── index.html          # Main DOM structure & Layout
├── mainpage.css        # All visual styles, animations, and responsive rules
├── mainpage.js         # Logic for Audio API, Scroll Reveal, and Preloader
├── cyberpunk_music.mp3 # Background ambient track
└── download.gif        # Main atmospheric background loop


🕹️ USER MANUAL

Initialization: Upon loading, the system presents a 3D Tesseract animation while assets decrypt.

Navigation: Use the neon-bordered navigation bar to jump between ABOUT, PROJECTS, SKILLS, and CONTACT.

Audio: Click the "AUDIO OFF" button in the bottom right to engage the Neural Link music. Watch the visualizer at the bottom react.

Projects: Hover over project cards for holographic details. Click to access the source code/deployment.

🎨 CUSTOMIZATION

To adapt this template for your own use:

Audio: Replace cyberpunk_music.mp3 with your own track.

Background: Swap download.gif with any high-res looped GIF or video.

Colors: Modify the root variables in mainpage.css:

:root {
    --neon-cyan: #00f3ff;  /* Primary Accent */
    --neon-pink: #ff0055;  /* Secondary Accent */
    --bg-dark: #050505;    /* Background Base */
}


🤝 CONTACT PROTOCOLS

kingshuk.chatterjee770@gmail.com

"The future is already here — it's just not very evenly distributed."

© 2025 Kingsshuk Chatterjee
