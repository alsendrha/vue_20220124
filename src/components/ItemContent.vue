<template>
    <div>
        <h3>파일명 : src/components/ItemContent.vue</h3>
        {{state}}
        <div v-if="state.items">
            {{state.name}}
            <img :src="state.items.imageUrl" style="width:200px;height:200px"/>
        </div>  

    </div>
</template>

<script>
import { reactive, onMounted } from 'vue'
import { useRoute } from 'vue-router';
import axios from 'axios';
export default {
    setup () {
        const route = useRoute();

        const state = reactive({
            code : route.query.code,
           
        });

        const handleLoadData = async() => {
            const url = `/shop/selectone?code=${state.code}`;
            const headers = {"Content-Type":"multipart/form-data"};
            const response = await axios.get(url, {headers});
            console.log(response.data);
            if(response.data.status===200){
                state.items = response.data.result;
            }
        }

        onMounted(async()=>{
            await handleLoadData();
        });
        

        return {state}
    }
}
</script>

<style lang="scss" scoped>

</style>