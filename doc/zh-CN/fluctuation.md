# Fluctuation 涨跌幅组件
> 涨跌幅波动样式组件，专门应用于红涨绿跌，绿涨红跌的样式编写。

## 基础用法
```vue
<template>
  <div>
  <fluctuation :value="value" font border bg outline>{{ value }}</fluctuation>
    <div>
      <fluctuation 
                 tag="div"
                 red-class="red-container"
                 green-class="green-container"
                 class="normal-container"
                 :value="value" border bg>
        <el-input class="ed-input"/>
        <button class="ed-btn">点击我</button>
      </fluctuation>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      value: 1,
    }
  },
}
</script>
<style lang="scss">
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
```

## 注入
需要保证顶层Vue实例或者fluctuation的父/祖先组件提供了provide特性，返回一个edConfig对象，同时包含isRedUpGreenDown（boolean类型）选项。
isRedUpGreenDown = true，表示当前组件所在的顶层处于红涨绿跌模式。
isRedUpGreenDown = false，表示当前组件所在的顶层处于绿涨红跌模式。

> 为何还要传入一个edConfig对象，里面包含isRedUpGreenDown选项？
>
> 因为Vue在设计provide/inject特性时，默认provide的返回值不是响应式的，因此需要把edConfig作为响应式数据处理（值来源于vue的data/computed选项，这样就可以让选项变成响应式了。参见[Vue说明](https://cn.vuejs.org/v2/api/#provide-inject)。

```vue
<template>
	<fluctuation :value="value" font border bg outline>{{ value }}</fluctuation>
</template>
<script>
// provide
export default {
  data() {
    return {
      value: 1,
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
}
</script>
```

## 属性

| 参数            | 说明                                                         | 类型          | 可选值 | 默认值                                                       |
| --------------- | ------------------------------------------------------------ | ------------- | ------ | ------------------------------------------------------------ |
| value           | 正数表示涨，负数表示跌，0表示横盘，注意它只是用来判断涨跌的基准值，并非用来显示的值。 | number｜string数字        |        | 必须项，无默认值                                             |
| tag           | 渲染的元素名称，和动态组件component的is属性使用方式一样 | string ｜ ComponentDefinition ｜ ComponentConstructor        |        | span                                             |
| font    | 把涨跌色应用于文字                                           | boolean        |        | 无                                               |
| border    | 把涨跌色应用于边框 | boolean |        | 无                                             |
| bg             | 把涨跌色应用于背景                       | boolean |        | 无                                               |
| outline             | 把涨跌色应用于轮廓                       | boolean |        | 无                                            |
| red-class | 无论是红涨绿跌还是绿涨红跌，只要处于红色模式时所应用的样式名称，此时可把fluctuation作为容器，处理复杂的嵌套样式   | string       |        | ed-fluctuation-red                        |
| green-class | 同上，处于绿色模式下应用的样式名称 | string | | ed-fluctuation-green |
| isRedUpGreenDown | 在当前组件中覆盖上层的edConfig.isRedUpGreenDown | boolean | | 无 |

## 关于样式

fluctuation组件默认有一套自己的样式，用于快捷设置字体/背景/边框/轮廓的样式，默认采用和element-ui一致success和danger的颜色，但是很多情况下并不能满足实际开发的需求，因此您可以覆盖基础样式来实现您的定制化需求：

1. 方法一，如果您仅仅想覆盖一些色值。

   在入口文件中引入一个自定义ed-variable.scss文件，每一个变量都是可选的：

   ```scss
   /***涨跌幅***/
   // 颜色定制
   $--fluctuation-color-danger-light: $--color-danger !default;
   $--fluctuation-color-danger: mix($--color-black, $--color-danger, 10%) !default;
   $--fluctuation-color-success-light: $--color-success !default;
   $--fluctuation-color-success: mix($--color-black, $--color-success, 10%) !default;
   // border
   $--fluctuation-border-width: 1px !default;
   $--fluctuation-border-style: solid !default;
   $--fluctuation-border-color-red: $--fluctuation-color-danger-light !default;
   $--fluctuation-border-color-red-hover: $--fluctuation-color-danger !default;
   $--fluctuation-border-color-green: $--fluctuation-color-success-light !default;
   $--fluctuation-border-color-green-hover: $--fluctuation-color-success !default;
   // outline
   $--fluctuation-outline-width: 1px !default;
   $--fluctuation-outline-style: solid !default;
   $--fluctuation-outline-color-red: $--fluctuation-color-danger-light !default;
   $--fluctuation-outline-color-red-hover: $--fluctuation-color-danger !default;
   $--fluctuation-outline-color-green: $--fluctuation-color-success-light !default;
   $--fluctuation-outline-color-green-hover: $--fluctuation-color-success !default;
   // bg
   $--fluctuation-bg-color-red: $--fluctuation-color-danger-light !default;
   $--fluctuation-bg-color-red-hover: $--fluctuation-color-danger !default;
   $--fluctuation-bg-color-green: $--fluctuation-color-success-light !default;
   $--fluctuation-bg-color-green-hover: $--fluctuation-color-success !default;
   $--fluctuation-bg-font-color: $--color-white !default;
   $--fluctuation-bg-padding-vertical: 2px !default;
   $--fluctuation-bg-padding-horizontal: 5px !default;
   // font
   $--fluctuation-font-color-red: $--fluctuation-color-danger-light !default;
   $--fluctuation-font-color-red-hover: $--fluctuation-color-danger !default;
   $--fluctuation-font-color-green: $--fluctuation-color-success-light !default;
   $--fluctuation-font-color-green-hover: $--fluctuation-color-success !default;
   ```

   入口文件main.js引入：

   ```js
   import Vue from 'vue'
   import './ed-variables.scss'
   import 'easy-deal/src/styles/scss/fluctuation.scss'
   // 或者(easy-deal引入全部样式)
   import 'easy-deal/src/styles/index.scss'
   
   Vue.use(...)
           
   new Vue({...})
   ```

2. 方法二，手动编写一个样式文件，覆盖已有样式。

   ```scss
   $color-map: (
           'ed-fluctuation-green': (
                   'bg':$--fluctuation-bg-color-green,
                   'bg-hover':$--fluctuation-bg-color-green-hover,
                   'border':$--fluctuation-border-color-green,
                   'border-hover':$--fluctuation-border-color-green-hover,
                   'font':$--fluctuation-font-color-green,
                   'font-hover':$--fluctuation-font-color-green-hover,
                   'outline':$--fluctuation-outline-color-green,
                   'outline-hover':$--fluctuation-outline-color-green-hover,
           ),
           'ed-fluctuation-red': (
                   'bg':$--fluctuation-bg-color-red,
                   'bg-hover':$--fluctuation-bg-color-red-hover,
                   'border':$--fluctuation-border-color-red,
                   'border-hover':$--fluctuation-border-color-red-hover,
                   'font':$--fluctuation-font-color-red,
                   'font-hover':$--fluctuation-font-color-red-hover,
                   'outline':$--fluctuation-outline-color-red,
                   'outline-hover':$--fluctuation-outline-color-red-hover,
           ),
   );
   .ed-fluctuation {
     // 这里编写通用样式和不涨不跌的样式
     @each $class-name, $value in $color-map {
       &.#{$class-name} {
         // 这里编写涨或者跌时的样式
         &.font {
           // 仅仅设置了字体涨跌样式
           color: map-get($value, 'font');
           transition: color 300ms ease-out;
         }
   
         &.border {
           // 仅仅设置了边框涨跌样式
           border: $--fluctuation-border-width map-get($value, 'border') $--fluctuation-border-style;
           transition: border-color 300ms ease-out;
         }
   
         &.outline {
           // 仅仅设置了边框涨跌样式
           outline: $--fluctuation-outline-width map-get($value, 'outline') $--fluctuation-outline-style;
           transition: outline-color 300ms ease-out;
         }
   
         &.bg {
           // 仅仅设置了背景涨跌样式
           background-color: map-get($value, 'bg');
           transition: background-color 300ms ease-out;
           color: $--fluctuation-bg-font-color;
         }
   
         // 针对链接和button，要加入hover样式
         @at-root a#{&}, button#{&} {
           &.font {
             &:hover {
               // 仅仅设置了字体涨跌样式
               color: map-get($value, 'font-hover');
             }
           }
   
           &.border {
             &:hover, &:active {
               // 仅仅设置了边框涨跌样式
               border-color: map-get($value, 'border-hover');
             }
           }
   
           &.outline {
             &:hover, &:active {
               // 仅仅设置了边框涨跌样式
               outline-color: map-get($value, 'outline-hover');
             }
           }
   
           &.bg {
             &:hover {
               // 仅仅设置了背景涨跌样式
               background-color: map-get($value, 'bg-hover');
             }
           }
         }
       }
     }
   }
   ```

3. 使用red-class和green-class完全自定义样式，这种情况适用于复杂样式定制。

   ```vue
   <template>
     <fluctuation 
                  tag="div"
                  red-class="red-container"
                  green-class="green-container"
                  class="normal-container"
                  :value="value">
       <el-input class="ed-input"/>
       <button class="ed-btn">点击我</button>
     </fluctuation>
   </template>
   <script>
   export default {
     data() {
       return {
         value: 1,
       }
     },
   }
   </script>
   <style lang="scss">
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
   ```

   