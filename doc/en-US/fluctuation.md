# Fluctuation
> Up-and-down component，it is specially apply for red-up-green-down or green-up-red-down style.

## Example
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
        <button class="ed-btn">Click me</button>
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

## inject
You must make sure that the top-level Vue instance, or the parent/ancestor component provides features that return an edConfig object with an isRedUpGreenDown (Boolean) option.
isRedUpGreenDown = true，indicates that the top layer of the current component is in red-up-and-green-down mode.
isRedUpGreenDown = false，indicates that the top layer of the current component is in green-up-and-red-down mode.

> Why pass in an edConfig object that contains the isRedUpGreenDown option?
>
> Because the default provide return value is not responsive when Vue designs the provide /inject feature, edConfig needs to be treated as responsive data (the value comes from the data or computed option of Vue, so that the options become responsive.Please refer to [Vue reference](https://vuejs.org/v2/api/#provide-inject)。

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

## Prop

| Prop name            | Description                                                         | Type          | Options | Default                                                       |
| --------------- | ------------------------------------------------------------ | ------------- | ------ | ------------------------------------------------------------ |
| value           | A positive number is a up, a negative number is a down, and a 0 is a sideways number. Note that this is a reference value used to determine a rise or fall, not a display value. | number｜string number       |        | required                                            |
| tag           | The name of the rendered element is used in the same way as the is property of the dynamic component | string ｜ ComponentDefinition ｜ ComponentConstructor        |        | span                                             |
| font    | Apply up and down colors to font color                                           | boolean        |        | none                                               |
| border    | Apply up and down colors to border-color | boolean |        | none                                             |
| bg             | Apply up and down colors to background-color                        | boolean |        | none                                               |
| outline             | Apply up and down colors to outline-color                       | boolean |        | none                                            |
| red-class | The name of the style to apply when in red mode，which can be used as container to handle complex nested styles   | string       |        | ed-fluctuation-red                        |
| green-class | The name of the style applied in green mode | string | | ed-fluctuation-green |
| isRedUpGreenDown | Override the upper layer edConfig.isRedUpGreenDown in the current component  | boolean | | none |

## Style

By default, the fluctuation component has its own style for quick font/background/border/outline Settings. By default, it adopts success and danger colors consistent with element-UI, but in many cases, it does not meet the requirements of actual development. Therefore, you can override the base style to achieve your customization requirements:

1. if you just want to override some color values.

   To introduce a custom ed-variable.scss file into the entry file, each variable is optional:

   ```scss
   // custom color 
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

   Import file main.js：

   ```js
   import Vue from 'vue'
   import './ed-variables.scss'
   import 'easy-deal/src/styles/scss/fluctuation.scss'
   // or
   import 'easy-deal/src/styles/index.scss'
   
   Vue.use(...)
           
   new Vue({...})
   ```

2. Or if you want to anually write a style file that overrides the existing style.

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
     // Here we write the universal style and the flat style
     @each $class-name, $value in $color-map {
       &.#{$class-name} {
         // Here write the styles when they go up or down
         &.font {
           // font
           color: map-get($value, 'font');
           transition: color 300ms ease-out;
         }
   
         &.border {
           // 
           border: $--fluctuation-border-width map-get($value, 'border') $--fluctuation-border-style;
           transition: border-color 300ms ease-out;
         }
   
         &.outline {
           outline: $--fluctuation-outline-width map-get($value, 'outline') $--fluctuation-outline-style;
           transition: outline-color 300ms ease-out;
         }
   
         &.bg {
           background-color: map-get($value, 'bg');
           transition: background-color 300ms ease-out;
           color: $--fluctuation-bg-font-color;
         }
   
         // For a and button, I'm going to style it hover and I'm going to style it up and down
         @at-root a#{&}, button#{&} {
           &.font {
             &:hover {
               // 
               color: map-get($value, 'font-hover');
             }
           }
   
           &.border {
             &:hover, &:active {
               // 
               border-color: map-get($value, 'border-hover');
             }
           }
   
           &.outline {
             &:hover, &:active {
               // 
               outline-color: map-get($value, 'outline-hover');
             }
           }
   
           &.bg {
             &:hover {
               // 
               background-color: map-get($value, 'bg-hover');
             }
           }
         }
       }
     }
   }
   ```

3. Fully custom styling with red-class and green-class is the case for complex style customization.

   ```vue
   <template>
     <fluctuation 
                  tag="div"
                  red-class="red-container"
                  green-class="green-container"
                  class="normal-container"
                  :value="value">
       <el-input class="ed-input"/>
       <button class="ed-btn">Click here</button>
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

   