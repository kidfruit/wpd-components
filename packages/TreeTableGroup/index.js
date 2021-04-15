// 引入组件
import TreeTableGroup from './TreeTableGroup/src'
TreeTableGroup.install = Vue => Vue.component(TreeTableGroup.name, TreeTableGroup);

if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(TreeTableGroup);
}

export default TreeTableGroup;
