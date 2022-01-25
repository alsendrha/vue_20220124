<template>
    <div>
        {{state}}
        <QuillEditor theme="snow" toolbar="full"  v-model:content="state.content" style="height:500px"/>
    </div>
</template>

<script>
import { reactive } from 'vue';
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css';

export default {
    components:{
        QuillEditor
    },
    setup () {
        const state = reactive({
            content : ''
        })
        

        return {state}
    }
}
</script>


<style lang="scss" scoped>

</style>