import Vue from 'vue'
import App from './App.vue'

// vue-easytable
import 'vue-easytable/libs/themes-base/index.css';
import { VTable, VPagination } from 'vue-easytable'; // 导入 table 和 分页组件
// import TableSelect from "~/TableSelect"; // 下拉框
Vue.component(VTable.name, VTable);                   // 注册到全局
Vue.component(VPagination.name, VPagination);
// Vue.component(TableSelect.name,TableSelect);

// antd
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
Vue.use(Antd);

import wpdComponents from '../packages/index'
Vue.use(wpdComponents)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
