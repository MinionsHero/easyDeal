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
export default function toFixed(value: number | string): string {
    // 判断是否是正规数字
    if (!/^-?(?:(?:\d|[1-9]\d*)(?:\.\d+)?)(?:e[+-]?\d+)?$/i.test(value + '')) {
        return value + ''
    }
    let workingValue = value + '';
    // -0/0
    if (value === 0) {
        return '0'
    }
    let sign;
    if (workingValue.charAt(0) === '-') {
        workingValue = workingValue.slice(1);
        sign = -1;
    } else {
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
    } else if (exponentIndex < 0) {
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
    } else {
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
    } else if (exponent > 0) {
        exponent += 1;

        if (exponent > decimalFormLength) {
            exponent -= decimalFormLength;
            while (exponent) {
                decimalForm += '0';
                exponent -= 1;
            }
        } else if (exponent < decimalFormLength) {
            decimalForm = decimalForm.slice(0, exponent) + '.' + decimalForm.slice(exponent);
        }

        // Exponent is zero.
    } else if (decimalFormLength > 1) {
        decimalForm = decimalForm.charAt(0) + '.' + decimalForm.slice(1);
    }

    return sign < 0 ? '-' + decimalForm : decimalForm;
}