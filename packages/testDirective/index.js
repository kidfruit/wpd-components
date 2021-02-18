// 引入组件
import testDirective from './src/testDirective'
const install = Vue => {
    Vue.directive('testDirective', testDirective);
};

if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use({install});
}

export default {
    install
};