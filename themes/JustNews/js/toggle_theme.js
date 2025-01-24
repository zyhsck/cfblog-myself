
document.addEventListener('DOMContentLoaded', function() {
  // 动态创建并添加 CSS 样式
  const style = document.createElement('style');
  style.textContent = `
    /* 页面基础样式 */
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      background: linear-gradient(135deg, #f0f4f8, #c9d6e3);
      color: #333;
      margin: 0;
      padding: 0;
      transition: background-color 0.3s ease, color 0.3s ease;
    }

    /* 按钮样式 */
    #theme-toggle-button {
      position: fixed;
      bottom: 20px;
      right: 20px;
      padding: 12px 30px;
      font-size: 16px;
      background: linear-gradient(45deg, #6a11cb, #2575fc);
      color: white;
      border: none;
      cursor: pointer;
      border-radius: 30px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      transition: background 0.3s ease, transform 0.3s ease;
      z-index: 9999;
    }

    /* 按钮悬停效果 */
    #theme-toggle-button:hover {
      background: linear-gradient(45deg, #2575fc, #6a11cb);
      transform: translateY(-3px);
    }

    /* 按钮点击时效果 */
    #theme-toggle-button:active {
      transform: translateY(1px);
    }

    /* 亮色主题 */
    .light-theme {
      --bg-color: white;
      --text-color: #333;
      --button-bg: #f0f0f0;
      --button-text: #333;
    }

    /* 暗色主题 */
    .dark-theme {
      --bg-color: #333;
      --text-color: #f0f0f0;
      --button-bg: #555;
      --button-text: #f0f0f0;
    }

    /* 页面背景和文字 */
    body {
      background-color: var(--bg-color, white);
      color: var(--text-color, black);
    }

    button {
      background-color: var(--button-bg, #f0f0f0);
      color: var(--button-text, black);
    }

    /* 只调整亮度 */
    .dark-theme {
      filter: brightness(0.7);
    }
  `;
  document.head.appendChild(style);

  // 获取按钮并设置初始主题为亮色
  const button = document.getElementById('theme-toggle-button');
  let isLightTheme = true;
  document.body.classList.add('light-theme');  // 默认添加亮色主题

  // 切换主题函数
  function toggleTheme() {
    isLightTheme = !isLightTheme;

    if (isLightTheme) {
      document.body.classList.remove('dark-theme');
      document.body.classList.add('light-theme');
    } else {
      document.body.classList.remove('light-theme');
      document.body.classList.add('dark-theme');
    }
  }

  // 添加点击事件切换主题
  button.addEventListener('click', toggleTheme);
});