# NumberInput 数字控制输入框
> 自动屏蔽非法字符的输入，只能输入符合要求的10进制数字，空字符串或者负号，不支持科学计数法类型的输入。

## 基础用法
```vue
<template>
  <div>
    <number-input   v-model="value"
                    placeholder="'输入数字'"
                    :decimal-place="2"
                    :division-unit="5"
                    :handle-invalid="{
                      min:'prompt',
                      max:'prompt',
                    }"
                    :max="100"
                    :min="0"
                    :support-negative="false"
                    @prompt="prompt"/>
    <div>提示：{{warnMsg}}</div>
</div>
</template>
<script>
export default {
  data() {
    return {
      value: '',
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
      if(type === 'min'){
        this.warnMsg = `您输入的${input}不能小于${value}。`
      }
      this.warnMsg = `${input},${type},${value}！`
    }
  }
}
</script>
```
## 属性

| 参数            | 说明                                                         | 类型          | 可选值 | 默认值                                                       |
| --------------- | ------------------------------------------------------------ | ------------- | ------ | ------------------------------------------------------------ |
| value           | 用来接收用户输入的合法的数字字符串，但是如果用户输入的并非合法数字，则value接收到的并非输入框中的值，而是一个空字符串。 | string        |        | 必须项，无默认值                                             |
| decimalPlace    | 允许输入的小数位数                                           | number        |        | 无，默认不限制                                               |
| divisionUnit    | 用户输入的值需要可以整除的单位，例如A股一次输入必须是100的整数倍 | number/string |        | 无，默认不限制                                               |
| min             | 支持的最小值，超出最小值的都为非法输入                       | number/string |        | 无，默认不限制                                               |
| max             | 支持的最大值，超出最大值的都为非法输入                       | number/string |        | 无，默认不限制                                               |
| supportNegative | 是否支持输入负数                                             | boolean       |        | false，一般金融类网站都不允许输入负数                        |
| handleInvalid   | 处理非法输入的方式，当用户输入不合法时，应该怎么处理这些非法输入：每一个配置项都支持revision\|prompt三种类型值，一共支持min，max，decimalPlace，supportNegative这4种配置，每一种配置都是可选的，例如{min:'revision',max:'prompt'} | object        |        | {     supportNegative: 'revision',     min: 'prompt',     max: 'prompt',     decimalPlace: 'revision'}  |
> 关于divisionUnit：
>
>如果设置了divisionUnit，当用户的输入不能整除divisionUnit时，会通过prompt事件提醒，但不在handleInvalid中divisionUnit的revision和fallback选项，因为想要监听用户输入操作完成必须监听blur事件才可以，但是这种情况并非最优选项，最终实现revision/fallback的操作交给开发者自行去完成。

> 非法的输入情况：
>
> 1. 设置了min，但是用户输入小于最小值。
> 2. 设置了max，但是用户有输入大于最大值。
> 3. 设置了divisionUnit，但是用户输入的数字并不能被divisionUnit整除。
> 4. 用户只输入了'-'/空字符串(清空了输入框)，这种情况下是允许输入的，因为有可能负号后面用户还要继续输入，但是这种中间状态的输入并非合法的value值。
>
> 注意：用户输入的任何不满足/^-?(?:(?:\d|[1-9]\d*)(?:\.\d+)?)(\d+)?$/i的其他字符都会被组件过滤掉，因此这种情况下的其他字符输入不属于非法的输入情况。

> handleInvalid的值类型：
>
> + revision：当用户输入非法值时，强制将用户的输入更正，如：
>   + min：如果用户输入了小于min的值，则强制转换成最小值。
>   + max：如果用户输入了大于max的值，则强制转换成最大值。
>   + supportNegative：如果用户输入了负号，默认过滤掉。
>   + decimalPlace：当用户输入的小数位多于decimalPlace时，后面多余的小数位被强制截断丢掉。
> + prompt：当用户输入了非法值时，仅分发prompt事件，由程序来控制（大多数情况用于给用户个性化提醒）。

## 事件

| 事件名称 | 说明                                                         | 参数                                                         |
| -------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| input    | 用户输入合法值时向外回调的输入值，或者输入非法值时回调空字符串，因此input事件只接受正规的数字字符串或者空字符串，开发者在区分空字符串的前提下，可以直接使用input的回调值进行计算和传值操作。 | value，用户输入的值                                          |
| prompt   | 当handleInvalid中有任意一项设置了prompt属性值时或者不满足divisonUnit时，当用户输入了非法值时，用来回调的非法输入的情况。或者也可能直接回调一个null值，这种情况表示可以清除保存的prompt信息。 | null或者{input:用户的输入，type：非法的类型，value: 非法类型的规定值} |

> prompt可能会抛出nan类型的提示，表示用户输入'-'或者空字符串时候的处理方式，并不包含其他特殊字符处理。

### 指令

支持v-model指令，合并value属性和input事件，方便程序实时接收用户的合法输入。
