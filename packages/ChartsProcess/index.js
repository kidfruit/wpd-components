// 引入组件
import ChartsProcess from './ChartsProcess/src'
ChartsProcess.install = Vue => Vue.component(ChartsProcess.name, ChartsProcess);

if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(ChartsProcess);
}

export default ChartsProcess;
