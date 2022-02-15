<template>
    <div>
        <h3>주문관리</h3>

        <div v-if="state.items">
            <table border="1" class="one" style="width:600px">
                <thead>
                    <tr>
                        <th>주문번호</th>
                        <th>물품코드</th>
                        <th>주문수량</th>
                        <th>주문자</th>
                        <th>주문일자</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in state.items" :key="item">
                        <td>{{item._id}}</td>
                        <td>{{item.itemcode}}</td>
                        <td>{{item.ordercnt}}</td>
                        <td>{{item.orderid}}</td>
                        <td>{{item.orderdate}}</td>
                    </tr>
                </tbody>
            </table>
        </div>

    </div>
</template>

<script>

import { reactive, onMounted } from 'vue'
import axios from 'axios';
export default {
    setup () {
        const state = reactive({
            token : sessionStorage.getItem("TOKEN")
        });


        const handleLoadData = async() => {
            const url = `/seller/orderlist`;
            const headers = {"Content-Type":"application/json", "token":state.token};
            const response = await axios.get(url, {headers});
            console.log('seller/Menu3/handleLoadData', response.data);
            if(response.data.status===200){
                state.items = response.data.result;
            }
        }
        
        onMounted(async()=>{
            await handleLoadData();
        })

        return {state}
    }

    
}
</script>

<style lang="scss" scoped>
.one{
    text-align: center;
}
</style>