// 定义默认主题
let isDarkMode = false; // 初始模式为浅色

// 定义切换函数
function toggleTheme() {
  if (isDarkMode) {
    // 切换到浅色模式
    document.documentElement.style.setProperty('--background-color', '#ffffff');
    document.documentElement.style.setProperty('--text-color', '#000000');
  } else {
    // 切换到深色模式
    document.documentElement.style.setProperty('--background-color', '#000000');
    document.documentElement.style.setProperty('--text-color', '#ffffff');
  }
  isDarkMode = !isDarkMode; // 更新模式状态

  // 更新整个网页的样式
  document.body.style.backgroundColor = getComputedStyle(document.documentElement).getPropertyValue('--background-color');
  document.body.style.color = getComputedStyle(document.documentElement).getPropertyValue('--text-color');
}

// 初始化默认主题
(function initializeTheme() {
  document.documentElement.style.setProperty('--background-color', '#ffffff');
  document.documentElement.style.setProperty('--text-color', '#000000');
  document.body.style.backgroundColor = getComputedStyle(document.documentElement).getPropertyValue('--background-color');
  document.body.style.color = getComputedStyle(document.documentElement).getPropertyValue('--text-color');

  // 设置按钮样式
  const toggleButton = document.getElementById('theme-toggle-button');
  toggleButton.style.position = 'fixed';
  toggleButton.style.bottom = '20px';
  toggleButton.style.right = '20px';
  toggleButton.style.backgroundColor = 'var(--text-color)';
  toggleButton.style.color = 'var(--background-color)';
  toggleButton.style.border = 'none';
  toggleButton.style.borderRadius = '5px';
  toggleButton.style.padding = '10px 15px';
  toggleButton.style.cursor = 'pointer';
  toggleButton.style.fontSize = '16px';
  toggleButton.style.zIndex = '1000';
  toggleButton.style.transition = 'background-color 0.3s, color 0.3s';

  // 绑定点击事件
  toggleButton.addEventListener('click', toggleTheme);
})();
