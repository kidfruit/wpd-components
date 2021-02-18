// 引入组件
import CharacteristicCurve from './CharacteristicCurve/src'
CharacteristicCurve.install = Vue => Vue.component(CharacteristicCurve.name, CharacteristicCurve);

if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(CharacteristicCurve);
}

export default CharacteristicCurve;