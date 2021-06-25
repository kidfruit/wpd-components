// 引入组件
import WpdTimePicker from './WpdTimePicker/src'
WpdTimePicker.install = Vue => Vue.component(WpdTimePicker.name, WpdTimePicker);

if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(WpdTimePicker);
}

export default WpdTimePicker;
