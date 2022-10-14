<template>
  <div>
    <van-nav-bar
      left-text="返回"
      title="用证记录"
      left-arrow
      fixed
      placeholder
      @click-left="onClickLeft"
    />
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
          title="未归还"
          class="tabs"
          :badge="noReadNumber"
          @click="onChange"
        />
        <van-tab
          title="已归还"
          class="tabs"
          @click="onChange"
        />
        <van-tab
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
    onClickLeft () {
      this.$router.go(-1)
    },
    onChange (name, title) {
      if (title === '未归还') {
        this.getRecord(0)
        this.type = 0
      } else if (title === '已归还') {
        this.getRecord(1)
        this.type = 1
      } else if (title === '全部') {
        this.getRecord(-1)
        this.type = -1
      }
    },
    getRecord (status) {
      this.isLoading = true
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true
      })
      getEvidenceRecord(status, store.state.userInfo.id).then(res => {
        const ans = res.page.list
        if (status === 0) {
          this.noReadNumber = ans.length
        }
        ans.forEach(each => {
          let cardName = ''
          paperwork.forEach(each2 => {
            if (each.type === each2.value) {
              cardName = each2.label
            }
          })
          each.title = `${each.leader}的${cardName}`
          each.cardName = cardName
          const temp = []
          temp.push(`借出时间：${each.outTime}`)
          temp.push(`归还时间：${each.returnTime}`)
          temp.push(`借出类型：${cardName}`)
          temp.push(`地点：${each.destination}`)
          temp.push(`事由：${each.reason}`)
          each.text = temp
        })
        console.log(ans)
        store.commit('setRecordDetail', ans)
        this.recordList = ans
        this.isLoading = false
        this.$toast.clear()
      })
    },
    onRefresh () {
      this.getRecord(this.type)
      this.isRefreshing = false
    },
    onChangeRouter (id) {
      console.log(2)
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
