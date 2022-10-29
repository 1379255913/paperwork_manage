<!--
 * @Description:申请详情页面
 * @Author: 张艺耀
 * @Date: 2022-10-14 16:38:39
 * @LastEditors: 张艺耀
 * @LastEditTime: 2022-10-29 12:05:59
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
    <div class="process_container_footer van-hairline--top">
      <van-button
        color="#b13a3d"
        round
        block
        type="info"
        native-type="submit"
        @click="showPopup = true"
      >
        取消申请
      </van-button>
    </div>
    <van-popup
      v-model="showPopup"
      position="right"
      :style="{ width: '100%', height: '100%', overflo:'hidden' }"
    >
      <van-nav-bar
        left-text="返回"
        title="取消用证申请"
        left-arrow
        @click-left="showPopup=false"
      />
      <van-form @submit="onSubmit">
        <van-cell-group>
          <van-field
            v-model="reason"
            class="cancel_container"
            rows="30"
            type="textarea"
            placeholder="请输入原因"
            :rules="[{ required: true }]"
          />
        </van-cell-group>
        <div class="cancel_container_btn">
          <van-button
            color="#b13a3d"
            round
            block
            type="info"
            native-type="submit"
          >
            提交
          </van-button>
        </div>
      </van-form>
    </van-popup>
  </div>
</template>

<script>
import { getApplyProcess, deleteApplyProcess } from '@/api/inform'
import Inform from '@/components/Inform.vue'
import Process from '@/components/Process.vue'
import { Notify } from 'vant'
export default {
  components: {
    Inform,
    Process
  },
  data () {
    return {
      infromData: {},
      infromData2: {},
      processList: [],
      showPopup: false,
      reason: ''
    }
  },
  created () {
    this.getData()
  },
  mounted () { },
  methods: {
    /**
     * @description: 提交取消申请表单
     * @return {*}
     */
    onSubmit () {
      deleteApplyProcess(this.$route.params.id, this.reason).then(_ => {
        Notify({ type: 'success', message: '申请单撤回成功' })
        this.showPopup = false
        this.getData()
      })
    },
    /**
     * @description: 获取申请单信息
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
          approval: '我',
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

.process_container_footer {
  position: fixed;
  bottom: 0;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 2.66667vw 8vw;
  background-color: #fff;
}

.cancel_container {
  height: calc(var(--vh, 1vh) * 100 - 150px);
}

.cancel_container_btn {
  position: fixed;
  bottom: 0;
  left: 0;
  box-sizing: border-box;
  width: 100%;
  padding: 5.33333vw 8vw;
}
</style>
