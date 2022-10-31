<!--
 * @Description:用证申请页面
 * @Author: 张艺耀
 * @Date: 2022-10-08 22:00:52
 * @LastEditors: 张艺耀
 * @LastEditTime: 2022-10-31 20:44:33
-->

<template>
  <div>
    <van-form @submit="onSubmit">
      <read-only-field :form-list="formList" />
      <van-field
        v-model="CardPickname"
        name="选择证件"
        label="选择证件"
        placeholder="请选择申请的证件"
        readonly
        required
        :rules="[{ required: true}]"
        @click="showPickerCard=true"
      >
        {{ CardPickname }}
      </van-field>
      <div
        v-for="(item,index) in CardDetailListPick"
        :key="index+100"
      >
        <van-field
          v-model="item.cardName"
          name="申领证照名称"
          label="申领证照名称"
          readonly
          required
        >
          {{ item.cardName }}
        </van-field>
        <van-field
          v-model="item.cardID"
          name="证件号码"
          label="证件号码"
          readonly
          required
        >
          {{ item.cardID }}
        </van-field>
        <van-field
          v-model="item.isNewCard"
          name="是否新证"
          label="是否新证"
          readonly
          required
        >
          {{ item.isNewCard }}
        </van-field>
        <van-field
          v-model="item.beginTime"
          name="开始时间"
          label="开始时间"
          placeholder="请选择证照开始使用时间"
          readonly
          required
          :rules="[{ required: true}]"
          @click="onClickDatePicker(item.cardName, 'begin')"
        >
          {{ item.beginTime }}
        </van-field>
        <van-field
          v-model="item.endTime"
          name="结束时间"
          label="结束时间"
          placeholder="请选择证照结束使用时间"
          readonly
          required
          :rules="[{ required: true}]"
          @click="onClickDatePicker(item.cardName, 'end')"
        >
          {{ item.endTime }}
        </van-field>
        <van-field
          v-model="item.city"
          name="选择城市"
          label="选择城市"
          placeholder="请选择一个城市"
          readonly
          required
          :rules="[{ required: true}]"
          @click="onClickCityPicker(item.cardName)"
        >
          {{ item.city }}
        </van-field>
        <van-field
          v-model="item.position"
          name="具体地点"
          label="具体地点"
          placeholder="请输入具体的地点"
          required
          :rules="[{ required: true}]"
        >
          {{ item.position }}
        </van-field>
        <van-field
          v-model="item.reason"
          name="使用事由"
          label="使用事由"
          placeholder="请输入使用事由"
          type="textarea"
          maxlength="50"
          required
          :rules="[{ required: true}]"
        >
          {{ item.reason }}
        </van-field>
      </div>
      <div style="margin: 16px;">
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
    <van-checkbox-group v-model="CardPick">
      <van-action-sheet
        v-model="showPickerCard"
        cancel-text="确定"
      >
        <div
          v-for="(item,index) in CardList"
          :key="index"
          class="form_action_content"
        >
          <van-checkbox :name="item">
            {{ item }}
          </van-checkbox>
        </div>
      </van-action-sheet>
    </van-checkbox-group>
    <van-popup
      v-for="(item,index) in CardDetailListPick"
      :key="index+200"
      v-model="item.beginTimePickerShow"
      position="bottom"
    >
      <van-datetime-picker
        type="date"
        :min-date="today"
        @confirm="onConfirm"
        @cancel="item.beginTimePickerShow = false"
      />
    </van-popup>
    <van-popup
      v-for="(item,index) in CardDetailListPick"
      :key="index+300"
      v-model="item.endTimePickerShow"
      position="bottom"
    >
      <van-datetime-picker
        type="date"
        :min-date="item.beginTimePicker"
        @confirm="onConfirm"
        @cancel="item.endTimePickerShow = false"
      />
    </van-popup>
    <van-popup
      v-model="showArea"
      position="right"
      :style="{ width: '100%', height: '100%', overflo:'hidden' }"
    >
      <van-nav-bar
        left-text="返回"
        title="选择地点"
        left-arrow
        @click-left="showArea=false"
      />
      <div class="nation_pick">
        <van-index-bar>
          <div
            v-for="(value, key) in nation"
            :key="key"
          >
            <van-index-anchor
              :index="key"
            />
            <van-cell
              v-for="item in value"
              :key="item.key"
              :title="item.label"
              @click="onConfirmCityPicker(item.label)"
            />
          </div>
        </van-index-bar>
      </div>
    </van-popup>
    <tips />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { national, area1, area2 } from '@/utils/dictory'
import { postApply } from '@/api/inform'
import { formatDateTime } from '@/utils/formatday'
import { Notify } from 'vant'
import Tips from './components/Tips.vue'
import ReadOnlyField from './components/ReadOnlyField.vue'
export default {
  components: {
    Tips,
    ReadOnlyField
  },
  data () {
    return {
      isLoading: false,
      today: new Date(),
      timePickerName: '', // 当前选择的时间选择器的护照名称
      timePickerType: '', // 当前选择的时间选择器类型(begin|end)
      cityPickName: '', // 进入城市选择器前选中的护照类型
      showPickerCard: false, // 是否展示证件选择器
      showArea: false, // 是否展示国家/地区选择器
      CardList: [
        '外交护照',
        '公务护照',
        '普通护照',
        '港澳通行证',
        '台湾通行证',
        '双程证'
      ],
      CardPick: [], // 选中的护照类型
      formList: {}, // 前面个人信息表单
      CardDetailList: [], // 每种护照的详细信息表单
      nation: {} // 国家与地区
    }
  },
  computed: {
    ...mapState(['userInfo']),
    CardPickname () {
      return this.CardPick.join('、')
    },
    CardDetailListPick () {
      return this.CardDetailList.filter(item => this.CardPick.indexOf(item.cardName) >= 0)
    }
  },
  created () {
    this.CardDetailList = this.CardList.map(each => {
      return {
        cardName: each,
        cardID: '无',
        isNewCard: '是',
        beginTime: '',
        endTime: '',
        beginTimePicker: new Date(),
        endTimePicker: new Date(),
        beginTimePickerShow: false,
        endTimePickerShow: false,
        city: '',
        position: '',
        reason: ''
      }
    })
  },
  mounted () {
  },
  methods: {
    /**
     * @description: 确认时间选择器事件
     * @param {Date} value 确认的时间
     * @return {*}
     */
    onConfirm (value) {
      this.CardDetailList.forEach(each => {
        if (each.cardName === this.timePickerName) {
          if (this.timePickerType === 'begin') {
            each.beginTimePicker = value
            each.beginTime = formatDateTime(value)
            each.beginTimePickerShow = false
          } else {
            each.endTime = formatDateTime(value)
            each.endTimePickerShow = false
          }
        }
      })
    },
    /**
     * @description: 点击时间选择器
     * @param {String} name 点击的证件名称
     * @param {String} type 点击的时间选择器种类
     * @return {*}
     */
    onClickDatePicker (name, type) {
      this.CardDetailList.forEach(each => {
        if (each.cardName === name) {
          this.timePickerType = type
          this.timePickerName = each.cardName
          if (type === 'begin') {
            each.beginTimePickerShow = true
          } else {
            if (each.beginTime === '') {
              Notify('请选择证照开始使用时间')
            } else {
              each.endTimePickerShow = true
            }
          }
        }
      })
    },
    /**
     * @description: 点击国家/地区选择器
     * @param {String} name 点击的证件名称
     * @return {*}
     */
    onClickCityPicker (name) {
      this.cityPickName = name
      switch (name) {
        case '港澳通行证':
          this.nation = area1
          break
        case '台湾通行证':
          this.nation = area2
          break
        default:
          this.nation = national
      }
      this.showArea = true
    },
    /**
     * @description: 确认国家/地区选择器
     * @param {String} city 选择的国家/地区
     * @return {*}
     */
    onConfirmCityPicker (city) {
      this.CardDetailList.forEach(each => {
        if (each.cardName === this.cityPickName) {
          each.city = city
        }
      })
      this.showArea = false
    },
    /**
     * @description: 表单提交
     * @return {*}
     */
    onSubmit () {
      const data = {
        leader: this.userInfo.xm,
        sex: this.userInfo.xbm,
        birthDate: this.userInfo.csrq,
        birthplace: this.userInfo.jgm,
        nation: this.userInfo.mzm,
        politicsStatus: this.userInfo.zzmmm,
        idCard: this.userInfo.zjhm,
        education: this.userInfo.xwm,
        department: this.userInfo.ssdwm,
        job: this.userInfo.przyjszwm,
        address: this.userInfo.jtzz,
        tellphone: this.userInfo.phone,
        emergencyContact: this.userInfo.yjlxr,
        emergencyPhone: this.userInfo.yjlxrdh,
        approvalFormEntityList: this.CardDetailListPick.map(each => {
          return {
            certificate: each.cardName,
            certificateId: '',
            destination: each.city + each.position,
            reason: each.reason,
            startTime: each.beginTime,
            endTime: each.endTime,
            type: `${this.CardList.indexOf(each.cardName) + 1}`
          }
        })
      }
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true
      })
      postApply(data).then(_ => {
        this.isLoading = false
        this.$toast.clear()
      })
    }
  }
}
</script>

<style lang=scss scoped>
.form_action_content {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5.33333vw 0;
}

.nation_pick {
  height: 94%;
  overflow: auto;
}

.need_container {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: calc(var(--vh, 1vh) * 100);

  .need_container_content {
    padding: 4vw;
    margin: 0 4vw;
    background-color: #fff;
    border-radius: 5.33333vw;

    .need_container_content_title {
      font-size: 4.53333vw;
      font-weight: 500;
      line-height: 1.6;
      text-align: center;
    }

    .need_container_content_text {
      height: 60vh;
      margin: 4vw 0;
      overflow: auto;
      font-size: 3.46667vw;
      line-height: 1.4;
    }

    .need_container_content_btn {
      text-align: center;
    }
  }
}
</style>
