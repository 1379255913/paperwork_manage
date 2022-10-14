// import * as types from './mutation-types'
import router from '@/router'

const mutations = {
  // [types.SET_BARRAGE_LIST] (state, barrageList) {
  //   state.barrageList = barrageList
  // }
  refreshToken (state, refreshToken) {
    state.access_token = refreshToken
    state.tokenInfo.access_token = refreshToken
    localStorage.setItem('tokenInfo', JSON.stringify(state.tokenInfo))
  },
  loginUser (state, tokenInfo) {
    localStorage.setItem('tokenInfo', JSON.stringify(tokenInfo))
    state.tokenInfo = tokenInfo
    state.refresh_token = tokenInfo.refresh_token
    state.access_token = tokenInfo.access_token
  },
  loginInfo (state, userInfo) {
    localStorage.setItem('userInfo', JSON.stringify(userInfo))
    state.userInfo = userInfo
  },
  logout (state) {
    state.tokenInfo = {}
    state.userInfo = {}
    state.refresh_token = ''
    state.access_token = ''
    localStorage.removeItem('userInfo')
    localStorage.removeItem('tokenInfo')
    router.push({ path: '/login' })
  },
  updateRouter (state, newName) {
    state.active = newName
  },
  setRecordDetail (state, newRecord) {
    state.recordDetail = newRecord
  },
  getRecordDetailByID (state, oid) {
    let ans = null
    Array.from(state.recordDetail).forEach(each => {
      if (each.id === oid) {
        ans = each
      }
    })
    state.selectDetail = ans
  },
  setSelectDetail (state, newDetail) {
    state.selectDetail = newDetail
  }
}

export default mutations
