import request from '@/utils'

/**
 * @description 获取未读信息数
 * @returns {Object}
 */
export function getCount () {
  return request({
    url: '/api/lic/message/v1.0/getCount',
    method: 'get'
  })
}

/**
 * @description 获取消息
 * @returns {Object}
 */
export function getMessage () {
  return request({
    url: '/api/lic/message/v1.0/list',
    method: 'get',
    params: {
      pageNo: '1',
      pageSize: '10'
    }
  })
}

/**
 * @description 获取用证记录
 * @param {'1'|'0'|''|String} status 用证记录状态的种类
 * @param {String} id 用户的id值
 * @returns {Object}
 */
export function getEvidenceRecord (status, id) {
  const params = {
    leaderId: id,
    pageNo: '1',
    pageSize: '10'
  }
  if (status >= 0) {
    params.status = status
  }
  return request({
    url: '/api/lic/record/v1.0/list',
    method: 'get',
    params: params
  })
}

/**
 * @description 获取用户申请信息列表
 * @param {'0'|'1'|'5'|''|String} status 申请的状态种类
 * @returns {Object}
 */
export function getUserApplication (status) {
  const params = {
    pageNo: '0',
    pageSize: '10'
  }
  if (status >= 0) {
    params.status = status
  }
  return request({
    url: '/api/lic/approval/v1.0/list',
    method: 'get',
    params: params
  })
}

/**
 * @description 获取申请的详细信息
 * @param {String|Number} oid 申请的id
 * @returns {Object}
 */
export function getApplyProcess (oid) {
  return request({
    url: `/api/lic/approval/v1.0/getProcess/${oid}`,
    method: 'get'
  })
}

/**
 * @description 删除申请
 * @param {String|Number} oid 删除的申请的id
 * @param {String} reason 删除的原因
 * @returns {Object}
 */
export function deleteApplyProcess (oid, reason) {
  return request({
    url: `/api/lic/approval/v1.0/delete/${oid}`,
    method: 'delete',
    data: {
      reason: reason
    }
  })
}

/**
 * @description 获取用户的审批列表
 * @param {'0'|'1'|'5'|''|String} status 审批的状态种类
 * @returns {Object}
 */
export function getUserApproval (status) {
  const params = {
    pageNo: '0',
    pageSize: '10'
  }
  if (status >= 0) {
    params.status = status
  }
  return request({
    url: '/api/lic/process/v1.0/list',
    method: 'get',
    params: params
  })
}
/**
 * @description: 提交用证申请表单
 * @param {Object} data 表单详细数据
 * @return {*}
 */
export function postApply (data) {
  return request({
    url: '/api/lic/approval/v1.0/save',
    method: 'post',
    data: data
  })
}
