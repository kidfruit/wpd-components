// 引入组件
import WpdTimePickerUtile from "./src/WpdTimePickerUtile";
const install = (Vue) => {
  Vue.directive("WpdTimePickerUtile", WpdTimePickerUtile);
};

if (typeof window !== "undefined" && window.Vue) {
  window.Vue.use({ install });
}

export default {
  install,
};
