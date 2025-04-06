const YOUTUBE_API_KEY = "AIzaSyBW4Xp2FXkd158_-FrtdkFByWkupPZ0D4U"; // Replace with your key

function sendMessage() {
  const userInput = document.getElementById("userInput");
  const chatBox = document.getElementById("chatBox");
  const message = userInput.value.trim();

  if (message !== "") {
    const userMsg = document.createElement("p");
    userMsg.textContent = "👤 " + message;
    chatBox.appendChild(userMsg);

    const botReply = document.createElement("p");
    botReply.textContent = "🤖 Let me find something helpful for you!";
    chatBox.appendChild(botReply);

    fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(message)}&key=${YOUTUBE_API_KEY}&maxResults=1&type=video`)
      .then(res => res.json())
      .then(data => {
        if (data.items.length > 0) {
          const videoId = data.items[0].id.videoId;
          const iframe = document.createElement("iframe");
          iframe.width = "100%";
          iframe.height = "215";
          iframe.src = `https://www.youtube.com/embed/${videoId}`;
          iframe.frameBorder = "0";
          iframe.allow = "autoplay; encrypted-media";
          iframe.allowFullscreen = true;
          chatBox.appendChild(iframe);
        } else {
          const noVid = document.createElement("p");
          noVid.textContent = "❌ No video found!";
          chatBox.appendChild(noVid);
        }

        userInput.value = "";
        chatBox.scrollTop = chatBox.scrollHeight;
      });
  }
}

function startVoice() {
  const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
  recognition.lang = "en-US";
  recognition.start();

  recognition.onresult = function (event) {
    const transcript = event.results[0][0].transcript;
    document.getElementById("userInput").value = transcript;
    sendMessage();
  };
}