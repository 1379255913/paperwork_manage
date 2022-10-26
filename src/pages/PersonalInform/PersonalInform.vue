<!--
 * @Description:个人信息页面
 * @Author: 张艺耀
 * @Date: 2022-10-10 20:09:01
 * @LastEditors: 张艺耀
 * @LastEditTime: 2022-10-26 19:00:03
-->
<template>
  <div>
    <div class="detail_container_view">
      <div class="wrap">
        <div class="information_basic">
          <div class="information_title">
            基础信息
          </div>
          <div
            v-for="(item, index) in informList1"
            :key="index"
            class="van-hairline--bottom cell"
          >
            <div class="cell_title">
              {{ item.title }}
            </div>
            <div class="cell_value">
              {{ item.label }}
            </div>
          </div>
        </div>
        <div class="information_common">
          <div class="information_title">
            常用信息
          </div>
          <div
            v-for="(item, index) in informList2"
            :key="index"
            class="van-hairline--bottom cell"
          >
            <div class="cell_title">
              {{ item.title }}
            </div>
            <div class="cell_value">
              {{ item.label }}
            </div>
          </div>
        </div>
        <div class="information_common" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data () {
    return {
      informList1: [],
      informList2: []
    }
  },
  computed: {
    ...mapState(['userInfo'])
  },
  created () {
    this.informList1 = [
      {
        title: '姓名',
        label: this.userInfo.xm
      },
      {
        title: '性别',
        label: this.userInfo.xbm === '0' ? '男' : '女'
      },
      {
        title: '出生日期',
        label: this.userInfo.csrq
      },
      {
        title: '国籍',
        label: this.userInfo.gjm
      },
      {
        title: '联系电话',
        label: this.userInfo.phone
      }
    ]
    this.informList2 = [
      {
        title: '籍贯',
        label: this.userInfo.xm
      },
      {
        title: '民族',
        label: this.userInfo.mzm
      },
      {
        title: '政治面貌',
        label: this.userInfo.zzmmm
      },
      {
        title: '身份证号',
        label: this.userInfo.zjhm
      },
      {
        title: '文化程度',
        label: this.userInfo.xwm
      },
      {
        title: '工作部门',
        label: this.userInfo.ssdwm
      },
      {
        title: '职务',
        label: this.userInfo.przyjszwm
      },
      {
        title: '家庭住址',
        label: this.userInfo.jtzz
      },
      {
        title: '应急联系人',
        label: this.userInfo.yjlxr ? this.userInfo.yjlxr : '-'
      },
      {
        title: '联系电话',
        label: this.userInfo.yjlxrdh ? this.userInfo.yjlxrdh : '-'
      }
    ]
  },
  mounted () { },
  methods: {
  }
}
</script>

<style lang=scss scoped>
.detail_container_view {
  height: calc(var(--vh, 1vh) * 100 - 12.26667vw);

  .wrap {
    padding: 8.53333vw 6.66667vw 6.66667vw;
  }
}

.information_basic {
  margin-bottom: 8.53333vw;
}

.information_title {
  font-size: 5.86667vw;
  color: #282828;
}

.cell {
  margin: 5.86667vw 0;

  .cell_title {
    font-size: 3.46667vw;
    color: #282828;
  }

  .cell_value {
    padding: 3.2vw 0;
    font-size: 4vw;
    color: #868686;
  }
}
</style>
