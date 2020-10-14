<template>
  <div class="fluctuation-panel">
    <h2>涨跌幅波动，红涨绿跌</h2>
    <label>
      切换模式：{{ edConfig.isRedUpGreenDown ? '红涨绿跌' : '绿涨红跌' }}
      <el-switch v-model="edConfig.isRedUpGreenDown"/>
    </label>
    <label>
      <span>字体：</span>
      <fluctuation :value="value" font>{{ value }}</fluctuation>
    </label>
    <label>
      <span>背景：</span>
      <fluctuation :value="value" bg>{{ value }}</fluctuation>
    </label>
    <label>
      <span>边框：</span>
      <fluctuation :value="value" border>{{ value }}</fluctuation>
    </label>
    <label>
      <span>轮廓：</span>
      <fluctuation :value="value" outline>{{ value }}</fluctuation>
    </label>
    <label>
      <span>背景&边框&轮廓：</span>
      <fluctuation :value="value" border bg outline>{{ value }}</fluctuation>
    </label>
    <label>
      <span>a标签背景：</span>
      <fluctuation tag="a" :value="value" bg>{{ value }}</fluctuation>
    </label>
    <label>
      <span>button元素背景&边框&轮廓：</span>
      <fluctuation tag="button" :value="value" border bg outline>{{ value }}</fluctuation>
    </label>
    <label>
      <span>自定义样式：</span>
      <fluctuation tag="div"
                   red-class="red-container"
                   green-class="green-container"
                   class="normal-container"
                   :value="value" border bg>
        <el-input class="ed-input"/>
        <button class="ed-btn">点击我</button>
      </fluctuation>
    </label>
  </div>
</template>

<script>
import Fluctuation from "lib/components/vue2.x/Fluctuation";

export default {
  components: {
    Fluctuation
  },
  data() {
    return {
      value: 1,
      clearId: 0,
      edConfig: {
        isRedUpGreenDown: true
      }
    }
  },
  provide() {
    return {
      edConfig: this.edConfig
    }
  },
  methods: {
    changeValue() {
      // -100 ~ 100产生随机值
      this.value = Number((Math.random() * 200 - 100).toFixed(2))
    }
  },
  mounted() {
    this.clearId = setInterval(this.changeValue, 3000)
  },
  beforeDestroy() {
    clearInterval(this.clearId)
  }
}
</script>

<style lang="scss">
.fluctuation-panel {
  label {
    display: flex;

    & + label {
      margin: 5px 0;
    }
  }

  .ed-fluctuation {
    padding: 2px 5px;
  }
}

.normal-container {
  .ed-input {
    border-color: gray;
  }

  .ed-btn {
    background-color: gray;
    border-color: gray;
  }

  &.red-container {
    .ed-input {
      .el-input__inner {
        border-color: red;
      }
    }

    .ed-btn {
      background-color: red;
      border-color: red;
    }
  }

  &.green-container {
    .ed-input {
      .el-input__inner {
        border-color: green;
      }
    }

    .ed-btn {
      background-color: green;
      border-color: green;
    }
  }
}

</style>