const API_KEY = "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"; // Masukkan API Key Anda
const API_URL = "https://corsproxy.io/?https://api.openai.com/v1/chat/completions";

// Ambil elemen tombol dan kontainer chatbot
const chatbotToggle = document.getElementById('chatbotToggle');
const chatbotContainer = document.getElementById('chatbotContainer');

// Tambahkan event listener untuk klik tombol
chatbotToggle.addEventListener('click', () => {
    const isChatbotVisible = chatbotContainer.style.display === 'block';
    chatbotContainer.style.display = isChatbotVisible ? 'none' : 'block';
});


const chatBox = document.getElementById("chat-box");
const inputBox = document.getElementById("input-box");

async function sendMessage() {
    const userMessage = inputBox.value.trim();
    if (!userMessage) return;

    appendMessage("user", userMessage);
    inputBox.value = "";

    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${API_KEY}`,
            },
            body: JSON.stringify({
                model: "gpt-4", // Atau gpt-3.5-turbo
                messages: [
                    { role: "system", content: "You are a helpful assistant." },
                    { role: "user", content: userMessage },
                ],
            }),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        const botMessage = data.choices[0].message.content;
        appendMessage("bot", botMessage);
    } catch (error) {
        appendMessage("bot", `Error: ${error.message}`);
        console.error("Error details:", error);
    }
}

function appendMessage(sender, message) {
    const messageElement = document.createElement("p");
    messageElement.className = sender === "user" ? "user-message" : "bot-message";
    messageElement.textContent = sender === "user" ? `You: ${message}` : `Bot: ${message}`;
    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight;
}


$(document).ready(function(){
    $('.feedback-slider').owlCarousel({
        loop: false,
        margin: 10,
        nav: true,
        items: 1,
        autoplay: true,
        navText: ["<i class = 'fas fa-arrow-left'></i>", "<i class = 'fas fa-arrow-right'></i>"]
    });

    // stop animation on resize
    let resizeTimer;
    $(window).resize(function(){
        $(document.body).addClass('resize-animation-stopper');
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            $(document.body).removeClass('resize-animation-stopper');
        }, 400);
    });

    $('.navbar-show-btn').click(function(){
        $('.navbar-box').addClass('navbar-box-show');
    });

    $('.navbar-hide-btn').click(function(){
        $('.navbar-box').removeClass("navbar-box-show");
    })
});