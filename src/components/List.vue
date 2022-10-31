<!--
 * @Description:全局数据展示组件
 * @Author: 张艺耀
 * @Date: 2022-10-31 19:32:01
 * @LastEditors: 张艺耀
 * @LastEditTime: 2022-10-31 20:35:37
-->
<template>
  <div>
    <van-pull-refresh
      v-model="isRefreshing"
      class="pull-refresh"
      @refresh="onRefresh"
    >
      <div class="list_container_content">
        <router-link
          v-for="item in dataList"
          :key="item.id"
          :to="`/${toPrefix}/${item.id}`"
          tag="div"
        >
          <card
            :title="item.title"
            :time="item.createDate"
            :tag-left-color="tagLeftColor"
            :submit-name="item.submitName"
            :text="item.text"
            :tag-right-title="item.tag ? item.tag : ''"
            :tag-right-type="item.color ? item.color : ''"
          />
        </router-link>
        <pull v-if="dataList.length!==0" />
        <van-empty
          v-if="dataList.length===0"
          description="暂无数据"
        />
      </div>
    </van-pull-refresh>
  </div>
</template>

<script>
import pull from '@/components/Pull.vue'
import card from '@/components/Card.vue'
export default {
  components: {
    pull,
    card
  },
  props: {
    // 数据列表
    dataList: {
      type: Array,
      default () {
        return []
      }
    },
    // Card左边tag的颜色
    tagLeftColor: {
      type: String,
      default: '#b13a3d'
    },
    // 跳转的url的前缀
    toPrefix: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      isRefreshing: false
    }
  },
  created () { },
  mounted () { },
  methods: {
    onRefresh () {
      this.$emit('refresh', {})
      this.isRefreshing = false
    }
  }
}
</script>

<style lang="scss" scoped>
.pull-refresh {
  background-color: #f4f4f4;
}

.list_container_content {
  min-height: calc(var(--vh, 1vh) * 100 - 11.2vw);
  padding: 0 2.66667vw 4vw;
}
</style>
