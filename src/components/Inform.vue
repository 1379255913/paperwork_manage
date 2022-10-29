<!--
 * @Description:ApplyProcess和ApprovalProcess的信息组件
 * @Author: 张艺耀
 * @Date: 2022-10-29 11:26:48
 * @LastEditors: 张艺耀
 * @LastEditTime: 2022-10-29 11:39:44
-->
<template>
  <ul class="detail_container_content">
    <li class="form_detail_item">
      <div class="form_detail_item_title">
        姓名
      </div>
      <div class="form_detail_item_text">
        {{ textObject.leader }}
      </div>
    </li>
    <li class="form_detail_item">
      <div class="form_detail_item_title">
        性别
      </div>
      <div class="form_detail_item_text">
        {{ textObject.sex === '0' ? '男' : '女' }}
      </div>
    </li>
    <li class="form_detail_item">
      <div class="form_detail_item_title">
        出生日期
      </div>
      <div class="form_detail_item_text">
        {{ textObject.birthDate }}
      </div>
    </li>
    <li class="form_detail_item">
      <div class="form_detail_item_title">
        籍贯
      </div>
      <div class="form_detail_item_text">
        {{ textObject.birthplace }}
      </div>
    </li>
    <li class="form_detail_item">
      <div class="form_detail_item_title">
        民族
      </div>
      <div class="form_detail_item_text">
        {{ textObject.nation }}
      </div>
    </li>
    <li class="form_detail_item">
      <div class="form_detail_item_title">
        政治面貌
      </div>
      <div class="form_detail_item_text">
        {{ textObject.politicsStatus }}
      </div>
    </li>
    <li class="form_detail_item">
      <div class="form_detail_item_title">
        身份证号码
      </div>
      <div class="form_detail_item_text">
        {{ textObject.idCard }}
      </div>
    </li>
    <li class="form_detail_item">
      <div class="form_detail_item_title">
        文化程度
      </div>
      <div class="form_detail_item_text">
        {{ textObject.education }}
      </div>
    </li>
    <li class="form_detail_item">
      <div class="form_detail_item_title">
        工作部门
      </div>
      <div class="form_detail_item_text">
        {{ textObject.department }}
      </div>
    </li>
    <li class="form_detail_item">
      <div class="form_detail_item_title">
        职位
      </div>
      <div class="form_detail_item_text">
        {{ textObject.job }}
      </div>
    </li>
    <li class="form_detail_item">
      <div class="form_detail_item_title">
        家庭住址
      </div>
      <div class="form_detail_item_text">
        {{ textObject.address }}
      </div>
    </li>
    <li class="form_detail_item">
      <div class="form_detail_item_title">
        联系电话
      </div>
      <div class="form_detail_item_text">
        {{ textObject.tellphone }}
      </div>
    </li>
    <li class="form_detail_item">
      <div class="form_detail_item_title">
        应急联系人
      </div>
      <div class="form_detail_item_text">
        {{ textObject.emergencyContact }}
      </div>
    </li>
    <li class="form_detail_item">
      <div class="form_detail_item_title">
        联系电话
      </div>
      <div class="form_detail_item_text">
        {{ textObject.emergencyPhone }}
      </div>
    </li>
    <li class="form_detail_item">
      <div class="form_detail_item_title">
        证件名称
      </div>
      <div class="form_detail_item_text">
        {{ textObject2.certificate }}
      </div>
    </li>
    <li class="form_detail_item">
      <div class="form_detail_item_title">
        证件号码
      </div>
      <div class="form_detail_item_text">
        {{ textObject2.certificateId }}
      </div>
    </li>
    <li class="form_detail_item">
      <div class="form_detail_item_title">
        出发时间
      </div>
      <div class="form_detail_item_text">
        {{ textObject2.startTime }}
      </div>
    </li>
    <li class="form_detail_item">
      <div class="form_detail_item_title">
        回程时间
      </div>
      <div class="form_detail_item_text">
        {{ textObject2.endTime }}
      </div>
    </li>
    <li class="form_detail_item">
      <div class="form_detail_item_title">
        目的地
      </div>
      <div class="form_detail_item_text">
        {{ textObject2.destination }}
      </div>
    </li>
    <li class="form_detail_item">
      <div class="form_detail_item_title">
        使用事由
      </div>
      <div class="form_detail_item_text">
        {{ textObject2.reason }}
      </div>
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    textObject: {
      type: Object,
      default () {
        return {}
      }
    },
    textObject2: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  data () {
    return { }
  },
  created () { },
  mounted () { },
  methods: { }
}
</script>

<style lang=scss scoped>
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
