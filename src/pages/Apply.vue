<template>
  <div>
    <van-nav-bar
      left-text="返回"
      title="用证申请"
      left-arrow
      fixed
      placeholder
      @click-left="onClickLeft"
    />
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
    <van-overlay
      :show="showTips"
      @click="showTips = false"
    >
      <div class="need_container">
        <div class="need_container_content">
          <div class="need_container_content_title">
            行前教育
          </div>
          <div
            class="need_container_content_text"
          >
            <p
              class="need_container_content_text_indent"
            >
              根据国家和省外办相关规定，为加强我校因公出国（境）教师的政治意识、组织意识和纪律意识，特明确相关纪律要求如下：
            </p><p
              class="need_container_content_text_indent"
            >
              一、请登录中国领事服务网http://cs.mfa.gov.cn,浏览有关注意事项和安全提示，注意了解往访国的安全形势和当地治安状况，如遇突发事件或紧急情况，尽量减少外出或避开人群密集、敏感场所，必要时请报警并寻求中国驻当地使领馆的协助。
            </p><p
              class="need_container_content_text_indent"
            >
              二、增强大局意识，对外交往中，要忠于使命，认真履责，谨守纪律，切实维护国家以及学校的形象和利益。
            </p><p
              class="need_container_content_text_indent"
            >
              三、自觉遵守保密法律法规，严守保密纪律。增强安全保密意识，未经批准，不得携带涉密载体（包括纸质文件和电磁介质等)；妥善保管内部材料，未经批准，不得对外提供内部文件和资料（如批件、出国（境）申请表、经费情况表、备案表等）；不在非保密场所谈论涉密事项；不得泄露国家秘密和商业秘密。严禁使用个人电脑、手机或其他非涉密载体处理、存储涉密信息。
            </p><p
              class="need_container_content_text_indent"
            >
              四、教师出访“在外停留天数”和“出访时间”均有特定的计算方法和严格的规定（根据中办发〔2013〕16号文及省外办规定）。例如，经审批，出访时间：2018年8月1日离境（指中国边检出境章日期）～2018年8月5日回抵境内（指中国边检入境章日期），您选择航班和办理通关手续时，须保证护照（或通行证）上加盖的中国边检出、入境章日期分别为2018-08-01、2018-08-05（注：中国边检出境章日期视作离境日期，中国边检入境章日期视作回抵境内日期；如在京、沪、广、厦等地通关离境或入境通关，离境日期可能不同于离开福州的日期，回抵境内日期也可能不同于回到福州的日期）中国边检出、入境章日期均计入在外停留天数，故此例中，在外停留天数为5天。教师出访严禁超期，即，在外停留天数不得超过批准天数。
            </p><p
              class="need_container_content_text_indent"
            >
              五、严格按批准的往访国别、地区和在外停留时间（离、抵境当日计入在外停留时间）合理安排行程，不得擅自延长在外停留时间；未经批准不得变更出访路线（特别是境外路线），增加出访国家、地区或城市（包括转机），前往与出访任务无关的国家、地区或城市考察、观光，或以任何理由绕道旅行。经批准，需在第三国（地区）转机的，不可出机场。
            </p><p
              class="need_container_content_text_indent"
            >
              六、严禁安排与公务活动无关的娱乐活动；对商定的公务活动不得应付敷衍甚至随意取消或压缩；不得参加与访问任务无关的活动或会议。
            </p><p
              class="need_container_content_text_indent"
            >
              七、严禁出入赌博场所，不得使用任何形式的资金参与赌博活动，不准以任何借口自行或接受接待单位安排前往赌博场所，严禁进行网络赌博。
            </p><p
              class="need_container_content_text_indent"
            >
              八、严禁出入色情场所和观看色情表演，不得参加涉及低级趣味的娱乐旅游项目。
            </p><p
              class="need_container_content_text_indent"
            >
              九、不得借出访之机谋取私利。
            </p><p
              class="need_container_content_text_indent"
            >
              十、不得违反囯家规定收送礼品。
            </p><p
              class="need_container_content_text_indent"
            >
              十一、不得使用公款大吃大喝，聚众酗酒；不得使用公款购买高档消费品、礼品或参加高消费娱乐活动。
            </p><p
              class="need_container_content_text_indent"
            >
              十二、教师出访应把确保人身生命安全放在第一位，增强防盗、防抢、防诈骗的自我保护意识，如在境外遇到交通和其他意外事故，应立即求助于当地的警察、我驻当地使领馆（或拨打外交部领事保护中心电话：0086-10-12308），或国际救援组织，并尽快向当地外事主管部门报告。在处置突发事件时，如果难以获得其他渠道的援助，可求救于SOS国际组织。
            </p><p
              class="need_container_content_text_indent"
            >
              十三、增强应急应变意识，注意防范反华敌对势力的干扰、破坏，避免与可疑人员接触，拒收任何可疑信函和物品。不在反华组织活动现场停留、围观。不得随意发表有损国格、人格和不符合国家对外政策的言论。不要随意接受媒体采访。若受到前往国家或地区专门机关的调查或不公正待遇，应保持冷静，遇紧急情况，应及时向派出单位以及我国驻当地使领馆请示报告。
            </p><p

              class="need_container_content_text_indent"
            >
              十四、在外期间自觉抵制“法轮功”等邪教组织的非法宣传和渗透，不拿各类非法宣传品。要保证严格遵守相关纪律，主动接受我驻外使领馆的领导和监督，遇到突发状况应及时请示报告。
            </p><p

              class="need_container_content_text_indent"
            >
              十五、建议随身携带邀请函、英文机票订单、英文酒店订单和保单，以备海关查验。
            </p><p

              class="need_container_content_text_indent"
            >
              十六、增强证照管理意识，切实遵守证照管理的有关规定。交回前请自行扫描、复印证照资料页、签证（注）页及中外方出入境章等，留存备用。
            </p><p

              class="need_container_content_text_indent"
            >
              十七、保留全程登机牌和电子客票行程单备核。如遇航班延误，请及时向航空公司索要《航班延误证明》（加盖航空公司公章）。
            </p><p

              class="need_container_content_text_indent"
            >
              十八、教师出访前应知悉并承诺遵守《福州大学关于印发修订后的教职工出国（境）留学管理规定的通知》（福大人〔2019〕74号）、《福州大学关于印发修订后的教职工进修培训管理办法（试行）的通知》（福大人〔2015〕41号）以及出国（境）留学协议书等相关规定。
            </p>
          </div>
          <div class="need_container_content_btn">
            <van-button
              round
              type="info"
              color="#b13a3d"
              size="small"
              :disabled="!!countDown"
            >
              {{ `已阅读并同意(${countDown}s)` }}
            </van-button>
          </div>
        </div>
      </div>
    </van-overlay>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { education, national, area1, area2 } from '@/utils/dictory'
import { formatDateTime } from '@/utils/formatday'
import { Notify } from 'vant'
export default {
  data () {
    return {
      today: new Date(),
      timePickerName: '',
      timePickerType: '',
      cityPickName: '',
      showPickerCard: false,
      showArea: false,
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
      nation: {},
      showTips: true,
      countDown: 3
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
    setInterval(() => {
      if (this.countDown !== 0) {
        this.countDown--
      }
    }, 1000)
  },
  methods: {
    onClickLeft () {
      this.$router.go(-1)
    },
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
