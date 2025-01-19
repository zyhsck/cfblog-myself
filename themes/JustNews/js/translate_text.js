// 获取页面中的所有可见 <a> 标签的 title 属性、<p> 标签和 <h> 标签的文本
function getVisibleTextContent() {
    let walker = document.createTreeWalker(document.body, NodeFilter.SHOW_ELEMENT, null, false);
    let visibleTextNodes = [];
    let node;

    while (node = walker.nextNode()) {
        // 获取 <a> 标签的 title 属性
        if (node.tagName === 'A' && node.hasAttribute('title')) {
            let title = node.getAttribute('title');
            if (title.trim() !== '') {
                visibleTextNodes.push({ type: 'title', element: node, text: title });
            }
        }
        // 获取 <p> 标签和 <h> 标签的文本
        else if ((node.tagName === 'P' || node.tagName.startsWith('H')) && isElementVisible(node)) {
            let textContent = node.textContent.trim();
            if (textContent !== '') {
                visibleTextNodes.push({ type: 'text', element: node, text: textContent });
            }
        }
    }
    return visibleTextNodes;
}

// 判断元素是否在视口内可见
function isElementVisible(element) {
    const rect = element.getBoundingClientRect();
    return rect.top < window.innerHeight && rect.bottom >= 0 && rect.left < window.innerWidth && rect.right >= 0;
}

// 获取 id 为 now_language 的 select 元素的值
function getSelectedLanguage() {
    let selectElement = document.getElementById('now_language');
    return selectElement ? selectElement.value : null;
}

// 提交文本到 API 并替换页面中的文本
function submitTextToAPI(textNodes, language) {
    let texts = textNodes.map(node => node.text);
    
    // 构造API请求URL，传递文本、源语言和目标语言
    let apiUrl = new URL('https://translate.yhswz.eu.org');  // 替换为你自己的API URL
    apiUrl.searchParams.append('text', texts.join(' '));  // 将所有文本合并为一个字符串
    apiUrl.searchParams.append('source_lang', 'zh');  // 默认源语言
    apiUrl.searchParams.append('target_lang', language);  // 使用用户选择的目标语言

    // 使用 CORS 代理绕过 CORS 限制
    let corsProxy = 'https://cors-anywhere.herokuapp.com/';
    fetch(corsProxy + apiUrl)
        .then(response => response.json())
        .then(data => {
            console.log('API 返回数据：', data);  // 增加日志输出，查看返回数据
            let translatedTexts = data.response.translated_text || [];
            
            if (translatedTexts.length === textNodes.length) {
                textNodes.forEach((node, index) => {
                    if (translatedTexts[index]) {
                        if (node.type === 'title') {
                            node.element.setAttribute('title', translatedTexts[index]); // 替换 title 属性
                        } else {
                            node.element.textContent = translatedTexts[index]; // 替换为翻译后的文本
                        }
                    }
                });
            } else {
                console.error('翻译文本数量与页面文本数量不匹配');
            }
        })
        .catch(error => console.error('Error:', error));
}

// 页面加载完成后自动执行翻译
window.addEventListener('load', function() {
    let textNodes = getVisibleTextContent();  // 获取可见文本节点
    let language = getSelectedLanguage();
    if (language && textNodes.length > 0) {
        console.log('可见文本节点：', textNodes);  // 增加日志输出，查看提取的文本
        submitTextToAPI(textNodes, language);
    } else {
        console.warn('未找到可见文本节点或未选择语言');
    }
});
