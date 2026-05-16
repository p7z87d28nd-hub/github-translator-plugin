console.log('[翻译] 内容脚本已加载');

setTimeout(function() {
  chrome.storage.local.get(['translatorEnabled'], function(result) {
    console.log('[翻译] 检查状态');
    if (result.translatorEnabled !== false) {
      console.log('[翻译] 开始翻译');
      initTranslator();
    }
  });
}, 2000);

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  console.log('[翻译] 收到消息');
  if (request.action === 'toggleTranslator') {
    if (request.enabled) {
      initTranslator();
    } else {
      location.reload();
    }
  }
});

function initTranslator() {
  console.log('[翻译] 初始化中');
  var nodes = [];
  var walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null, false);
  var node;
  
  while (node = walker.nextNode()) {
    var txt = node.textContent.trim();
    if (txt.length > 3 && /[a-zA-Z]/.test(txt)) {
      nodes.push({n: node, t: txt});
    }
  }
  
  console.log('[翻译] 找到' + nodes.length + '个节点');
  if (nodes.length > 0) {
    translateAll(nodes, 0);
  }
}

function translateAll(nodes, idx) {
  if (idx >= nodes.length) {
    console.log('[翻译] 完成');
    return;
  }
  
  var batch = nodes.slice(idx, idx + 5);
  var txts = [];
  for (var i = 0; i < batch.length; i++) {
    txts.push(batch[i].t);
  }
  
  console.log('[翻译] 翻译' + (idx + 1) + '-' + (idx + batch.length));
  
  chrome.runtime.sendMessage({action: 'translate', texts: txts, targetLang: 'zh'}, function(res) {
    if (res && res.translations) {
      for (var i = 0; i < batch.length; i++) {
        batch[i].n.textContent = res.translations[i];
      }
    }
    setTimeout(function() {
      translateAll(nodes, idx + 5);
    }, 800);
  });
}
