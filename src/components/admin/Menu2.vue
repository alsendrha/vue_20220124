<template>
    <div>
        <h3>src/components/admin/Menu2.vue</h3>
        {{props}}
        <button @click="handleCount">부모값증가</button>

    </div>
</template>

<script>
export default {
    props:{
        title : String,
        count : Number,
    },

    setup (props, {emit}) {
        console.log(props.title)

        const handleCount = () =>{
            emit('handleCount',{})
        };

        return {props,handleCount}
    }
}
</script>

<style lang="scss" scoped>

</style>