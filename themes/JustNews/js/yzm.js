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

        .slider-block, .target-block {
            position: absolute;
            top: 0;
            width: 50px;
            height: 100%;
            background-color: #000;
            border-radius: 25px;
        }

        .slider-block {
            left: 0;
            cursor: pointer;
            transition: left 0.3s ease;
        }

        .target-block {
            background-color: #ff5722;
            pointer-events: none;
        }

        .slider-btn {
            position: absolute;
            width: 100%;
            padding: 10px;
            background-color: #ee2e05;
            color: white;
            font-size: 16px;
            border-radius: 20px;
            cursor: pointer;
        }
    `;
    document.head.appendChild(style);

    // 配置项
    const config = {
        captchaUrl: 'https://translate.yhswz.eu.org/proxy?url=https://yzm.1417402449.workers.dev/captcha',  // 获取验证码的 API
        verifyUrl: 'https://translate.yhswz.eu.org/proxy?url=https://yzm.1417402449.workers.dev/verify', // 验证的 API
        successCallback: handleSuccess, // 验证成功后的回调函数
        failureCallback: handleFailure, // 验证失败后的回调函数
    };

    // 获取验证码并执行相应的逻辑
    fetchCaptchaData(config.captchaUrl).then(data => {
        if (data.success) {
            const targetPosition = data.captcha.sliderPosition;
            const token = data.token;
            initializeSlider(targetPosition, token, config.verifyUrl, config.successCallback, config.failureCallback);
        } else {
            console.log('获取验证码失败');
        }
    }).catch(error => {
        console.error('Error:', error);
    });


// 获取验证码数据
async function fetchCaptchaData(url) {
    const response = await fetch(url);
    return await response.json();
}

// 初始化滑动验证
function initializeSlider(targetPosition, token, verifyUrl, successCallback, failureCallback) {
    const sliderBlock = document.getElementById('sliderBlock');
    const sliderBtn = document.getElementById('sliderBtn');

    // 创建目标位置方块
    const targetBlock = document.createElement('div');
    targetBlock.className = 'target-block';
    targetBlock.style.left = `${targetPosition}px`;
    document.querySelector('.slider-bg').appendChild(targetBlock);

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

    // 通用事件开始
    const startDrag = (x) => {
        if (sliderBtn.style.display === 'none') {
            isDragging = true;
            startX = x;
            sliderBlock.style.transition = 'none';
        }
    };

    // 通用事件移动
    const moveDrag = (x) => {
        if (!isDragging) return;
        let moveX = x - startX;
        if (moveX < 0) moveX = 0;
        if (moveX > 250) moveX = 250;
        sliderBlock.style.left = moveX + 'px';
        currentPosition = moveX;
    };

    // 通用事件结束
    const endDrag = () => {
        if (!isDragging) return;
        isDragging = false;
        console.log("滑块当前位置:", currentPosition);

        // 验证用户滑动的距离是否正确
        const tolerance = 5;
        if (Math.abs(targetPosition - parseInt(currentPosition)) <= tolerance) {
            console.log("验证通过");
            verifyCaptcha(currentPosition, token, verifyUrl, successCallback, failureCallback);
        } else {
            console.log("验证失败，重置滑块位置");
            sliderBlock.style.left = '0px';
            failureCallback();
        }
    };

    // 监听鼠标和触摸事件
    sliderBlock.addEventListener('mousedown', (e) => startDrag(e.clientX));
    document.addEventListener('mousemove', (e) => moveDrag(e.clientX));
    document.addEventListener('mouseup', endDrag);

    sliderBlock.addEventListener('touchstart', (e) => startDrag(e.touches[0].clientX));
    document.addEventListener('touchmove', (e) => moveDrag(e.touches[0].clientX));
    document.addEventListener('touchend', endDrag);

    // 禁止默认拖拽行为
    sliderBlock.ondragstart = () => false;
}

async function verifyCaptcha(currentPosition, token, verifyUrl, successCallback, failureCallback) {
    const response = await fetch(verifyUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ sliderPosition: currentPosition, token: token })
    });

    const data = await response.json();
    if (data.success) {
        successCallback();
    } else {
        failureCallback();
    }
}

// 验证成功后的处理
function handleSuccess() {
    alert('验证通过');
    const sliderBlock = document.getElementById('sliderBlock');
    sliderBlock.style.left = '0px';
    document.getElementById('vcomment').style.display = 'block';
    document.getElementById('captcha_tips').style.display = 'none';
    document.getElementById('captcha').style.display = 'none';

    new Valine({
        el: '#vcomment',
        appId: 'mGQqXQrRVZmob8DKm7RIKEp7-MdYXbMMI',
        appKey: 'jAkrUC0ElQmq8wI34grFDYBJ',
        avatar: 'monsterid',
        serverURLs: 'https://mgqqxqrr.api.lncldglobal.com',
        placeholder: "评论可以一针见血..."
    });
}

// 验证失败后的处理
function handleFailure() {
    alert('验证失败，请重试');
    const sliderBlock = document.getElementById('sliderBlock');
    sliderBlock.style.left = '0px'; // 重置滑块位置
    document.getElementById('captcha_tips').style.display = 'block';
    document.getElementById('captcha').style.display = 'block';
}
}
