// 引入组件
import SchemeTable from './SchemeTable/src'
SchemeTable.install = Vue => Vue.component(SchemeTable.name, SchemeTable);

if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(SchemeTable);
}

export default SchemeTable;