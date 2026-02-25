
document.addEventListener("DOMContentLoaded", () => {
    
    // === ELEMENTS ===
    const buddyLauncher = document.getElementById("buddyLauncher");
    const chatWidget = document.getElementById("chatWidget");
    const closeBtn = document.getElementById("closeChat");
    const userInput = document.getElementById("userInput");
    const chatBox = document.getElementById("chat-box");
    const trailContainer = document.getElementById("cursor-trail");

    // Face Elements for tracking
    const eyes = document.querySelectorAll(".eye");
    const smallEyes = document.querySelectorAll(".eye-small");

    // === TOGGLE CHAT ===
    if (buddyLauncher) {
        buddyLauncher.addEventListener("click", () => {
            chatWidget.classList.add("active");
            document.querySelector(".bg-wrap").classList.add("blur-active"); // Blur background
            buddyLauncher.style.transform = "scale(0) translateY(20px)";
            buddyLauncher.style.opacity = "0";
            setTimeout(() => userInput.focus(), 300);
        });
    }

    if (closeBtn) {
        closeBtn.addEventListener("click", () => {
            chatWidget.classList.remove("active");
            document.querySelector(".bg-wrap").classList.remove("blur-active"); // Unblur background
            buddyLauncher.style.transform = "none";
            buddyLauncher.style.opacity = "1";
        });
    }

    // === MOUSE TRACKING (Eyes & Glitter) ===
    document.addEventListener("mousemove", (e) => {
        const x = e.clientX;
        const y = e.clientY;

        // 1. Glitter Trail
        createParticle(x, y);

        // 2. Eye Movement (Launcher Face)
        eyes.forEach(eye => moveEye(eye, x, y));
        
        // 3. Eye Movement (Widget Header Face)
        if (chatWidget.classList.contains("active")) {
          smallEyes.forEach(eye => moveEye(eye, x, y));
        }
    });

    function moveEye(eye, mouseX, mouseY) {
        const rect = eye.getBoundingClientRect();
        const eyeX = rect.left + rect.width / 2;
        const eyeY = rect.top + rect.height / 2;
        
        const angle = Math.atan2(mouseY - eyeY, mouseX - eyeX);
        const dist = Math.min(3, Math.hypot(mouseX - eyeX, mouseY - eyeY) / 10); // Limit distance

        const moveX = Math.cos(angle) * dist;
        const moveY = Math.sin(angle) * dist;

        eye.style.transform = `translate(${moveX}px, ${moveY}px)`;
    }

    // === PARTICLE SYSTEM ===
    function createParticle(x, y) {
        if (!trailContainer) return;

        const p = document.createElement("div");
        p.className = "trail-particle";
        
        // Random offset for "spray" effect
        const ox = (Math.random() - 0.5) * 12;
        const oy = (Math.random() - 0.5) * 12;

        p.style.left = (x + ox) + "px";
        p.style.top = (y + oy) + "px";

        // Random Size
        const s = Math.random() * 5 + 3;
        p.style.width = s + "px";
        p.style.height = s + "px";

        // Random Color (Pink/White/Gold)
        // Hue 330 (Pink), 50 (Gold)
        const hue = Math.random() > 0.7 ? 50 : 330;
        const light = 60 + Math.random() * 40;
        p.style.background = `hsl(${hue}, 90%, ${light}%)`;
        p.style.boxShadow = `0 0 ${s*2}px hsl(${hue}, 80%, 60%)`;

        trailContainer.appendChild(p);

        setTimeout(() => p.remove(), 750);
    }

    // === MESSAGING LOGIC ===
    window.sendMessage = async function() {
        const inputField = userInput;
        const text = inputField.value.trim();
        if (!text) return;

        addMsg(text, "user");
        inputField.value = "";
        inputField.disabled = true;

        const loadId = addMsg("Thinking...", "bot");

        try {
            const res = await axios.post("/chat", { message: text });
            document.getElementById(loadId).remove();
            
            // Just append the message
            addMsg(res.data.response, "bot");
        } catch (err) {
            document.getElementById(loadId)?.remove();
            addMsg("Oops! My connection is fuzzy. Try again.", "bot");
        } finally {
            inputField.disabled = false;
            inputField.focus();
        }
    };

    window.sendQuick = function(txt) {
        if(!userInput) return;
        userInput.value = txt;
        sendMessage();
    };

    function addMsg(txt, type) {
        const div = document.createElement("div");
        div.className = "message " + type;
        div.innerHTML = txt;
        div.id = "msg-" + Date.now();
        
        // Insert before chips if they exist
        const chips = document.querySelector(".quick-chips");
        if (chips) {
            // If the last element is chips, insert before it
            chatBox.insertBefore(div, chips);
        } else {
            chatBox.appendChild(div);
        }
        
        chatBox.scrollTop = chatBox.scrollHeight;
        return div.id;
    }

    // Enter Key
    if(userInput) {
        userInput.addEventListener("keypress", (e) => {
            if(e.key === "Enter") sendMessage();
        });
    }

});

