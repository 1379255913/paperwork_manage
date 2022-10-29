<!--
 * @Description:我的消息页面
 * @Author: 张艺耀
 * @Date: 2022-10-10 14:45:02
 * @LastEditors: 张艺耀
 * @LastEditTime: 2022-10-29 12:23:38
-->
<template>
  <div>
    <van-pull-refresh
      v-model="isRefreshing"
      class="pull-refresh"
      @refresh="onRefresh"
    >
      <div
        class="message_detail_container_view"
      >
        <div class="content">
          <div
            v-for="item in messageList"
            v-show="messageList.length!==0"
            :key="item.id"
            class="content_item"
            :style="item.isFold ? {} : { 'height': 'auto' }"
            @click="onClickFold(item.id)"
          >
            <div class="item_header">
              <div class="item_header_title">
                过期提醒
              </div>
              <div class="item_header_time is-read">
                {{ item.isFold ? item.mark==='1' ? '已读' : '未读' : item.createDate }}
              </div>
            </div>
            <div
              v-if="item.isFold"
              class="item_time"
            >
              {{ item.createDate }}
            </div>
            <div class="item_content">
              {{ item.message }}
            </div>
            <div class="item_btn">
              收起
            </div>
          </div>
        </div>
        <pull />
        <van-empty
          v-show="messageList.length===0"
          description="暂无数据"
        />
      </div>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getMessage } from '@/api/inform'
import pull from '@/components/Pull.vue'
export default {
  components: {
    pull
  },
  data () {
    return {
      isRefreshing: false,
      isLoading: false,
      messageList: []
    }
  },
  created () { },
  mounted () {
    this.onRefresh()
  },
  methods: {
    /**
     * @description: 获取消息
     * @return {*}
     */
    onRefresh () {
      this.isLoading = true
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true
      })
      getMessage().then(res => {
        this.messageList = res.page.list.map(each => {
          each.isFold = true
          return each
        })
        this.$toast.clear()
        this.isRefreshing = false
      })
    },
    /**
     * @description: 对消息进行折叠/打开
     * @param {String} id 消息id
     * @return {*}
     */
    onClickFold (id) {
      this.messageList.forEach(each => {
        if (each.id === id) {
          each.isFold = !each.isFold
        }
      })
    }
  }
}
</script>

<style lang=scss scoped>
.message_detail_container_view {
  min-height: calc(var(--vh, 1vh) * 100 - 12.26667vw);
  padding: 0 4vw;
  background-color: #f4f4f4;
}

.refresh_title {
  padding: 2.66667vw;
  font-size: 2.93333vw;
  color: #b13a3d;
}

.content {
  padding: 4vw 0;
}

.content_item {
  height: 15.2vw;
  padding: 4vw 4vw 0;
  margin-bottom: 4vw;
  overflow: hidden;
  background-color: #fff;
  border-radius: 1.33333vw;
}

.pull-refresh {
  background-color: #f4f4f4;
}

.is-read {
  color: #666;
}

.item_header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 4vw;

  .item_header_title {
    font-size: 4vw;
    font-weight: 700;
    color: #282828;
  }

  .item_header_time {
    font-size: 2.93333vw;
    color: #868686;
  }
}

.item_time {
  padding-bottom: 4vw;
  font-size: 2.93333vw;
  color: #868686;
  text-align: right;
}

.item_content {
  padding-bottom: 4vw;
  font-size: 2.93333vw;
  line-height: 1.8;
  text-indent: 2em;
}

.item_btn {
  font-size: 3.2vw;
  line-height: 12vw;
  color: #868686;
  text-align: center;
  border-top: 1px solid #ccc;
}
</style>
