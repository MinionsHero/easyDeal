'use strict';

var Vue = require('vue');
var Component = require('vue-class-component');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var Vue__default = /*#__PURE__*/_interopDefaultLegacy(Vue);
var Component__default = /*#__PURE__*/_interopDefaultLegacy(Component);

function createCommonjsModule(fn, basedir, module) {
	return module = {
		path: basedir,
		exports: {},
		require: function (path, base) {
			return commonjsRequire(path, (base === undefined || base === null) ? module.path : base);
		}
	}, fn(module, module.exports), module.exports;
}

function commonjsRequire () {
	throw new Error('Dynamic requires are not currently supported by @rollup/plugin-commonjs');
}

var _typeof_1 = createCommonjsModule(function (module) {
  function _typeof(obj) {
    "@babel/helpers - typeof";

    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      module.exports = _typeof = function _typeof(obj) {
        return typeof obj;
      };
    } else {
      module.exports = _typeof = function _typeof(obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };
    }

    return _typeof(obj);
  }

  module.exports = _typeof;
});

function __decorate(decorators, target, key, desc) {
  var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
      d;
  if ((typeof Reflect === "undefined" ? "undefined" : _typeof_1(Reflect)) === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
    if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  }
  return c > 3 && r && Object.defineProperty(target, key, r), r;
}

var ColorButton_1;
let ColorButton = ColorButton_1 = class ColorButton extends Vue__default['default'] {
    created() {
        if (process.env.NODE_ENV === 'development' && (this.edConfig === undefined || this.edConfig.isRedUpGreenDown === undefined)) {
            throw new Error('Vue instance should supply a provide with edConfig which include isRedUpGreenDown option.');
        }
    }
    get classList() {
        const isRedUpGreenDown = this.isRedUpGreenDown === undefined ? this.edConfig && this.edConfig.isRedUpGreenDown : this.isRedUpGreenDown;
        let classList = {
            'bg': this.bg,
            'border': this.border,
            'font': this.font,
            'outline': this.outline,
        };
        if (isRedUpGreenDown) {
            if (this.value > 0) {
                classList = Object.assign(classList, {
                    [this.redClass]: true,
                });
            }
            else if (this.value < 0) {
                classList = Object.assign(classList, {
                    [this.greenClass]: true,
                });
            }
        }
        else {
            if (this.value > 0) {
                classList = Object.assign(classList, {
                    [this.greenClass]: true,
                });
            }
            else if (this.value < 0) {
                classList = Object.assign(classList, {
                    [this.redClass]: true,
                });
            }
        }
        return classList;
    }
};
ColorButton.install = function (Vue) {
    Vue.component('fluctuation', ColorButton_1);
};
ColorButton = ColorButton_1 = __decorate([
    Component__default['default']({
        template: `<component :is="tag" class="ed-fluctuation" :class="classList" v-on="$listeners"> <slot></slot> </component>`, name: 'Fluctuation',
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
], ColorButton);
var ColorButton$1 = ColorButton;

module.exports = ColorButton$1;
