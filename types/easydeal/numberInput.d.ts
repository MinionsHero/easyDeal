import { EasyDealComponent } from "./component";

// 强制修改/提醒/返回上一个输入的合法值
type InvalidHandleOption = "revision" | "prompt" | "fallback";
/**
 * min: 超过最小值处理
 * max: 超过最大值处理
 * decimalPlace: 超过小数位处理,或者不支持小数时输入了小数点的处理
 * divisionUnit: 非整除单位处理
 * empty:空字符串
 */
export type InvalidTypes =
  | "min"
  | "max"
  | "decimalPlace"
  | "divisionUnit"
  | "nan";
// 需要处理的非法值类型
type HandleInvalidType = {
  [P in InvalidTypes]?: InvalidHandleOption;
};

// 提醒回调
export interface PromptCallback {
  (option: {
    origin: string;
    input: string;
    type: InvalidTypes;
    limit: number | boolean | string;
  }): void;
}

interface FuncReturnType {
  origin: string; // 原始输入的值
  input: string; // 中途处理的值（半成品）
  value: string; // 处理成功的值
}

// 构造需要的参数
export interface NumberInputInterface {
  value: string;
  min?: number;
  max?: number;
  divisionUnit?: number;
  decimalPlace?: number;
  handleInvalid: HandleInvalidType;
}

/** NumberInput Component */
export declare class NumberInput extends EasyDealComponent
  implements NumberInputInterface {
  decimalPlace: number;
  divisionUnit: number;
  handleInvalid: HandleInvalidType;
  max: number;
  min: number;
  value: string;
}
