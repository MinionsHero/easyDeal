# NumberInput 
> It can block entering invalid character which is not number，user can only input 10 digits number format, empty string or a negative symbol,but it not supports scientific notation.

## Example
```vue
<template>
  <div>
    <number-input   v-model="value"
                    placeholder="'Please input number'"
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
    <div>Warning：{{warnMsg}}</div>
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
        this.warnMsg = `Your input string ${input}can not less than ${value}.`
      }
      this.warnMsg = `${input},${type},${value}！`
    }
  }
}
</script>
```
## Prop

| Prop name            | Description                                                         | Type          | Options | Default                                                       |
| --------------- | ------------------------------------------------------------ | ------------- | ------ | ------------------------------------------------------------ |
| value           | Receiving the value of user's valid input,if user input [invalid] string,the value will be empty string. | string        |        | required                                             |
| decimalPlace    | Allow decimal places.                                           | number        |        | none                                              |
| divisionUnit    | Allow division unit,for example in NASDAQ,it is 1. | number/string |        | none                                             |
| min             | Allow min value,if you set it ,when user inputs the value which is less than min, then inputting will be invalid.                    | number/string |        | none                                            |
| max             | Allow max value,if you set it ,when user inputs the value which is greater than max, then inputting will be invalid.                       | number/string |        | none                                            |
| supportNegative | Support to input negative value or not.                                           | boolean       |        | false                       |
| handleInvalid   | How to handle invalid input, and how to handle illegal input when the user input is not valid: each configuration item supports two types(revision\/prompt) of values: min, max, decimalPlace, and supportNegative. Each configuration is optional, such as {min:'revision', Max :'prompt'} | object        |        | {     supportNegative: 'revision',     min: 'prompt',     max: 'prompt',     decimalPlace: 'revision'}  |
> divisionUnit：
>
> If divisionUnit is set, the user's input cannot divide divisionUnit, it will be prompted by a prompt event but not the options of revision of divisionUnit in handleInvalid because the listener of user's input must be done by listening to blur events. However, this is not the best option for revision, and it will be left to the developer to complete.

> The situation of invalid input：
>
> 1. When you set min, but user entered a value which is less than min.
> 2. When you set max, but user entered a value which is greater than max.
> 3. When you set divisionUnit, but user entered a value which can't be divided by divisionUnit completely.
> 4. User just entered '-' or ''.
>
> Please note that if user entered string which is not match /^-?(?:(?:\d|[1-9]\d*)(?:\.\d+)?)(\d+)?$/i , the other (which is not the invalid characters,it is called blocking character) characters will be blocked。

> The options of handleInvalid prop：
>
> + revision：When user entered invalid value, it will be forced to valid one.Such as,
>   + min：When user is entering,it will be forced transferring to min value.
>   + max：When user is entering,it will be forced transferring to max value.
>   + supportNegative：When user is negative symbol,it will be blocked.
>   + decimalPlace：When user entered number string that decimal place is greater than decimalPlace, the redundant decimal places will be truncated by force。
> + prompt：When user enters an invalid value, only prompt an event, which are used by developers (in most cases for personalized reminders to the user).

## Event

| Event name | Description                                                         | 参数                                                         |
| -------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| input    | The input event only accepts normal numeric strings or empty strings. Developers can directly use the callback value of input to calculate and pass values on the premise of distinguishing empty strings. | value，user entered                                          |
| prompt   | When any item in the handleInvalid sets prompt property value or does not meet divisonUnit, or when the user enters invalid value, it will callback an invalid options. Alternatively, a null value may be directly called back, in which case the prompt information saved can be cleared. | null or {input:user inputted，type：invalid type，value: the value of invalid type} |

> Prompt may throw a nan type prompt to indicate how the user enters '-' or an empty string, without any other special character processing.

### Directive

Supporting v-model directive, combine value attribute and input event, facilitate the program to receive the legitimate input of the user in real time.
