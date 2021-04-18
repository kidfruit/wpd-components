// 引入组件
import TreeSimpleTableGroup from './TreeSimpleTableGroup/src'
TreeSimpleTableGroup.install = Vue => Vue.component(TreeSimpleTableGroup.name, TreeSimpleTableGroup);

if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(TreeSimpleTableGroup);
}

export default TreeSimpleTableGroup;
