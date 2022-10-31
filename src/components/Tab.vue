<!--
 * @Description:UserApplication和UserApproval的Tab组件
 * @Author: 张艺耀
 * @Date: 2022-10-29 14:41:48
 * @LastEditors: 张艺耀
 * @LastEditTime: 2022-10-31 19:24:36
-->
<template>
  <div>
    <van-tab
      v-for="(item, index) in tabList"
      :key="index"
      :title="item.title"
      :name="item.name"
      class="tabs"
      :badge="item.waitedNumber"
    />
  </div>
</template>

<script>
export default {
  props: {
    tabList: {
      type: Array,
      default () {
        return []
      }
    }
  },
  data () {
    return { }
  },
  created () { },
  mounted () { },
  methods: {
  }
}
</script>
