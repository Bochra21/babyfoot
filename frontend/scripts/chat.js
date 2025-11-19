const chatInput = document.getElementById('chatInput');
const sendBtn = document.getElementById('sendBtn');
const chatMessages = document.getElementById('chatMessages');

export function setupChat(userName) {
  function addMessage(msg, sender) {
    const div = document.createElement('div');
    div.className = 'bg-gray-700 p-2 rounded';
    div.textContent = `${sender}: ${msg}`;
    chatMessages.appendChild(div);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  sendBtn.addEventListener('click', () => {
    const msg = chatInput.value.trim();
    if (!msg) return;
    addMessage(msg, userName);
    chatInput.value = '';
    chatInput.focus();
  });

  chatInput.addEventListener('keypress', e => {
    if (e.key === 'Enter') sendBtn.click();
  });

  return addMessage;
}
