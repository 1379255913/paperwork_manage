/*
 * @Description: 将日期格式化为yyyy-mm-dd的格式
 * @Author: 张艺耀
 * @Date: 2022-10-09 17:28:04
 * @LastEditors: 张艺耀
 * @LastEditTime: 2022-10-26 11:15:28
 */

/**
 * @description: 将日期格式化为yyyy-mm-dd的格式
 * @param {Date} date 需要格式化的日期
 * @return {String} 格式化后的日期
 */
export function formatDateTime (date) {
  var y = date.getFullYear()
  var m = date.getMonth() + 1
  m = m < 10 ? ('0' + m) : m
  var d = date.getDate()
  d = d < 10 ? ('0' + d) : d
  return y + '-' + m + '-' + d
}
