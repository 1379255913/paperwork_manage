<!--
 * @Description:我的审批页面
 * @Author: 张艺耀
 * @Date: 2022-10-14 21:03:10
 * @LastEditors: 张艺耀
 * @LastEditTime: 2022-10-29 14:54:18
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
        <my-tab :waited-number="waitedNumber" />
        <div>
          <van-pull-refresh
            v-model="isRefreshing"
            class="pull-refresh"
            @refresh="onRefresh"
          >
            <div class="application_container_content">
              <router-link
                v-for="item in approvalList"
                :key="item.id"
                :to="`/approve-process/${item.applyId}`"
                tag="div"
              >
                <card
                  :title="item.title"
                  :time="item.createDate"
                  tag-left-color="#1989fa"
                  :submit-name="item.leader"
                  :text="item.text"
                  :tag-right-title="item.tag"
                  :tag-right-type="item.color"
                />
              </router-link>
              <pull v-if="approvalList.length!==0" />
            </div>
          </van-pull-refresh>
          <van-empty
            v-if="approvalList.length===0"
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
import myTab from '@/components/Tab.vue'
import { getUserApproval } from '@/api/inform'
export default {
  components: {
    pull,
    card,
    myTab
  },
  data () {
    return {
      active: 5,
      waitedNumber: 0,
      isLoading: false,
      approvalList: [],
      isRefreshing: false
    }
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
    onRefresh () {
      this.getApplication(this.active)
      this.isRefreshing = false
    },
    /**
     * @description: 获取审批信息
     * @param {String} status 审批的状态种类
     * @return {*}
     */
    getApplication (status) {
      this.isLoading = true
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true
      })
      getUserApproval(status).then(res => {
        if (status === 5) {
          this.waitedNumber = res.page.count
        }
        const obj = {
          5: { tag: '等待审批', color: 'primary' },
          0: { tag: '通过', color: 'success' },
          1: { tag: '拒绝', color: 'danger' },
          4: { tag: '撤回', color: 'default' }
        }
        this.approvalList = res.page.list.map(each => {
          each.title = `${each.leader}提交的用证申请`
          each.tag = obj[each.status].tag
          each.color = obj[each.status].color
          const processList = each?.approvalProcessList?.[0]
          each.text = [
            `联系电话：${each.tellphone}`,
            `工作部门：${each.department}`,
            `当前审批节点：${processList?.currentOrganization} ${processList?.approval}`
          ]
          return each
        })
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
