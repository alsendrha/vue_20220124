<template>
    <div>
        <h3>파일명 : src/components/Cart.vue</h3>
        <h3>장바구니</h3>
        <el-card>
            <div v-if="state.item1">
                <table border="1" style="border-collapse:collapse;">
                    <thead>
                        <tr>
                            <th>체크</th>
                            <th>물품번호</th>
                            <th>물품명</th>
                            <th>주문수량</th>
                            <th>가격</th>
                            <th>합계</th>

                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="item in state.item1" :key="item" align="center">
                            <td><input type="checkbox" :value="item._id" v-model="state.chk"/></td>
                            <td>{{item.code}}</td>
                            <td>{{item.itemname}}</td>
                            <td>{{item.cnt}}</td>
                            <td>{{item.itemprice}}</td>
                            <td>{{item.total}}</td>
                        </tr>
                        <tr align="center">
                            <th colspan="5">합계</th>
                            <td>{{state.total}}</td>
                        </tr>
                    </tbody>
                </table>
                <button style="margin-top:20px;margin-right:5px" @click="handleOrder">주문하기</button>
                <button style="margin-top:20px" @click="handleOrderDeleteAction">삭제하기</button>
            </div>
        </el-card>
    </div>
</template>

<script>
import { reactive, onMounted } from 'vue';
import {useRouter} from 'vue-router';
import axios from 'axios';
export default {
    setup () {
        const router = useRouter();
        const state = reactive({
            total : 0,
            chk : []

        });

        const handleLoadData = async() => {
            const url = `/shop/selectcart`;
            const headers = {"Content-Type":"application/json"};
            const response = await axios.get(url, {headers});
            console.log(response.data);
            if(response.data.status===200){
               state.item1 = response.data.result;

               for(let i=0;i<state.item1.length;i++){
                    console.log(state.item1[i])
                    state.item1[i]['total'] = Number(state.item1[i]['itemprice'])*Number(state.item1[i]['cnt']);
                    state.total += state.item1[i]['total'];
                }
            }
        }
        const handleOrderDeleteAction = async() => {
            if(state.chk.length===0){
                alert('항목을 선택하세요');
                return false;
            }
            if(confirm('물품을 삭제할까요?')){
                const url = `/shop/cartdelete`;
                const headers = {"Content-Type":"application/json"};
                const response = await axios.delete(url, {headers:headers, data:{code:state.chk}});
                console.log(response.data);
                if(response.data.status===200){
                    alert('물품이 삭제되었습니다');
                    state.chk = [];
                    handleLoadData();
                }
            }
        }
        const handleOrder = () => {
            router.push({name:'Order'});
        }

        onMounted(() =>{
          handleLoadData();
        })

        return {state, handleOrder, handleOrderDeleteAction}
    }
}
</script>

<style lang="scss" scoped>

</style>