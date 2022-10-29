<!--
 * @Description:基本信息组件
 * @Author: 张艺耀
 * @Date: 2022-10-29 15:00:00
 * @LastEditors: 张艺耀
 * @LastEditTime: 2022-10-29 15:14:16
-->
<template>
  <div>
    <div
      v-for="(item, index) in informList"
      :key="index"
      class="cell"
    >
      <div class="cell_title">
        {{ item.title }}
      </div>
      <div class="cell_value">
        {{ item.label }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    informList: {
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
  methods: { }
}
</script>

<style lang=scss scoped>
.cell {
  margin: 5.86667vw 0;

  .cell_title {
    font-size: 3.46667vw;
    color: #282828;
  }

  .cell_value {
    padding: 3.2vw 0;
    font-size: 4vw;
    color: #868686;
  }
}
</style>
