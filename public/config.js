window.weather = {
  temperature: '32°C',
  weathername: '晴间多云',
}

window.address = 'http://puyang.gov/city'
// 图标变化时间间隔 单位：毫秒
window.interval = 10000

// 图表折线宽度
window.lineWidth = 2

// 导航路径
window.menubar = [
  {
    name: '疫情防控',
    type: 'outer',
    path: `${window.address}/#/population-insight`,
  },
  {
    name: '城市管理',
    type: 'inner',
    path: '/index/manager',
  },
  {
    name: '生态环境',
    type: 'outer',
    path: `${window.address}/#/ecological-environment`,
  },
  {
    name: '交通出行',
    type: 'inner',
    path: '/index/traffic',
  },
  {
    name: '信用体系',
    type: 'inner',
    path: '/index/credit',
  },
  {
    name: '经济运行',
    type: 'outer',
    path: `${window.address}/#/economic-operation`,
  },
  {
    name: '社会民生',
    type: 'inner',
    path: '/index/society',
  },
  {
    name: '政府服务',
    type: 'inner',
    path: '/index/affairs',
  },
  {
    name: '城市应急',
    type: 'inner',
    path: '/index/emergency',
  },
  {
    name: '城市旅游',
    type: 'outer',
    path: `${window.address}/#/puyangcitytour`,
  },
  {
    name: '区块链',
    type: 'outer',
    path: 'http://10.20.23.21/console/directory/console.html#/HomePage',
  },
]
