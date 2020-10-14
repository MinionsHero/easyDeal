<template>
  <div class="number-input-panel">
    <h2>数字输入框</h2>
    <number-input v-model="value"
                  :placeholder="placeholder"
                  :decimal-place="decimalPlace ? Number(decimalPlace):undefined"
                  :division-unit="divisionUnit"
                  :handle-invalid="handleInvalid"
                  :max="max"
                  :min="min"
                  :support-negative="supportNegative"
                  @prompt="prompt"/>
    <div>value:{{ value }}</div>
    <div>{{ warnMsg }}</div>
    <!--手动修改每一个属性，看看会发生什么变化-->
    <div>
      <div class="item">
        <label>
          {{ '最小值' }}
          <number-input v-model="min"/>
          <el-radio-group v-model="handleInvalid.min">
            <el-radio :label="'revision'">revision</el-radio>
            <el-radio :label="'fallback'">fallback</el-radio>
            <el-radio :label="'prompt'">prompt</el-radio>
          </el-radio-group>
        </label>
      </div>
      <div class="item">
        <label>
          {{ '最大值' }}
          <number-input v-model="max"/>
          <el-radio-group v-model="handleInvalid.max">
            <el-radio :label="'revision'">revision</el-radio>
            <el-radio :label="'fallback'">fallback</el-radio>
            <el-radio :label="'prompt'">prompt</el-radio>
          </el-radio-group>
        </label>
      </div>
      <div class="item">
        <label>
          {{ '小数位' }}
          <number-input v-model="decimalPlace" max="15"/>
          <el-radio-group v-model="handleInvalid.decimalPlace">
            <el-radio :label="'revision'">revision</el-radio>
            <el-radio :label="'fallback'">fallback</el-radio>
            <el-radio :label="'prompt'">prompt</el-radio>
          </el-radio-group>
        </label>
      </div>
      <div class="item">
        <label>
          {{ '整除值' }}
          <number-input v-model="divisionUnit"/>
        </label>
      </div>
      <div class="item">
        <label>
          {{ '是否支持负数' }}{{ supportNegative }}
          <el-switch v-model="supportNegative"/>
        </label>
      </div>
    </div>
  </div>

</template>

<script>
import NumberInput from "lib/components/vue2.x/NumberInput";

export default {
  name: "NumberInputDemo",
  components: {
    NumberInput,
  },
  data() {
    return {
      value: '',
      placeholder: 'NumberInput支持任意数字输入',
      min: '',
      max: '',
      divisionUnit: '',
      decimalPlace: '2',
      supportNegative: false,
      handleInvalid: {
        min: 'prompt', // 通过prompt事件提醒
        max: 'prompt', // 通过prompt事件提醒
        decimalPlace: 'revision',// 强制修改
      },
      warnMsg: ''
    }
  },
  methods: {
    prompt(option) {
      if (option === null) {
        this.warnMsg = ''
        return
      }
      const {input, type, value} = option
      this.warnMsg = `${input},${type},${value}！`
    }
  }
}
</script>

<style lang="scss">
.number-input-panel{

}
</style>