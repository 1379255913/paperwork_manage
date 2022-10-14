<template>
  <div>
    <van-nav-bar
      left-text="返回"
      title="申请详情"
      left-arrow
      fixed
      placeholder
      @click-left="onClickLeft"
    />
    <div class="detail_container_view">
      <div class="process_container_content">
        <div class="header_container van-hairline--bottom">
          <div class="header_container_title">
            {{ state.leader }}提交的用证申请
          </div>
          <div class="header_container_tip">
            等待我处理
          </div>
        </div>
        <ul class="detail_container_content">
          <li
            v-for="(item,index) in infromList"
            :key="index"
            class="form_detail_item"
          >
            <div class="form_detail_item_title">
              {{ item.title }}
            </div>
            <div class="form_detail_item_text">
              {{ item.text }}
            </div>
          </li>
        </ul>
        <div class="information_container">
          <div class="information_container_title">
            流程
          </div>
          <div
            v-for="(item, index) in processList"
            :key="item.id"
            class="item_container"
          >
            <div class="item_container_left">
              <div
                v-if="index !== 0"
                class="item_container_left_line"
              />
              <div class="item_container_left_icon">
                <p class="item_container_left_icon_text">
                  {{ item.approval.slice(0,1) }}
                </p>
                <van-icon
                  class="item_container_left_icon_state"
                  :class="{ 'success': item.status === '0', 'fail': item.status === '1','wait': item.status === '5','back': item.status === '4'}"
                  :name="item.status === '0' ? 'checked' : item.status === '1' ? 'clear' : item.status === '4' ? 'warning' : 'more'"
                />
              </div>
            </div>
            <div class="item_container_right">
              <div class="item_container_right_header">
                <p class="item_container_right_header_title">
                  {{ item.currentOrganization }}
                </p>
                <p class="item_container_right_header_time">
                  {{ item.createDate }}
                </p>
              </div>
              <p class="item_container_right_name">
                {{ item.approval }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getApplyProcess } from '@/api/inform'
export default {
  data () {
    return {
      state: {},
      infromList: [],
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
    onClickLeft () {
      this.$router.go(-1)
    },
    getData () {
      getApplyProcess(this.$route.params.id).then(res => {
        const ans = res.item.ApprovalFormList
        const ans2 = res.item.approvalFormEntityList[0]
        this.state = ans
        console.log(ans)
        let temp = []
        temp.push({ title: '姓名', text: ans.leader })
        temp.push({ title: '性别', text: ans.sex === '0' ? '男' : '女' })
        temp.push({ title: '出生日期', text: ans.birthDate })
        temp.push({ title: '籍贯', text: ans.birthplace })
        temp.push({ title: '民族', text: ans.nation })
        temp.push({ title: '政治面貌', text: ans.politicsStatus })
        temp.push({ title: '身份证号码', text: ans.idCard })
        temp.push({ title: '文化程度', text: ans.education })
        temp.push({ title: '工作部门', text: ans.department })
        temp.push({ title: '职位', text: ans.job })
        temp.push({ title: '家庭住址', text: ans.address })
        temp.push({ title: '联系电话', text: ans.tellphone })
        temp.push({ title: '应急联系人', text: ans.emergencyContact })
        temp.push({ title: '联系电话', text: ans.emergencyPhone })
        temp.push({ title: '证件名称', text: ans2.certificate })
        temp.push({ title: '证件号码', text: ans2.certificateId })
        temp.push({ title: '出发时间', text: ans2.startTime })
        temp.push({ title: '回程时间', text: ans2.endTime })
        temp.push({ title: '目的地', text: ans2.destination })
        temp.push({ title: '使用事由', text: ans2.reason })
        this.infromList = temp
        temp = ans.approvalProcessList
        temp.unshift({
          id: '135215312153125',
          currentOrganization: '发起申请',
          approval: ans.leader,
          createDate: ans.createDate,
          status: '0'
        })
        this.processList = temp
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

.information_container {
  padding: 4vw;
  margin: 4vw 2.66667vw;
  background-color: #fff;
  border-radius: 2.66667vw;

  .information_container_title {
    margin-bottom: 4vw;
    font-size: 4vw;
    font-weight: 500;
  }
}

.item_container {
  display: flex;
  align-items: flex-end;
}

.item_container_left {
  display: flex;
  flex-direction: column;

  .item_container_left_line {
    height: 8vw;
    margin: 1.33333vw auto;
    border-style: solid;
    border-left: 0.66667vw solid #ccc;
  }

  .item_container_left_icon {
    position: relative;
    width: 9.33333vw;
    height: 9.33333vw;
    text-align: center;
    background-color: #1989fa;
    border-radius: 1.33333vw;

    .item_container_left_icon_text {
      font-size: 4vw;
      line-height: 9.33333vw;
      color: #fff;
    }

    .item_container_left_icon_state {
      position: absolute;
      right: -0.53333vw;
      bottom: -0.53333vw;
      color: #07c160;
      background-color: #fff;
      border: 0.53333vw solid #fffbe8;
      border-radius: 50%;
    }

    .success {
      color: #07c160;
    }

    .wait {
      color: #1989fa;
    }

    .fail {
      color: #ee0a24;
    }

    .back {
      color: #ff976a;
    }
  }
}

.item_container_right {
  flex: 1;
  padding-left: 4vw;

  .item_container_right_header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 2.93333vw;

    .item_container_right_header_title {
      font-size: 3.73333vw;
    }

    .item_container_right_header_time {
      font-size: 2.93333vw;
      color: #868686;
    }
  }

  .item_container_right_name {
    font-size: 3.2vw;
    color: #868686;
  }
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
