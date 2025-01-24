// 在 DOM 完全加载后运行 JS
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
  `;
  document.head.appendChild(style);

  const button = document.getElementById('theme-toggle-button');
  let isLightTheme = true;

  // 调整颜色的亮度反转
  function invertColor(color) {
    const rgb = color.match(/\d+/g);
    if (rgb) {
      const r = 255 - parseInt(rgb[0]);
      const g = 255 - parseInt(rgb[1]);
      const b = 255 - parseInt(rgb[2]);
      return `rgb(${r}, ${g}, ${b})`;
    }
    return color;
  }

  // 切换主题函数
  function toggleTheme() {
    isLightTheme = !isLightTheme;

    // 反转所有元素的颜色
    const elements = document.querySelectorAll('*');
    elements.forEach(element => {
      const computedStyle = getComputedStyle(element);
      const backgroundColor = computedStyle.backgroundColor;
      const color = computedStyle.color;
      const borderColor = computedStyle.borderColor;

      // 反转背景色和字体颜色
      if (backgroundColor && backgroundColor !== 'transparent') {
        element.style.backgroundColor = invertColor(backgroundColor);
      }
      if (color) {
        element.style.color = invertColor(color);
      }
      if (borderColor) {
        element.style.borderColor = invertColor(borderColor);
      }
    });
  }

  // 添加点击事件切换主题
  button.addEventListener('click', toggleTheme);
});