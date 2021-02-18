<template>
    <div>
        <h1>我是一个组件</h1>
        <h1>{{message}}</h1>
        <button @click="clicked()">点一下会如何</button>
    </div>
</template>

<script>
export default {
    props:{
        message:{
            type:String,
            default:'xxx'
        }
    },
    name: 'toast2',
    data () {
        return { }
    },
    methods:{
        clicked(){
            this.$emit('clicked','点了一下')
        }
    }
}
</script>