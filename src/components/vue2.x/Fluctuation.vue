<template>
  <component :is="tag" class="ed-fluctuation" :class="classList" v-on="$listeners">
    <slot></slot>
  </component>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import {PluginFunction} from 'vue'

@Component({
  name: 'Fluctuation',
  inheritAttrs: true,
  props: {
    tag: {
      default: 'span'
    },
    // 正负值和0，用来判断是否采用涨跌色
    value: {
      type: Number,
      required: true,
    },
    // 背景设置成涨跌色
    bg: {
      type: Boolean,
      default: false,
    },
    // 边框设置成涨跌色
    border: {
      type: Boolean,
      default: false,
    },
    // 文字设置成涨跌色
    font: {
      type: Boolean,
      default: false,
    },
    // 文字设置成涨跌色
    outline: {
      type: Boolean,
      default: false,
    },
    // 自定义红绿样式，如果需要设置复杂的样式可以考虑自定义样式
    greenClass: {
      type: String,
      default: 'ed-fluctuation-green',
    },
    // 自定义红绿样式，如果需要设置复杂的样式可以考虑自定义样式
    redClass: {
      type: String,
      default: 'ed-fluctuation-red',
    },
    // 覆盖provide中的edConfig.isRedUpGreenDown
    isRedUpGreenDown: {
      type: Boolean,
      required: false,
      default: undefined
    }
  },
  inject: ['edConfig'],
})
export default class ColorButton extends Vue {
  value!: number
  border?: boolean
  bg?: boolean
  font?: boolean
  outline?: boolean
  edConfig?: { isRedUpGreenDown: boolean }
  greenClass!: string
  redClass!: string

  created() {
    if (process.env.NODE_ENV === 'development' && (this.edConfig === undefined || this.edConfig.isRedUpGreenDown === undefined)) {
      throw new Error('Vue instance should supply a provide with edConfig which include isRedUpGreenDown option.')
    }
  }

  get classList() {
    const isRedUpGreenDown = this.isRedUpGreenDown === undefined ? this.edConfig && this.edConfig.isRedUpGreenDown : this.isRedUpGreenDown
    let classList = {
      'bg': this.bg,
      'border': this.border,
      'font': this.font,
      'outline': this.outline,
    }
    if (isRedUpGreenDown) {
      if (this.value > 0) {
        classList = Object.assign(classList, {
          [this.redClass]: true,
        })
      } else if (this.value < 0) {
        classList = Object.assign(classList, {
          [this.greenClass]: true,
        })
      }
    } else {
      if (this.value > 0) {
        classList = Object.assign(classList, {
          [this.greenClass]: true,
        })
      } else if (this.value < 0) {
        classList = Object.assign(classList, {
          [this.redClass]: true,
        })
      }
    }
    return classList
  }

  static install: PluginFunction<{}> = function (Vue) {
    Vue.component('fluctuation', ColorButton)
  }
}
</script>