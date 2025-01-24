document.addEventListener('DOMContentLoaded', function() {
  // 为按钮动态添加样式
  const style = document.createElement('style');
  style.textContent = `
    #theme-toggle-button {
      position: fixed;
      top: 20px;
      right: 20px;
      padding: 10px 20px;
      font-size: 16px;
      background-color: #f0f0f0;
      border: none;
      cursor: pointer;
      border-radius: 5px;
      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    }

    /* 亮色主题 */
    .light-theme {
      --bg-color: white;
      --text-color: black;
      --button-bg: #f0f0f0;
      --button-text: black;
    }

    /* 暗色主题 */
    .dark-theme {
      --bg-color: #333;
      --text-color: white;
      --button-bg: #555;
      --button-text: white;
    }

    /* 使用自定义的变量来设置元素的颜色 */
    body {
      background-color: var(--bg-color, white);
      color: var(--text-color, black);
      transition: background-color 0.3s, color 0.3s;
    }

    button {
      background-color: var(--button-bg, #f0f0f0);
      color: var(--button-text, black);
    }

    /* 可以通过filter属性应用亮度反转 */
    .dark-theme * {
      filter: invert(1) hue-rotate(180deg);
    }

    .dark-theme img, .dark-theme video {
      filter: invert(1) hue-rotate(180deg);
    }
  `;
  document.head.appendChild(style);

  // 获取按钮和设置初始主题为亮色
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