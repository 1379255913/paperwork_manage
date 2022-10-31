<!--
 * @Description:我的申请页面
 * @Author: 张艺耀
 * @Date: 2022-10-13 22:29:34
 * @LastEditors: 张艺耀
 * @LastEditTime: 2022-10-31 20:19:27
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
        <my-tab :tab-list="tabList" />
        <my-list
          :data-list="applicationList"
          to-prefix="apply-process"
          tag-left-color="#1989fa"
          @refresh="onRefresh"
        />
      </van-tabs>
    </div>
  </div>
</template>

<script>
import myTab from '@/components/Tab.vue'
import myList from '@/components/List.vue'
import { mapState } from 'vuex'
import { getUserApplication } from '@/api/inform'
export default {
  components: {
    myTab,
    myList
  },
  data () {
    return {
      active: 5,
      tabList: [
        { title: '等待审批', name: '5', waitedNumber: '' },
        { title: '通过', name: '0', waitedNumber: '' },
        { title: '拒绝', name: '1', waitedNumber: '' },
        { title: '全部', name: '-1', waitedNumber: '' }
      ],
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
        if (status === 5) {
          this.tabList[0].waitedNumber = res.page.count
        }
        const obj = {
          5: { tag: '等待审批', color: 'primary' },
          0: { tag: '通过', color: 'success' },
          1: { tag: '拒绝', color: 'danger' },
          4: { tag: '撤回', color: 'default' }
        }
        this.applicationList = res.page.list.map(each => {
          each.id = each.applyId
          each.title = `${each.leader}提交的用证申请`
          each.tag = obj[each.status].tag
          each.color = obj[each.status].color
          each.submitName = this.userInfo.xm
          const processList = each?.approvalProcessList?.[0]
          each.text = [
            `联系电话：${this.userInfo.phone}`,
            `工作部门：${this.userInfo.ssdwm}`,
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
