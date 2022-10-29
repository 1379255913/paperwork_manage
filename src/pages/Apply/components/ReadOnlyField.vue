<!--
 * @Description: 表单只读输入框组件
 * @Author: 张艺耀
 * @Date: 2022-10-29 11:12:33
 * @LastEditors: 张艺耀
 * @LastEditTime: 2022-10-29 15:26:50
-->
<template>
  <div>
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
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { education } from '@/utils/dictory'
export default {
  data () {
    return {
      formList: []
    }
  },
  computed: {
    ...mapState(['userInfo'])
  },
  created () {
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
        value: education.find(item => item.value === this.userInfo.xwm).label
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
  },
  mounted () { },
  methods: {}
}
</script>
