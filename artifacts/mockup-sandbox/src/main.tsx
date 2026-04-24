window.handleChat = function() {
    const input = document.getElementById('chat-input');
    const display = document.getElementById('chat-display');
    const query = input.value.toLowerCase();
    
    const responses = {
        "help": "We provide medical aid and community support across the region.",
        "volunteer": "Please use the form on this page to register as a volunteer!",
        "urgent": "For medical emergencies, please contact 112 or your local emergency line.",
        "contact": "Email us at support@jaruratcare.org"
    };

    let botReply = "I'm not sure about that. Try asking 'help' or 'volunteer'.";
    for (let key in responses) {
        if (query.includes(key)) {
            botReply = responses[key];
            break;
        }
    }

    display.innerHTML += `<p class="text-right"><b>You:</b> ${query}</p>`;
    display.innerHTML += `<p class="text-left text-blue-600"><b>Bot:</b> ${botReply}</p>`;
    input.value = "";
    display.scrollTop = display.scrollHeight;
}

document.getElementById('regForm').onsubmit = (e) => {
    e.preventDefault();
    alert("Success! Your registration has been received by Jarurat Care.");
}
