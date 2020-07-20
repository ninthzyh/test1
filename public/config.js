
window.weather = {
    temperature: '32°C',
    weathername: '晴间多云',
};

window.address = "http://localhost:3000/puyang"
// 图标变化时间间隔 单位：毫秒
window.interval = 5000

//traffic——交通视频展示（three）
window.trafficVideo = {
    one:'img/emergency/accident.mp4',
    two:"img/emergency/accident.mp4"
}

// 导航路径
window.menubar = [
    {
        name: '疫情防控',
        type: 'outer',
        path: 'https://www.baidu.com/',
    }, {
        name: '城市管理',
        type: 'inner',
        path: window.address+'/#/index/manager',
    }, {
        name: '生态环境',
        type: 'outer',
        path: 'https://www.baidu.com/',
    }, {
        name: '交通出行',
        type: 'inner',
        path: window.address+'/#/index/traffic',
    }, {
        name: '信用体系',
        type: 'inner',
        path: window.address+'/#/index/credit',
    }, {
        name: '经济运行',
        type: 'outer',
        path: 'https://www.baidu.com/',
    }, {
        name: '社会民生',
        type: 'inner',
        path: window.address+'/#/index/society',
    }, {
        name: '政府服务',
        type: 'inner',
        path: window.address+'/#/index/affairs',
    }, {
        name: '城市应急',
        type: 'inner',
        path: window.address+'/#/index/emergency',
    }, {
        name: '城市旅游',
        type: 'outer',
        path: 'https://www.baidu.com/',
    }, {
        name: '区块链',
        type: 'outer',
        path: 'https://www.baidu.com/',
    },
];