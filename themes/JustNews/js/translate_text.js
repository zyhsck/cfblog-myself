// 获取页面中的所有可见文本
function getVisibleTextContent() {
    let walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null, false);
    let visibleTextNodes = [];
    let node;

    while (node = walker.nextNode()) {
        // 判断文本是否为中文，如果是，则加入
        let textContent = node.textContent.trim();
        if (textContent && !isEnglish(textContent)) {
            node.setAttribute('data-original-text', textContent); // 保存原始文本
            visibleTextNodes.push({ type: 'text', element: node, text: textContent });
        }
    }

    console.log('Extracted visible text nodes:', visibleTextNodes);  // Log the extracted text nodes
    return visibleTextNodes;
}

// 判断文本是否是英文
function isEnglish(text) {
    return /^[A-Za-z0-9\s.,!?'"()_-]*$/.test(text);
}

// 获取 id 为 now_language 的 select 元素的值
function getSelectedLanguage() {
    let selectElement = document.getElementById('now_language');
    return selectElement ? selectElement.value : null;
}

// 提交文本到 API 并替换页面中的文本
function submitTextToAPI(textNodes, language) {
    let texts = textNodes.map(node => node.text).join('|');  // 用 '|' 连接所有文本
    
    // 构造API请求URL，传递文本、源语言和目标语言
    let corsProxy = 'https://cors-anywhere.herokuapp.com/';
    let apiUrl = new URL('https://translate.yhswz.eu.org');
    apiUrl.searchParams.append('text', texts);
    apiUrl.searchParams.append('source_lang', 'zh');
    apiUrl.searchParams.append('target_lang', language);

    console.log('API Request URL:', corsProxy + apiUrl);  // Log the constructed API request URL

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            console.log('API response:', data);  // Log the entire response
            let translatedTexts = data.response.translated_text || [];
            
            // 将返回的翻译文本用 '|' 分割
            let translatedArray = translatedTexts.split('|');

            // 替换页面上的文本
            textNodes.forEach((node, index) => {
                if (translatedArray[index]) {
                    node.element.textContent = translatedArray[index];
                }
            });
        })
        .catch(error => console.error('Error:', error));
}

// 页面加载完成后自动执行翻译
window.addEventListener('load', function() {
    let textNodes = getVisibleTextContent();  // 获取可见文本节点
    let language = getSelectedLanguage();
    if (language && textNodes.length > 0) {
        console.log('可见文本节点：', textNodes);  // Log extracted text nodes
        submitTextToAPI(textNodes, language);
    } else {
        console.warn('未找到可见文本节点或未选择语言');
    }
});
