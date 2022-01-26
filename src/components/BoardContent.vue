<template>
    <div>
        <h3>src/components/BoardContent.vue</h3>
        {{state}}

        <img :src="`/board/image?_id=${state.no}`" style="width:100px;height:100px" />
    </div>
</template>

<script>
import { reactive } from 'vue';
import {onMounted} from 'vue';
import {useRoute} from 'vue-router';

export default {
    setup () {
        const route = useRoute();

        const state = reactive({
            no : route.query.no
        });

        onMounted( async() => {
            //const url = `board/selectone`;
        });
        
        return {state}
    }
}
</script>

<style lang="scss" scoped>

</style>