<!--
 * @Description:用证记录详情组件
 * @Author: 张艺耀
 * @Date: 2022-10-29 14:17:39
 * @LastEditors: 张艺耀
 * @LastEditTime: 2022-10-29 14:21:56
-->
<template>
  <ul class="form_detail">
    <li
      class="form_detail_item"
    >
      <div class="form_detail_item_title">
        借出时间
      </div>
      <div class="form_detail_item_text">
        {{ storeData.outTime }}
      </div>
    </li>
    <li
      class="form_detail_item"
    >
      <div class="form_detail_item_title">
        归还时间
      </div>
      <div class="form_detail_item_text">
        {{ storeData.returnTime }}
      </div>
    </li>
    <li
      class="form_detail_item"
    >
      <div class="form_detail_item_title">
        时长
      </div>
      <div class="form_detail_item_text">
        {{ storeData.returnTime }}
      </div>
    </li>
    <li
      class="form_detail_item"
    >
      <div class="form_detail_item_title">
        借出类型
      </div>
      <div class="form_detail_item_text">
        {{ storeData.cardName }}
      </div>
    </li>
    <li
      class="form_detail_item"
    >
      <div class="form_detail_item_title">
        地点
      </div>
      <div class="form_detail_item_text">
        {{ storeData.destination }}
      </div>
    </li>
    <li
      class="form_detail_item"
    >
      <div class="form_detail_item_title">
        事由
      </div>
      <div class="form_detail_item_text">
        {{ storeData.reason }}
      </div>
    </li>
    <li
      class="form_detail_item"
    >
      <div class="form_detail_item_title">
        归还提醒时间
      </div>
      <div class="form_detail_item_text">
        {{ storeData.returnTime }}
      </div>
    </li>
  </ul>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data () {
    return { }
  },
  computed: {
    ...mapState({ storeData: 'selectDetail' })
  },
  created () { },
  mounted () { },
  methods: { }
}
</script>

<style lang=scss scoped>
.form_detail {
  padding: 4vw 4vw 1.33333vw;
  margin: 4vw 2.66667vw;
  background-color: #fff;
  border-radius: 2.66667vw;

  .form_detail_item {
    margin-bottom: 2.66667vw;
    line-height: 1.6;

    .form_detail_item_title {
      font-size: 3.2vw;
      color: #868686;
    }

    .form_detail_item_text {
      font-size: 4vw;
    }
  }
}
</style>
