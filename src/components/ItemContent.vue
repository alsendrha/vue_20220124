<template>
    <div>
        <h3>파일명 : src/components/ItemContent.vue</h3>

        <div v-if="state.item">
            <table border="1"  >
                <thead>
                    <tr>
                        <th>사진</th>
                        <th>번호</th>
                        <th>이름</th>
                        <th>가격</th>
                        <th>내용</th>
                        <th>수량</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <img :src="state.item.imageUrl" style="width:100px;height:100px"/>
                        <td>{{state.item._id}}</td>
                        <td>{{state.item.name}}</td>
                        <td>{{state.item.price}}</td>
                        <td>{{state.item.content}}</td>
                        <select v-model="state.item.ordercnt">
                            <option v-for="no in 100" :key="no">
                                {{ no }}
                            </option>
                        </select>

                        <button @click="handleOrderActon">주문하기</button>
                        <button @click="handleCartActon">장바구니</button>
                        <button @click="handleCartList">장바구니목록</button>
                    </tr>
                </tbody>
            </table>
        </div> 
    </div>
</template>


<script>
import { reactive, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useRouter } from 'vue-router';
import axios from 'axios';
export default {
    setup () {
        const route = useRoute();
        const router = useRouter();

        const state = reactive({
            code : route.query.code,
           
        });

        const handleCartActon = async() => {
            if(typeof state.item.ordercnt === 'undefined'){
                alert('수량을 선택해주세요');
                return false;
            }
            const url = `/shop/insertcart`;
            const headers = {"Content-Type":"application/json"};
            // 물품번호, 수량, 로그인하지 않은 사용자의 정보
            const body = {
                code : state.item._id,
                cnt : state.item.ordercnt
            };
            const response = await axios.post(url, body, {headers});
            console.log(response.data);
            if(response.data.status===200){
                alert('장바구니에 넣었습니다');
            }
        }

        const handleCartList = async() => {
            router.push({name:'Cart'});
        }

        const handleOrderActon = async() => {
            if(typeof state.item.ordercnt === 'undefined'){
                alert('수량을 선택해주세요');
                return false;
            }
            router.push({name : "Order", query : {code:state.item._id, cnt : state.item.ordercnt}});
        }

        const handleLoadData = async() => {
            const url = `/shop/selectone?code=${state.code}`;
            const headers = {"Content-Type":"application/json"};
            const response = await axios.get(url, {headers});
            console.log(response.data);
            if(response.data.status===200){
                state.item = response.data.result;
            }
        }

        onMounted(async()=>{
            await handleLoadData();
      
        });
        

        return {state, handleCartList, handleCartActon, handleOrderActon}
    }
}
</script>

<style lang="scss" scoped>

</style>