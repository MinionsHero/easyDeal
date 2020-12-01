import { PluginFunction } from "vue";
import EdNumberInput from "./components/vue2.x/NumberInput.vue";
import EdFluctuation from "./components/vue2.x/Fluctuation.vue";
import toFixed from "./utils/toFixed";

export const version = "1.1.2";

export const NumberInput = EdNumberInput;
export const Fluctuation = EdFluctuation;
export const utils = { toFixed };

export const install: PluginFunction<{}> = function (Vue) {
  Vue.use(NumberInput);
  Vue.use(Fluctuation);
  return Vue;
};
