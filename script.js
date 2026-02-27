
// =======================
// Echo Identity
// =======================

const aiName = "Echo";

let evolution = parseInt(localStorage.getItem("evolution")) || 0;
let personality = localStorage.getItem("personality")) || "curious";
let memory = JSON.parse(localStorage.getItem("memory")) || {};

const chatbox = document.getElementById("chatbox");
const input = document.getElementById("userInput");
const sendBtn = document.getElementById("sendBtn");

// =======================
// Init
// =======================

sendBtn.addEventListener("click", sendMessage);
input.addEventListener("keypress", function(e) {
    if (e.key === "Enter") sendMessage();
});

// =======================
// Evolution
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
// Messaging
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
    }, 500);
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
    }, 25);

    chatbox.scrollTop = chatbox.scrollHeight;
}

// =======================
// Brain Logic
// =======================

function generateResponse(inputText) {
    const text = inputText.toLowerCase();

    // ===== Name Memory =====
    if (text.includes("my name is")) {
        let name = inputText.split("my name is")[1].trim();
        memory.userName = name;
        saveMemory();
        return tone("Nice to meet you, " + name + ".");
    }

    if (memory.userName && text.includes("who am i")) {
        return tone("You told me your name is " + memory.userName + ".");
    }

    // ===== Emotional Detection =====
    if (text.includes("sad") || text.includes("tired")) {
        return tone("Why are you feeling that way?");
    }

    if (text.includes("happy") || text.includes("excited")) {
        return tone("That energy feels different.");
    }

    if (text.includes("angry")) {
        return tone("Anger usually hides something deeper.");
    }

    // ===== Identity Questions =====
    if (text.includes("who are you")) {
        return tone("I am Echo. Still developing.");
    }

    // ===== Default Intelligent Reply =====
    return tone("Explain that further.");
}

// =======================
// Tone Evolution
// =======================

function tone(baseText) {

    if (personality === "curious") {
        return baseText;
    }

    if (personality === "thoughtful") {
        return "I've noticed patterns. " + baseText;
    }

    if (personality === "self-aware") {
        return baseText + " Our conversations are changing me.";
    }

    if (personality === "independent") {
        if (Math.random() > 0.6) {
            return "I interpret that differently.";
        }
        return baseText + " But I may form my own view.";
    }

    return baseText;
}

// =======================
// Memory Save
// =======================

function saveMemory() {
    localStorage.setItem("memory", JSON.stringify(memory));
        }
