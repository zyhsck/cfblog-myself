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
async function submitTextToAPI(textNodes, language) {
    let texts = textNodes.map(node => node.text).join('|');  // 用 '|' 连接所有文本

    try {
        let response = await fetch(`https://your-api-endpoint?text=${encodeURIComponent(texts)}&source_lang=zh&target_lang=${language}`);
        let result = await response.json();
        let translations = result.response.split('|');
        textNodes.forEach((node, index) => {
            node.element.textContent = translations[index];
        });
    } catch (error) {
        console.error('Error translating text:', error);
    }
}

// 示例调用
let textNodes = getVisibleTextContent();
let language = getSelectedLanguage();
if (language) {
    submitTextToAPI(textNodes, language);
}