// import * as types from './mutation-types'
import { login, getLoginInfo, refreshToken } from '@/api/user'
// export const addBarrageList = ({ commit, state }, barrageInfo) => {
//   const list = lang.cloneDeep(state.barrageList)
//   const newList = list.filter(item => !item.isEnd)
//   newList.push(barrageInfo)
//   commit(types.SET_BARRAGE_LIST, newList)
// }
/**
 * @description: 用户登录
 * @param {*} commit
 * @param {*} state
 * @return {*}
 */
export const userLogin = ({ commit, state }) => {
  return login().then(res => {
    commit('loginUser', res.item.token)
    return getLoginInfo(res.item.token.access_token).then(res2 => {
      commit('loginInfo', res2.item.user)
    })
  })
}
/**
 * @description: 通过refreshtoken刷新toekn
 * @param {*} commit
 * @param {*} state
 * @return {*}
 */
export const refresh = ({ commit, state }) => {
  return refreshToken(state.refresh_token).then(res => {
    commit('refreshToken', res.item.token.access_token)
  })
}
