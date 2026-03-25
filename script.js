// Quiz Data
const questions = [
    {
        question: "What's your favorite way to spend a weekend?",
        options: [
            { emoji: "🛋️", text: "Cozy movie marathon" },
            { emoji: "🌟", text: "Adventure & exploring" },
            { emoji: "🍕", text: "Trying new food spots" },
            { emoji: "🎨", text: "Creative projects" }
        ]
    },
    {
        question: "Pick your spirit animal:",
        options: [
            { emoji: "🐱", text: "Cat - Independent & curious" },
            { emoji: "🐶", text: "Dog - Loyal & playful" },
            { emoji: "🦋", text: "Butterfly - Free & colorful" },
            { emoji: "🐼", text: "Panda - Chill & adorable" }
        ]
    },
    {
        question: "Your friends would describe you as:",
        options: [
            { emoji: "😂", text: "The funny one" },
            { emoji: "💝", text: "The caring one" },
            { emoji: "🤓", text: "The smart one" },
            { emoji: "✨", text: "The unique one" }
        ]
    },
    {
        question: "What's your superpower?",
        options: [
            { emoji: "🦸", text: "Making people smile" },
            { emoji: "🧠", text: "Solving any problem" },
            { emoji: "💫", text: "Spreading positivity" },
            { emoji: "🎭", text: "Being unpredictable" }
        ]
    },
    {
        question: "Choose a color vibe:",
        options: [
            { emoji: "💗", text: "Pink - Sweet & dreamy" },
            { emoji: "💜", text: "Purple - Mysterious & royal" },
            { emoji: "💛", text: "Yellow - Sunny & bright" },
            { emoji: "🌈", text: "Rainbow - All the vibes!" }
        ]
    }
];

// Analysis messages
const analysisMessages = [
    "Reading your aura...",
    "Calculating cuteness level...",
    "Scanning personality matrix...",
    "Analyzing your choices...",
    "Consulting the stars...",
    "Measuring awesome-ness...",
    "Detecting hidden traits...",
    "Finalizing results..."
];

let currentQuestion = 0;

// Initialize floating hearts
document.addEventListener('DOMContentLoaded', () => {
    createFloatingHearts();
});

function createFloatingHearts() {
    const container = document.getElementById('heartsContainer');
    const hearts = ['✨', '🌟', '🎯', '🔥', '⚡', '🎉', '😂'];
    
    setInterval(() => {
        if (document.querySelectorAll('.heart').length < 15) {
            const heart = document.createElement('div');
            heart.className = 'heart';
            heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
            heart.style.left = Math.random() * 100 + '%';
            heart.style.animationDuration = (Math.random() * 5 + 8) + 's';
            heart.style.fontSize = (Math.random() * 15 + 15) + 'px';
            container.appendChild(heart);
            
            setTimeout(() => heart.remove(), 13000);
        }
    }, 1500);
}

function showPage(pageId) {
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    document.getElementById(pageId).classList.add('active');
}

function startQuiz() {
    currentQuestion = 0;
    showPage('quizPage');
    loadQuestion();
}

function loadQuestion() {
    const q = questions[currentQuestion];
    document.getElementById('questionNumber').textContent = `Question ${currentQuestion + 1}/5`;
    document.getElementById('questionText').textContent = q.question;
    
    // Update progress bar
    const progress = ((currentQuestion) / questions.length) * 100;
    document.getElementById('progressFill').style.width = progress + '%';
    
    // Load options
    const container = document.getElementById('optionsContainer');
    container.innerHTML = '';
    
    q.options.forEach((opt, index) => {
        const btn = document.createElement('button');
        btn.className = 'option-btn';
        btn.innerHTML = `<span class="emoji">${opt.emoji}</span> ${opt.text}`;
        btn.onclick = () => selectOption(index);
        btn.style.animation = `cardEntry 0.4s ease ${index * 0.1}s both`;
        container.appendChild(btn);
    });
}

function selectOption(index) {
    currentQuestion++;
    
    if (currentQuestion < questions.length) {
        // Fade out and load next
        const container = document.getElementById('optionsContainer');
        container.style.opacity = '0';
        container.style.transform = 'translateX(-20px)';
        container.style.transition = 'all 0.3s ease';
        
        setTimeout(() => {
            loadQuestion();
            container.style.opacity = '1';
            container.style.transform = 'translateX(0)';
        }, 300);
    } else {
        showAnalyzing();
    }
}

function showAnalyzing() {
    document.getElementById('progressFill').style.width = '100%';
    showPage('analyzingPage');
    
    const analysisText = document.getElementById('analysisText');
    const progressRing = document.getElementById('progressRing');
    const progressText = document.getElementById('progressText');
    const circumference = 2 * Math.PI * 45; // r=45
    
    let progress = 0;
    let messageIndex = 0;
    
    // Update messages
    const messageInterval = setInterval(() => {
        analysisText.style.opacity = '0';
        setTimeout(() => {
            analysisText.textContent = analysisMessages[messageIndex % analysisMessages.length];
            analysisText.style.opacity = '1';
            messageIndex++;
        }, 200);
    }, 800);
    
    // Update progress
    const progressInterval = setInterval(() => {
        progress += Math.random() * 3 + 1;
        if (progress >= 100) {
            progress = 100;
            clearInterval(progressInterval);
            clearInterval(messageInterval);
            
            setTimeout(() => {
                showReveal();
            }, 800);
        }
        
        const offset = circumference - (progress / 100) * circumference;
        progressRing.style.strokeDashoffset = offset;
        progressText.textContent = Math.floor(progress) + '%';
    }, 50);
}

function showReveal() {
    showPage('revealPage');
    
    // Start confetti
    initConfetti();
    
    // Show the GIF with animation
    setTimeout(() => {
        const gif = document.getElementById('takluGif');
        gif.style.opacity = '1';
        gif.style.transform = 'scale(1)';
    }, 300);
}

// Confetti System
function initConfetti() {
    const canvas = document.getElementById('confettiCanvas');
    const ctx = canvas.getContext('2d');
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const colors = ['#ff6b6b', '#feca57', '#ff9ff3', '#54a0ff', '#5f27cd', '#00d2d3', '#ff9f43', '#ee5a24'];
    const confetti = [];
    const confettiCount = 150;
    
    class Confetti {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height - canvas.height;
            this.size = Math.random() * 10 + 5;
            this.color = colors[Math.floor(Math.random() * colors.length)];
            this.speedY = Math.random() * 3 + 2;
            this.speedX = Math.random() * 2 - 1;
            this.rotation = Math.random() * 360;
            this.rotationSpeed = Math.random() * 4 - 2;
            this.type = Math.random() > 0.5 ? 'rect' : 'circle';
        }
        
        update() {
            this.y += this.speedY;
            this.x += this.speedX;
            this.rotation += this.rotationSpeed;
            
            if (this.y > canvas.height) {
                this.y = -20;
                this.x = Math.random() * canvas.width;
            }
        }
        
        draw() {
            ctx.save();
            ctx.translate(this.x, this.y);
            ctx.rotate(this.rotation * Math.PI / 180);
            ctx.fillStyle = this.color;
            
            if (this.type === 'rect') {
                ctx.fillRect(-this.size/2, -this.size/2, this.size, this.size/2);
            } else {
                ctx.beginPath();
                ctx.arc(0, 0, this.size/2, 0, Math.PI * 2);
                ctx.fill();
            }
            
            ctx.restore();
        }
    }
    
    // Create initial burst
    for (let i = 0; i < confettiCount; i++) {
        confetti.push(new Confetti());
    }
    
    // Also add some heart confetti
    class EmojiConfetti {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height - canvas.height;
            this.size = Math.random() * 25 + 20;
            this.speedY = Math.random() * 2 + 1;
            this.speedX = Math.random() * 2 - 1;
            this.opacity = Math.random() * 0.5 + 0.5;
            this.emojis = ['😂', '🤣', '🐕', '🦴', '🎯', '🧬', '✨', '🎉'];
            this.emoji = this.emojis[Math.floor(Math.random() * this.emojis.length)];
        }
        
        update() {
            this.y += this.speedY;
            this.x += Math.sin(this.y * 0.01) * 0.5;
            
            if (this.y > canvas.height) {
                this.y = -30;
                this.x = Math.random() * canvas.width;
            }
        }
        
        draw() {
            ctx.save();
            ctx.globalAlpha = this.opacity;
            ctx.font = `${this.size}px Arial`;
            ctx.fillText(this.emoji, this.x, this.y);
            ctx.restore();
        }
    }
    
    for (let i = 0; i < 20; i++) {
        confetti.push(new EmojiConfetti());
    }
    
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        confetti.forEach(c => {
            c.update();
            c.draw();
        });
        
        requestAnimationFrame(animate);
    }
    
    animate();
    
    // Handle resize
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

// Add SVG gradient definition dynamically
document.addEventListener('DOMContentLoaded', () => {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('width', '0');
    svg.setAttribute('height', '0');
    svg.innerHTML = `
        <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stop-color="#667eea"/>
                <stop offset="100%" stop-color="#764ba2"/>
            </linearGradient>
        </defs>
    `;
    document.body.appendChild(svg);
});
