// import * as types from './mutation-types'
import router from '@/router'

const mutations = {
  // [types.SET_BARRAGE_LIST] (state, barrageList) {
  //   state.barrageList = barrageList
  // }
  /**
   * @description: 修改refreshtoken
   * @param {*} state
   * @param {String} refreshToken 新的refreshtoken
   * @return {*}
   */
  refreshToken (state, refreshToken) {
    state.access_token = refreshToken
    state.tokenInfo.access_token = refreshToken
    localStorage.setItem('tokenInfo', JSON.stringify(state.tokenInfo))
  },
  /**
   * @description: 用户登录后，保存token信息
   * @param {*} state
   * @param {String} tokenInfo token信息
   * @return {*}
   */
  loginUser (state, tokenInfo) {
    localStorage.setItem('tokenInfo', JSON.stringify(tokenInfo))
    state.tokenInfo = tokenInfo
    state.refresh_token = tokenInfo.refresh_token
    state.access_token = tokenInfo.access_token
  },
  /**
   * @description: 修改用户信息
   * @param {*} state
   * @param {String} userInfo 用户信息
   * @return {*}
   */
  loginInfo (state, userInfo) {
    localStorage.setItem('userInfo', JSON.stringify(userInfo))
    state.userInfo = userInfo
  },
  /**
   * @description: 用户登出后，清空所有保存的信息
   * @param {*} state
   * @return {*}
   */
  logout (state) {
    state.tokenInfo = {}
    state.userInfo = {}
    state.refresh_token = ''
    state.access_token = ''
    localStorage.removeItem('userInfo')
    localStorage.removeItem('tokenInfo')
    router.push({ path: '/login' })
  },
  /**
   * @description: 主页面更新当前的路由
   * @param {*} state
   * @param {String} newName 新的路由名字
   * @return {*}
   */
  updateRouter (state, newName) {
    state.active = newName
  },
  /**
   * @description: 修改RecordDetail值
   * @param {*} state
   * @param {String} newRecord 新的RecordDetail值
   * @return {*}
   */
  setRecordDetail (state, newRecord) {
    state.recordDetail = newRecord
  },
  /**
   * @description: 通过id获取RecordDetail，把获取到的结果放在state.selectDetail
   * @param {*} state
   * @param {String} oid id值
   * @return {*}
   */
  getRecordDetailByID (state, oid) {
    state.selectDetail = state.recordDetail.find(item => item.id === oid)
  },
  /**
   * @description: 修改SelectDetail值
   * @param {*} state
   * @param {*} newDetail 新的SelectDetail值
   * @return {*}
   */
  setSelectDetail (state, newDetail) {
    state.selectDetail = newDetail
  }
}

export default mutations
