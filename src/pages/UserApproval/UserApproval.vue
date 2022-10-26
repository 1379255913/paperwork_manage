<!--
 * @Description:我的审批页面
 * @Author: 张艺耀
 * @Date: 2022-10-14 21:03:10
 * @LastEditors: 张艺耀
 * @LastEditTime: 2022-10-26 19:36:31
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
import { getUserApproval } from '@/api/inform'
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
        const ans = res.page.list
        if (status === 5) {
          this.waitedNumber = res.page.count
        }
        ans.forEach(each => {
          each.title = `${each.leader}提交的用证申请`
          if (each.status === '5') {
            each.tag = '等待审批'
            each.color = 'primary'
          } else if (each.status === '0') {
            each.tag = '通过'
            each.color = 'success'
          } else if (each.status === '1') {
            each.tag = '拒绝'
            each.color = 'danger'
          } else if (each.status === '4') {
            each.tag = '撤回'
            each.color = 'default'
          }
          const temp = []
          temp.push(`联系电话：${each.tellphone}`)
          temp.push(`工作部门：${each.department}`)
          let processList = {}
          if (each.approvalProcessList && each.approvalProcessList.length > 0) {
            processList = each.approvalProcessList[0]
            console.log(processList)
          } else {
            processList = undefined
          }
          temp.push(`当前审批节点：${processList?.currentOrganization} ${processList?.approval}`)
          console.log(temp)
          each.text = temp
        })
        this.approvalList = ans
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
