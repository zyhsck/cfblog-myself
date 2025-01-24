// 初始化默认主题
window.addEventListener('load', function initializeTheme() {
  // 修改初始化颜色
  document.documentElement.style.setProperty('--background-color', '#ffffff');
  document.documentElement.style.setProperty('--text-color', '#333333');
  document.documentElement.style.setProperty('--article-background-color', '#fafafa');
  document.documentElement.style.setProperty('--article-text-color', '#222222');
  document.documentElement.style.setProperty('--header-background-color', '#f0f0f0');
  document.documentElement.style.setProperty('--header-text-color', '#111111');
  document.documentElement.style.setProperty('--main-background-color', '#ffffff'); // 初始化主内容背景颜色
  document.documentElement.style.setProperty('--main-text-color', '#333333'); // 初始化主内容文字颜色

  // 更新页面元素的颜色
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
