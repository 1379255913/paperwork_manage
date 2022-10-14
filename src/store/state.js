const state = {
  active: location.href.split('/').at(-1),
  refresh_token: localStorage.getItem('tokenInfo') ? JSON.parse(localStorage.getItem('tokenInfo')).refresh_token : '',
  access_token: localStorage.getItem('tokenInfo') ? JSON.parse(localStorage.getItem('tokenInfo')).access_token : '',
  tokenInfo: localStorage.getItem('tokenInfo') ? JSON.parse(localStorage.getItem('tokenInfo')) : {},
  userInfo: localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : {},
  recordDetail: [],
  selectDetail: {}
}

export default state
