<!--
 * @Description:用证申请页面
 * @Author: 张艺耀
 * @Date: 2022-10-08 22:00:52
 * @LastEditors: 张艺耀
 * @LastEditTime: 2022-10-26 19:40:51
-->

<template>
  <div>
    <van-form>
      <van-field
        v-for="(item,index) in formList"
        :key="index"
        v-model="item.value"
        :name="item.name"
        :label="item.label"
        :placeholder="item.placeholder"
        readonly
        required
      >
        <template
          v-if="item.type==='radio'"
          #input
        >
          <van-radio-group
            v-model="item.value"
            direction="horizontal"
          >
            <van-radio
              v-for="(item2,index2) in item.children"
              :key="index2"
              :name="item2.name"
            >
              {{ item2.label }}
            </van-radio>
          </van-radio-group>
        </template>
      </van-field>
      <van-field
        v-model="CardPickname"
        name="选择证件"
        label="选择证件"
        placeholder="请选择申请的证件"
        readonly
        required
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
import { education, national, area1, area2 } from '@/utils/dictory'
import { formatDateTime } from '@/utils/formatday'
import { Notify } from 'vant'
import Tips from './components/Tips.vue'
export default {
  components: {
    Tips
  },
  data () {
    return {
      today: new Date(),
      timePickerName: '',
      timePickerType: '',
      cityPickName: '',
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
      CardPick: [],
      formList: {},
      CardDetailList: [],
      nation: {} // 国家与地区
    }
  },
  computed: {
    ...mapState(['userInfo']),
    CardPickname () {
      return this.CardPick.join('、')
    },
    CardDetailListPick () {
      const ans = []
      Array.from(this.CardPick).forEach(each => {
        Array.from(this.CardDetailList).forEach(each2 => {
          if (each2.cardName === each) {
            ans.push(each2)
          }
        })
      })
      return ans
    }
  },
  created () {
    let edu = ''
    for (let i = 0; i < education.length; i++) {
      if (education[i].value === this.userInfo.xwm) {
        edu = education[i].label
      }
    }
    this.formList = [
      {
        name: '姓名',
        label: '姓名',
        type: 'input',
        placeholder: '请输入姓名',
        value: this.userInfo.xm
      },
      {
        name: '性别',
        label: '性别',
        type: 'radio',
        children: [
          {
            name: '0',
            label: '男'
          },
          {
            name: '1',
            label: '女'
          }
        ],
        value: this.userInfo.xbm
      },
      {
        name: '出生日期',
        label: '出生日期',
        type: 'input',
        placeholder: '请输入出生日期',
        value: this.userInfo.csrq
      },
      {
        name: '籍贯',
        label: '籍贯',
        type: 'input',
        placeholder: '请输入籍贯',
        value: this.userInfo.jgm
      },
      {
        name: '民族',
        label: '民族',
        type: 'input',
        placeholder: '请输入民族',
        value: this.userInfo.mzm
      },
      {
        name: '政治面貌',
        label: '政治面貌',
        type: 'input',
        placeholder: '请输入政治面貌',
        value: this.userInfo.zzmmm
      },
      {
        name: '身份证号码',
        label: '身份证号码',
        type: 'input',
        placeholder: '请输入身份证号码',
        value: this.userInfo.zjhm
      },
      {
        name: '文化程度',
        label: '文化程度',
        type: 'input',
        placeholder: '请输入文化程度',
        value: edu
      },
      {
        name: '工作部门',
        label: '工作部门',
        type: 'input',
        placeholder: '请输入工作部门',
        value: this.userInfo.ssdwm
      },
      {
        name: '职务',
        label: '职务',
        type: 'input',
        placeholder: '请输入职务',
        value: this.userInfo.przyjszwm
      },
      {
        name: '家庭住址',
        label: '家庭住址',
        type: 'input',
        placeholder: '请输入家庭住址',
        value: this.userInfo.jtzz
      },
      {
        name: '联系电话',
        label: '联系电话',
        type: 'input',
        placeholder: '请输入联系电话',
        value: this.userInfo.phone
      },
      {
        name: '紧急联系人',
        label: '紧急联系人',
        type: 'input',
        placeholder: '请输入紧急联系人',
        value: this.userInfo.yjlxr
      },
      {
        name: '紧急联系电话',
        label: '紧急联系电话',
        type: 'input',
        placeholder: '请输入紧急联系电话',
        value: this.userInfo.yjlxrdh
      }
    ]
    const ans = []
    for (let i = 0; i < 6; i++) {
      ans.push({
        cardName: this.CardList[i],
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
      })
    }
    this.CardDetailList = ans
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
      Array.from(this.CardDetailList).forEach(each => {
        if (each.cardName === this.timePickerName) {
          if (this.timePickerType === 'begin') {
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
      Array.from(this.CardDetailList).forEach(each => {
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
      let area = []
      if (name === '港澳通行证') {
        area = area1
      } else if (name === '台湾通行证') {
        area = area2
      } else {
        area = national
      }
      let ans = {}
      area.forEach(each => {
        if (ans[each.remarks] === undefined) {
          ans[each.remarks] = []
        }
        ans[each.remarks].push({
          label: each.label,
          key: each.id
        })
      })
      const keysSorted = Object.keys(ans).sort()
      console.log(keysSorted)
      const newObj = {}
      for (let i = 0; i < keysSorted.length; i++) {
        newObj[keysSorted[i]] = ans[keysSorted[i]]
      }
      ans = newObj
      this.nation = ans
      this.showArea = true
    },
    /**
     * @description: 确认国家/地区选择器
     * @param {String} city 选择的国家/地区
     * @return {*}
     */
    onConfirmCityPicker (city) {
      Array.from(this.CardDetailList).forEach(each => {
        if (each.cardName === this.cityPickName) {
          each.city = city
        }
      })
      this.showArea = false
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
