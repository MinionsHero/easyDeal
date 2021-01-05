<template>
  <input
    type="text"
    v-bind="$attrs"
    v-on="listeners"
    :value="inputValue"
    @input="handleInput"
  />
</template>

<script lang="ts">
import { Vue, Component, Watch } from "vue-property-decorator";
import { PluginFunction } from "vue";
import { NumberHandle } from "../../common/numberInput";
import { NumberInputInterface } from "../../../types/easydeal/numberInput";

@Component({
  inheritAttrs: true,
  name: "NumberInput",
  props: {
    // 值名必须是value，外部才能用v-model进行双向数据绑定
    value: {
      type: String,
      default: ""
    },
    // 最小值
    min: {
      type: Number,
      required: false
    },
    // 最大值
    max: {
      type: Number,
      required: false
    },
    // 小数位精度
    decimalPlace: {
      type: Number,
      required: false
    },
    // 是多少的整数倍数，如果是unit=10，则输入值必须是10的整数倍
    divisionUnit: {
      type: Number,
      required: false
    },
    // 处理非法值的方式
    handleInvalid: {
      type: Object,
      validator(val) {
        const keys = Object.keys(val);
        return keys.every(key => {
          return (
            ["min", "max", "decimalPlace"].findIndex(item => item === key)
              > -1
            && (val[key] === "revision"
              || val[key] === "prompt"
              || val[key] === "fallback")
          );
        });
      }
    }
  }
})
export default class NumberInput extends Vue implements NumberInputInterface {
  value!: NumberInputInterface["value"];
  min!: NumberInputInterface["min"];
  max!: NumberInputInterface["max"];
  divisionUnit!: NumberInputInterface["divisionUnit"];
  decimalPlace!: NumberInputInterface["decimalPlace"];
  handleInvalid!: NumberInputInterface["handleInvalid"];
  inputValue = "";
  numberHandle: NumberHandle | null = null;
  isInPromptMode = false;

  created() {
    if (process.env.NODE_ENV === "development" && !this.$listeners.prompt) {
      // 提示这个是为了保证在非数字输入（主要指的空字符串）需要把data中的绑定value重置。
      console.warn("NumberInput should bind v-on:prompt event handler.");
    }
    this.numberHandle = new NumberHandle({
      value: this.value,
      min: this.min,
      max: this.max,
      divisionUnit: this.divisionUnit,
      decimalPlace: this.decimalPlace,
      handleInvalid: this.handleInvalid
    });
    this.inputValue = this.value;
  }

  // 剔除input事件的listeners
  get listeners() {
    const listeners = this.$listeners;
    const keys = Object.keys(listeners);
    const obj = {};
    return keys.reduce((obj, key) => {
      // 去掉input事件
      if (["input"].findIndex(item => item === key) < 0) {
        obj[key] = listeners[key];
      }
      return obj;
    }, obj);
  }

  // 发送prompt事件
  emitPrompt(option): void {
    this.$emit("prompt", {
      input: option.origin,
      value: option.limit,
      type: option.type
    });
  }

  // 发送input事件
  emitInput({ value, input }) {
    this.$emit("input", value);
    this.inputValue = input;
    //当前处于prompt状态，value被置成了空字符串
    this.isInPromptMode = value === "";
    // 如果用户输入了合法值，则更新prompt为null
    if (value !== "") {
      this.$emit("prompt", null);
    }
  }

  handleInput(e: InputEvent) {
    const target = e.target as HTMLInputElement;
    if (target) {
      this.handleValue(target.value);
    }
  }

  // 当有新的输入或者value传进来时
  @Watch("value")
  handleValue(inputValue: string) {
    // 如果是因为自身的校验导致的value = "" 然后传递回自身，则直接忽略
    if (this.isInPromptMode && this.value === "") {
      // 回传只会有一次，把isInPromptMode再重置回去，这样以后有max/min新的属性传递过来可以重新接收
      this.isInPromptMode = false;
      return;
    }
    if (this.numberHandle) {
      const { value, input } = this.numberHandle.setInputValue(
        inputValue,
        this.emitPrompt
      );
      // 如果处理之后的value和传递过来的newValue不一致才触发input事件（这种情况是为了谨防用户代码手动传入了非法值）
      if (this.value !== value) {
        this.emitInput({ value, input });
        return;
      }
      this.inputValue = input;
    }
  }

  @Watch("min")
  handleMin(min: NumberInputInterface["min"]) {
    if (this.numberHandle) {
      const emitValue = this.numberHandle.setMin(
        this.inputValue,
        min,
        this.emitPrompt
      );
      this.emitInput(emitValue);
    }
  }

  @Watch("max")
  handleMax(max: NumberInputInterface["max"]) {
    if (this.numberHandle) {
      const emitValue = this.numberHandle.setMax(
        this.inputValue,
        max,
        this.emitPrompt
      );
      this.emitInput(emitValue);
    }
  }

  @Watch("divisionUnit")
  handleDivisionUnit(divisionUnit: NumberInputInterface["divisionUnit"]) {
    if (this.numberHandle) {
      const emitValue = this.numberHandle.setDivisionUnit(
        this.inputValue,
        divisionUnit,
        this.emitPrompt
      );
      this.emitInput(emitValue);
    }
  }

  @Watch("decimalPlace")
  handleDecimalPlace(decimalPlace: NumberInputInterface["decimalPlace"]) {
    if (this.numberHandle) {
      const emitValue = this.numberHandle.setDecimalPlace(
        this.inputValue,
        decimalPlace,
        this.emitPrompt
      );
      this.emitInput(emitValue);
    }
  }

  @Watch("handleInvalid")
  setHandleInvalid(handleInvalid: NumberInputInterface["handleInvalid"]) {
    if (this.numberHandle) {
      this.numberHandle.setHandleInvalid(handleInvalid);
    }
  }

  static install: PluginFunction<{}> = function (Vue) {
    Vue.component("ed-number-input", NumberInput);
  };
}
</script>
