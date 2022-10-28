<!--
 * @Description:我的申请页面
 * @Author: 张艺耀
 * @Date: 2022-10-13 22:29:34
 * @LastEditors: 张艺耀
 * @LastEditTime: 2022-10-28 12:03:46
-->
<template>
  <div>
    <div class="application_container">
      <van-tabs
        v-model="active"
        sticky
        offset-top="11.8vw"
        color="#b13a3d"
        @click="onChange"
      >
        <van-tab
          title="等待审批"
          name="5"
          class="tabs"
          :badge="waitedNumber"
          @click="onChange"
        />
        <van-tab
          title="通过"
          name="0"
          class="tabs"
          @click="onChange"
        />
        <van-tab
          title="拒绝"
          name="1"
          class="tabs"
          @click="onChange"
        />
        <van-tab
          title="全部"
          name="-1"
          class="tabs"
          @click="onChange"
        />
        <div>
          <van-pull-refresh
            v-model="isRefreshing"
            class="pull-refresh"
            @refresh="onRefresh"
          >
            <div class="application_container_content">
              <router-link
                v-for="item in applicationList"
                :key="item.id"
                :to="`/apply-process/${item.applyId}`"
                tag="div"
              >
                <card
                  :title="item.title"
                  :time="item.createDate"
                  tag-left-color="#1989fa"
                  :submit-name="userInfo.xm"
                  :text="item.text"
                  :tag-right-title="item.tag"
                  :tag-right-type="item.color"
                />
              </router-link>
              <pull v-if="applicationList.length!==0" />
            </div>
          </van-pull-refresh>
          <van-empty
            v-if="applicationList.length===0"
            description="暂无数据"
          />
        </div>
      </van-tabs>
    </div>
  </div>
</template>

<script>
import pull from '@/components/Pull.vue'
import card from '@/components/Card.vue'
import { mapState } from 'vuex'
import { getUserApplication } from '@/api/inform'
export default {
  components: {
    pull,
    card
  },
  data () {
    return {
      active: 5,
      waitedNumber: 0,
      isLoading: false,
      applicationList: [],
      isRefreshing: false
    }
  },
  computed: {
    ...mapState(['userInfo'])
  },
  created () {
  },
  mounted () {
    this.getApplication(5)
  },
  methods: {
    onChange (name, title) {
      this.getApplication(parseInt(name))
    },
    /**
     * @description: 重新获取信息
     * @return {*}
     */
    onRefresh () {
      this.getApplication(this.active)
      this.isRefreshing = false
    },
    /**
     * @description: 获取申请信息
     * @param {String} status 申请的状态种类
     * @return {*}
     */
    getApplication (status) {
      this.isLoading = true
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true
      })
      getUserApplication(status).then(res => {
        const ans = res.page.list
        if (status === 5) {
          this.waitedNumber = res.page.count
        }
        const obj = {
          5: { tag: '等待审批', color: 'primary' },
          0: { tag: '通过', color: 'success' },
          1: { tag: '拒绝', color: 'danger' },
          4: { tag: '撤回', color: 'default' }
        }
        ans.forEach(each => {
          each.title = `${each.leader}提交的用证申请`
          each.tag = obj[each.status].tag
          each.color = obj[each.status].color
          const temp = []
          console.log(each.approvalProcessList)
          temp.push(`联系电话：${this.userInfo.phone}`)
          temp.push(`工作部门：${this.userInfo.ssdwm}`)
          let processList = {}
          processList = each?.approvalProcessList?.[0]
          temp.push(`当前审批节点：${processList?.currentOrganization} ${processList?.approval}`)
          console.log(temp)
          each.text = temp
        })
        this.applicationList = ans
        this.isLoading = false
        this.$toast.clear()
      })
    }
  }
}
</script>

<style lang=scss scoped>
.application_container {
  min-height: calc(var(--vh, 1vh) * 100 - 11.2vw);
  background-color: #f4f4f4;
}

.application_container_content {
  min-height: calc(var(--vh, 1vh) * 100 - 11.2vw);
  padding: 0 2.66667vw 4vw;
}
</style>
