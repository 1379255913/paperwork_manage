/*
 * @Description:对地区进行排序
 * @Author: 张艺耀
 * @Date: 2022-10-29 10:31:59
 * @LastEditors: 张艺耀
 * @LastEditTime: 2022-10-29 10:53:46
 */
/**
 * @description: 对国家/地区进行排序
 * @param {Array} area 存放地区的数组
 * @return {*}
 */
export function areaSort (area) {
  const ans = {}
  area.forEach(each => {
    if (ans[each.remarks] === undefined) {
      ans[each.remarks] = []
    }
    ans[each.remarks].push({
      label: each.label,
      key: each.id
    })
  })
  const keysSorted = Object.keys(ans).sort()
  const newObj = {}
  keysSorted.forEach((each) => {
    newObj[each] = ans[each]
  })
  console.log(newObj)
  return newObj
}
