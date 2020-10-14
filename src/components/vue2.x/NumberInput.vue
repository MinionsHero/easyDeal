<template>
  <input
      type="text"
      v-bind="$attrs"
      v-on="listeners"
      v-model="inputValue"
      @input="handleInput"/>
</template>

<script lang="ts">
import {Vue, Component, Watch} from 'vue-property-decorator'
import {PluginFunction} from 'vue';
import {ConstructionOptions, NumberHandle} from '@/common/numberInput'

@Component({
  inheritAttrs: true,
  name: 'NumberInput',
  props: {
    // 值名必须是value，外部才能用v-model进行双向数据绑定
    value: {
      type: String,
      default: '',
    },
    // 最小值
    min: {
      type: [Number, String],
      required: false
    },
    // 最大值
    max: {
      type: [Number, String],
      required: false
    },
    // 小数位精度
    decimalPlace: {
      type: Number,
      required: false
    },
    // 是多少的整数倍数，如果是unit=10，则输入值必须是10的整数倍
    divisionUnit: {
      type: [Number, String],
      required: false
    },
    // 是否支持负数
    supportNegative: {
      type: Boolean,
      default: false,
    },
    // 处理非法值的方式
    handleInvalid: {
      type: Object,
      validator(val) {
        const keys = Object.keys(val)
        return keys.every(key => {
          return ['supportNegative', 'min', 'max', 'decimalPlace'].findIndex(item => item === key) > -1
              && (val[key] === 'revision' || val[key] === 'prompt' || val[key] === 'fallback')
        })
      }
    },
  },
})
export default class NumberInput extends Vue {
  value!: ConstructionOptions['value']
  min!: ConstructionOptions['min']
  max!: ConstructionOptions['max']
  divisionUnit!: ConstructionOptions['divisionUnit']
  decimalPlace!: ConstructionOptions['decimalPlace']
  supportNegative!: ConstructionOptions['supportNegative']
  handleInvalid!: ConstructionOptions['handleInvalid']
  inputValue = ''
  numberHandle: NumberHandle | null = null

  created() {
    if (process.env.NODE_ENV === 'development' && !this.$listeners.prompt) {
      // 提示这个是为了保证在非数字输入（主要指的空字符串）需要把data中的绑定value重置。
      console.warn('NumberInput should bind v-on:prompt event handler.')
    }
    this.numberHandle = new NumberHandle({
      value: this.value,
      min: this.min,
      max: this.max,
      divisionUnit: this.divisionUnit,
      decimalPlace: this.decimalPlace,
      supportNegative: this.supportNegative,
      handleInvalid: this.handleInvalid,
    })
    this.inputValue = this.value
  }

  // 剔除input事件的listeners
  get listeners() {
    const listeners = this.$listeners
    const keys = Object.keys(listeners)
    const obj = {}
    return keys.reduce((obj, key) => {
      // 去掉input事件
      if (['input'].findIndex((item => item === key)) < 0) {
        obj[key] = listeners[key]
      }
      return obj
    }, obj)
  }

  // 发送prompt事件
  emitPrompt(option): void {
    this.$emit('prompt', {
      input: option.origin,
      value: option.limit,
      type: option.type
    })
  }

  // 发送input事件
  emitInput({value, input}) {
    this.$emit('input', value)
    this.inputValue = input
    // 如果用户输入了合法值，则更新prompt为null
    if (value !== '') {
      this.$emit('prompt', null)
    }
  }

  handleInput(e: InputEvent) {
    const target = e.target as HTMLInputElement
    if (target) {
      if (this.numberHandle) {
        this.handleValue(target.value)
      }
    }
  }

  handleValue(newValue) {
    if (this.numberHandle) {
      const {value, input} = this.numberHandle.setInputValue(newValue, this.emitPrompt)
      // 如果处理之后的value和传递过来的newValue不一致才触发input事件（这种情况是为了谨防用户代码手动传入了非法值）
      if (this.value !== value) {
        this.emitInput({value, input})
      }
      this.inputValue = input
    }
  }

  @Watch('min')
  handleMin(min: ConstructionOptions['min']) {
    if (this.numberHandle) {
      const emitValue = this.numberHandle.setMin(this.inputValue, min, this.emitPrompt)
      this.emitInput(emitValue)
    }
  }

  @Watch('max')
  handleMax(max: ConstructionOptions['max']) {
    if (this.numberHandle) {
      const emitValue = this.numberHandle.setMax(this.inputValue, max, this.emitPrompt)
      this.emitInput(emitValue)
    }
  }

  @Watch('divisionUnit')
  handleDivisionUnit(divisionUnit: ConstructionOptions['divisionUnit']) {
    if (this.numberHandle) {
      const emitValue = this.numberHandle.setDivisionUnit(this.inputValue, divisionUnit, this.emitPrompt)
      this.emitInput(emitValue)
    }
  }

  @Watch('decimalPlace')
  handleDecimalPlace(decimalPlace: ConstructionOptions['decimalPlace']) {
    if (this.numberHandle) {
      const emitValue = this.numberHandle.setDecimalPlace(this.inputValue, decimalPlace, this.emitPrompt)
      this.emitInput(emitValue)
    }
  }

  @Watch('handleInvalid')
  setHandleInvalid(handleInvalid: ConstructionOptions['handleInvalid']) {
    if (this.numberHandle) {
      this.numberHandle.setHandleInvalid(handleInvalid)
    }
  }

  @Watch('supportNegative')
  setSupportNegative(supportNegative: ConstructionOptions['supportNegative']) {
    if (this.numberHandle) {
      const emitValue = this.numberHandle.setSupportNegative(this.inputValue, supportNegative, this.emitPrompt)
      this.emitInput(emitValue)
    }
  }

  static install: PluginFunction<{}> = function (Vue) {
    Vue.component('number-input', NumberInput)
  }
}
</script>