<!--
 * @Description:用证记录详情页面
 * @Author: 张艺耀
 * @Date: 2022-10-13 17:37:45
 * @LastEditors: 张艺耀
 * @LastEditTime: 2022-10-26 19:00:29
-->
<template>
  <div>
    <div class="record_detail">
      <div class="header_container van-hairline--bottom">
        <div class="header_container_title">
          {{ storeData.title }}
          <van-tag
            round
            plain
            color="rgb(177, 58, 61)"
            class="header_container_tag"
          >
            {{ storeData.status==='1' ? '已归还' : '未归还' }}
          </van-tag>
        </div>
        <div class="header_container_number">
          {{ storeData.certificateId }}
        </div>
      </div>
      <ul class="form_detail">
        <li
          v-for="(item,index) in informList"
          :key="index"
          class="form_detail_item"
        >
          <div class="form_detail_item_title">
            {{ item[0] }}
          </div>
          <div class="form_detail_item_text">
            {{ item[1] }}
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import store from '@/store/index'
import { mapState } from 'vuex'
export default {
  data () {
    return {
      informList: []
    }
  },
  computed: {
    ...mapState({ storeData: 'selectDetail' })
  },
  created () {
    console.log(this.$route.params.id)
    store.commit('getRecordDetailByID', this.$route.params.id)
    if (Object.keys(store.state.selectDetail).length !== 0) {
      const temp = []
      temp.push(['借出时间', store.state.selectDetail.outTime])
      temp.push(['归还时间', store.state.selectDetail.returnTime])
      temp.push(['时长', store.state.selectDetail.returnTime])
      temp.push(['借出类型', store.state.selectDetail.cardName])
      temp.push(['地点', store.state.selectDetail.destination])
      temp.push(['事由', store.state.selectDetail.reason])
      temp.push(['归还提醒时间', store.state.selectDetail.returnTime])
      this.informList = temp
    }
  },
  mounted () { },
  methods: {
  }
}
</script>

<style lang=scss scoped>
.header_container {
  padding: 2.66667vw 4vw;
  background-color: #fff;

  .header_container_title {
    display: flex;
    align-items: center;
    font-size: 4.8vw;
    line-height: 1.6;
  }

  .header_container_number {
    font-size: 3.2vw;
    line-height: 1.6;
    color: #868686;
  }
}

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

.header_container_tag {
  margin-left: 2vw;
}

.record_detail {
  position: relative;
  min-height: calc(var(--vh, 1vh) * 100 - 12.26667vw);
  background-color: #f4f4f4;
}
</style>
