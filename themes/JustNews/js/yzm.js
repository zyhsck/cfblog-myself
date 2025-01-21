window.onload = function() {
    // 动态创建并插入样式
    const style = document.createElement('style');
    style.innerHTML = `
        .slider-container {
            position: relative;
            width: 300px;
            height: 50px;
            text-align: center;
        }

        .slider-bg {
            position: relative;
            width: 100%;
            height: 100%;
            background-color: #2196F3;
            border-radius: 25px;
            overflow: hidden;
        }

        .slider-block {
            position: absolute;
            top: 0;
            left: 0;
            width: 50px;
            height: 100%;
            background-color: #000;
            border-radius: 25px;
            cursor: pointer;
            transition: left 0.3s ease;
        }

        .slider-btn {
            position: absolute;
            width: 100%;
            padding: 10px;
            background-color: #2196F3;
            color: white;
            font-size: 16px;
            border-radius: 20px;
            cursor: pointer;
        }
    `;
    document.head.appendChild(style);

    // 获取验证码的基本数据
    fetch('https://translate.yhswz.eu.org/proxy?url=https://yzm.1417402449.workers.dev/captcha')
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                const targetPosition = data.captcha.sliderPosition;
                const sliderBlock = document.getElementById('sliderBlock');
                const sliderBtn = document.getElementById('sliderBtn');
                let isDragging = false;
                let startX = 0;
                let currentPosition = 0;

                // 初始化滑块位置
                sliderBlock.style.left = '0px';

                // 按钮点击后启用滑动功能
                sliderBtn.addEventListener('click', () => {
                    console.log("滑动验证按钮已点击");
                    sliderBtn.style.display = 'none';  // 隐藏按钮
                    sliderBlock.style.transition = 'none'; // 禁止滑块过渡效果
                });

                // 监听触摸开始
                sliderBlock.addEventListener('touchstart', (e) => {
                    if (sliderBtn.style.display === 'none') {
                        console.log("触摸开始，开始拖动");
                        isDragging = true;
                        startX = e.touches[0].clientX;
                        sliderBlock.style.transition = 'none'; // 禁止滑块的过渡
                    }
                });

                // 监听触摸移动
                document.addEventListener('touchmove', (e) => {
                    if (!isDragging) return;
                    let moveX = e.touches[0].clientX - startX;
                    if (moveX < 0) moveX = 0;
                    if (moveX > 250) moveX = 250; // 限制滑动距离
                    sliderBlock.style.left = moveX + 'px';
                    currentPosition = moveX;
                });

                // 监听触摸结束
                document.addEventListener('touchend', () => {
                    if (!isDragging) return;
                    console.log("触摸结束，结束拖动");
                    isDragging = false;
                    let currentPosition = parseInt(sliderBlock.style.left || 0);
                    console.log("滑块当前位置:", currentPosition);

                    // 验证用户滑动的距离是否正确
                    if (currentPosition === targetPosition) {
                        console.log("验证通过");
                        // 发起验证请求
                        fetch('https://translate.yhswz.eu.org/proxy?url=https://yzm.1417402449.workers.dev/verify&data='+JSON.stringify({ sliderPosition: currentPosition }), {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                        })
                        .then(response => response.json())
                        .then(data => {
                            if (data.success) {
                                alert('验证通过');
                                sliderBlock.style.left = '0px'; // 重置滑块位置
                                // 显示评论区
                                document.getElementById('vcomment').style.display = 'block';
                                document.getElementById('captcha_tips').style.display = 'none';
                                document.getElementById('captcha').style.display = 'none';
                                // 初始化 Valine
                                new Valine({
                                    el: '#vcomment',
                                    appId: 'mGQqXQrRVZmob8DKm7RIKEp7-MdYXbMMI',
                                    appKey: 'jAkrUC0ElQmq8wI34grFDYBJ',
                                    avatar: 'monsterid',
                                    serverURLs: 'https://mgqqxqrr.api.lncldglobal.com',
                                    placeholder: "评论可以一针见血..."
                                });
                            } else {
                                alert('验证失败');
                            }
                        })
                        .catch(error => {
                            console.error('Error:', error);
                        });
                    } else {
                        console.log("验证失败，重置滑块位置");
                        sliderBlock.style.left = '0px'; // 滑动不成功，重置滑块位置
                    }
                });

                // 禁止默认拖拽行为
                sliderBlock.ondragstart = () => false;
            } else {
                console.log('获取验证码失败');
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
};
