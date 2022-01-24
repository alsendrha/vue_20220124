<template>
    <div>
        <h3>src/components/admin/Menu3.vue</h3>
        {{props}}
        <button @click="handleCount">메뉴3번 증가</button>

    </div>
</template>

<script>
export default {
    props:{
        title : String,
        count : Number
    },
    
    setup (props, {emit}) {
        console.log(props.title); 

        const handleCount = () => {
            emit('handleCount', {});
        }

        return {props,handleCount}
    }
}
</script>

<style lang="scss" scoped>

</style>