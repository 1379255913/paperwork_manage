import axios from 'axios'
import { Notify } from 'vant'
import store from '@/store/index'
// import { getToken } from '@utils/auth'

// 请求超时时间
// const TIMEOUT = 10000
const TIMEOUT = 3000000 // TODO /api/table/searchData 接口请求需较长时间，设置3000000与后端对应
// 创建 axios 实例
export const request = axios.create({
  baseURL: 'http://112.111.0.102:12384', // api的base_url
  timeout: TIMEOUT,
  validateStatus: function (status) {
    return status < 500 // response status 不在范围内直接 reject
  }
})
// 创建静默 axios 实例
export const silenceRequest = axios.create({
  baseURL: '/', // api的base_url
  timeout: TIMEOUT,
  validateStatus: function (status) {
    return status < 500 // response status 不在范围内直接 reject
  }
})

// request拦截器
const requestInterceptor = request.interceptors.request.use(
  (request) => {
    // 防止 IE 缓存 get 请求
    if (request.method === 'get') {
      request.headers = {
        ...request.headers,
        'Cache-Control': 'no-cache',
        Pragma: 'no-cache'
      }
    }
    request.headers = {
      ...request.headers,
      // 请求时间， format ISOString 并修复时差
      'Request-DateTime': new Date(
        Date.now() - new Date().getTimezoneOffset() * 60000
      )
        .toISOString()
        .slice(0, -5)
        .replace('T', ' ')
    }
    if (store.state.access_token) {
      request.headers = {
        ...request.headers,
        'Access-Token': store.state.access_token
      }
    }
    return request
  },
  (error) => {
    Notify({ type: 'danger', message: `网络错误: ${error.message}` })
    Promise.reject(error)
  }
)
silenceRequest.interceptors.request.use(requestInterceptor)

// respone拦截器
// let count = 0
request.interceptors.response.use(
  (response) => {
    const { config, status, data } = response
    if (status !== 200) {
      Notify({ type: 'danger', message: `网络错误, 状态码:${status}` })
      return Promise.reject(new Error(`HTTP code is ${status}`))
    } else {
      // 这段代码用于模拟 -10005 和 -10014 的返回状态，已经测试通过
      // if (config.url === '/api/user' && count < 2) {
      //   count++
      //   data.msgCode = -10005
      //   console.log('修改状态为 -10005')
      // }
      // if (config.url === '/api/token/refresh') {
      //   data.msgCode = -10014
      //   data.errMsg = '刷新 token 过期'
      //   console.log('修改状态为 -10014')
      // }
      if (data.msgCode < 0) {
        return handleMsgCode(data, config)
      }
      return data
    }
  },
  (error) => {
    if (error.code === 'ECONNABORTED') {
      Notify({ type: 'warning', message: '请求超时，请重试' })
    } else if (error.response && error.response.status) {
      Notify({ type: 'danger', message: `网络错误: 状态码 ${error.response.status}` })
    } else {
      Notify({ type: 'danger', message: `网络错误: ${error.message}` })
    }
    return Promise.reject(error)
  }
)

silenceRequest.interceptors.response.use(
  (response) => {
    const { config, status, data } = response
    if (status !== 200) {
      return Promise.reject(new Error(`HTTP code is ${status}`))
    } else {
      if (data.msgCode < 0) {
        return handleMsgCode(data, config)
      }
      return data
    }
  },
  (error) => {
    return Promise.reject(error)
  }
)

export default request

// 处理 msgCode 小于 0 的情况
function handleMsgCode (data, config) {
  // access_token 过期，需要 refresh
  if (data.msgCode === -10005) {
    return refreshSingleton.create().then((user) => {
      // 将之前的 'Access-Token'换成最新的再次请求
      config.headers['Access-Token'] =
        store.state.access_token
      return request(config)
    })
  }
  // refresh_token 过期，需要重新登录，不显示提示
  if (data.msgCode !== -10014) {
    Notify({ type: 'danger', message: data.errMsg })
  }
  return Promise.reject(data)
}

// 单例模式 refresh Promise
class refreshSingleton {
  static create () {
    if (!refreshSingleton.instance) {
      refreshSingleton.instance = store
        .dispatch('refresh')
        .then((_) => {
          refreshSingleton.instance = null
        })
        .catch((error) => {
          refreshSingleton.instance = null
          return Promise.reject(error)
        })
    }
    return refreshSingleton.instance
  }
}
