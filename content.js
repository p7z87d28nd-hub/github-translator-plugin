// 获取存储的设置
chrome.storage.local.get(['translatorEnabled'], (result) => {
  if (result.translatorEnabled !== false) {
    initializeTranslator();
  }
});

// 监听来自 popup 的消息
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'toggleTranslator') {
    if (request.enabled) {
      initializeTranslator();
    } else {
      removeTranslations();
    }
  }
});

function initializeTranslator() {
  // 获取页面中所有文本节点
  const walker = document.createTreeWalker(
    document.body,
    NodeFilter.SHOW_TEXT,
    null,
    false
  );

  let node;
  const nodesToTranslate = [];

  // 收集需要翻译的文本节点
  while (node = walker.nextNode()) {
    const text = node.textContent.trim();
    // 过滤出有意义的英文文本（长度 > 3）
    if (text.length > 3 && /[a-zA-Z]/.test(text) && !isAlreadyTranslated(node)) {
      nodesToTranslate.push(node);
    }
  }

  // 分批翻译（避免一次性过多请求）
  translateNodesBatch(nodesToTranslate, 0);
}

function translateNodesBatch(nodes, startIndex, batchSize = 5) {
  if (startIndex >= nodes.length) return;

  const batch = nodes.slice(startIndex, startIndex + batchSize);
  const textsToTranslate = batch.map(node => node.textContent.trim());

  chrome.runtime.sendMessage(
    {
      action: 'translate',
      texts: textsToTranslate,
      targetLang: 'zh'
    },
    (response) => {
      if (response && response.translations) {
        response.translations.forEach((translation, index) => {
          batch[index].textContent = translation;
          batch[index].setAttribute('data-translated', 'true');
        });
      }

      // 递归处理下一批
      setTimeout(() => {
        translateNodesBatch(nodes, startIndex + batchSize, batchSize);
      }, 500);
    }
  );
}

function isAlreadyTranslated(node) {
  return node.getAttribute('data-translated') === 'true' ||
    node.closest('[data-translated="true"]') !== null;
}

function removeTranslations() {
  const translatedNodes = document.querySelectorAll('[data-translated="true"]');
  translatedNodes.forEach(node => {
    node.removeAttribute('data-translated');
  });
  location.reload();
}
