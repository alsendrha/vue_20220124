<template>
    <div>
        <h3>src/components/admin/Menu1.vue</h3>
        {{props}}


        <button @click="handleCount">부모메소드 호출 후 값 증가</button>
    </div>
</template>

<script>

export default {
    // props부모 컴포넌트에서 전달되는 값을 보관
    props : {
        title : String,
        count : Number,
    },
    //emit 자식 컴포넌트에서 부모로 전달
    setup (props, {emit}) {
        console.log(props.title);
        const handleCount = () => {
            // 부모의 @handleCount="실제호출메소드" 가 반응
            emit('handleCount', {});

        }
        return {props, handleCount}
    }
}
</script>

<style lang="scss" scoped>

</style>