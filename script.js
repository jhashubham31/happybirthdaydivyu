const dodgeBtn = document.getElementById("dodgeBtn");
const goodGirlInput = document.getElementById("goodGirlAnswer");
const errorMessage = document.getElementById("errorMessage");
const typewriterEl = document.getElementById("typewriterText");
const reasonTextEl = document.getElementById("reasonText");
const reasonCounterEl = document.getElementById("reasonCounter");
const reasonBtnEl = document.getElementById("reasonBtn");
const reasonCardEl = document.querySelector(".reason-card");

dodgeBtn.style.position = "fixed";

function dodgeAway() {
    const rect = dodgeBtn.getBoundingClientRect();
    const maxX = Math.max(window.innerWidth - rect.width - 20, 0);
    const maxY = Math.max(window.innerHeight - rect.height - 20, 0);
    dodgeBtn.style.left = (Math.random() * maxX + 10) + "px";
    dodgeBtn.style.top = (Math.random() * maxY + 10) + "px";
}

dodgeBtn.addEventListener("mouseover", dodgeAway);
dodgeBtn.addEventListener("touchstart", (e) => {
    e.preventDefault();
    dodgeAway();
}, { passive: false });

function nextStage(currentId, nextId) {
    const current = document.getElementById(currentId);
    const next = document.getElementById(nextId);
    current.style.transition = "opacity 0.4s ease";
    current.style.opacity = "0";
    
    setTimeout(() => {
        current.style.display = "none";
        current.style.opacity = "";
        current.style.transition = "";
        next.style.display = "flex";

        if (nextId === "stage4") {
            const catBanner = document.querySelector(".cat-banner-container");
            const proceedBtn = document.querySelector("#stage4 .proceed-btn");
            
            if (proceedBtn) proceedBtn.style.display = "none";
            
            setTimeout(() => {
                if (catBanner) catBanner.style.animation = "none";
                if (proceedBtn) {
                    proceedBtn.style.display = "inline-block";
                    proceedBtn.style.animation = "popIn 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards";
                }
            }, 10000);
        }
    }, 400);
}

function checkAnswer() {
    const answer = goodGirlInput.value.toLowerCase().trim();
    if (answer === "divyu") {
        errorMessage.style.display = "none";
        nextStage("stage2", "stage3");
        typeIndex = 0;
        typewriterEl.textContent = "";
        setTimeout(typeWriter, 900);
    } else {
        errorMessage.style.display = "block";
    }
}

goodGirlInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") checkAnswer();
});

goodGirlInput.addEventListener("input", () => {
    errorMessage.style.display = "none";
});

const textToType = "Hey You Know What! You're the most adorable lovable human I have ever met 💕";
const typeChars = Array.from(textToType);
let typeIndex = 0;

function typeWriter() {
    if (typeIndex < typeChars.length) {
        typewriterEl.textContent += typeChars[typeIndex];
        typeIndex++;
        setTimeout(typeWriter, 50); 
    } else {
        const stage3Btn = document.getElementById("stage3Btn") || document.querySelector("#stage3 .proceed-btn");
        if (stage3Btn) {
            stage3Btn.style.display = "inline-block";
            stage3Btn.style.animation = "popIn 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards";
        }
    }
}

const reasons = [
    "✨ You're such a kind and wonderful person, and I feel lucky to share such a good bond with you. 💕",
    "✨ Your presence brings a bright, beautiful kind of magic into my life. 🌸",
    "✨ Even in silence, my soul recognizes yours as home. 💖",
    "✨ You and your voice are my absolute favorite obsession in this world. ✨"
];
let currentReasonIndex = 0;

function nextReason() {
    if (currentReasonIndex >= reasons.length - 1) return;
    currentReasonIndex++;

    reasonCardEl.style.animation = "none";
    reasonCardEl.offsetHeight; 
    reasonCardEl.style.animation = "popIn 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards";

    reasonTextEl.innerText = reasons[currentReasonIndex];
    reasonCounterEl.innerText = `Reason ${currentReasonIndex + 1} of ${reasons.length}`;

    if (currentReasonIndex === reasons.length - 1) {
        reasonBtnEl.innerText = "View Our Memories 🌸";
        reasonBtnEl.onclick = () => nextStage("stage5", "stage6");
    }
}

function spawnFloatingParticle() {
    const symbols = ["💕", "🌸", "💖", "✨", "🌷"];
    const particle = document.createElement("div");
    particle.className = "floating-particle";
    particle.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    particle.style.left = Math.random() * 100 + "vw";
    particle.style.fontSize = (1.2 + Math.random() * 1.2) + "rem";
    particle.style.animationDuration = (8 + Math.random() * 6) + "s";
    particle.style.animationDelay = Math.random() * 2 + "s";
    document.body.appendChild(particle);
    setTimeout(() => particle.remove(), 15000);
}

spawnFloatingParticle();
setInterval(spawnFloatingParticle, 1200);


