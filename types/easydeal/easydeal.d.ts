import { PluginFunction } from "vue";
export { EasyDealComponent } from "./component";
export { NumberInput } from "./numberInput";
export { Fluctuation } from "./fluctuation";
export * as utils from "./utils";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface InstallationOptions {}

/** The version of element-ui */
export const version: string;

export const install: PluginFunction<InstallationOptions>;
