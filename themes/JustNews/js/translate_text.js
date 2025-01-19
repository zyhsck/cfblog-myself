// 获取页面中的所有文本节点的文本内容
function getTextContent() {
    let walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null, false);
    let textNodes = [];
    let node;
    while (node = walker.nextNode()) {
        if (node.nodeValue.trim() !== '') {
            textNodes.push(node);
        }
    }
    return textNodes;
}

// 获取 id 为 now_language 的 select 元素的值
function getSelectedLanguage() {
    let selectElement = document.getElementById('now_language');
    return selectElement ? selectElement.value : null;
}

// 提交文本到 API 并替换页面中的文本
function submitTextToAPI(textNodes, language) {
    let texts = textNodes.map(node => node.nodeValue);
    
    // 构造API请求URL，传递文本、源语言和目标语言
    let apiUrl = new URL('https://your-cloudflare-worker-url.com/translate');  // 替换为你自己的API URL
    apiUrl.searchParams.append('text', texts.join(' '));  // 将所有文本合并为一个字符串
    apiUrl.searchParams.append('source_lang', 'zh');  // 默认源语言
    apiUrl.searchParams.append('target_lang', language);  // 使用用户选择的目标语言

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            let translatedTexts = data.response.translated_text || [];
            textNodes.forEach((node, index) => {
                if (translatedTexts[index]) {
                    node.nodeValue = translatedTexts[index]; // 替换为翻译后的文本
                }
            });
        })
        .catch(error => console.error('Error:', error));
}

// 页面加载完成后自动执行翻译
window.addEventListener('load', function() {
    let textNodes = getTextContent();
    let language = getSelectedLanguage();
    if (language && textNodes.length > 0) {
        submitTextToAPI(textNodes, language);
    } else {
        console.warn('未找到文本节点或未选择语言');
    }
});
