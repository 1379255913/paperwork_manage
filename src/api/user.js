import request from '@/utils'

/**
 * @description 登录，由于不知道加密方式，因此只会登录一个
 * @returns {Object}
 */
export function login () {
  return request({
    url: '/api/login',
    method: 'post',
    params: {
      username: '0465634624364fbdff03958e72fa7002d9b5328f48302e7430da85677989ef551ebb162b8d8f085dc9d09c90eb2b80db858f0862f07a12322e979b3d440e2ebb0dcc5caeafde82ae77fb7bf78a884db42f58c18c9481c9ddf12e0a8d30c826044ecf4b9e04e6c6',
      password: '04d61996cbfd43591b02c9fed5dc18708b2ca3ccc4660c29b247781478e3187814229c1808197cfe5e3e4f918d7eee4b485809d5433cdf72b21bf39dffe3d1f9825c956921093017be4d4d97bb769c38940a617577fa235438dfabb39f48e5bcc45453bb8f3be6'
    }
  })
}

/**
 * @description 获取用户信息
 * @param {String} toekn token数据
 * @returns {Object}
 */
export function getLoginInfo (token) {
  return request({
    url: '/api/lics/loginLic/loginLic',
    method: 'post',
    params: {
      token: token
    }
  })
}

/**
 * @description 重新获取token
 * @param {String} refreshToken refreshtoken数据
 * @returns {Object}
 */
export function refreshToken (refreshToken) {
  return request({
    url: '/api/token/refresh',
    method: 'post',
    params: {
      refreshToken: refreshToken
    }
  })
}
