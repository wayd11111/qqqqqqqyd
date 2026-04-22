const ctx = document.getElementById('mainAnalysisChart').getContext('2d');

// 创建渐变色
const gradient = ctx.createLinearGradient(0, 0, 0, 400);
gradient.addColorStop(0, 'rgba(18, 181, 176, 0.4)');
gradient.addColorStop(1, 'rgba(18, 181, 176, 0)');



// 获取导航链接和内容区域
// 1. 获取所有导航链接
// --- 1. 获取所有导航链接 ---
const navLinks = document.querySelectorAll('nav a');

// --- 2. 定义内容区域映射 (ID 必须和你 HTML 里的对应) ---
const sections = {
    '首页': document.getElementById('home-content'),
    '需求发现': document.getElementById('business-content'),
    '工作台': document.getElementById('workbench-content'),
    '数据分析': document.getElementById('analysis-content'),
    '我的': document.getElementById('profile-content')
};

function initPage() {
    Object.keys(sections).forEach(key => {
        if (sections[key]) {
            sections[key].style.display = (key === '首页') ? 'block' : 'none';
        }
    });
}
initPage();

navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetText = this.innerText.trim();

        // 如果点击的文字在我们的映射表里
        if (sections[targetText]) {
            // 切换高亮
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');

            // 隐藏所有区域
            Object.values(sections).forEach(section => {
                if (section) section.style.display = 'none';
            });

            // 显示当前点击的区域
            sections[targetText].style.display = 'block';

            // 特殊处理：如果是数据分析，初始化图表
            if (targetText === '数据分析' && typeof initAnalysisChart === 'function') {
                initAnalysisChart();
            }
        }
    });
});
// 将图表初始化封装成函数，确保在切换到该页面时才加载动画
function initAnalysisChart() {
    new Chart(ctx, {
    type: 'bar', // 基础类型是柱状图
    data: {
        labels: ['我地时间', '限村手院', '资控界间', '科技问题', '我性报名', '我为我的'],
        datasets: [
            {
                label: '趋势线',
                type: 'line', // 混合折线图
                data: [16, 13, 18, 12, 22, 16],
                borderColor: '#0d7a77',
                borderWidth: 2,
                fill: false,
                tension: 0.4, // 平滑曲线
                pointBackgroundColor: '#fff',
                pointRadius: 4
            },
            {
                label: '统计数据',
                data: [16, 13, 18, 12, 22, 16],
                backgroundColor: '#12b5b0',
                borderRadius: 4,
                barThickness: 40
            }
        ]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { display: false },
            tooltip: {
                enabled: true,
                callbacks: {
                    title: () => '无始峰离' // 模拟图片中的黑色气泡文字
                }
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                max: 25,
                grid: { color: '#f0f0f0' }
            },
            x: {
                grid: { display: false }
            }
        }
    }
});
    // 这里放入之前为你写的 Chart.js 代码
    // 注意：如果是第二次点击，可能需要销毁旧图表实例再重建，或者加个判断防止重复初始化
}
const dataBoardBtn = document.querySelector('.btn-light'); // 假设“数据板”是这个类名

dataBoardBtn.addEventListener('click', () => {
    // 模拟点击导航栏的“数据分析”
    document.querySelector('nav a:nth-child(4)').click(); 
});

document.addEventListener('DOMContentLoaded', () => {
    // 1. 获取所有相关元素
    // 注意：这里要确保 class 名和你 HTML 里完全一致
    const carousel = document.getElementById('heroCarousel');
    if (!carousel) return; // 如果当前页面没这个元素，直接停止，不报错

    const slides = carousel.querySelectorAll('.slide');
    const indicators = carousel.querySelectorAll('.indicator');
    let currentSlide = 0;
    let slideInterval;

    // 2. 切换到指定幻灯片的通用函数
    function goToSlide(n) {
        // 移除旧的 active 类
        slides[currentSlide].classList.remove('active');
        if(indicators.length > 0) indicators[currentSlide].classList.remove('active');
        
        // 计算新的当前页索引
        currentSlide = (n + slides.length) % slides.length;
        
        // 添加新的 active 类
        slides[currentSlide].classList.add('active');
        if(indicators.length > 0) indicators[currentSlide].classList.add('active');
    }

    // 3. 自动播放函数
    function startSlide() {
        stopSlide(); // 启动前先清除，防止叠加产生加速播放
        slideInterval = setInterval(() => {
            goToSlide(currentSlide + 1);
        }, 3000); // 3秒切换一次，太快了用户看不清
    }

    function stopSlide() {
        clearInterval(slideInterval);
    }

    // 4. 指示器的点击交互 (如果有白色小条条的话)
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            stopSlide();
            goToSlide(index);
            startSlide();
        });
    });

    // 5. 鼠标悬停暂停
    carousel.addEventListener('mouseenter', stopSlide);
    carousel.addEventListener('mouseleave', startSlide);

    // 6. 正式开启
    startSlide();
});
 // 业务管理内部切换函数
function switchSubSection(type) {
    const proc = document.getElementById('procurement-sub-section');
    const supp = document.getElementById('supplier-sub-section');
    const items = document.querySelectorAll('.sub-nav-item');

    // 切换内容显隐
    if (type === 'procurement') {
        proc.style.display = 'block';
        supp.style.display = 'none';
        items[0].classList.add('active');
        items[1].classList.remove('active');
    } else {
        proc.style.display = 'none';
        supp.style.display = 'block';
        items[0].classList.remove('active');
        items[1].classList.add('active');
    }
}
// 数据分析内部标签切换
function switchAnalysisTab(element, tabId) {
    // 1. 处理标签高亮
    const tabs = element.parentElement.querySelectorAll('.tab');
    tabs.forEach(t => t.classList.remove('active'));
    element.classList.add('active');

    // 2. 处理内容显示
    const contents = document.querySelectorAll('.analysis-tab-content');
    contents.forEach(c => c.style.display = 'none');
    
    const target = document.getElementById('ana-' + tabId);
    if (target) {
        target.style.display = 'block';
    }

    // 3. 特殊处理：如果是切回概览图，重新触发一下图表渲染（防止Canvas大小失效）
    if (tabId === 'overview') {
        setTimeout(initAnalysisChart, 100);
    }
    if (tabId === 'self-eval') {
        // 只有切到“企业自评”时，才初始化日历 (避免一开始找不到Canvas报错)
        setTimeout(initSelfEvalCalendar, 100); 
    }

    if (tabId === 'overview') {
        // 切回概览图时重置 Canvas
        setTimeout(initAnalysisChart, 100);
    }
    if (tabId === 'guide') {
        const guideItems = document.querySelectorAll('.guide-item');
        guideItems.forEach((item, index) => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(10px)';
            setTimeout(() => {
                item.style.transition = 'all 0.4s ease';
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            }, index * 150); // 实现列表逐个滑出的动画效果
        });
    }
    if (tabId === 'network') {
        // 模拟热力图数据加载动效
        const boxes = document.querySelectorAll('.heat-box');
        boxes.forEach((box, i) => {
            box.style.opacity = '0';
            setTimeout(() => {
                box.style.transition = 'opacity 0.5s ease';
                box.style.opacity = '1';
            }, i * 30);
        });
    }
}
// --- 企业自评 & ESG上传 逻辑 ---

let calendarInstance; // 全局存储日历实例

// 1. 初始化日历 (默认日视图)
function initSelfEvalCalendar() {
    const calendarInput = document.getElementById('history-calendar');
    if (!calendarInput) return;

    calendarInstance = flatpickr(calendarInput, {
        locale: "zh", // 中文
        dateFormat: "Y-m-d", // 默认显示格式
        defaultDate: "today", // 默认今天
        theme: "material_green", // 绿色主题
        disableMobile: "true", // 禁用移动端原生，使用插件
        onChange: function(selectedDates, dateStr, instance) {
            // 当时间改变时触发数据更新
            updateSelfEvalData(dateStr, 'day');
        }
    });

    // 初始化模拟上传逻辑
    initESGUpload();
}

// 2. 切换日历视图 (日/月/年) - 仿微信账单
function changeCalendarView(viewType) {
    if (!calendarInstance) return;

    // A. 切换按钮高亮
    const buttons = document.querySelectorAll('.view-switcher .btn-mini');
    buttons.forEach(b => b.classList.remove('active'));
    document.getElementById('view-' + viewType).classList.add('active');

    // B. 根据视图类型更新日历配置
    if (viewType === 'day') {
        calendarInstance.set('mode', 'single');
        calendarInstance.set('dateFormat', 'Y-m-d');
        calendarInstance.set('plugins', []); // 移除插件
        calendarInstance.jumpToDate("today"); // 跳转回今天
    } else if (viewType === 'month') {
        // Flatpickr 原生不支持纯月/纯年视图，需要借助插件或配置
        // 这里使用配置模拟：显示 Y-m，但点击时选择整月
        calendarInstance.set('dateFormat', 'Y-m');
        // 跳转到本月
        calendarInstance.jumpToDate(new Date()); 
    } else if (viewType === 'year') {
        calendarInstance.set('dateFormat', 'Y');
        calendarInstance.jumpToDate(new Date());
    }

    // C. 模拟更新右侧标题
    const now = new Date();
    let displayTime = "";
    if (viewType === 'day') displayTime = now.getFullYear() + "年" + (now.getMonth() + 1) + "月" + now.getDate() + "日 (日数据)";
    if (viewType === 'month') displayTime = now.getFullYear() + "年" + (now.getMonth() + 1) + "月 (月度平均)";
    if (viewType === 'year') displayTime = now.getFullYear() + "年 (年度平均)";
    
    document.getElementById('selected-time-display').innerText = displayTime;
}

// 3. 模拟数据更新 (根据选定时间)
function updateSelfEvalData(dateStr, viewType) {
    const timeDisplay = document.getElementById('selected-time-display');
    if (!timeDisplay) return;

    // 实际项目中，这里会发送 AJAX 请求到后台获取该时间段的数据
    // console.log("Fetching data for:", dateStr, viewType);

    // 模拟更新标题
    let label = " (日数据)";
    if (dateStr.length === 7) label = " (月度平均)"; // Y-m
    if (dateStr.length === 4) label = " (年度平均)"; // Y

    timeDisplay.innerText = dateStr + label;

    // 模拟数据卡片更新动画 (闪一下)
    const cards = document.querySelectorAll('.eval-card');
    cards.forEach(card => {
        card.style.opacity = '0.5';
        setTimeout(() => card.style.opacity = '1', 300);
    });
}

// 4. ESG 信息上传逻辑 (模拟)
function initESGUpload() {
    const dropzone = document.getElementById('esg-upload-dropzone');
    const fileInput = document.getElementById('esg-file-input');
    const progress = document.getElementById('upload-progress');
    const progressBar = document.getElementById('progress-bar');
    const progressPercent = document.getElementById('progress-percent');

    if (!dropzone) return;

    // 点击上传
    dropzone.addEventListener('click', () => fileInput.click());

    // 拖拽支持
    dropzone.addEventListener('dragover', (e) => {
        e.preventDefault();
        dropzone.classList.add('dragover');
    });
    dropzone.addEventListener('dragleave', () => dropzone.classList.remove('dragover'));
    dropzone.addEventListener('drop', (e) => {
        e.preventDefault();
        dropzone.classList.remove('dragover');
        const files = e.dataTransfer.files;
        handleFiles(files);
    });

    fileInput.addEventListener('change', (e) => handleFiles(e.target.files));

    // 处理文件 (模拟上传)
    function handleFiles(files) {
        if (files.length === 0) return;
        const file = files[0];
        
        // 简单验证
        if (file.size > 10 * 1024 * 1024) { alert("文件过大 (max 10MB)"); return; }
        if (!['application/pdf', 'image/png', 'image/jpeg'].includes(file.type)) { alert("格式不支持 (仅 PDF, PNG, JPG)"); return; }

        // 显示进度条
        progress.style.display = 'block';
        dropzone.style.display = 'none'; // 暂时隐藏上传区

        // 模拟上传进度
        let p = 0;
        const timer = setInterval(() => {
            p += Math.random() * 20;
            if (p >= 100) {
                p = 100;
                clearInterval(timer);
                alert("ESG 证明文件上传成功！评测得分已更新。");
                // 成功后还原
                setTimeout(() => {
                    progress.style.display = 'none';
                    dropzone.style.display = 'block';
                    progressBar.style.style.width = '0%';
                }, 1000);
            }
            progressBar.style.width = p + '%';
            progressPercent.innerText = Math.round(p) + '%';
        }, 300);
    }
}
// 在初始化数据分析的逻辑中加入，或者放在全局
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('capsule')) {
        // 找到同级的兄弟标签，移除 active
        const parent = e.target.parentElement;
        parent.querySelectorAll('.capsule').forEach(c => c.classList.remove('active'));
        // 自己变亮
        e.target.classList.add('active');
        
        // 模拟筛选刷新
        const list = document.querySelector('.topic-result-list');
        if (list) {
            list.style.opacity = '0.5';
            setTimeout(() => list.style.opacity = '1', 300);
        }
    }
});
// 切换发布窗口显示/隐藏
function togglePublish(id) {
    const forms = ['procure-form', 'product-form'];
    forms.forEach(f => {
        if(f === id) {
            const el = document.getElementById(f);
            el.style.display = (el.style.display === 'none') ? 'block' : 'none';
        } else {
            document.getElementById(f).style.display = 'none';
        }
    });
}

// 提交发布
function doSubmit(type) {
    const list = document.getElementById('workbench-list');
    let cardHtml = '';

    if (type === 'procure') {
        const title = document.getElementById('p-title-in').value || '未命名采购';
        const price = document.getElementById('p-price-in').value || '面议';
        cardHtml = `
            <div class="wb-item-procure">
                <div style="font-size:11px; color:var(--primary-green);">[采购需求]</div>
                <h4 style="margin:10px 0;">${title}</h4>
                <div style="color:#f39c12; font-weight:bold;">预算: ￥${price}</div>
            </div>`;
        document.getElementById('procure-form').style.display = 'none';
    } else {
        const title = document.getElementById('prod-title-in').value || '新商品';
        const price = document.getElementById('prod-price-in').value || '0.00';
        cardHtml = `
            <div class="wb-item-product">
                <div style="width:100%; height:80px; background:#f5f5f5; border-radius:6px; margin-bottom:10px; display:flex; align-items:center; justify-content:center; color:#ccc;"><i class="fas fa-box"></i></div>
                <h4 style="margin:5px 0;">${title}</h4>
                <div style="color:#2196f3;">售价: ￥${price}</div>
            </div>`;
        document.getElementById('product-form').style.display = 'none';
    }

    list.insertAdjacentHTML('afterbegin', cardHtml);
}

let currentTab = 'today';
let allTodos = JSON.parse(localStorage.getItem('pro_todos')) || [
    { id: 1, status: 'today', text: '完成企业端首页架构调整' },
    { id: 2, status: 'future', text: '下周与清华环境学院对接需求' },
    { id: 3, status: 'done', text: '已完成的注册流程测试' }
];

// 切换标签
function switchTodoTab(tab) {
    currentTab = tab;
    // 更新 UI 状态
    document.querySelectorAll('.todo-tab').forEach(el => {
        el.classList.toggle('active', el.innerText.includes(tab === 'today' ? '今日' : tab === 'future' ? '未来' : '已完成'));
    });
    renderQuickTodos();
}

// 渲染
function renderQuickTodos() {
    const container = document.getElementById('quick-todo-container');
    const filtered = allTodos.filter(t => t.status === currentTab);
    
    // 如果该状态下没数据
    if (filtered.length === 0) {
        container.innerHTML = `<div style="text-align:center; color:#cbd5e1; margin-top:50px; font-size:12px;">暂无待办</div>`;
        return;
    }

    container.innerHTML = filtered.map(t => `
        <div class="todo-item-row">
            <i class="${t.status === 'done' ? 'fas fa-check-circle' : 'far fa-circle'}" 
               style="color: ${t.status === 'done' ? '#29a672' : '#cbd5e1'}; cursor:pointer; margin-right:10px;"
               onclick="toggleStatus(${t.id})"></i>
            <span class="todo-text" title="${t.text}" onclick="editTodoText(${t.id})">${t.text}</span>
            <i class="far fa-trash-alt" style="color:#fee2e2; cursor:pointer; font-size:12px;" onclick="removeTodo(${t.id})"></i>
        </div>
    `).join('');
    
    localStorage.setItem('pro_todos', JSON.stringify(allTodos));
}

// 快速添加
function openQuickAdd() {
    const box = document.getElementById('inline-add-box');
    box.style.display = 'block';
    const input = document.getElementById('quick-input');
    input.focus();
    input.onkeydown = (e) => {
        if (e.key === 'Enter' && input.value.trim()) {
            allTodos.unshift({
                id: Date.now(),
                status: currentTab,
                text: input.value.trim()
            });
            renderQuickTodos();
            input.value = '';
            box.style.display = 'none';
        }
    };
}

// 状态切换 (今日 <-> 已完成)
function toggleStatus(id) {
    const todo = allTodos.find(t => t.id === id);
    if (todo.status === 'done') {
        todo.status = 'today';
    } else {
        todo.status = 'done';
    }
    renderQuickTodos();
}

function removeTodo(id) {
    allTodos = allTodos.filter(t => t.id !== id);
    renderQuickTodos();
}

// 初始化
document.addEventListener('DOMContentLoaded', renderQuickTodos);
let sortable = null;

function toggleEditMode() {
    const grid = document.getElementById('main-grid');
    const btn = document.getElementById('edit-mode-btn');
    
    if (!sortable) {
        // 进入编辑模式
        btn.innerHTML = '<i class="fas fa-check"></i> 保存布局';
        btn.style.background = '#29a672';
        btn.style.color = 'white';
        grid.style.border = '2px dashed #29a672';
        grid.style.padding = '10px';

        sortable = new Sortable(grid, {
            animation: 150,
            ghostClass: 'sortable-ghost', // 拖拽时的影子样式
            onEnd: function() {
                // 每次拖拽结束，记录新的顺序
                const order = sortable.toArray();
                localStorage.setItem('dashboard-order', JSON.stringify(order));
            }
        });
    } else {
        // 退出编辑模式
        sortable.destroy();
        sortable = null;
        btn.innerHTML = '<i class="fas fa-arrows-alt"></i> 自定义布局';
        btn.style.background = 'white';
        btn.style.color = '#29a672';
        grid.style.border = 'none';
        grid.style.padding = '0';
        alert('布局已保存');
    }
}

// 页面加载时恢复顺序
document.addEventListener('DOMContentLoaded', () => {
    const savedOrder = JSON.parse(localStorage.getItem('dashboard-order'));
    if (savedOrder) {
        const grid = document.getElementById('main-grid');
        savedOrder.forEach(id => {
            const item = grid.querySelector(`[data-id="${id}"]`);
            if (item) grid.appendChild(item);
        });
    }
});
// 切换组件显示/隐藏
function toggleComp(id, isVisible) {
    const el = document.getElementById(id) || document.querySelector(`[data-id="${id}"]`);
    if (el) {
        el.style.display = isVisible ? (id === 'heroCarousel' ? 'block' : 'flex') : 'none';
        
        // 保存设置到本地
        const settings = JSON.parse(localStorage.getItem('comp-visibility') || '{}');
        settings[id] = isVisible;
        localStorage.setItem('comp-visibility', JSON.stringify(settings));
    }
}

// 页面加载时恢复显示设置
document.addEventListener('DOMContentLoaded', () => {
    const settings = JSON.parse(localStorage.getItem('comp-visibility') || '{}');
    Object.keys(settings).forEach(id => {
        toggleComp(id, settings[id]);
        // 同步勾选框状态
        const checkbox = document.querySelector(`input[onchange*="${id}"]`);
        if (checkbox) checkbox.checked = settings[id];
    });
});
document.addEventListener('DOMContentLoaded', function() {
    const ctx = document.getElementById('trendChart').getContext('2d');

    // 创建绿色渐变背景
    const gradient = ctx.createLinearGradient(0, 0, 0, 180);
    gradient.addColorStop(0, 'rgba(41, 166, 114, 0.3)'); // var(--primary-green) 透明度 0.3
    gradient.addColorStop(1, 'rgba(41, 166, 114, 0)');   // 完全透明

    const trendChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['11月', '12月', '1月', '2月', '3月', '4月'], // X轴月份
            datasets: [
                {
                    label: '采购金额 (万元)',
                    data: [45, 52, 38, 65, 48, 72], // 模拟金额数据
                    borderColor: '#29a672',
                    backgroundColor: gradient,
                    borderWidth: 3,
                    fill: true,
                    tension: 0.4, // 让线条圆润一点
                    pointRadius: 0, // 初始不显示点
                    pointHoverRadius: 6, // 悬停显示大点
                    yAxisID: 'y'
                },
                {
                    label: '订单数',
                    data: [12, 19, 10, 25, 15, 30], // 模拟订单量数据
                    borderColor: '#94a3b8',
                    borderWidth: 2,
                    borderDash: [5, 5], // 虚线表示
                    fill: false,
                    tension: 0.4,
                    yAxisID: 'y1'
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: true,
                    position: 'top',
                    align: 'end',
                    labels: {
                        boxWidth: 10,
                        font: { size: 10 }
                    }
                },
                tooltip: {
                    mode: 'index',
                    intersect: false,
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    titleColor: '#333',
                    bodyColor: '#666',
                    borderColor: '#e2e8f0',
                    borderWidth: 1,
                }
            },
            scales: {
                x: {
                    grid: { display: false }, // 隐藏竖线
                    ticks: { font: { size: 10 } }
                },
                y: {
                    type: 'linear',
                    display: true,
                    position: 'left',
                    beginAtZero: true,
                    grid: { color: '#f1f5f9' },
                    ticks: { font: { size: 10 } }
                },
                y1: {
                    type: 'linear',
                    display: true,
                    position: 'right',
                    beginAtZero: true,
                    grid: { drawOnChartArea: false }, // 隐藏右轴的网格横线
                    ticks: { font: { size: 10 } }
                }
            },
            interaction: {
                intersect: false,
                axis: 'x'
            }
        }
    });
});
document.querySelectorAll('.action-btn').forEach(button => {
    button.addEventListener('click', function (e) {
        // 1. 创建波纹元素
        const circle = document.createElement('span');
        const diameter = Math.max(this.clientWidth, this.clientHeight);
        const radius = diameter / 2;

        // 2. 计算点击位置（相对于按钮内部）
        const rect = this.getBoundingClientRect();
        circle.style.width = circle.style.height = `${diameter}px`;
        circle.style.left = `${e.clientX - rect.left - radius}px`;
        circle.style.top = `${e.clientY - rect.top - radius}px`;
        circle.className = 'ripple';

        // 3. 如果已经有波纹在跑，先删掉旧的（可选）
        const oldRipple = this.getElementsByClassName('ripple')[0];
        if (oldRipple) {
            oldRipple.remove();
        }

        // 4. 将波纹加入按钮
        this.appendChild(circle);

        // 5. 动画结束后自动移除，保持 DOM 整洁
        setTimeout(() => {
            circle.remove();
        }, 600);
    });
});
// 请将这段代码放入你的 qyd.js 初始化逻辑中（如 DOMContentLoaded 事件内）
(function initMainAnalysisChart() {
    const canvas = document.getElementById('mainAnalysisChart');
    if (!canvas) return; // 确保 Canvas 元素存在

    const ctx = canvas.getContext('2d');

    // 1. 【复刻灵魂】创建绿色渐变背景（0-180px 高度从 0.3 透明度渐变到全透明）
    const gradient = ctx.createLinearGradient(0, 0, 0, 180);
    gradient.addColorStop(0, 'rgba(41, 166, 114, 0.3)'); // 首页 var(--primary-green) 色调
    gradient.addColorStop(1, 'rgba(41, 166, 114, 0)');   // 完全透明

    // 2. 实例化图表，全面采用首页的高级配置
    const mainAnalysisChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['11月', '12月', '1月', '2月', '3月', '4月'], // X轴月份
            datasets: [
                {
                    label: '采购金额 (万元)',
                    data: [65, 78, 55, 90, 72, 110], // 模拟业务金额数据
                    borderColor: '#29a672',          // 首页主色
                    backgroundColor: gradient,        // 注入渐变色
                    borderWidth: 3,                   // 加粗线条
                    fill: true,                       // 开启填充
                    tension: 0.4,                     // 【核心复刻】线条平滑圆润
                    pointRadius: 0,                   // 初始隐藏点
                    pointHoverRadius: 6,             // 悬停显示大点
                    yAxisID: 'y'                       // 挂载到左轴
                },
                {
                    label: '业务订单数',
                    data: [15, 22, 12, 30, 18, 45], // 模拟订单量数据
                    borderColor: '#94a3b8',          // 首页辅色（虚线）
                    borderWidth: 2,
                    borderDash: [5, 5],               // 【复刻虚线】表示订单数
                    fill: false,                      // 不填充
                    tension: 0.4,                     // 同样圆润
                    yAxisID: 'y1'                      // 挂载到右轴
                }
            ]
        },
        options: {
            responsive: true,           // 开启响应式
            maintainAspectRatio: false, // 【最重要】关闭比例锁定，让它完美填充卡片
            layout: {
                padding: {
                    top: -10,            // 【复刻贴顶】强制图表上移，紧贴标题
                    bottom: 0,
                    left: 0,
                    right: 0
                }
            },
            plugins: {
                legend: {
                    display: true,
                    position: 'top',
                    align: 'end',
                    labels: {
                        padding: 5,     // 缩小图例和图表间距
                        boxWidth: 10,
                        font: { size: 10 }
                    }
                },
                tooltip: {
                    mode: 'index',
                    intersect: false,
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    titleColor: '#333',
                    bodyColor: '#666',
                    borderColor: '#e2e8f0',
                    borderWidth: 1,
                }
            },
            scales: {
                x: {
                    grid: { display: false }, // 隐藏竖线，保持简洁
                    ticks: { font: { size: 10 }, color: '#94a3b8' }
                },
                y: {
                    type: 'linear',
                    display: true,
                    position: 'left', // 左侧显示金额（万元）
                    beginAtZero: true,
                    grid: { color: '#f1f5f9' },
                    ticks: { font: { size: 10 }, color: '#94a3b8' }
                },
                y1: {
                    type: 'linear',
                    display: true,
                    position: 'right', // 右侧显示订单数
                    beginAtZero: true,
                    grid: { drawOnChartArea: false }, // 不在图表区重复画横线
                    ticks: { font: { size: 10 }, color: '#94a3b8' }
                }
            },
            interaction: {
                intersect: false,
                axis: 'x'
            }
        }
    });

    // 如果这个板块是动态显示的，确保在显示时重绘以匹配框框
    if(typeof isEditMode !== 'undefined' && !isEditMode) {
        // 在你的选项卡切换逻辑中调用 mainAnalysisChart.resize();
    }
})();