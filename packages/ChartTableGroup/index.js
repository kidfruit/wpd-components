// 引入组件
import ChartTableGroup from './ChartTableGroup/src'
ChartTableGroup.install = Vue => Vue.component(ChartTableGroup.name, ChartTableGroup);

if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(ChartTableGroup);
}

export default ChartTableGroup;
