document.addEventListener('DOMContentLoaded', function() {
// 获取 .main 下的所有 li 元素
const listItems = document.querySelectorAll('.main li');

// 遍历每个 li 元素
listItems.forEach(li => {
  // 查找 li 中的 a 标签并获取第一个符合条件的 href
  const link = li.querySelector('a[href*="/article/"]');
  if (link) {
    const href = link.getAttribute('href'); // 获取 href

    // 查找 li 中 title 为 "阅读数" 的 span 标签
    const span = li.querySelector('span[title="阅读数"]');
    if (span) {
      span.id = "cfblog.yhswz.eu.org"+href; // 将 span 的 id 设置为 href
    }
  }
});

// 检查结果
//console.log('修改后的 span 元素:', document.querySelectorAll('.main li span'));
new Valine({
    el: '#vcomment',
    appId: 'mGQqXQrRVZmob8DKm7RIKEp7-MdYXbMMI',
    appKey: 'jAkrUC0ElQmq8wI34grFDYBJ',
    avatar: '',
    avatar_cdn: 'https://cravatar.cn/avatar/',
    serverURLs: 'https://mgqqxqrr.api.lncldglobal.com',
    placeholder: "快来发表你的天才评论！",
    visitor: true // 阅读量统计
});

});
