<!--
 * @Description:用证记录页面
 * @Author: 张艺耀
 * @Date: 2022-10-13 12:51:09
 * @LastEditors: 张艺耀
 * @LastEditTime: 2022-10-29 12:20:36
-->
<template>
  <div>
    <div class="record_container">
      <div class="tabs_container" />
      <van-tabs
        v-model="active"
        sticky
        offset-top="11.8vw"
        color="#b13a3d"
        @click="onChange"
      >
        <van-tab
          name="0"
          title="未归还"
          class="tabs"
          :badge="noReadNumber"
          @click="onChange"
        />
        <van-tab
          name="1"
          title="已归还"
          class="tabs"
          @click="onChange"
        />
        <van-tab
          name="-1"
          title="全部"
          class="tabs"
          @click="onChange"
        />
        <div>
          <van-pull-refresh
            v-model="isRefreshing"
            class="pull-refresh"
            @refresh="onRefresh"
          >
            <div class="record_container_content">
              <router-link
                v-for="item in recordList"
                :key="item.id"
                :to="`/record-detail/${item.id}`"
                tag="div"
              >
                <card
                  :title="item.title"
                  :time="item.certificateId"
                  :submit-name="item.leader"
                  :text="item.text"
                />
              </router-link>
            </div>
          </van-pull-refresh>
          <van-empty
            v-if="recordList.length===0"
            description="暂无数据"
          />
          <pull v-if="recordList.length!==0" />
        </div>
      </van-tabs>
    </div>
  </div>
</template>

<script>
import card from '@/components/Card.vue'
import pull from '@/components/Pull.vue'
import store from '@/store/index'
import { getEvidenceRecord } from '@/api/inform'
import { paperwork } from '@/utils/dictory'
export default {
  components: {
    card,
    pull
  },
  data () {
    return {
      isRefreshing: false,
      isLoading: false,
      active: 0,
      type: 0,
      noReadNumber: 0,
      recordList: []
    }
  },
  created () { },
  mounted () {
    this.getRecord(0)
  },
  methods: {
    /**
     * @description: 标签页改变事件
     * @param {Number} name tab名
     * @param {String} title tab标题
     * @return {*}
     */
    onChange (name, title) {
      name = parseInt(name)
      this.getRecord(name)
      this.type = name
    },
    /**
     * @description: 获取用证记录
     * @param {Number} status 用证记录的种类
     * @return {*}
     */
    getRecord (status) {
      this.isLoading = true
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true
      })
      getEvidenceRecord(status, store.state.userInfo.id).then(res => {
        if (status === 0) {
          this.noReadNumber = res.page.list.length
        }
        this.recordList = res.page.list.map(each => {
          const cardName = paperwork.find(item => item.value === each.type)?.label ?? ''
          each.title = `${each.leader}的${cardName}`
          each.cardName = cardName
          each.text = [
            `借出时间：${each.outTime}`,
            `归还时间：${each.returnTime}`,
            `借出类型：${cardName}`,
            `地点：${each.destination}`,
            `事由：${each.reason}`
          ]
          return each
        })
        store.commit('setRecordDetail', this.recordList)
        this.isLoading = false
        this.$toast.clear()
      })
    },
    /**
     * @description: 重新获取用证记录
     * @return {*}
     */
    onRefresh () {
      this.getRecord(this.type)
      this.isRefreshing = false
    },
    /**
     * @description: 跳转到用证记录详细信息
     * @param {String|Number} id 用证记录id
     * @return {*}
     */
    onChangeRouter (id) {
      this.$router.push({ path: `/record-detail/${id}` })
    }
  }
}
</script>

<style lang=scss scoped>
.tabs {
  min-height: calc(var(--vh, 1vh) * 100 - 12.26667vw);
}

.pull-refresh {
  background-color: #f4f4f4;
}

.record_container {
  min-height: calc(var(--vh, 1vh) * 100 - 12.26667vw);
  background-color: #f4f4f4;
}

.tabs_container {
  position: relative;
  z-index: 20;
}

.record_container_content {
  padding: 0 2.66667vw 4vw;
}
</style>
