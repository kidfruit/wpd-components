// 引入组件
import SeriesPPTN from './SeriesPPTN/src'
SeriesPPTN.install = Vue => Vue.component(SeriesPPTN.name, SeriesPPTN);

if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(SeriesPPTN);
}

export default SeriesPPTN;