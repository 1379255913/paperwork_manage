<template>
  <div>
    <div class="card">
      <div class="card_header">
        <div class="card_header_title">
          {{ title }}
        </div>
        <div class="card_header_time">
          {{ time }}
        </div>
      </div>
      <div class="card_content">
        <div
          v-for="(item,index) in text"
          :key="index"
          class="card_content_text"
        >
          {{ item }}
        </div>
        <slot />
      </div>
      <div class="card_footer">
        <van-tag
          :color="tagLeftColor"
          size="medium"
        >
          {{ tagLeftTitle }}
        </van-tag>
        <div class="card_container_footer_name">
          {{ `由 ${submitName} 提交` }}
        </div>
        <van-tag
          v-if="!!tagRightTitle"
          plain
          round
          :type="tagRightType"
        >
          {{ tagRightTitle }}
        </van-tag>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default () {
        return ''
      }
    },
    time: {
      type: String,
      default () {
        return ''
      }
    },
    tagLeftColor: {
      type: String,
      default () {
        return '#b13a3d'
      }
    },
    submitName: {
      type: String,
      default () {
        return '庄晨忠'
      }
    },
    tagRightTitle: {
      type: String,
      default () {
        return ''
      }
    },
    tagRightType: {
      type: String,
      default () {
        return 'primary'
      }
    },
    text: {
      type: Array,
      default () {
        return []
      }
    }
  },
  data () {
    return { }
  },
  computed: {
    tagLeftTitle () {
      return this.submitName.slice(0, 1)
    }
  },
  created () { },
  mounted () { },
  methods: { }
}
</script>

<style lang=scss scoped>
.card {
  padding: 5.33333vw;
  margin-top: 4vw;
  background-color: #fff;
  border-radius: 2.66667vw;
}

.card_header {
  display: flex;
  align-items: center;
  justify-content: space-between;

  .card_header_title {
    display: flex;
    align-items: center;
    font-size: 4vw;
  }

  .card_header_time {
    font-size: 2.93333vw;
    color: #868686;
  }
}

.card_content {
  justify-content: space-between;
  padding: 4vw 0;
  font-size: 3.46667vw;
  line-height: 1.8;
  color: #868686;
}

.card_footer {
  display: flex;
  align-items: center;

  .card_container_footer_name {
    flex: 1;
    padding: 0 2.66667vw;
    font-size: 4vw;
  }
}
</style>
