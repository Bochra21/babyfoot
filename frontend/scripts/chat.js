const chatInput = document.getElementById('chatInput');
const sendBtn = document.getElementById('sendBtn');
const chatMessages = document.getElementById('chatMessages');

export function setupChat(userName) {
  const ws = new WebSocket('ws://localhost:8080');

  function addMessage() {
    const content = chatInput.value.trim();
    if (!content) return;

   ws.send(JSON.stringify({
  type: 'chat',
  username: userName,
  content: chatInput.value
}));

  }

  sendBtn.addEventListener('click', addMessage);

  chatInput.addEventListener('keypress', e => {
    if (e.key === 'Enter') sendBtn.click();
  });

  ws.addEventListener('open', () => {
    console.log('Connected to WebSocket server');
  });

  ws.addEventListener('message', async (event) => {
    let data = event.data;

    if (data instanceof Blob) {
      data = await data.text();
    }

    try {
      const msg = JSON.parse(data); 
      displayMessage(msg);
    } catch (err) {
      console.warn('Received non-JSON message, ignoring:', data);
    }
  });

  function displayMessage(msg) {
    const div = document.createElement('div');
    div.innerHTML = `<strong>${msg.username}:</strong> ${msg.content}`;
    chatMessages.appendChild(div);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  return addMessage;
}
