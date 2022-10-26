<!--
 * @Description: 全局导航栏组件
 * @Author: 张艺耀
 * @Date: 2022-10-26 11:28:58
 * @LastEditors: 张艺耀
 * @LastEditTime: 2022-10-26 18:54:43
-->
<template>
  <div>
    <van-nav-bar
      :left-text="leftText"
      :title="title"
      left-arrow
      fixed
      placeholder
      @click-left="onClickLeft"
    />
    <router-view />
  </div>
</template>

<script>
export default {
  props: {
    leftText: {
      type: String,
      default () {
        return '返回'
      }
    }
  },
  data () {
    return {
      title: ''
    }
  },
  watch: {
    '$route.meta.title': {
      handler (oldValue, newValue) {
        this.title = this.$route.meta.title
      }
    }
  },
  created () {
    this.title = this.$route.meta.title
    console.log(this.title)
  },
  mounted () { },
  methods: {
    onClickLeft () {
      this.$router.go(-1)
    }
  }
}
</script>
