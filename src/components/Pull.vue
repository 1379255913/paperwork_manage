<!--
 * @Description:全局拉取为空组件
 * @Author: 张艺耀
 * @Date: 2022-10-13 17:07:11
 * @LastEditors: 张艺耀
 * @LastEditTime: 2022-10-26 11:30:55
-->

<template>
  <div class="pull">
    <div class="pull_title">
      没有更多了
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return { }
  },
  created () { },
  mounted () { },
  methods: { }
}
</script>

<style lang=scss scoped>
.pull {
  display: flex;
  align-items: center;
  justify-content: center;

  .pull_title {
    padding: 2.66667vw;
    font-size: 2.93333vw;
    color: #b13a3d;
  }
}
</style>
