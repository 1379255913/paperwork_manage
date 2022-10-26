<!--
 * @Description:“我的”页面
 * @Author: 张艺耀
 * @Date: 2022-10-01 14:35:45
 * @LastEditors: 张艺耀
 * @LastEditTime: 2022-10-26 19:33:21
-->
<template>
  <div>
    <div class="personal_container">
      <van-nav-bar
        title="我的"
      />
      <div class="info_container">
        <div class="info_container_user">
          <van-image
            round
            width="10.66667vw"
            height="10.66667vw"
            src="http://112.111.0.102:12384/img/avatar.ba451d65.jpg"
          />
          <div class="info_container_user_name">
            {{ xm }}
          </div>
          <van-icon
            name="envelop-o"
            :badge="count"
            size="5.33333vw"
            @click="onClickMessageIcon"
          />
        </div>
        <div class="info_container_banner">
          <van-image
            width="100%"
            height="100%"
            fit="cover"
            src="http://112.111.0.102:12384/img/banner1.0f4f8f9f.png"
          />
        </div>
      </div>
      <van-cell-group class="personal_container_wrap_men">
        <van-cell
          v-for="(item,index) in cellList"
          :key="index"
          :title="item.title"
          is-link
          :to="item.to"
        >
          <template #icon>
            <van-icon
              :name="item.image"
              class="van-cell__left-icon"
            />
          </template>
        </van-cell>
      </van-cell-group>
      <div
        class="personal_container_wrap_logout"
        @click="logout"
      >
        退出登录
      </div>
    </div>
  </div>
</template>

<script>
import { getCount } from '@/api/inform'
import store from '@/store/index'
export default {
  data () {
    return {
      count: 0,
      isLoading: false,
      cellList: [
        {
          image: 'http://112.111.0.102:12384/img/xiaoxi.4cc53241.png',
          title: '我的消息',
          to: '/message'
        },
        {
          image: 'http://112.111.0.102:12384/img/geren.485a1632.png',
          title: '个人信息',
          to: '/personal-information'
        },
        {
          image: 'http://112.111.0.102:12384/img/shenqing.bfe9ab8b.png',
          title: '我的申请',
          to: '/user-application'
        },
        {
          image: 'http://112.111.0.102:12384/img/shenpi.86fb69ed.png',
          title: '我的审批',
          to: '/user-approve'
        }
      ]
    }
  },
  computed: {
    xm () {
      return store.state.userInfo?.xm
    }
  },
  created () { },
  mounted () {
    this.isLoading = true
    this.$toast.loading({
      message: '加载中...',
      forbidClick: true
    })
    getCount().then(res => {
      console.log(res.item.count)
      this.count = res.item.count
      this.isLoading = false
      this.$toast.clear()
    })
  },
  methods: {
    /**
     * @description: 登出事件
     * @return {*}
     */
    logout () {
      store.commit('logout')
    },
    /**
     * @description: 跳转到我的消息页面
     * @return {*}
     */
    onClickMessageIcon () {
      this.$router.push('/message')
    }
  }
}
</script>

<style lang=scss scoped>
.personal_container {
  height: calc(var(--vh, 1vh) * 100 - 13.33333vw);
  overflow: auto;
  background-color: #f1f3f5;
}

.info_container_user {
  display: flex;
  align-items: center;
  padding: 4vw 4vw 16vw;
  background-color: #fff;
}

.info_container_user_name {
  flex: 1;
  padding: 0 2.66667vw;
  font-size: 4vw;
}

.info_container_banner {
  height: 26.66667vw;
  margin: -13.33333vw 4vw 0;
  overflow: hidden;
  border-radius: 4vw;
}

.personal_container_wrap_men {
  margin-top: 5.33333vw;
}

.van-cell__left-icon {
  height: 24px;
  margin-right: 4px;
  font-size: 16px;
  line-height: 24px;
}

.personal_container_wrap_logout {
  padding: 4vw 0;
  margin-top: 5.33333vw;
  font-size: 3.46667vw;
  color: #b13a3d;
  text-align: center;
  background-color: #fff;
}
</style>
