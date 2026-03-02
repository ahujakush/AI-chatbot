
document.addEventListener("DOMContentLoaded", () => {
    
    // === ELEMENTS ===
    const chatContainer = document.getElementById("chatContainer");
    const buddyLauncher = document.getElementById("buddyLauncher");
    const userInput = document.getElementById("userInput");
    const chatBox = document.getElementById("chat-box");
    
    // Face Elements for tracking - Select ALL eyes from both launcher and chat header
    const eyes = document.querySelectorAll(".bot-face .eye");

    // === TOGGLE CHAT ===
    window.toggleChat = function() {
        // Toggle Active State
        chatContainer.classList.toggle("active");
        
        if (chatContainer.classList.contains("active")) {
            // Chat is OPEN
            buddyLauncher.classList.add("hidden");
            userInput.focus();
        } else {
            // Chat is CLOSED
            buddyLauncher.classList.remove("hidden");
        }
    };

    // Open chat if user clicks a nav link that calls focusChat
    // We override the previous inline logic slightly to ensure open
    window.focusChat = function(topic) {
        if (!chatContainer.classList.contains("active")) {
            toggleChat();
        }
        
        if(topic === 'Apply Now') {
            window.open('https://admission.sgtuniversity.ac.in/', '_blank');
        } else {
            // Optional: Auto-fill
            userInput.value = "Tell me about " + topic;
            userInput.focus();
        }
    }


    // === MOUSE TRACKING (Eyes) ===
    document.addEventListener("mousemove", (e) => {
        const x = e.clientX;
        const y = e.clientY;

        // Eye Movement
        eyes.forEach(eye => {
            const rect = eye.getBoundingClientRect();
            // Only move visible eyes to save performance (optional but good)
            if(rect.width === 0) return;

            const eyeX = rect.left + rect.width / 2;
            const eyeY = rect.top + rect.height / 2;
            
            const angle = Math.atan2(y - eyeY, x - eyeX);
            // Limit distance so eyes don't fly out of sockets
            const dist = Math.min(3, Math.hypot(x - eyeX, y - eyeY) / 20); 

            const moveX = Math.cos(angle) * dist;
            const moveY = Math.sin(angle) * dist;

            eye.style.transform = `translate(${moveX}px, ${moveY}px)`;
        });
    });

    // === MESSAGING LOGIC ===
    window.sendMessage = async function() {
        const inputField = userInput;
        const message = inputField.value.trim();
        if (!message) return;

        // 1. Add User Message
        appendMessage(message, "user");
        inputField.value = "";

        // 2. Show Typing Indicator
        const loadingId = "loading-" + Date.now();
        const loadingDiv = document.createElement("div");
        loadingDiv.id = loadingId;
        loadingDiv.classList.add("message", "bot", "loading");
        loadingDiv.innerHTML = `
            <div class="typing-dot"></div>
            <div class="typing-dot"></div>
            <div class="typing-dot"></div>
        `;
        chatBox.appendChild(loadingDiv);
        chatBox.scrollTop = chatBox.scrollHeight;
        
        try {
            // 3. Send to Backend
            const response = await axios.post("/chat", { message: message });
            
            // Remove Loading Indicator
            const loader = document.getElementById(loadingId);
            if(loader) loader.remove();

            // 4. Add Bot Response
            const botReply = response.data.response;
            appendMessage(botReply, "bot");

        } catch (error) {
            console.error(error);
            // Remove Loading Indicator
            const loader = document.getElementById(loadingId);
            if(loader) loader.remove();
            
            appendMessage("Sorry, I'm having trouble connecting to the server. Please try again later.", "bot");
        }
    };

    window.sendQuick = function(text) {
        userInput.value = text;
        sendMessage();
    };

    function appendMessage(text, sender) {
        const msgDiv = document.createElement("div");
        msgDiv.classList.add("message", sender);
        
        // Format basic Markdown-like syntax (bold, newlines)
        // Simple formatter
        let formattedText = text
            .replace(/\n/g, "<br>")
            .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");

        msgDiv.innerHTML = formattedText;
        
        chatBox.appendChild(msgDiv);
        chatBox.scrollTop = chatBox.scrollHeight; // Auto-scroll
    }

    // Allow Enter key to send
    userInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") sendMessage();
    });

});




