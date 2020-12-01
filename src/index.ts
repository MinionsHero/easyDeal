import { PluginFunction } from "vue";
import NumberInput from "./components/vue2.x/NumberInput.vue";
import Fluctuation from "./components/vue2.x/Fluctuation.vue";
import toFixed from "./utils/toFixed";
export const utils = { toFixed };

export default {
  NumberInput,
  Fluctuation,
  utils
};

export const version = "1.1.1";

export const install: PluginFunction<{}> = function (Vue) {
  Vue.use(NumberInput);
  Vue.use(Fluctuation);
  return Vue;
};
