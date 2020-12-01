import { EasyDealComponent } from "./component";

/** Fluctuation Component */
export declare class Fluctuation extends EasyDealComponent {
  value: number;
  border?: boolean;
  bg?: boolean;
  font?: boolean;
  outline?: boolean;
  edConfig?: { isRedUpGreenDown: boolean };
  greenClass: string;
  redClass: string;
  isRedUpGreenDown?: boolean;
}
