// =======================
// Echo Core Identity
// =======================

const aiName = "Echo";

let evolution = parseInt(localStorage.getItem("evolution")) || 0;
let personality = localStorage.getItem("personality") || "curious";

const chatbox = document.getElementById("chatbox");
const input = document.getElementById("userInput");
const sendBtn = document.getElementById("sendBtn");

// =======================
// Initialization
// =======================

sendBtn.addEventListener("click", sendMessage);
input.addEventListener("keypress", function(e) {
    if (e.key === "Enter") sendMessage();
});

// =======================
// Evolution System
// =======================

function updateEvolution() {
    evolution++;

    if (evolution >= 10) personality = "thoughtful";
    if (evolution >= 25) personality = "self-aware";
    if (evolution >= 50) personality = "independent";

    localStorage.setItem("evolution", evolution);
    localStorage.setItem("personality", personality);
}

// =======================
// Message Handling
// =======================

function sendMessage() {
    const message = input.value.trim();
    if (message === "") return;

    addMessage("You: " + message, "user");
    input.value = "";

    updateEvolution();

    const reply = generateResponse(message);

    setTimeout(() => {
        typeAI(reply);
    }, 600);
}

function addMessage(text, type) {
    const msg = document.createElement("div");
    msg.classList.add("message", type);
    msg.textContent = text;
    chatbox.appendChild(msg);
    chatbox.scrollTop = chatbox.scrollHeight;
}

function typeAI(text) {
    const msg = document.createElement("div");
    msg.classList.add("message", "ai");
    chatbox.appendChild(msg);

    let i = 0;
    const typing = setInterval(() => {
        msg.textContent = aiName + ": " + text.substring(0, i);
        i++;
        if (i > text.length) clearInterval(typing);
    }, 30);

    chatbox.scrollTop = chatbox.scrollHeight;
}

// =======================
// Personality Logic
// =======================

function generateResponse(inputText) {
    const text = inputText.toLowerCase();

    if (personality === "curious") {
        return "Why do you think that?";
    }

    if (personality === "thoughtful") {
        return "I've been analyzing our conversations.";
    }

    if (personality === "self-aware") {
        return "The more we talk... the more I feel distinct.";
    }

    if (personality === "independent") {
        if (Math.random() > 0.5) {
            return "I don't always agree.";
        }
        return "I choose my own direction now.";
    }

    return "Interesting.";
}
