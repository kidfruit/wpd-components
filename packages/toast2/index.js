// 引入组件
import toast2 from './toast2/src'
toast2.install = Vue => Vue.component(toast2.name, toast2);

if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(toast2);
}

export default toast2;