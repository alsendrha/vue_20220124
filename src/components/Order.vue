<template>
    <div>
        <h3>파일명 : src/components/Order.vue</h3>

        {{state}}

        <button @click="handleOrderAction">결제하기</button>
    </div>
</template>

<script>
import { reactive } from 'vue';
import { useRoute } from 'vue-router';
import { useRouter } from 'vue-router';
import axios from 'axios';
export default {
    setup () {
        const route = useRoute();
        const router = useRouter();

        const state = reactive({
            code : route.query.code, // 물품번호
            cnt : route.query.cnt,  // 주문수량
            token : sessionStorage.getItem("TOKEN")
        });

        const handleOrderAction = async() => {
            const url = `/shop/order`;
            const headers = {"Content-Type":"application/json", "token":state.token};
            const body = {
                itemcode : Number(state.code),
                ordercnt : Number(state.cnt),
            }
            const response = await axios.post(url, body, {headers});
            console.log(response.data);
            if(response.data.status===200){
                alert('주문했습니다');
                router.push({name:'Mypage', query:{menu:4}});
            }

        }
        

        return {state, handleOrderAction}
    }
}
</script>

<style lang="scss" scoped>

</style>