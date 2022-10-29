<!--
 * @Description:审批详情页面
 * @Author: 张艺耀
 * @Date: 2022-10-14 21:11:30
 * @LastEditors: 张艺耀
 * @LastEditTime: 2022-10-29 12:03:36
-->

<template>
  <div>
    <div class="detail_container_view">
      <div class="process_container_content">
        <div class="header_container van-hairline--bottom">
          <div class="header_container_title">
            {{ infromData.leader }}提交的用证申请
          </div>
          <div class="header_container_tip">
            等待我处理
          </div>
        </div>
        <inform
          :text-object="infromData"
          :text-object2="infromData2"
        />
        <process :process-list="processList" />
      </div>
    </div>
  </div>
</template>

<script>
import { getApplyProcess } from '@/api/inform'
import Inform from '@/components/Inform.vue'
import Process from '@/components/Process.vue'
export default {
  components: {
    Inform,
    Process
  },
  data () {
    return {
      infromData: {},
      infromData2: {},
      processList: []
    }
  },
  created () {
    this.getData()
  },
  mounted () { },
  methods: {
    /**
     * @description: 获取审批信息
     * @return {*}
     */
    getData () {
      getApplyProcess(this.$route.params.id).then(res => {
        this.infromData = res.item.ApprovalFormList
        this.infromData2 = res.item.approvalFormEntityList[0]
        this.processList = this.infromData.approvalProcessList
        this.processList.unshift({
          id: '135215312153125',
          currentOrganization: '发起申请',
          approval: this.infromData.leader,
          createDate: this.infromData.createDate,
          status: '0'
        })
        const obj = {
          0: { class: 'succsess', icon: 'checked' },
          1: { class: 'fail', icon: 'clear' },
          4: { class: 'wait', icon: 'more' },
          5: { class: 'back', icon: 'warning' }
        }
        this.processList.forEach(each => {
          each.class = obj[each.status].class
          each.icon = obj[each.status].icon
        })
      })
    }
  }
}
</script>

<style lang=scss scoped>
.detail_container_view {
  min-height: calc(var(--vh, 1vh) * 100 - 12.26667vw);
  background-color: #f4f4f4;
}

.process_container_content {
  padding-bottom: 17.06667vw;

  .header_container {
    padding: 2.66667vw 4vw;
    background-color: #fff;

    .header_container_title {
      display: flex;
      align-items: center;
      font-size: 4.8vw;
      line-height: 1.6;
    }

    .header_container_tip {
      font-size: 3.2vw;
      line-height: 1.6;
      color: #ff976a;
    }
  }
}

.detail_container_content {
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
