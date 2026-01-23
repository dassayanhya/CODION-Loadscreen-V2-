// Codion Loadscreen V2
// FiveM Loading Screen - Stability & UX Hardening
// Pure Vanilla JS, no frameworks. Commented for maintainability.

// Global branding namespace
window.CODION = Object.freeze({
    name: "Codion Loadscreen",
    version: "2.0.0",
    vendor: "Codion",
});

document.addEventListener("DOMContentLoaded", () => {
    // Cache DOM references safely
    const bgMusic = document.getElementById("bg-music");
    const muteToggle = document.getElementById("audio-mute");
    const progressBar = document.querySelector(".progress-bar");
    const titleEl = document.getElementById("loading-title");
    const linesEl = document.getElementById("loading-lines");
    const tipEl = document.querySelector(".tip-text");

    // Guard against missing audio or UI
    if (bgMusic) {
        bgMusic.volume = 0.5;
        bgMusic.muted = true; // start muted for autoplay policy
    }

    // Mute/Unmute button behavior
    if (bgMusic && muteToggle) {
        muteToggle.textContent = bgMusic.muted ? "🔇" : "🔊";
        muteToggle.addEventListener("click", () => {
            bgMusic.muted = !bgMusic.muted;
            // Attempt to play if user unmutes
            if (!bgMusic.muted) {
                bgMusic.play().catch(() => {});
            }
            muteToggle.textContent = bgMusic.muted ? "🔇" : "🔊";
        });
    }

    // Unlock audio on first interaction (click/key/mouse)
    let audioUnlocked = false;
    function unlockAudio() {
        if (audioUnlocked || !bgMusic) return;
        audioUnlocked = true;
        // Unmute and play once user interacts to satisfy autoplay rules
        bgMusic.muted = false;
        bgMusic.play().catch(() => {});
        if (muteToggle) muteToggle.textContent = "🔊";
        window.removeEventListener("click", unlockAudio);
        window.removeEventListener("keydown", unlockAudio);
        window.removeEventListener("mousemove", unlockAudio);
    }
    window.addEventListener("click", unlockAudio);
    window.addEventListener("keydown", unlockAudio);
    window.addEventListener("mousemove", unlockAudio);

    // Random loading texts - only after DOM ready and elements exist
    const loadingTitles = [
        "Loading Meshes",
        "Preparing Textures",
        "Streaming Map Data",
        "Loading Vehicle Models",
        "Compiling Assets",
        "Syncing Player Data",
    ];
    const loadingMessages = [
        "Environment loaded 15 objects",
        "Loading NPC routes",
        "Syncing server-side scripts",
        "Loaded 81883 forest items of 144 types",
        "Initializing economy systems",
        "Loading interiors",
        "Fetching custom animations",
        "Applying weather presets",
        "Loading player clothing variations",
        "Forest",
    ];

    const tips = [
        "Tip: Use /me for roleplay actions.",
        "Tip: Obey traffic laws to avoid fines.",
        "Tip: Keep valuables safe to prevent theft.",
        "Tip: Insurance helps recover stolen vehicles.",
        "Tip: Join Discord for support and updates.",
        "Tip: Report bugs to staff politely.",
        "Tip: Respect other players; serious roleplay only.",
        "Tip: Read server rules before playing.",
    ];
    let lastServerTipTs = 0;

    function updateLoadingText() {
        if (!titleEl || !linesEl) return;
        const title = loadingTitles[Math.floor(Math.random() * loadingTitles.length)];
        const line1 = loadingMessages[Math.floor(Math.random() * loadingMessages.length)];
        const line2 = loadingMessages[Math.floor(Math.random() * loadingMessages.length)];
        const line3 = loadingMessages[Math.floor(Math.random() * loadingMessages.length)];
        titleEl.textContent = title;
        linesEl.innerHTML = `${line1}<br>${line2}<br>${line3}`;
    }
    updateLoadingText();
    setInterval(updateLoadingText, 2000);

    function updateTip() {
        if (!tipEl) return;
        const now = Date.now();
        if (now - lastServerTipTs < 10000) return;
        const tip = tips[Math.floor(Math.random() * tips.length)];
        tipEl.textContent = tip;
    }
    updateTip();
    setInterval(updateTip, 15000);

    // Progress Bar: FiveM events + fallback simulation
    let simulatedProgress = 1; // never start at 0 to avoid stuck bar
    let lastEventTs = 0;
    const SIM_MAX = 90; // cap fallback at ~90%

    function setProgress(pct) {
        if (!progressBar) return;
        const clamped = Math.max(0, Math.min(100, Math.round(pct)));
        progressBar.style.width = clamped + "%";
    }
    setProgress(simulatedProgress);

    // FiveM load progress listener
    window.addEventListener("message", (event) => {
        if (!event || !event.data || !event.data.eventName) return;
        const ev = event.data.eventName;
        if (ev === "loadProgress") {
            const frac = Math.max(0, Math.min(1, event.data.loadFraction || 0));
            const pct = Math.round(frac * 100);
            lastEventTs = Date.now();
            simulatedProgress = Math.max(simulatedProgress, pct);
            setProgress(simulatedProgress);
        } else if (ev === "tipUpdate") {
            if (tipEl && typeof event.data.tip === "string") {
                // Constrain length to avoid overflow
                const txt = event.data.tip.trim();
                tipEl.textContent = txt.length > 180 ? txt.slice(0, 180) + "…" : txt;
                lastServerTipTs = Date.now();
            }
        }
    });

    // Fallback progress: slowly increase if no events arrive
    const fallbackTimer = setInterval(() => {
        const now = Date.now();
        const idleMs = now - lastEventTs;
        // If no recent events, nudge progress up to SIM_MAX
        if (idleMs > 1500 && simulatedProgress < SIM_MAX) {
            simulatedProgress += 1; // ~1% every 1.5s idle
            setProgress(simulatedProgress);
        }
    }, 1500);

    // UX Hardening
    // Disable right-click context menu
    document.addEventListener("contextmenu", (e) => e.preventDefault());
    // Prevent browser zoom via Ctrl + Wheel / Ctrl + +/- / Ctrl + 0
    window.addEventListener("wheel", (e) => {
        if (e.ctrlKey) e.preventDefault();
    }, { passive: false });
    window.addEventListener("keydown", (e) => {
        if (e.ctrlKey && (e.key === "+" || e.key === "-" || e.key === "=" || e.key === "0")) {
            e.preventDefault();
        }
    });
});


// Graceful fade-out before shutdown
window.addEventListener("message", (event) => {
    if (!event || !event.data) return;

    if (event.data.eventName === "fadeOut") {
        document.body.classList.add("fade-out");
    }
});


