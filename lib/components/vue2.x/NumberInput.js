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

/** vue-property-decorator verson 9.0.2 MIT LICENSE copyright 2020 kaorun343 */
/**
 * decorator of a watch function
 * @param  path the path or the expression to observe
 * @param  WatchOption
 * @return MethodDecorator
 */

function Watch(path, options) {
  if (options === void 0) {
    options = {};
  }

  var _a = options.deep,
      deep = _a === void 0 ? false : _a,
      _b = options.immediate,
      immediate = _b === void 0 ? false : _b;
  return Component.createDecorator(function (componentOptions, handler) {
    if (_typeof_1(componentOptions.watch) !== 'object') {
      componentOptions.watch = Object.create(null);
    }

    var watch = componentOptions.watch;

    if (_typeof_1(watch[path]) === 'object' && !Array.isArray(watch[path])) {
      watch[path] = [watch[path]];
    } else if (typeof watch[path] === 'undefined') {
      watch[path] = [];
    }

    watch[path].push({
      handler: handler,
      deep: deep,
      immediate: immediate
    });
  });
} // Code copied from Vue/src/shared/util.js

/**
 * This method converts a base-10 or scientific E-notation value to
 * a decimal form string. Javascript's IEE 754 double-precision numbers
 * give the same precision as `number.toString()`.
 *
 * @param {number|string} value - The value to be converted.
 * @throws {TypeError} If value is not a valid format.
 * @throws {TypeError} If value is a Symbol or not coercible.
 * @returns {string} The value converted to a decimal form string.
 */
function toFixed(value) {
    // 判断是否是正规数字
    if (!/^-?(?:(?:\d|[1-9]\d*)(?:\.\d+)?)(?:e[+-]?\d+)?$/i.test(value + '')) {
        return value + '';
    }
    let workingValue = value + '';
    // -0/0
    if (value === 0) {
        return '0';
    }
    let sign;
    if (workingValue.charAt(0) === '-') {
        workingValue = workingValue.slice(1);
        sign = -1;
    }
    else {
        sign = 1;
    }
    // 小数点
    const pointIndex = workingValue.indexOf('.');
    if (pointIndex > -1) {
        workingValue = workingValue.replace('.', '');
    }
    let exponentIndex = pointIndex;
    // 科学计数法 e
    let index = workingValue.search(/e/i);
    if (index > 0) {
        // 12e3
        if (exponentIndex < 0) {
            // exponentIndex = 2
            exponentIndex = index;
        }
        //  exponentIndex = 2 + 3
        exponentIndex += Number(workingValue.slice(index + 1));
        //workingValue=12
        workingValue = workingValue.slice(0, index);
    }
    else if (exponentIndex < 0) {
        // 整数
        exponentIndex = workingValue.length;
    }
    let leadingZeroIndex = workingValue.length;
    // Determine leading zeros.
    index = 0;
    while (index < leadingZeroIndex && workingValue.charAt(index) === '0') {
        index += 1;
    }
    let coefficient;
    let exponent;
    if (index === leadingZeroIndex) {
        // Zero.
        exponent = 0;
        coefficient = [0];
    }
    else {
        // Determine trailing zeros.
        if (leadingZeroIndex > 0) {
            do {
                leadingZeroIndex -= 1;
            } while (workingValue.charAt(leadingZeroIndex) === '0' && leadingZeroIndex > 0);
        }
        exponent = exponentIndex - index - 1;
        coefficient = [];
        coefficient.length = leadingZeroIndex + 1;
        // Convert string to array of digits without leading/trailing zeros.
        let position = 0;
        while (index <= leadingZeroIndex) {
            coefficient[position] = Number(workingValue.charAt(index));
            position += 1;
            index += 1;
        }
    }
    let decimalForm = coefficient.join('');
    const decimalFormLength = decimalForm.length;
    if (exponent < 0) {
        exponent += 1;
        while (exponent) {
            decimalForm = '0' + decimalForm;
            exponent += 1;
        }
        decimalForm = '0' + '.' + decimalForm;
    }
    else if (exponent > 0) {
        exponent += 1;
        if (exponent > decimalFormLength) {
            exponent -= decimalFormLength;
            while (exponent) {
                decimalForm += '0';
                exponent -= 1;
            }
        }
        else if (exponent < decimalFormLength) {
            decimalForm = decimalForm.slice(0, exponent) + '.' + decimalForm.slice(exponent);
        }
        // Exponent is zero.
    }
    else if (decimalFormLength > 1) {
        decimalForm = decimalForm.charAt(0) + '.' + decimalForm.slice(1);
    }
    return sign < 0 ? '-' + decimalForm : decimalForm;
}

class NumberHandle {
    constructor(options) {
        this.value = options.value;
        this.oldValue = options.value;
        this.min = this.isValidNumber(options.min) ? Number(options.min) : undefined;
        this.max = this.isValidNumber(options.max) ? Number(options.max) : undefined;
        this.divisionUnit = this.isValidNumber(options.divisionUnit) ? Number(options.divisionUnit) : undefined;
        this.decimalPlace = options.decimalPlace;
        this.supportNegative = options.supportNegative;
        this.handleInvalid = options.handleInvalid;
    }
    // 是否是合法数字
    isValidNumber(value) {
        if (value === '' || value === undefined) {
            return false;
        }
        if (/^-?(?:(?:\d|[1-9]\d*)(?:\.\d+)?)(?:e[+-]?\d+)?$/i.test(value + '')) {
            return true;
        }
        return false;
    }
    setInputValue(inputValue, promptCallback) {
        this.value = inputValue;
        return this.handleInput(this.value, promptCallback);
    }
    setMin(input, min, promptCallback) {
        this.min = this.isValidNumber(min) ? Number(min) : undefined;
        if (this.min !== undefined && this.max !== undefined && this.min > this.max) {
            throw new Error('NumberInput prop max must be greater than min.');
        }
        return this.handleInput(input, promptCallback);
    }
    setMax(input, max, promptCallback) {
        this.max = this.isValidNumber(max) ? Number(max) : undefined;
        if (this.min !== undefined && this.max !== undefined && this.min > this.max) {
            throw new Error('NumberInput prop max must be greater than min.');
        }
        return this.handleInput(input, promptCallback);
    }
    setDivisionUnit(input, divisionUnit, promptCallback) {
        this.divisionUnit = this.isValidNumber(divisionUnit) ? Number(divisionUnit) : undefined;
        return this.handleInput(input, promptCallback);
    }
    setDecimalPlace(input, decimalPlace, promptCallback) {
        this.decimalPlace = decimalPlace;
        if (this.decimalPlace && this.decimalPlace < 0) {
            this.decimalPlace = 0;
        }
        return this.handleInput(input, promptCallback);
    }
    setHandleInvalid(handleInvalid) {
        this.handleInvalid = handleInvalid;
    }
    setSupportNegative(input, supportNegative, promptCallback) {
        this.supportNegative = supportNegative;
        return this.handleInput(input, promptCallback);
    }
    // 加工之后的非法值处理类型
    get invalidTypes() {
        return Object.assign({
            supportNegative: 'revision',
            min: 'prompt',
            max: 'prompt',
            decimalPlace: 'revision',
            divisionUnit: 'prompt',
            nan: 'prompt',
        }, this.handleInvalid);
    }
    handlePromptCallback(promptCallback, option) {
        promptCallback(option);
        return {
            origin: origin,
            input: option.input,
            value: ''
        };
    }
    /**
     *
     * 处理正在输入的过程
     * @param input
     * @param promptCallback
     * @private
     */
    handleInput(input, promptCallback) {
        // 将190所有可能的字符转为英文点
        let value = input.replace(/[。]/g, '.');
        // 将189所有可能的字符转为英文负号
        value = value.replace(/[——_]/g, '-');
        // 移除所有非数字和数学符号字符
        value = value.replace(/[^0-9.-]/g, '');
        // 如果不支持小数位
        if (this.decimalPlace !== undefined && this.decimalPlace <= 0 && value.includes('.')) {
            switch (this.invalidTypes.decimalPlace) {
                case 'revision':
                    value = value.replace(/\./g, '');
                    break;
                case "fallback":
                    return { origin: input, input: this.oldValue, value: this.oldValue };
                case "prompt":
                default:
                    return this.handlePromptCallback(promptCallback, {
                        origin: input,
                        input: value,
                        limit: this.decimalPlace,
                        type: 'decimalPlace'
                    });
            }
        }
        // 如果存在负号，禁止负号出现在除第一个位置之外的位置
        let prefix = '';
        if (value.startsWith('-')) {
            if (!this.supportNegative) {
                switch (this.invalidTypes.supportNegative) {
                    case 'revision':
                        prefix = '';
                        break;
                    case "fallback":
                        return { origin: input, input: this.oldValue, value: this.oldValue };
                    case "prompt":
                    default:
                        prefix = '-';
                        return this.handlePromptCallback(promptCallback, {
                            origin: input,
                            input: value,
                            limit: this.supportNegative || false,
                            type: 'supportNegative'
                        });
                }
            }
            else {
                prefix = '-';
            }
        }
        // 取绝对值
        let absValue = value.replace(/-/g, '');
        if (absValue.includes('.')) {
            // 如果存在小数点，禁止小数点前边紧挨着负号，禁止小数点后出现非数字，并且禁止出现两次
            let dotSplitArray = absValue.split('.');
            // 剔除所有空字符，并且合并剔除后的数组，以便缩减小数点数量
            dotSplitArray = dotSplitArray.filter((item) => {
                return item !== '';
            });
            if (dotSplitArray.length > 0) {
                // 小数点左侧的数字
                const headDotSplitText = dotSplitArray[0];
                // 拼合小数点后面的数字
                let tailDotSplitText = dotSplitArray.reduce((prev, current, index) => {
                    if (index === 0) {
                        return prev;
                    }
                    return prev + current;
                }, '');
                if (this.decimalPlace !== undefined && !Number.isNaN(this.decimalPlace) && tailDotSplitText.length > this.decimalPlace) {
                    switch (this.invalidTypes.decimalPlace) {
                        case 'revision':
                            // 截取小数位数的数字
                            tailDotSplitText = tailDotSplitText.slice(0, Number(this.decimalPlace));
                            break;
                        case "fallback":
                            return { origin: input, input: this.oldValue, value: this.oldValue };
                        case "prompt":
                        default:
                            return this.handlePromptCallback(promptCallback, {
                                origin: input,
                                input: value,
                                limit: this.decimalPlace,
                                type: 'decimalPlace'
                            });
                    }
                }
                absValue = headDotSplitText + '.' + tailDotSplitText;
            }
            else {
                // value = '.'
                absValue = '';
            }
        }
        // value = '0000'
        if (/^0+$/.test(absValue)) {
            absValue = '0';
        }
        // value = '0012'
        if (/^0+\d+/.test(absValue)) {
            absValue = absValue.replace(/^0+/, '');
        }
        return this.calcLimitValue({ origin: input, input: prefix + absValue, value: prefix + absValue }, promptCallback);
    }
    calcLimitValue({ origin, input, value, }, promptCallback) {
        if (value === '') {
            return this.handlePromptCallback(promptCallback, {
                origin: origin,
                input: input,
                limit: '-?\d+\.',
                type: 'nan'
            });
        }
        else if (value === '-') {
            return this.handlePromptCallback(promptCallback, {
                origin: origin,
                input: input,
                limit: '-?\d+\.',
                type: 'nan'
            });
        }
        else {
            let numberValue = Number(value);
            if (this.divisionUnit) {
                const divisionUnit = this.divisionUnit;
                if (!Number.isNaN(divisionUnit)) {
                    const divideValue = toFixed(numberValue / divisionUnit);
                    const findDecimalMask = divideValue.indexOf('.') > -1;
                    if (findDecimalMask) {
                        return this.handlePromptCallback(promptCallback, {
                            origin: origin,
                            input: input,
                            limit: this.divisionUnit,
                            type: 'divisionUnit'
                        });
                    }
                }
            }
            if (this.min !== undefined) {
                if (!Number.isNaN(this.min) && numberValue < this.min) {
                    switch (this.invalidTypes.min) {
                        case 'revision':
                            // 强制转换不再适应，但这段代码建议保留
                            value = toFixed(this.min);
                            break;
                        case "fallback":
                            return { origin: origin, input: this.oldValue, value: this.oldValue };
                        case "prompt":
                        default:
                            return this.handlePromptCallback(promptCallback, {
                                origin: origin,
                                input: input,
                                limit: this.min,
                                type: 'min'
                            });
                    }
                }
            }
            if (this.max !== undefined) {
                if (!Number.isNaN(this.max) && numberValue > this.max) {
                    switch (this.invalidTypes.max) {
                        case 'revision':
                            // 强制转换不再适应，但这段代码建议保留
                            value = toFixed(this.max);
                            break;
                        case "fallback":
                            return { origin: origin, input: this.oldValue, value: this.oldValue };
                        case "prompt":
                        default:
                            return this.handlePromptCallback(promptCallback, {
                                origin: origin,
                                input: input,
                                limit: this.max,
                                type: 'max'
                            });
                    }
                }
            }
            this.oldValue = value;
            return { origin: origin, input: value, value: value };
        }
    }
}

var NumberInput_1;
let NumberInput = NumberInput_1 = class NumberInput extends Vue__default['default'] {
    constructor() {
        super(...arguments);
        this.inputValue = '';
        this.numberHandle = null;
    }
    created() {
        if (process.env.NODE_ENV === 'development' && !this.$listeners.prompt) {
            // 提示这个是为了保证在非数字输入（主要指的空字符串）需要把data中的绑定value重置。
            console.warn('NumberInput should bind v-on:prompt event handler.');
        }
        this.numberHandle = new NumberHandle({
            value: this.value,
            min: this.min,
            max: this.max,
            divisionUnit: this.divisionUnit,
            decimalPlace: this.decimalPlace,
            supportNegative: this.supportNegative,
            handleInvalid: this.handleInvalid,
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
            if (['input'].findIndex((item => item === key)) < 0) {
                obj[key] = listeners[key];
            }
            return obj;
        }, obj);
    }
    // 发送prompt事件
    emitPrompt(option) {
        this.$emit('prompt', {
            input: option.origin,
            value: option.limit,
            type: option.type
        });
    }
    // 发送input事件
    emitInput({ value, input }) {
        this.$emit('input', value);
        this.inputValue = input;
        // 如果用户输入了合法值，则更新prompt为null
        if (value !== '') {
            this.$emit('prompt', null);
        }
    }
    handleInput(e) {
        const target = e.target;
        if (target) {
            if (this.numberHandle) {
                this.handleValue(target.value);
            }
        }
    }
    handleValue(newValue) {
        if (this.numberHandle) {
            const { value, input } = this.numberHandle.setInputValue(newValue, this.emitPrompt);
            // 如果处理之后的value和传递过来的newValue不一致才触发input事件（这种情况是为了谨防用户代码手动传入了非法值）
            if (this.value !== value) {
                this.emitInput({ value, input });
            }
            this.inputValue = input;
        }
    }
    handleMin(min) {
        if (this.numberHandle) {
            const emitValue = this.numberHandle.setMin(this.inputValue, min, this.emitPrompt);
            this.emitInput(emitValue);
        }
    }
    handleMax(max) {
        if (this.numberHandle) {
            const emitValue = this.numberHandle.setMax(this.inputValue, max, this.emitPrompt);
            this.emitInput(emitValue);
        }
    }
    handleDivisionUnit(divisionUnit) {
        if (this.numberHandle) {
            const emitValue = this.numberHandle.setDivisionUnit(this.inputValue, divisionUnit, this.emitPrompt);
            this.emitInput(emitValue);
        }
    }
    handleDecimalPlace(decimalPlace) {
        if (this.numberHandle) {
            const emitValue = this.numberHandle.setDecimalPlace(this.inputValue, decimalPlace, this.emitPrompt);
            this.emitInput(emitValue);
        }
    }
    setHandleInvalid(handleInvalid) {
        if (this.numberHandle) {
            this.numberHandle.setHandleInvalid(handleInvalid);
        }
    }
    setSupportNegative(supportNegative) {
        if (this.numberHandle) {
            const emitValue = this.numberHandle.setSupportNegative(this.inputValue, supportNegative, this.emitPrompt);
            this.emitInput(emitValue);
        }
    }
};
NumberInput.install = function (Vue) {
    Vue.component('number-input', NumberInput_1);
};
__decorate([
    Watch('min')
], NumberInput.prototype, "handleMin", null);
__decorate([
    Watch('max')
], NumberInput.prototype, "handleMax", null);
__decorate([
    Watch('divisionUnit')
], NumberInput.prototype, "handleDivisionUnit", null);
__decorate([
    Watch('decimalPlace')
], NumberInput.prototype, "handleDecimalPlace", null);
__decorate([
    Watch('handleInvalid')
], NumberInput.prototype, "setHandleInvalid", null);
__decorate([
    Watch('supportNegative')
], NumberInput.prototype, "setSupportNegative", null);
NumberInput = NumberInput_1 = __decorate([
    Component__default['default']({
        template: `<input type="text" v-bind="$attrs" v-on="listeners" v-model="inputValue" @input="handleInput"/>`, inheritAttrs: true,
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
                    const keys = Object.keys(val);
                    return keys.every(key => {
                        return ['supportNegative', 'min', 'max', 'decimalPlace'].findIndex(item => item === key) > -1
                            && (val[key] === 'revision' || val[key] === 'prompt' || val[key] === 'fallback');
                    });
                }
            },
        },
    })
], NumberInput);
var NumberInput$1 = NumberInput;

module.exports = NumberInput$1;
