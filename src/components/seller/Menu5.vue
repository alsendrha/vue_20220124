<template>
    <div>
        <h3>파일명 : src/components/seller/Menu5.vue</h3>
        <div style="width:500px;height:300px">
            <vue3-chart-js
                :id = "state.id"
                :type = "state.type"
                ref = "chartRef"
                :data = "state.data">
            </vue3-chart-js>

          
        </div>
    </div>
</template>

<script>
import {ref, onMounted, reactive} from 'vue';
import Vue3ChartJs from '@j-t-mcc/vue3-chartjs'
import axios from 'axios';
export default {
        components:{
        Vue3ChartJs
        },
    setup () {

        const chartRef = ref(null)  // 차트를 업데이트 하기 위해 연결

        const state = reactive({
            id : 'bar',
            type: 'bar',
            data :{
                labels : [], // 라벨
                datasets : [
                    {   labels : '시간대별',
                        backgroundColor: [], // 색상
                        data: [] // 데이터
                    },
                ]
            },
            token : sessionStorage.getItem("TOKEN")

        })

        const handleLoadData = async() => {
            const url = `/seller/groupitem`;
            const headers = {"Content-Type":"application/json", "token":state.token};
            const response = await axios.get(url, {headers});
            console.log(response.data);
            if(response.data.status===200){

                let label = []; //_id
                let background = []; //'#41B883'색상
                let data = []; // 데이터 count

               for(let tmp of response.data.result){
                   label.push(tmp._id);
                   background.push('#41B883','#DC143C', '#ADFF2F', '#4169E1');
                   data.push(tmp.count);
               }

                state.data.labels = label;
                state.data.datasets[0]['backgroundColor'] = background;
                state.data.datasets[0]['data'] = data;

                chartRef.value.update(250);
            }
        }

        onMounted(()=>{
            handleLoadData();
        })
        

        return {state, chartRef }
    }
}
</script>

<style lang="scss" scoped>

</style>