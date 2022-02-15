<template>
    <div>
        <h3>회원관리</h3>
        <div v-if="state.items">
            <table border="1" class="one">
                <tr>
                    <th>이메일</th>
                    <th>이름</th>
                    <th>가입날짜</th>

                </tr>
                <tr v-for="item in state.items" :key="item">
                    <td>{{item._id}}</td>
                    <td>{{item.name}}</td>
                    <td>{{item.regdate}}</td>
                </tr>
                
            </table>
        </div>
    </div>
</template>

<script>
import { onMounted, reactive } from 'vue'
import axios from 'axios';
export default {
    setup () {

        const state = reactive({
            token : sessionStorage.getItem("TOKEN")

        });

        const handleLoadData = async() => {
            const url = `/seller/memberlist`;
            const headers = {"Content-Type":"application/json","token":state.token};
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
.one{
    text-align: center;
}

</style>