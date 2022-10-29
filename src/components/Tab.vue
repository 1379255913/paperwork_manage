<!--
 * @Description:UserApplication和UserApproval的Tab组件
 * @Author: 张艺耀
 * @Date: 2022-10-29 14:41:48
 * @LastEditors: 张艺耀
 * @LastEditTime: 2022-10-29 14:52:44
-->
<template>
  <div>
    <van-tab
      title="等待审批"
      name="5"
      class="tabs"
      :badge="waitedNumber"
    />
    <van-tab
      title="通过"
      name="0"
      class="tabs"
    />
    <van-tab
      title="拒绝"
      name="1"
      class="tabs"
    />
    <van-tab
      title="全部"
      name="-1"
      class="tabs"
    />
  </div>
</template>

<script>
export default {
  props: {
    waitedNumber: {
      type: Number,
      default () {
        return 0
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
