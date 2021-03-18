// 引入组件
import SimpleTable from './SimpleTable/src'
SimpleTable.install = Vue => Vue.component(SimpleTable.name, SimpleTable);

if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(SimpleTable);
}

export default SimpleTable;
