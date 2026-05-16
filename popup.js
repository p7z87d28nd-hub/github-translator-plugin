const toggleSwitch = document.getElementById('toggleSwitch');
const statusText = document.getElementById('status');

// 加载当前状态
chrome.storage.local.get(['translatorEnabled'], (result) => {
  const isEnabled = result.translatorEnabled !== false;
  toggleSwitch.checked = isEnabled;
  updateStatus(isEnabled);
});

// 监听开关变化
toggleSwitch.addEventListener('change', (e) => {
  const enabled = e.target.checked;
  chrome.storage.local.set({ translatorEnabled: enabled });

  // 发送消息给 content script
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, {
      action: 'toggleTranslator',
      enabled: enabled
    });
  });

  updateStatus(enabled);
});

function updateStatus(enabled) {
  if (enabled) {
    statusText.textContent = '✅ 翻译已启用';
    statusText.style.color = '#28a745';
  } else {
    statusText.textContent = '❌ 翻译已禁用';
    statusText.style.color = '#dc3545';
  }
}
