<!--
 * @Description:全局标签栏组件
 * @Author: 张艺耀
 * @Date: 2022-10-01 15:10:43
 * @LastEditors: 张艺耀
 * @LastEditTime: 2022-10-26 18:57:44
-->

<template>
  <div class="page_container">
    <van-tabbar
      v-model="active"
      active-color="rgb(177, 58, 61)"
    >
      <van-tabbar-item
        name="home"
        replace
        to="/home"
        icon="home-o"
      >
        首页
      </van-tabbar-item>
      <van-tabbar-item
        name="personal"
        replace
        to="/personal"
        icon="contact"
      >
        我的
      </van-tabbar-item>
    </van-tabbar>
    <router-view />
  </div>
</template>

<script>
import store from '@/store/index'
export default {
  data () {
    return {
    }
  },
  computed: {
    active: {
      get () {
        return store.state.active
      },
      set (newValue) {
        store.commit('updateRouter', newValue)
      }
    }
  },
  created () {
  },
  mounted () { },
  methods: { }
}
</script>
