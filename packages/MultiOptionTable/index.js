// 引入组件
import MultiOptionTable from './MultiOptionTable/src'
MultiOptionTable.install = Vue => Vue.component(MultiOptionTable.name, MultiOptionTable);

if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(MultiOptionTable);
}

export default MultiOptionTable;
