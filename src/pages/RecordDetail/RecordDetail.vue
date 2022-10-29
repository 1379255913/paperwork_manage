<!--
 * @Description:用证记录详情页面
 * @Author: 张艺耀
 * @Date: 2022-10-13 17:37:45
 * @LastEditors: 张艺耀
 * @LastEditTime: 2022-10-29 14:24:34
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
      <select-detail />
    </div>
  </div>
</template>

<script>
import store from '@/store/index'
import { mapState } from 'vuex'
import selectDetail from './components/selectDetail.vue'
export default {
  components: {
    selectDetail
  },
  data () {
    return {
      informList: []
    }
  },
  computed: {
    ...mapState({ storeData: 'selectDetail' })
  },
  created () {
    store.commit('getRecordDetailByID', this.$route.params.id)
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

.header_container_tag {
  margin-left: 2vw;
}

.record_detail {
  position: relative;
  min-height: calc(var(--vh, 1vh) * 100 - 12.26667vw);
  background-color: #f4f4f4;
}
</style>
