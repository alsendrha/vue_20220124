<template>
    <div>
        <h3>src/components/Chart.vue</h3>
        <div style="width:500px;height:300px">
            <vue3-chart-js
                :id="state.id"
                :type="state.type"
                ref = "chartRef"
                :data="state.data">
            </vue3-chart-js>

            <button @click="updateChart">Update Chart</button>
            <button type="submit" @click="exportChart">Export Chart as PNG</button>
        </div>
    </div>
</template>

<script>
import {ref} from 'vue';
import Vue3ChartJs from '@j-t-mcc/vue3-chartjs'

export default {
    components:{
        Vue3ChartJs
    },
    setup () {
        // const state = reactive ({}) v-model 변화감지 Read Write
        const state = {
            id : 'doughnut',
            type: 'doughnut',
            data :{
                labels : ['html', 'css', 'script', 'vue3'],
                datasets : [
                    {
                        backgroundColor: ['#41B883','#E46651','#00D8FF','#DD1B16'],
                         data: [340, 220, 580, 310]
                    }
                ]
            }

        }

        //빈것 만들기
        const chartRef = ref(null)
        
        const updateChart = () =>{
            //변경데이터 설정

        state.data.labels = ['Cats', 'Dogs', 'Hamsters', 'Dragons']
        state.data.datasets = [
        {
            backgroundColor: ['#333333','#E46651','#00D8FF','#DD1B16'],
            data: [100, 20, 800, 20]
        }
        ]

            //컴포넌트에 변화되었음을 알려줌
            chartRef.value.update(250);
        }

        const exportChart = () => {
            let a = document.createElement('a')
            a.href = chartRef.value.chartJSState.chart.toBase64Image()
            a.download = 'image-export.png'
            a.click()
            a = null
        }


        //리턴함
        return {state, chartRef, updateChart, exportChart}
    }
}
</script>

<style lang="scss" scoped>

</style>