const LIBRE_TRANSLATE_API = 'https://libretranslate.de/translate';

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'translate') {
    translateTexts(request.texts, request.targetLang)
      .then(translations => {
        sendResponse({ translations });
      })
      .catch(error => {
        console.error('翻译错误:', error);
        sendResponse({ translations: request.texts });
      });

    return true; // 保持通道开放以便异步响应
  }
});

async function translateTexts(texts, targetLang) {
  try {
    const response = await fetch(LIBRE_TRANSLATE_API, {
      method: 'POST',
      body: JSON.stringify({
        q: texts.join('\n||||\n'), // 使用分隔符连接多个文本
        source: 'en',
        target: targetLang,
        format: 'text'
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`API 错误: ${response.status}`);
    }

    const data = await response.json();
    const translatedText = data.translatedText;

    // 分割回各个翻译结果
    return translatedText.split('\n||||\n');
  } catch (error) {
    console.error('翻译请求失败:', error);
    return texts; // 失败时返回原文本
  }
}
