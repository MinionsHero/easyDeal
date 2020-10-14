import toFixed from "../utils/toFixed";
// 强制修改/提醒/返回上一个输入的合法值
type InvalidHandleOption = 'revision' | 'prompt' | 'fallback';
/**
 * supportNegative:不支持负数输入了负数处理
 * min: 超过最小值处理
 * max: 超过最大值处理
 * decimalPlace: 超过小数位处理,或者不支持小数时输入了小数点的处理
 * divisionUnit: 非整除单位处理
 * empty:空字符串
 */
export type InvalidTypes = 'supportNegative' | 'min' | 'max' | 'decimalPlace' | 'divisionUnit' | 'nan'
// 需要处理的非法值类型
type HandleInvalidType = {
    [P in InvalidTypes]?: InvalidHandleOption;
}

// 提醒回调
export interface PromptCallback {
    (option: { origin: string; input: string; type: InvalidTypes; limit: number | boolean | string }): void
}

interface FuncReturnType {
    origin: string;// 原始输入的值
    input: string, // 中途处理的值（半成品）
    value: string // 处理成功的值
}


// 构造需要的参数
export interface ConstructionOptions {
    value: string,
    min?: number,
    max?: number,
    divisionUnit?: number,
    decimalPlace?: number,
    supportNegative?: boolean,
    handleInvalid: HandleInvalidType,
}

export class NumberHandle {
    // 处理非法值
    private handleInvalid!: ConstructionOptions['handleInvalid']
    // 上一个传递的值
    private oldValue: ConstructionOptions['value']
    // 新的输入的值
    private value: ConstructionOptions['value'] // 输入框的原始输入值
    min: ConstructionOptions['min'] // 最小值
    max: ConstructionOptions['max'] // 最大值
    divisionUnit: ConstructionOptions['divisionUnit'] // 整除单位
    decimalPlace: ConstructionOptions['decimalPlace'] // 小数位
    supportNegative: ConstructionOptions['supportNegative'] // 是否支持负数

    constructor(options: ConstructionOptions) {
        this.value = options.value
        this.oldValue = options.value
        this.min = this.isValidNumber(options.min) ? Number(options.min) : undefined
        this.max = this.isValidNumber(options.max) ? Number(options.max) : undefined
        this.divisionUnit = this.isValidNumber(options.divisionUnit) ? Number(options.divisionUnit) : undefined
        this.decimalPlace = options.decimalPlace
        this.supportNegative = options.supportNegative
        this.handleInvalid = options.handleInvalid
    }

    // 是否是合法数字
    private isValidNumber(value: string | number | undefined) {
        if (value === '' || value === undefined) {
            return false
        }
        if (/^-?(?:(?:\d|[1-9]\d*)(?:\.\d+)?)(?:e[+-]?\d+)?$/i.test(value + '')) {
            return true
        }
        return false
    }

    setInputValue(inputValue: ConstructionOptions['value'], promptCallback: PromptCallback): FuncReturnType {
        this.value = inputValue
        return this.handleInput(this.value, promptCallback)
    }

    setMin(input: string, min: ConstructionOptions['min'], promptCallback: PromptCallback): FuncReturnType {
        this.min = this.isValidNumber(min) ? Number(min) : undefined
        if (this.min !== undefined && this.max !== undefined && this.min > this.max) {
            throw new Error('NumberInput prop max must be greater than min.')
        }
        return this.handleInput(input, promptCallback)
    }

    setMax(input: string, max: ConstructionOptions['max'], promptCallback: PromptCallback): FuncReturnType {
        this.max = this.isValidNumber(max) ? Number(max) : undefined
        if (this.min !== undefined && this.max !== undefined && this.min > this.max) {
            throw new Error('NumberInput prop max must be greater than min.')
        }
        return this.handleInput(input, promptCallback)
    }

    setDivisionUnit(input: string, divisionUnit: ConstructionOptions['divisionUnit'], promptCallback: PromptCallback): FuncReturnType {
        this.divisionUnit = this.isValidNumber(divisionUnit) ? Number(divisionUnit) : undefined
        return this.handleInput(input, promptCallback)
    }

    setDecimalPlace(input: string, decimalPlace: ConstructionOptions['decimalPlace'], promptCallback: PromptCallback): FuncReturnType {
        this.decimalPlace = decimalPlace
        if (this.decimalPlace && this.decimalPlace < 0) {
            this.decimalPlace = 0
        }
        return this.handleInput(input, promptCallback)
    }

    setHandleInvalid(handleInvalid: ConstructionOptions['handleInvalid']) {
        this.handleInvalid = handleInvalid
    }

    setSupportNegative(input: string, supportNegative: ConstructionOptions['supportNegative'], promptCallback: PromptCallback) {
        this.supportNegative = supportNegative
        return this.handleInput(input, promptCallback)
    }

    // 加工之后的非法值处理类型
    get invalidTypes(): Required<HandleInvalidType> {
        return Object.assign({
            supportNegative: 'revision',
            min: 'prompt',
            max: 'prompt',
            decimalPlace: 'revision',
            divisionUnit: 'prompt',
            nan: 'prompt',
        }, this.handleInvalid)
    }

    private handlePromptCallback(promptCallback: PromptCallback, option: Omit<Parameters<PromptCallback>[0], 'value'>): FuncReturnType {
        promptCallback(option)
        return {
            origin: origin,
            input: option.input,
            value: ''
        }
    }

    /**
     *
     * 处理正在输入的过程
     * @param input
     * @param promptCallback
     * @private
     */
    private handleInput(input: string, promptCallback: PromptCallback): FuncReturnType {
        // 将190所有可能的字符转为英文点
        let value = input.replace(/[。]/g, '.')
        // 将189所有可能的字符转为英文负号
        value = value.replace(/[——_]/g, '-')
        // 移除所有非数字和数学符号字符
        value = value.replace(/[^0-9.-]/g, '')
        // 如果不支持小数位
        if (this.decimalPlace !== undefined && this.decimalPlace <= 0 && value.includes('.')) {
            switch (this.invalidTypes.decimalPlace) {
                case 'revision':
                    value = value.replace(/\./g, '')
                    break
                case "fallback":
                    return {origin: input, input: this.oldValue, value: this.oldValue}
                case "prompt":
                default:
                    return this.handlePromptCallback(promptCallback, {
                        origin: input,
                        input: value,
                        limit: this.decimalPlace,
                        type: 'decimalPlace'
                    })
            }
        }
        // 如果存在负号，禁止负号出现在除第一个位置之外的位置
        let prefix = ''
        if (value.startsWith('-')) {
            if (!this.supportNegative) {
                switch (this.invalidTypes.supportNegative) {
                    case 'revision':
                        prefix = ''
                        break
                    case "fallback":
                        return {origin: input, input: this.oldValue, value: this.oldValue}
                    case "prompt":
                    default:
                        prefix = '-'
                        return this.handlePromptCallback(promptCallback, {
                            origin: input,
                            input: value,
                            limit: this.supportNegative || false,
                            type: 'supportNegative'
                        })
                }
            } else {
                prefix = '-'
            }
        }
        // 取绝对值
        let absValue = value.replace(/-/g, '')
        if (absValue.includes('.')) {
            // 如果存在小数点，禁止小数点前边紧挨着负号，禁止小数点后出现非数字，并且禁止出现两次
            let dotSplitArray = absValue.split('.')
            // 剔除所有空字符，并且合并剔除后的数组，以便缩减小数点数量
            dotSplitArray = dotSplitArray.filter((item) => {
                return item !== ''
            })
            if (dotSplitArray.length > 0) {
                // 小数点左侧的数字
                const headDotSplitText = dotSplitArray[0]
                // 拼合小数点后面的数字
                let tailDotSplitText = dotSplitArray.reduce((prev, current, index) => {
                    if (index === 0) {
                        return prev
                    }
                    return prev + current
                }, '')
                if (this.decimalPlace !== undefined && !Number.isNaN(this.decimalPlace) && tailDotSplitText.length > this.decimalPlace) {
                    switch (this.invalidTypes.decimalPlace) {
                        case 'revision':
                            // 截取小数位数的数字
                            tailDotSplitText = tailDotSplitText.slice(0, Number(this.decimalPlace))
                            break
                        case "fallback":
                            return {origin: input, input: this.oldValue, value: this.oldValue}
                        case "prompt":
                        default:
                            return this.handlePromptCallback(promptCallback, {
                                origin: input,
                                input: value,
                                limit: this.decimalPlace,
                                type: 'decimalPlace'
                            })
                    }
                }
                absValue = headDotSplitText + '.' + tailDotSplitText
            } else {
                // value = '.'
                absValue = ''
            }
        }
        // value = '0000'
        if (/^0+$/.test(absValue)) {
            absValue = '0'
        }
        // value = '0012'
        if (/^0+\d+/.test(absValue)) {
            absValue = absValue.replace(/^0+/, '')
        }
        return this.calcLimitValue({origin: input, input: prefix + absValue, value: prefix + absValue}, promptCallback)
    }

    private calcLimitValue({origin, input, value,}: FuncReturnType, promptCallback: PromptCallback) {
        if (value === '') {
            return this.handlePromptCallback(promptCallback, {
                origin: origin,
                input: input,
                limit: '-?\d+\.', //用户只输入了一个小数点，或者删除文字后变成了空白符，或者处理之后变成了空白符
                type: 'nan'
            })
        } else if (value === '-') {
            return this.handlePromptCallback(promptCallback, {
                origin: origin,
                input: input,
                limit: '-?\d+\.',// 用户只输入了一个负号
                type: 'nan'
            })
        } else {
            let numberValue = Number(value)
            if (this.divisionUnit) {
                const divisionUnit = this.divisionUnit
                if (!Number.isNaN(divisionUnit)) {
                    const divideValue = toFixed(numberValue / divisionUnit)
                    const findDecimalMask = divideValue.indexOf('.') > -1
                    if (findDecimalMask) {
                        return this.handlePromptCallback(promptCallback, {
                            origin: origin,
                            input: input,
                            limit: this.divisionUnit,
                            type: 'divisionUnit'
                        })
                    }
                }
            }
            if (this.min !== undefined) {
                if (!Number.isNaN(this.min) && numberValue < this.min) {
                    switch (this.invalidTypes.min) {
                        case 'revision':
                            // 强制转换不再适应，但这段代码建议保留
                            value = toFixed(this.min)
                            break
                        case "fallback":
                            return {origin: origin, input: this.oldValue, value: this.oldValue}
                        case "prompt":
                        default:
                            return this.handlePromptCallback(promptCallback, {
                                origin: origin,
                                input: input,
                                limit: this.min,
                                type: 'min'
                            })
                    }
                }
            }
            if (this.max !== undefined) {
                if (!Number.isNaN(this.max) && numberValue > this.max) {
                    switch (this.invalidTypes.max) {
                        case 'revision':
                            // 强制转换不再适应，但这段代码建议保留
                            value = toFixed(this.max)
                            break
                        case "fallback":
                            return {origin: origin, input: this.oldValue, value: this.oldValue}
                        case "prompt":
                        default:
                            return this.handlePromptCallback(promptCallback, {
                                origin: origin,
                                input: input,
                                limit: this.max,
                                type: 'max'
                            })
                    }
                }
            }
            this.oldValue = value
            return {origin: origin, input: value, value: value}
        }
    }
}