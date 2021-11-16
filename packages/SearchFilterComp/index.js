// 引入组件
import SearchFilterComp from './SearchFilterComp/src'
SearchFilterComp.install = Vue => Vue.component(SearchFilterComp.name, SearchFilterComp);

if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(SearchFilterComp);
}

export default SearchFilterComp;