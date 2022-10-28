const state = {
  active: location.href.split('/').at(-1), // 当前路由
  refresh_token: localStorage.getItem('tokenInfo') ? JSON.parse(localStorage.getItem('tokenInfo')).refresh_token : '',
  access_token: localStorage.getItem('tokenInfo') ? JSON.parse(localStorage.getItem('tokenInfo')).access_token : '',
  tokenInfo: localStorage.getItem('tokenInfo') ? JSON.parse(localStorage.getItem('tokenInfo')) : {}, // token信息
  userInfo: localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : {}, // 用户信息
  recordDetail: [], // RecordDetail页面所用的列表
  selectDetail: {} // 当前选中的RecordDetail
}

export default state
