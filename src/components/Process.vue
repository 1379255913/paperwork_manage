<!--
 * @Description:全局处理进程组件
 * @Author: 张艺耀
 * @Date: 2022-10-29 11:55:01
 * @LastEditors: 张艺耀
 * @LastEditTime: 2022-10-29 11:58:49
-->
<template>
  <div class="information_container">
    <div class="information_container_title">
      流程
    </div>
    <div
      v-for="(item, index) in processList"
      :key="item.id"
      class="item_container"
    >
      <div class="item_container_left">
        <div
          v-if="index !== 0"
          class="item_container_left_line"
        />
        <div class="item_container_left_icon">
          <p class="item_container_left_icon_text">
            {{ item.approval.slice(0,1) }}
          </p>
          <van-icon
            class="item_container_left_icon_state"
            :class="item.class"
            :name="item.icon"
          />
        </div>
      </div>
      <div class="item_container_right">
        <div class="item_container_right_header">
          <p class="item_container_right_header_title">
            {{ item.currentOrganization }}
          </p>
          <p class="item_container_right_header_time">
            {{ item.createDate }}
          </p>
        </div>
        <p class="item_container_right_name">
          {{ item.approval }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    processList: {
      type: Array,
      default () {
        return []
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
.information_container {
  padding: 4vw;
  margin: 4vw 2.66667vw;
  background-color: #fff;
  border-radius: 2.66667vw;

  .information_container_title {
    margin-bottom: 4vw;
    font-size: 4vw;
    font-weight: 500;
  }
}

.item_container {
  display: flex;
  align-items: flex-end;
}

.item_container_left {
  display: flex;
  flex-direction: column;

  .item_container_left_line {
    height: 8vw;
    margin: 1.33333vw auto;
    border-style: solid;
    border-left: 0.66667vw solid #ccc;
  }

  .item_container_left_icon {
    position: relative;
    width: 9.33333vw;
    height: 9.33333vw;
    text-align: center;
    background-color: #1989fa;
    border-radius: 1.33333vw;

    .item_container_left_icon_text {
      font-size: 4vw;
      line-height: 9.33333vw;
      color: #fff;
    }

    .item_container_left_icon_state {
      position: absolute;
      right: -0.53333vw;
      bottom: -0.53333vw;
      color: #07c160;
      background-color: #fff;
      border: 0.53333vw solid #fffbe8;
      border-radius: 50%;
    }

    .success {
      color: #07c160;
    }

    .wait {
      color: #1989fa;
    }

    .fail {
      color: #ee0a24;
    }

    .back {
      color: #ff976a;
    }
  }
}

.item_container_right {
  flex: 1;
  padding-left: 4vw;

  .item_container_right_header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 2.93333vw;

    .item_container_right_header_title {
      font-size: 3.73333vw;
    }

    .item_container_right_header_time {
      font-size: 2.93333vw;
      color: #868686;
    }
  }

  .item_container_right_name {
    font-size: 3.2vw;
    color: #868686;
  }
}
</style>
