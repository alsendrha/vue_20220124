<template>
    <div>
        <h3>src/components/BoardContent.vue</h3>
        {{state}}
    </div>
</template>

<script>
import { reactive } from 'vue';
import {useRoute} from 'vue-router';

export default {
    setup () {
        const route = useRoute();

        const state = reactive({
            no : route.query.no
        })
        
        return {state}
    }
}
</script>

<style lang="scss" scoped>

</style>