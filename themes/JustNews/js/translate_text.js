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
                node.setAttribute('data-original-title', title); // 保存原始title
                visibleTextNodes.push({ type: 'title', element: node, text: title });
            }
        }
        // 获取 <p> 标签和 <h> 标签的文本
        else if ((node.tagName === 'P' || node.tagName.startsWith('H')) && isElementVisible(node)) {
            let textContent = node.textContent.trim();
            if (textContent !== '') {
                node.setAttribute('data-original-text', textContent); // 保存原始文本
                visibleTextNodes.push({ type: 'text', element: node, text: textContent });
            }
        }
    }
    console.log('Extracted visible text nodes:', visibleTextNodes);  // Log the extracted text nodes
    return visibleTextNodes;
}

// 判断元素是否在视口内可见
function isElementVisible(element) {
    const rect = element.getBoundingClientRect();
    console.log('Element visibility check:', rect);  // Debug log for visibility check
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
    let corsProxy = 'https://cors-anywhere.herokuapp.com/';
    let apiUrl = new URL('https://translate.yhswz.eu.org');
    apiUrl.searchParams.append('text', texts.join(' '));
    apiUrl.searchParams.append('source_lang', 'zh');
    apiUrl.searchParams.append('target_lang', language);

    console.log('API Request URL:', corsProxy + apiUrl);  // Log the constructed API request URL

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            console.log('API response:', data);  // Log the entire response
            let translatedTexts = data.response.translated_text || [];
            //console.log('Translated texts:', translatedTexts);  // Log the translated texts
            
            // Verify the length of text nodes and translated texts
            //console.log('Number of textNodes:', textNodes.length);
            //console.log('Number of translatedTexts:', translatedTexts.length);

            // Replace text on the page if translation exists
            textNodes.forEach((node, index) => {
                if (translatedTexts[index]) {
                    if (node.type === 'title') {
                        node.element.setAttribute('title', translatedTexts[index]);
                    } else {
                        node.element.textContent = translatedTexts[index];
                    }
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
