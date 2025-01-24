// 定义默认主题
let isDarkMode = false; // 初始模式为浅色

// 定义切换函数
function toggleTheme() {
  if (isDarkMode) {
    // 切换到浅色模式
    document.documentElement.style.setProperty('--background-color', '#ffffff');
    document.documentElement.style.setProperty('--text-color', '#000000');
    document.documentElement.style.setProperty('--article-background-color', '#f9f9f9');
    document.documentElement.style.setProperty('--article-text-color', '#333333');
    document.documentElement.style.setProperty('--header-background-color', '#f5f5f5');
    document.documentElement.style.setProperty('--header-text-color', '#222222');
    document.documentElement.style.setProperty('--main-background-color', '#ffffff'); // 主内容背景颜色
    document.documentElement.style.setProperty('--main-text-color', '#000000'); // 主内容文字颜色
  } else {
    // 切换到深色模式
    document.documentElement.style.setProperty('--background-color', '#121212');
    document.documentElement.style.setProperty('--text-color', '#e0e0e0');
    document.documentElement.style.setProperty('--article-background-color', '#1e1e1e');
    document.documentElement.style.setProperty('--article-text-color', '#cfcfcf');
    document.documentElement.style.setProperty('--header-background-color', '#1a1a1a');
    document.documentElement.style.setProperty('--header-text-color', '#e0e0e0');
    document.documentElement.style.setProperty('--main-background-color', '#121212'); // 主内容背景颜色
    document.documentElement.style.setProperty('--main-text-color', '#e0e0e0'); // 主内容文字颜色
  }
  isDarkMode = !isDarkMode; // 更新模式状态

  // 更新整个网页的样式
  document.body.style.backgroundColor = getComputedStyle(document.documentElement).getPropertyValue('--background-color');
  document.body.style.color = getComputedStyle(document.documentElement).getPropertyValue('--text-color');

  const articles = document.querySelectorAll('article');
  articles.forEach(article => {
    article.style.backgroundColor = getComputedStyle(document.documentElement).getPropertyValue('--article-background-color');
    article.style.color = getComputedStyle(document.documentElement).getPropertyValue('--article-text-color');
  });

  const headers = document.querySelectorAll('header');
  headers.forEach(header => {
    header.style.backgroundColor = getComputedStyle(document.documentElement).getPropertyValue('--header-background-color');
    header.style.color = getComputedStyle(document.documentElement).getPropertyValue('--header-text-color');
  });

  // 更新 main 部分的颜色
  const main = document.querySelector('.main');
  if (main) {
    main.style.backgroundColor = getComputedStyle(document.documentElement).getPropertyValue('--main-background-color');
    main.style.color = getComputedStyle(document.documentElement).getPropertyValue('--main-text-color');
  }
}

// 初始化默认主题
window.addEventListener('load', function initializeTheme() {
  // 初始化浅色主题
  document.documentElement.style.setProperty('--background-color', '#ffffff');
  document.documentElement.style.setProperty('--text-color', '#000000');
  document.documentElement.style.setProperty('--article-background-color', '#f9f9f9');
  document.documentElement.style.setProperty('--article-text-color', '#333333');
  document.documentElement.style.setProperty('--header-background-color', '#f5f5f5');
  document.documentElement.style.setProperty('--header-text-color', '#222222');
  document.documentElement.style.setProperty('--main-background-color', '#ffffff'); // 初始化主内容背景颜色
  document.documentElement.style.setProperty('--main-text-color', '#000000'); // 初始化主内容文字颜色

  // 更新页面的样式
  document.body.style.backgroundColor = getComputedStyle(document.documentElement).getPropertyValue('--background-color');
  document.body.style.color = getComputedStyle(document.documentElement).getPropertyValue('--text-color');

  const articles = document.querySelectorAll('article');
  articles.forEach(article => {
    article.style.backgroundColor = getComputedStyle(document.documentElement).getPropertyValue('--article-background-color');
    article.style.color = getComputedStyle(document.documentElement).getPropertyValue('--article-text-color');
  });

  const headers = document.querySelectorAll('header');
  headers.forEach(header => {
    header.style.backgroundColor = getComputedStyle(document.documentElement).getPropertyValue('--header-background-color');
    header.style.color = getComputedStyle(document.documentElement).getPropertyValue('--header-text-color');
  });

  // 更新 main 部分的颜色
  const main = document.querySelector('.main');
  if (main) {
    main.style.backgroundColor = getComputedStyle(document.documentElement).getPropertyValue('--main-background-color');
    main.style.color = getComputedStyle(document.documentElement).getPropertyValue('--main-text-color');
  }

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
});
