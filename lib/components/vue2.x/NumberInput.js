'use strict';

var Vue = require('vue');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var Vue__default = /*#__PURE__*/_interopDefaultLegacy(Vue);

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

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

/* global Reflect, Promise */
var _extendStatics = function extendStatics(d, b) {
  _extendStatics = Object.setPrototypeOf || {
    __proto__: []
  } instanceof Array && function (d, b) {
    d.__proto__ = b;
  } || function (d, b) {
    for (var p in b) {
      if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
    }
  };

  return _extendStatics(d, b);
};

function __extends(d, b) {
  _extendStatics(d, b);

  function __() {
    this.constructor = d;
  }

  d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}
function __decorate(decorators, target, key, desc) {
  var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
      d;
  if ((typeof Reflect === "undefined" ? "undefined" : _typeof_1(Reflect)) === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
    if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  }
  return c > 3 && r && Object.defineProperty(target, key, r), r;
}

function _typeof(obj) {
  if (typeof Symbol === "function" && _typeof_1(Symbol.iterator) === "symbol") {
    _typeof = function _typeof(obj) {
      return _typeof_1(obj);
    };
  } else {
    _typeof = function _typeof(obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : _typeof_1(obj);
    };
  }

  return _typeof(obj);
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread();
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) {
      arr2[i] = arr[i];
    }

    return arr2;
  }
}

function _iterableToArray(iter) {
  if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance");
} // The rational behind the verbose Reflect-feature check below is the fact that there are polyfills
// which add an implementation for Reflect.defineMetadata but not for Reflect.getOwnMetadataKeys.
// Without this check consumers will encounter hard to track down runtime errors.


function reflectionIsSupported() {
  return typeof Reflect !== 'undefined' && Reflect.defineMetadata && Reflect.getOwnMetadataKeys;
}

function copyReflectionMetadata(to, from) {
  forwardMetadata(to, from);
  Object.getOwnPropertyNames(from.prototype).forEach(function (key) {
    forwardMetadata(to.prototype, from.prototype, key);
  });
  Object.getOwnPropertyNames(from).forEach(function (key) {
    forwardMetadata(to, from, key);
  });
}

function forwardMetadata(to, from, propertyKey) {
  var metaKeys = propertyKey ? Reflect.getOwnMetadataKeys(from, propertyKey) : Reflect.getOwnMetadataKeys(from);
  metaKeys.forEach(function (metaKey) {
    var metadata = propertyKey ? Reflect.getOwnMetadata(metaKey, from, propertyKey) : Reflect.getOwnMetadata(metaKey, from);

    if (propertyKey) {
      Reflect.defineMetadata(metaKey, metadata, to, propertyKey);
    } else {
      Reflect.defineMetadata(metaKey, metadata, to);
    }
  });
}

var fakeArray = {
  __proto__: []
};
var hasProto = fakeArray instanceof Array;

function createDecorator(factory) {
  return function (target, key, index) {
    var Ctor = typeof target === 'function' ? target : target.constructor;

    if (!Ctor.__decorators__) {
      Ctor.__decorators__ = [];
    }

    if (typeof index !== 'number') {
      index = undefined;
    }

    Ctor.__decorators__.push(function (options) {
      return factory(options, key, index);
    });
  };
}

function isPrimitive(value) {
  var type = _typeof(value);

  return value == null || type !== 'object' && type !== 'function';
}

function warn(message) {
  if (typeof console !== 'undefined') {
    console.warn('[vue-class-component] ' + message);
  }
}

function collectDataFromConstructor(vm, Component) {
  // override _init to prevent to init as Vue instance
  var originalInit = Component.prototype._init;

  Component.prototype._init = function () {
    var _this = this; // proxy to actual vm


    var keys = Object.getOwnPropertyNames(vm); // 2.2.0 compat (props are no longer exposed as self properties)

    if (vm.$options.props) {
      for (var key in vm.$options.props) {
        if (!vm.hasOwnProperty(key)) {
          keys.push(key);
        }
      }
    }

    keys.forEach(function (key) {
      Object.defineProperty(_this, key, {
        get: function get() {
          return vm[key];
        },
        set: function set(value) {
          vm[key] = value;
        },
        configurable: true
      });
    });
  }; // should be acquired class property values


  var data = new Component(); // restore original _init to avoid memory leak (#209)

  Component.prototype._init = originalInit; // create plain data object

  var plainData = {};
  Object.keys(data).forEach(function (key) {
    if (data[key] !== undefined) {
      plainData[key] = data[key];
    }
  });

  if (process.env.NODE_ENV !== 'production') {
    if (!(Component.prototype instanceof Vue__default['default']) && Object.keys(plainData).length > 0) {
      warn('Component class must inherit Vue or its descendant class ' + 'when class property is used.');
    }
  }

  return plainData;
}

var $internalHooks = ['data', 'beforeCreate', 'created', 'beforeMount', 'mounted', 'beforeDestroy', 'destroyed', 'beforeUpdate', 'updated', 'activated', 'deactivated', 'render', 'errorCaptured', 'serverPrefetch' // 2.6
];

function componentFactory(Component) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  options.name = options.name || Component._componentTag || Component.name; // prototype props.

  var proto = Component.prototype;
  Object.getOwnPropertyNames(proto).forEach(function (key) {
    if (key === 'constructor') {
      return;
    } // hooks


    if ($internalHooks.indexOf(key) > -1) {
      options[key] = proto[key];
      return;
    }

    var descriptor = Object.getOwnPropertyDescriptor(proto, key);

    if (descriptor.value !== void 0) {
      // methods
      if (typeof descriptor.value === 'function') {
        (options.methods || (options.methods = {}))[key] = descriptor.value;
      } else {
        // typescript decorated data
        (options.mixins || (options.mixins = [])).push({
          data: function data() {
            return _defineProperty({}, key, descriptor.value);
          }
        });
      }
    } else if (descriptor.get || descriptor.set) {
      // computed properties
      (options.computed || (options.computed = {}))[key] = {
        get: descriptor.get,
        set: descriptor.set
      };
    }
  });
  (options.mixins || (options.mixins = [])).push({
    data: function data() {
      return collectDataFromConstructor(this, Component);
    }
  }); // decorate options

  var decorators = Component.__decorators__;

  if (decorators) {
    decorators.forEach(function (fn) {
      return fn(options);
    });
    delete Component.__decorators__;
  } // find super


  var superProto = Object.getPrototypeOf(Component.prototype);
  var Super = superProto instanceof Vue__default['default'] ? superProto.constructor : Vue__default['default'];
  var Extended = Super.extend(options);
  forwardStaticMembers(Extended, Component, Super);

  if (reflectionIsSupported()) {
    copyReflectionMetadata(Extended, Component);
  }

  return Extended;
}

var reservedPropertyNames = [// Unique id
'cid', // Super Vue constructor
'super', // Component options that will be used by the component
'options', 'superOptions', 'extendOptions', 'sealedOptions', // Private assets
'component', 'directive', 'filter'];
var shouldIgnore = {
  prototype: true,
  arguments: true,
  callee: true,
  caller: true
};

function forwardStaticMembers(Extended, Original, Super) {
  // We have to use getOwnPropertyNames since Babel registers methods as non-enumerable
  Object.getOwnPropertyNames(Original).forEach(function (key) {
    // Skip the properties that should not be overwritten
    if (shouldIgnore[key]) {
      return;
    } // Some browsers does not allow reconfigure built-in properties


    var extendedDescriptor = Object.getOwnPropertyDescriptor(Extended, key);

    if (extendedDescriptor && !extendedDescriptor.configurable) {
      return;
    }

    var descriptor = Object.getOwnPropertyDescriptor(Original, key); // If the user agent does not support `__proto__` or its family (IE <= 10),
    // the sub class properties may be inherited properties from the super class in TypeScript.
    // We need to exclude such properties to prevent to overwrite
    // the component options object which stored on the extended constructor (See #192).
    // If the value is a referenced value (object or function),
    // we can check equality of them and exclude it if they have the same reference.
    // If it is a primitive value, it will be forwarded for safety.

    if (!hasProto) {
      // Only `cid` is explicitly exluded from property forwarding
      // because we cannot detect whether it is a inherited property or not
      // on the no `__proto__` environment even though the property is reserved.
      if (key === 'cid') {
        return;
      }

      var superDescriptor = Object.getOwnPropertyDescriptor(Super, key);

      if (!isPrimitive(descriptor.value) && superDescriptor && superDescriptor.value === descriptor.value) {
        return;
      }
    } // Warn if the users manually declare reserved properties


    if (process.env.NODE_ENV !== 'production' && reservedPropertyNames.indexOf(key) >= 0) {
      warn("Static property name '".concat(key, "' declared on class '").concat(Original.name, "' ") + 'conflicts with reserved property name of Vue internal. ' + 'It may cause unexpected behavior of the component. Consider renaming the property.');
    }

    Object.defineProperty(Extended, key, descriptor);
  });
}

function Component(options) {
  if (typeof options === 'function') {
    return componentFactory(options);
  }

  return function (Component) {
    return componentFactory(Component, options);
  };
}

Component.registerHooks = function registerHooks(keys) {
  $internalHooks.push.apply($internalHooks, _toConsumableArray(keys));
};

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
  return createDecorator(function (componentOptions, handler) {
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
    if (!/^-?(?:(?:\d|[1-9]\d*)(?:\.\d+)?)(?:e[+-]?\d+)?$/i.test(value + "")) {
        return value + "";
    }
    //-0 ? + 0
    if (value === 0) {
        if (1 / value < 0) {
            return "-0";
        }
        else if (1 / value > 0) {
            return "0";
        }
        return "0";
    }
    var workingValue = value + "";
    var sign;
    if (workingValue.charAt(0) === "-") {
        workingValue = workingValue.slice(1);
        sign = -1;
    }
    else {
        sign = 1;
    }
    // 小数点
    var pointIndex = workingValue.indexOf(".");
    if (pointIndex > -1) {
        workingValue = workingValue.replace(".", "");
    }
    var exponentIndex = pointIndex;
    // 科学计数法 e
    var index = workingValue.search(/e/i);
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
    var leadingZeroIndex = workingValue.length;
    // Determine leading zeros.
    index = 0;
    while (index < leadingZeroIndex && workingValue.charAt(index) === "0") {
        index += 1;
    }
    var coefficient;
    var exponent;
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
            } while (workingValue.charAt(leadingZeroIndex) === "0"
                && leadingZeroIndex > 0);
        }
        exponent = exponentIndex - index - 1;
        coefficient = [];
        coefficient.length = leadingZeroIndex + 1;
        // Convert string to array of digits without leading/trailing zeros.
        var position = 0;
        while (index <= leadingZeroIndex) {
            coefficient[position] = Number(workingValue.charAt(index));
            position += 1;
            index += 1;
        }
    }
    var decimalForm = coefficient.join("");
    var decimalFormLength = decimalForm.length;
    if (exponent < 0) {
        exponent += 1;
        while (exponent) {
            decimalForm = "0" + decimalForm;
            exponent += 1;
        }
        decimalForm = "0" + "." + decimalForm;
    }
    else if (exponent > 0) {
        exponent += 1;
        if (exponent > decimalFormLength) {
            exponent -= decimalFormLength;
            while (exponent) {
                decimalForm += "0";
                exponent -= 1;
            }
        }
        else if (exponent < decimalFormLength) {
            decimalForm
                = decimalForm.slice(0, exponent) + "." + decimalForm.slice(exponent);
        }
        // Exponent is zero.
    }
    else if (decimalFormLength > 1) {
        decimalForm = decimalForm.charAt(0) + "." + decimalForm.slice(1);
    }
    return sign < 0 ? "-" + decimalForm : decimalForm;
}

var NumberHandle = /** @class */ (function () {
    function NumberHandle(options) {
        this.value = options.value;
        this.oldValue = options.value;
        this.min = this.isValidNumber(options.min)
            ? Number(options.min)
            : undefined;
        this.max = this.isValidNumber(options.max)
            ? Number(options.max)
            : undefined;
        this.divisionUnit = this.isValidNumber(options.divisionUnit)
            ? Number(options.divisionUnit)
            : undefined;
        this.decimalPlace = options.decimalPlace;
        this.handleInvalid = options.handleInvalid;
    }
    // 是否是合法数字
    NumberHandle.prototype.isValidNumber = function (value) {
        if (value === "" || value === undefined) {
            return false;
        }
        if (/^-?(?:(?:\d|[1-9]\d*)(?:\.\d+)?)(?:e[+-]?\d+)?$/i.test(value + "")) {
            return true;
        }
        return false;
    };
    NumberHandle.prototype.setInputValue = function (inputValue, promptCallback) {
        this.value = inputValue;
        return this.handleInput(this.value, promptCallback);
    };
    NumberHandle.prototype.setMin = function (input, min, promptCallback) {
        this.min = this.isValidNumber(min) ? Number(min) : undefined;
        if (this.min !== undefined
            && this.max !== undefined
            && this.min > this.max) {
            throw new Error("NumberInput prop max must be greater than min.");
        }
        return this.handleInput(input, promptCallback);
    };
    NumberHandle.prototype.setMax = function (input, max, promptCallback) {
        this.max = this.isValidNumber(max) ? Number(max) : undefined;
        if (this.min !== undefined
            && this.max !== undefined
            && this.min > this.max) {
            throw new Error("NumberInput prop max must be greater than min.");
        }
        return this.handleInput(input, promptCallback);
    };
    NumberHandle.prototype.setDivisionUnit = function (input, divisionUnit, promptCallback) {
        this.divisionUnit = this.isValidNumber(divisionUnit)
            ? Number(divisionUnit)
            : undefined;
        return this.handleInput(input, promptCallback);
    };
    NumberHandle.prototype.setDecimalPlace = function (input, decimalPlace, promptCallback) {
        this.decimalPlace = decimalPlace;
        if (this.decimalPlace && this.decimalPlace < 0) {
            this.decimalPlace = 0;
        }
        return this.handleInput(input, promptCallback);
    };
    NumberHandle.prototype.setHandleInvalid = function (handleInvalid) {
        this.handleInvalid = handleInvalid;
    };
    Object.defineProperty(NumberHandle.prototype, "invalidTypes", {
        // 加工之后的非法值处理类型
        get: function () {
            return Object.assign({
                min: "prompt",
                max: "prompt",
                decimalPlace: "revision",
                divisionUnit: "prompt",
                nan: "prompt"
            }, this.handleInvalid);
        },
        enumerable: false,
        configurable: true
    });
    NumberHandle.prototype.handlePromptCallback = function (promptCallback, option) {
        promptCallback(option);
        return {
            origin: origin,
            input: option.input,
            value: ""
        };
    };
    /**
     *
     * 处理正在输入的过程
     * @param input
     * @param promptCallback
     * @private
     */
    NumberHandle.prototype.handleInput = function (input, promptCallback) {
        // 将190所有可能的字符转为英文点
        var value = input.replace(/[。]/g, ".");
        // 将189所有可能的字符转为英文负号
        value = value.replace(/[——_]/g, "-");
        // 移除所有非数字和数学符号字符
        value = value.replace(/[^0-9.-]/g, "");
        // 如果不支持小数位
        if (this.decimalPlace !== undefined
            && this.decimalPlace <= 0
            && value.includes(".")) {
            switch (this.invalidTypes.decimalPlace) {
                case "revision":
                    value = value.replace(/\./g, "");
                    break;
                case "fallback":
                    return { origin: input, input: this.oldValue, value: this.oldValue };
                case "prompt":
                default:
                    return this.handlePromptCallback(promptCallback, {
                        origin: input,
                        input: value,
                        limit: this.decimalPlace,
                        type: "decimalPlace"
                    });
            }
        }
        // 如果存在负号，禁止负号出现在除第一个位置之外的位置
        var prefix = "";
        if (value.startsWith("-")) {
            var supportNegative = this.min === undefined || this.min < 0;
            if (!supportNegative) {
                switch (this.invalidTypes.min) {
                    case "revision":
                        prefix = "";
                        break;
                    case "fallback":
                        return {
                            origin: origin,
                            input: this.oldValue,
                            value: this.oldValue
                        };
                    case "prompt":
                    default:
                        return this.handlePromptCallback(promptCallback, {
                            origin: origin,
                            input: input,
                            limit: this.min || 0,
                            type: "min"
                        });
                }
            }
            else {
                prefix = "-";
            }
        }
        // 取绝对值
        var absValue = value.replace(/-/g, "");
        if (absValue.includes(".")) {
            // 如果存在小数点，禁止小数点前边紧挨着负号，禁止小数点后出现非数字，并且禁止出现两次
            var dotSplitArray = absValue.split(".");
            // 剔除所有空字符，并且合并剔除后的数组，以便缩减小数点数量
            dotSplitArray = dotSplitArray.filter(function (item) {
                return item !== "";
            });
            if (dotSplitArray.length > 0) {
                // 小数点左侧的数字
                var headDotSplitText = dotSplitArray[0];
                // 拼合小数点后面的数字
                var tailDotSplitText = dotSplitArray.reduce(function (prev, current, index) {
                    if (index === 0) {
                        return prev;
                    }
                    return prev + current;
                }, "");
                if (this.decimalPlace !== undefined
                    && !Number.isNaN(this.decimalPlace)
                    && tailDotSplitText.length > this.decimalPlace) {
                    switch (this.invalidTypes.decimalPlace) {
                        case "revision":
                            // 截取小数位数的数字
                            tailDotSplitText = tailDotSplitText.slice(0, Number(this.decimalPlace));
                            break;
                        case "fallback":
                            return {
                                origin: input,
                                input: this.oldValue,
                                value: this.oldValue
                            };
                        case "prompt":
                        default:
                            return this.handlePromptCallback(promptCallback, {
                                origin: input,
                                input: value,
                                limit: this.decimalPlace,
                                type: "decimalPlace"
                            });
                    }
                }
                absValue = headDotSplitText + "." + tailDotSplitText;
            }
            else {
                // value = '.'
                absValue = "";
            }
        }
        // value = '0000'
        if (/^0+$/.test(absValue)) {
            absValue = "0";
        }
        // value = '0012'
        if (/^0+\d+/.test(absValue)) {
            absValue = absValue.replace(/^0+/, "");
        }
        return this.calcLimitValue({ origin: input, input: prefix + absValue, value: prefix + absValue }, promptCallback);
    };
    NumberHandle.prototype.calcLimitValue = function (_a, promptCallback) {
        var origin = _a.origin, input = _a.input, value = _a.value;
        if (value === "") {
            return this.handlePromptCallback(promptCallback, {
                origin: origin,
                input: input,
                limit: "-?d+.",
                type: "nan"
            });
        }
        else if (value === "-") {
            return this.handlePromptCallback(promptCallback, {
                origin: origin,
                input: input,
                limit: "-?d+.",
                type: "nan"
            });
        }
        else {
            var numberValue = Number(value);
            if (this.divisionUnit) {
                var divisionUnit = this.divisionUnit;
                if (!Number.isNaN(divisionUnit)) {
                    var divideValue = toFixed(numberValue / divisionUnit);
                    var findDecimalMask = divideValue.indexOf(".") > -1;
                    if (findDecimalMask) {
                        return this.handlePromptCallback(promptCallback, {
                            origin: origin,
                            input: input,
                            limit: this.divisionUnit,
                            type: "divisionUnit"
                        });
                    }
                }
            }
            if (this.min !== undefined) {
                if (!Number.isNaN(this.min) && numberValue < this.min) {
                    switch (this.invalidTypes.min) {
                        case "revision":
                            // 强制转换不再适应，但这段代码建议保留
                            value = toFixed(this.min);
                            break;
                        case "fallback":
                            return {
                                origin: origin,
                                input: this.oldValue,
                                value: this.oldValue
                            };
                        case "prompt":
                        default:
                            return this.handlePromptCallback(promptCallback, {
                                origin: origin,
                                input: input,
                                limit: this.min,
                                type: "min"
                            });
                    }
                }
            }
            if (this.max !== undefined) {
                if (!Number.isNaN(this.max) && numberValue > this.max) {
                    switch (this.invalidTypes.max) {
                        case "revision":
                            // 强制转换不再适应，但这段代码建议保留
                            value = toFixed(this.max);
                            break;
                        case "fallback":
                            return {
                                origin: origin,
                                input: this.oldValue,
                                value: this.oldValue
                            };
                        case "prompt":
                        default:
                            return this.handlePromptCallback(promptCallback, {
                                origin: origin,
                                input: input,
                                limit: this.max,
                                type: "max"
                            });
                    }
                }
            }
            this.oldValue = value;
            return { origin: origin, input: value, value: value };
        }
    };
    return NumberHandle;
}());

var NumberInput = /** @class */ (function (_super) {
    __extends(NumberInput, _super);
    function NumberInput() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.inputValue = "";
        _this.numberHandle = null;
        _this.isInPromptMode = false;
        return _this;
    }
    NumberInput_1 = NumberInput;
    NumberInput.prototype.created = function () {
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
    };
    Object.defineProperty(NumberInput.prototype, "listeners", {
        // 剔除input事件的listeners
        get: function () {
            var listeners = this.$listeners;
            var keys = Object.keys(listeners);
            var obj = {};
            return keys.reduce(function (obj, key) {
                // 去掉input事件
                if (["input"].findIndex(function (item) { return item === key; }) < 0) {
                    obj[key] = listeners[key];
                }
                return obj;
            }, obj);
        },
        enumerable: false,
        configurable: true
    });
    // 发送prompt事件
    NumberInput.prototype.emitPrompt = function (option) {
        this.$emit("prompt", {
            input: option.origin,
            value: option.limit,
            type: option.type
        });
    };
    // 发送input事件
    NumberInput.prototype.emitInput = function (_a) {
        var value = _a.value, input = _a.input;
        this.$emit("input", value);
        this.inputValue = input;
        //当前处于prompt状态，value被置成了空字符串
        this.isInPromptMode = value === "";
        // 如果用户输入了合法值，则更新prompt为null
        if (value !== "") {
            this.$emit("prompt", null);
        }
    };
    NumberInput.prototype.handleInput = function (e) {
        var target = e.target;
        if (target) {
            this.handleValue(target.value);
        }
    };
    // 当有新的输入或者value传进来时
    NumberInput.prototype.handleValue = function (inputValue) {
        // 如果是因为自身的校验导致的value = "" 然后传递回自身，则直接忽略
        if (this.isInPromptMode && this.value === "") {
            // 回传只会有一次，把isInPromptMode再重置回去，这样以后有max/min新的属性传递过来可以重新接收
            this.isInPromptMode = false;
            return;
        }
        if (this.numberHandle) {
            var _a = this.numberHandle.setInputValue(inputValue, this.emitPrompt), value = _a.value, input = _a.input;
            // 如果处理之后的value和传递过来的newValue不一致才触发input事件（这种情况是为了谨防用户代码手动传入了非法值）
            if (this.value !== value) {
                this.emitInput({ value: value, input: input });
                return;
            }
            this.inputValue = input;
        }
    };
    NumberInput.prototype.handleMin = function (min) {
        if (this.numberHandle) {
            var emitValue = this.numberHandle.setMin(this.inputValue, min, this.emitPrompt);
            this.emitInput(emitValue);
        }
    };
    NumberInput.prototype.handleMax = function (max) {
        if (this.numberHandle) {
            var emitValue = this.numberHandle.setMax(this.inputValue, max, this.emitPrompt);
            this.emitInput(emitValue);
        }
    };
    NumberInput.prototype.handleDivisionUnit = function (divisionUnit) {
        if (this.numberHandle) {
            var emitValue = this.numberHandle.setDivisionUnit(this.inputValue, divisionUnit, this.emitPrompt);
            this.emitInput(emitValue);
        }
    };
    NumberInput.prototype.handleDecimalPlace = function (decimalPlace) {
        if (this.numberHandle) {
            var emitValue = this.numberHandle.setDecimalPlace(this.inputValue, decimalPlace, this.emitPrompt);
            this.emitInput(emitValue);
        }
    };
    NumberInput.prototype.setHandleInvalid = function (handleInvalid) {
        if (this.numberHandle) {
            this.numberHandle.setHandleInvalid(handleInvalid);
        }
    };
    var NumberInput_1;
    NumberInput.install = function (Vue) {
        Vue.component("ed-number-input", NumberInput_1);
    };
    __decorate([
        Watch("value")
    ], NumberInput.prototype, "handleValue", null);
    __decorate([
        Watch("min")
    ], NumberInput.prototype, "handleMin", null);
    __decorate([
        Watch("max")
    ], NumberInput.prototype, "handleMax", null);
    __decorate([
        Watch("divisionUnit")
    ], NumberInput.prototype, "handleDivisionUnit", null);
    __decorate([
        Watch("decimalPlace")
    ], NumberInput.prototype, "handleDecimalPlace", null);
    __decorate([
        Watch("handleInvalid")
    ], NumberInput.prototype, "setHandleInvalid", null);
    NumberInput = NumberInput_1 = __decorate([
        Component({
            template: "<input type=\"text\" v-bind=\"$attrs\" v-on=\"listeners\" :value=\"inputValue\" @input=\"handleInput\" />",
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
                    validator: function (val) {
                        var keys = Object.keys(val);
                        return keys.every(function (key) {
                            return (["min", "max", "decimalPlace"].findIndex(function (item) { return item === key; })
                                > -1
                                && (val[key] === "revision"
                                    || val[key] === "prompt"
                                    || val[key] === "fallback"));
                        });
                    }
                }
            }
        })
    ], NumberInput);
    return NumberInput;
}(Vue__default['default']));

module.exports = NumberInput;
